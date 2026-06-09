// tips-shared.jsx — Shared building blocks for short Quick Tip videos
// Format: 1080×1920, 28-32s
// Layout: title card (3s) → main tip (15-20s) → takeaway (5-8s)

const TIPS_PAL = {
  cream:           '#F2EAE0',
  warm:            '#FAF5EE',
  terracotta:      '#E8B49C',
  terracottaDeep:  '#E2724B',
  walnut:          '#6B5D4F',
  ink:             '#1A1612',
  inkSoft:         '#5A4F45',
  blush:           '#EDD8C9',
  midnight:        '#1F1A14',
};

const TIPS_HEAD = "'Playfair Display', Georgia, serif";
const TIPS_BODY = "'Inter', system-ui, sans-serif";

const { Stage: TStage, Sprite: TSprite, useTime: tUseTime, useSprite: tUseSprite, Easing: TEase, TextSprite: TText, TimelineContext: TCtx } = window;

const tClamp = (v, a, b) => Math.max(a, Math.min(b, v));

function TLocalTimeline({ duration, children }) {
  const { localTime } = tUseSprite();
  const value = React.useMemo(
    () => ({ time: localTime, duration, playing: true, setTime: () => {}, setPlaying: () => {} }),
    [localTime, duration]
  );
  return <TCtx.Provider value={value}>{children}</TCtx.Provider>;
}

// Wordmark crest
function TipsWordmark({ color = TIPS_PAL.ink }) {
  const isLight = color === TIPS_PAL.warm;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{
        width: 28, height: 28, borderRadius: 6, background: color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: isLight ? TIPS_PAL.ink : TIPS_PAL.warm,
        fontFamily: TIPS_HEAD, fontSize: 17, fontWeight: 700, fontStyle: 'italic',
      }}>v</div>
      <div style={{ fontFamily: TIPS_BODY, fontSize: 18, fontWeight: 500, color, letterSpacing: '0.02em' }}>the village</div>
    </div>
  );
}

// Top chrome — small "QUICK TIP" pill
function TipsChrome({ tipNum, label, dark = false }) {
  const { localTime } = tUseSprite();
  const op = tClamp(localTime * 3, 0, 1);
  const fg = dark ? TIPS_PAL.warm : TIPS_PAL.walnut;
  const wm = dark ? TIPS_PAL.warm : TIPS_PAL.ink;
  return (
    <>
      <div style={{
        position: 'absolute', left: 80, top: 116,
        display: 'flex', alignItems: 'center', gap: 14, opacity: op,
      }}>
        <div style={{
          padding: '6px 12px', background: TIPS_PAL.terracottaDeep,
          color: TIPS_PAL.warm, borderRadius: 4,
          fontFamily: TIPS_BODY, fontSize: 12, fontWeight: 700, letterSpacing: '0.25em',
        }}>QUICK TIP {tipNum}</div>
        <div style={{ fontFamily: TIPS_BODY, fontSize: 13, fontWeight: 600, color: fg, letterSpacing: '0.25em', textTransform: 'uppercase' }}>{label}</div>
      </div>
      <div style={{ position: 'absolute', right: 80, top: 116, opacity: op }}>
        <TipsWordmark color={wm}/>
      </div>
    </>
  );
}

