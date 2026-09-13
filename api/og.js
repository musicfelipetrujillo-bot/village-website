// Per-video Open Graph cards for shared Manual links.
//
// WHY THIS EXISTS
// ---------------
// `supabase/functions/manual-og` already renders correct per-video OG HTML, and
// the app shared its URL directly so crawlers would get real titles/thumbnails.
// That has never worked: Supabase serves every edge-function response as
// `Content-Type: text/plain` with `X-Content-Type-Options: nosniff`, so a crawler
// receives well-formed OG markup and refuses to parse it as HTML. Almost
// certainly deliberate on their side — serving arbitrary HTML from a shared
// `*.supabase.co` origin is a phishing vector — so it cannot be fixed there.
//
// This proxies that same function from villieapp.com, where we control the
// response headers. It does NOT re-implement the markup: `manual-og` stays the
// single source of truth for what a card says, so the two can never drift.
//
// Two secondary wins: the link a mother sees in a message now reads
// `villieapp.com` instead of a random Supabase project ref, and a crawler that
// ignores UA-gating still lands somewhere sensible.
//
// FAILS OPEN. Every error path redirects to the existing static landing page,
// which renders the generic villie card — exactly today's behaviour. This can
// make previews better; it cannot make them worse.

const SUPABASE_OG =
  'https://albyndcruwopulazvpjs.supabase.co/functions/v1/manual-og';
const LANDING = 'https://www.villieapp.com/m';

// Same list manual-og gates on, kept deliberately broad: a crawler we fail to
// recognise gets the old generic card, never an error.
const CRAWLER_UA =
  /(bot|crawler|spider|crawling|facebookexternalhit|twitterbot|slackbot|discordbot|whatsapp|telegram|linkedinbot|skype|pinterest|embedly|preview|fetch|googleother|google-inspectiontool|bingbot|duckduckbot|applebot)/i;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function landingUrl(videoId, query) {
  const params = new URLSearchParams();
  if (videoId) params.set('v', videoId);
  // Preserve attribution across the bounce, as manual-og does.
  for (const [k, val] of Object.entries(query || {})) {
    if ((k.startsWith('utm_') || k === 'src') && typeof val === 'string') params.set(k, val);
  }
  const qs = params.toString();
  return qs ? `${LANDING}?${qs}` : LANDING;
}

module.exports = async function handler(req, res) {
  const query = req.query || {};
  const videoId = typeof query.v === 'string' ? query.v : (typeof query.id === 'string' ? query.id : '');
  const fallback = landingUrl(UUID.test(videoId) ? videoId : '', query);

  // Humans go straight to the interactive page — unchanged experience, and it
  // keeps the extra hop off the path that a real person waits on.
  const ua = req.headers['user-agent'] || '';
  if (!UUID.test(videoId) || !CRAWLER_UA.test(ua)) {
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60');
    res.statusCode = 302;
    res.setHeader('Location', fallback);
    return res.end();
  }

  try {
    const upstream = await fetch(`${SUPABASE_OG}?v=${encodeURIComponent(videoId)}`, {
      headers: { 'User-Agent': 'facebookexternalhit/1.1 (+villieapp.com og-proxy)' },
      redirect: 'manual',
    });
    if (upstream.status !== 200) throw new Error(`upstream ${upstream.status}`);
    const html = await upstream.text();
    // Only serve it if it really is a per-video card. A 302 body, an error page
    // or the generic fallback must not be dressed up as text/html.
    if (!/<meta property="og:/i.test(html)) throw new Error('no og tags upstream');

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=600, s-maxage=600');
    res.statusCode = 200;
    return res.end(html);
  } catch (err) {
    console.warn('[og] falling back to the static card:', err && err.message);
    res.statusCode = 302;
    res.setHeader('Location', fallback);
    return res.end();
  }
};