// ──────────────────────────────────────────────────────────────
// Title card — eyebrow + big italic title + subtitle
function TipTitleCard({ eyebrow, title, titleAccent, subtitle, duration = 3 }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: TIPS_PAL.cream }}>
      <TipsChrome tipNum="" label="THE VILLAGE"/>

      <TSprite start={0.3} end={duration}>
        <TText text={eyebrow} x={540} y={740} size={22} weight={600}
          color={TIPS_PAL.terracottaDeep} font={TIPS_BODY} align="center" letterSpacing="0.4em"/>
      </TSprite>

      <TSprite start={0.6} end={duration}>
        <TText text={title} x={540} y={870} size={130} weight={700}
          color={TIPS_PAL.ink} font={TIPS_HEAD} align="center" letterSpacing="-0.03em" entryDur={0.5}/>
      </TSprite>
      <TSprite start={0.9} end={duration}>
        <TText text={titleAccent} x={540} y={1030} size={130} weight={400}
          color={TIPS_PAL.terracottaDeep} font={"italic " + TIPS_HEAD} align="center" letterSpacing="-0.03em" entryDur={0.5}/>
      </TSprite>

      <TSprite start={1.5} end={duration}>
        {({ localTime: lt }) => {
          const w = tClamp((lt - 1.5) * 240, 0, 100);
          return (
            <div style={{
              position: 'absolute', left: '50%', top: 1200,
              width: w, height: 2, marginLeft: -w / 2,
              background: TIPS_PAL.terracottaDeep,
            }}/>
          );
        }}
      </TSprite>

      {subtitle && (
        <TSprite start={1.7} end={duration}>
          {({ localTime: lt }) => (
            <div style={{
              position: 'absolute', left: 80, right: 80, top: 1260,
              textAlign: 'center', fontFamily: TIPS_HEAD, fontSize: 36, fontWeight: 400, fontStyle: 'italic',
              color: TIPS_PAL.inkSoft, lineHeight: 1.35,
              opacity: tClamp((lt - 1.7) * 2, 0, 1),
            }}>{subtitle}</div>
          )}
        </TSprite>
      )}
    </div>
  );
}

// Closing — small CTA card
function TipsClosing({ takeaway, takeawayItalic }) {
  const { localTime } = tUseSprite();
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #FBF6EE 0%, #F5E8D5 100%)' }}>
      {/* Soft warm blobs to match index page */}
      <div style={{
        position: 'absolute', right: -160, top: -160, width: 640, height: 640, borderRadius: '50%',
        background: `radial-gradient(circle, rgba(240,182,86,0.55), transparent 70%)`,
        opacity: tClamp(localTime / 1.5, 0, 1),
      }}/>
      <div style={{
        position: 'absolute', left: -120, bottom: -120, width: 480, height: 480, borderRadius: '50%',
        background: `radial-gradient(circle, rgba(226,120,69,0.28), transparent 70%)`,
        opacity: tClamp(localTime / 1.5, 0, 1),
      }}/>

      <div style={{ position: 'absolute', right: 80, top: 116, opacity: tClamp(localTime * 2, 0, 1) }}>
        <TipsWordmark color={TIPS_PAL.ink}/>
      </div>

      <TSprite start={0.2} end={6}>
        <TText text="REMEMBER" x={540} y={780} size={20} weight={600}
          color={TIPS_PAL.terracottaDeep} font={TIPS_BODY} align="center" letterSpacing="0.4em"/>
      </TSprite>

      <TSprite start={0.5} end={6}>
        <TText text={takeaway} x={540} y={920} size={84} weight={400}
          color={TIPS_PAL.ink} font={TIPS_BODY} align="center" entryDur={0.5}/>
      </TSprite>
      <TSprite start={1.0} end={6}>
        <TText text={takeawayItalic} x={540} y={1080} size={120} weight={400}
          color={TIPS_PAL.terracottaDeep} font={"italic " + TIPS_HEAD} align="center" letterSpacing="-0.03em" entryDur={0.6}/>
      </TSprite>

      <TSprite start={2.5} end={6}>
        {({ localTime: lt }) => {
          const op = tClamp((lt - 2.5) * 2, 0, 1);
          return (
            <div style={{
              position: 'absolute', left: 0, right: 0, top: 1500,
              display: 'flex', justifyContent: 'center',
              opacity: op, transform: `translateY(${(1 - op) * 16}px)`,
            }}>
              <div style={{
                padding: '20px 40px', background: TIPS_PAL.terracottaDeep,
                color: TIPS_PAL.warm, fontFamily: TIPS_BODY, fontSize: 20, fontWeight: 600,
                borderRadius: 4,
              }}>More tips in the village  →</div>
            </div>
          );
        }}
      </TSprite>
    </div>
  );
}

window.TIPS_PAL = TIPS_PAL;
window.TIPS_HEAD = TIPS_HEAD;
window.TIPS_BODY = TIPS_BODY;
window.TLocalTimeline = TLocalTimeline;
window.TipsWordmark = TipsWordmark;
window.TipsChrome = TipsChrome;
window.TipTitleCard = TipTitleCard;
window.TipsClosing = TipsClosing;
window.tClamp = tClamp;
