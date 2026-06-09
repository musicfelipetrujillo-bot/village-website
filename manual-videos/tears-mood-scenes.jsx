// Tears & Mood — deep dive into the baby blues vs PPD
// 75s, 9:16 (1080×1920), brand: the village
//
// LAYOUT SYSTEM (1920 tall):
//   Chrome:    y=120  (chapter + wordmark)
//   Header:    y=380—720   (eyebrow → headline → optional subhead)
//   Body:      y=800—1700  (cards, charts, lists)
//   Footer:    y=1750—1840 (caption / pull-quote)
//   Safe area: never cross y=1840

const PAL = {
  cream:           '#F2EAE0',
  warm:            '#FAF5EE',
  terracotta:      '#E8B49C',
  terracottaDeep:  '#E2724B',
  clay:            '#B8957A',
  walnut:          '#6B5D4F',
  ink:             '#1A1612',
  inkSoft:         '#5A4F45',
  blush:           '#EDD8C9',
  midnight:        '#1F1A14',
  warning:         '#B85234',
};

const HEAD = "'Playfair Display', Georgia, serif";
const BODY = "'Inter', system-ui, sans-serif";

const { Stage, Sprite, useTime, useSprite, Easing, interpolate, TextSprite, TimelineContext } = window;

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp  = (a, b, t) => a + (b - a) * t;

function LocalTimeline({ duration, children }) {
  const { localTime } = useSprite();
  const value = React.useMemo(
    () => ({ time: localTime, duration, playing: true, setTime: () => {}, setPlaying: () => {} }),
    [localTime, duration]
  );
  return <TimelineContext.Provider value={value}>{children}</TimelineContext.Provider>;
}

// ──────────────────────────────────────────────────────────────
// SHARED COMPONENTS

function VillageMark({ color = PAL.ink }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{
        width: 28, height: 28, borderRadius: 6, background: color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: color === PAL.warm || color === PAL.cream ? PAL.ink : PAL.warm,
        fontFamily: HEAD, fontSize: 17, fontWeight: 700, fontStyle: 'italic',
      }}>v</div>
      <div style={{ fontFamily: BODY, fontSize: 18, fontWeight: 500, color, letterSpacing: '0.02em' }}>the village</div>
    </div>
  );
}

function SceneChrome({ chapter, label, dark = false }) {
  const { localTime } = useSprite();
  const op = clamp(localTime * 3, 0, 1);
  const fg = dark ? PAL.warm : PAL.walnut;
  const wm = dark ? PAL.warm : PAL.ink;
  return (
    <>
      <div style={{
        position: 'absolute', left: 80, top: 120,
        display: 'flex', alignItems: 'center', gap: 18, opacity: op,
      }}>
        <div style={{ fontFamily: BODY, fontSize: 14, fontWeight: 600, color: fg, letterSpacing: '0.25em' }}>{chapter}</div>
        <div style={{ width: 50, height: 1, background: fg, opacity: 0.4 }}/>
        <div style={{ fontFamily: BODY, fontSize: 14, fontWeight: 600, color: fg, letterSpacing: '0.25em', textTransform: 'uppercase' }}>{label}</div>
      </div>
      <div style={{ position: 'absolute', right: 80, top: 116, opacity: op }}>
        <VillageMark color={wm}/>
      </div>
    </>
  );
}

// Unified header block — handles eyebrow, headline, subhead with consistent rhythm
// Returns the y-baseline where body content should start
function Header({ eyebrow, headline, headlineAccent, subhead, eyebrowColor = PAL.terracottaDeep, headlineColor = PAL.ink, accentColor = PAL.terracottaDeep, align = 'left', startTime = 0.1 }) {
  // Vertical rhythm:
  //   eyebrow   y=380, h≈24
  //   headline  y=440, scales with content (use 96–112 size)
  //   subhead   y=620, h≈80
  //   body starts at y=800 (or earlier if no subhead)
  const x = align === 'center' ? 540 : 80;
  return (
    <>
      {eyebrow && (
        <Sprite start={startTime} end={20}>
          <TextSprite text={eyebrow} x={x} y={380} size={20} weight={600}
            color={eyebrowColor} font={BODY} align={align} letterSpacing="0.4em"/>
        </Sprite>
      )}
      {headline && (
        <Sprite start={startTime + 0.2} end={20}>
          <TextSprite text={headline} x={x} y={460} size={104} weight={700}
            color={headlineColor} font={HEAD} align={align} letterSpacing="-0.025em"/>
        </Sprite>
      )}
      {headlineAccent && (
        <Sprite start={startTime + 0.4} end={20}>
          <TextSprite text={headlineAccent} x={x} y={580} size={104} weight={400}
            color={accentColor} font={"italic " + HEAD} align={align} letterSpacing="-0.025em"/>
        </Sprite>
      )}
      {subhead && (
        <Sprite start={startTime + 0.6} end={20}>
          <TextSprite text={subhead} x={x} y={headlineAccent ? 720 : 600} size={26} weight={400}
            color={PAL.inkSoft} font={BODY} align={align}/>
        </Sprite>
      )}
    </>
  );
}

function ScreenLabel() {
  const time = useTime();
  React.useEffect(() => {
    const root = document.querySelector('[data-video-root]');
    if (root) root.setAttribute('data-screen-label', `t=${time.toFixed(1)}s`);
  }, [Math.floor(time)]);
  return null;
}

// ──────────────────────────────────────────────────────────────
// SCENE 1 — HOOK (0—4s)
function Scene_Hook() {
  const { localTime } = useSprite();
  return (
    <div style={{ position: 'absolute', inset: 0,
      background: `radial-gradient(circle at 50% 55%, ${PAL.blush} 0%, ${PAL.cream} 70%)` }}>
      <SceneChrome chapter="A FIELD GUIDE" label="TEARS & MOOD"/>

      {/* TITLE CARD STRUCTURE:
            y=560  — episode number badge
            y=720  — series eyebrow
            y=820  — TITLE (Tears & Mood)
            y=1020 — divider rule
            y=1100 — subtitle (Episode promise)
            y=1380 — small italic teaser
            y=1700 — duration & next-up tag
      */}

      {/* Wordmark crest */}
      <Sprite start={0.2} end={4}>
        {({ localTime: lt }) => {
          const op = clamp(lt * 2, 0, 1);
          const sc = 0.92 + clamp(lt * 1.5, 0, 0.08);
          return (
            <div style={{
              position: 'absolute', left: '50%', top: 580,
              transform: `translate(-50%, 0) scale(${sc})`,
              opacity: op,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 12, background: PAL.terracottaDeep,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: PAL.warm, fontFamily: HEAD, fontStyle: 'italic', fontWeight: 700, fontSize: 32,
              }}>v</div>
              <div style={{ fontFamily: BODY, fontSize: 15, fontWeight: 600, color: PAL.ink, letterSpacing: '0.05em' }}>the village</div>
            </div>
          );
        }}
      </Sprite>

      {/* Series eyebrow */}
      <Sprite start={0.5} end={4}>
        <TextSprite text="A FIELD GUIDE TO POSTPARTUM" x={540} y={740} size={24} weight={600}
          color={PAL.walnut} font={BODY} align="center" letterSpacing="0.4em"/>
      </Sprite>

      {/* Big title — Tears & Mood */}
      <Sprite start={0.9} end={4}>
        <TextSprite text="Tears" x={540} y={820} size={148} weight={700}
          color={PAL.ink} font={HEAD} align="center"
          letterSpacing="-0.035em" entryDur={0.6}/>
      </Sprite>
      <Sprite start={1.2} end={4}>
        <TextSprite text="& Mood." x={540} y={970} size={148} weight={400}
          color={PAL.terracottaDeep} font={"italic " + HEAD} align="center"
          letterSpacing="-0.035em" entryDur={0.6}/>
      </Sprite>

      {/* Divider rule */}
      <Sprite start={1.8} end={4}>
        {({ localTime: lt }) => {
          const w = clamp((lt - 1.8) * 240, 0, 120);
          return (
            <div style={{
              position: 'absolute', left: '50%', top: 1180,
              width: w, height: 2, marginLeft: -w / 2,
              background: PAL.terracottaDeep,
            }}/>
          );
        }}
      </Sprite>

      {/* Subtitle — episode promise */}
      <Sprite start={2.0} end={4}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1240,
            textAlign: 'center', fontFamily: HEAD, fontSize: 40, fontWeight: 400, fontStyle: 'italic',
            color: PAL.inkSoft, lineHeight: 1.35, letterSpacing: '-0.01em',
            opacity: clamp((lt - 2.0) * 2, 0, 1),
          }}>Why you're crying<br/>and when to worry.</div>
        )}
      </Sprite>

      {/* Bottom meta — duration */}
      <Sprite start={2.8} end={4}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 0, right: 0, top: 1700,
            display: 'flex', justifyContent: 'center', gap: 32, alignItems: 'center',
            opacity: clamp((lt - 2.8) * 2, 0, 1),
          }}>
            <div style={{ fontFamily: BODY, fontSize: 14, fontWeight: 600, color: PAL.walnut, letterSpacing: '0.3em' }}>75 SECONDS</div>
            <div style={{ width: 4, height: 4, borderRadius: 2, background: PAL.walnut, opacity: 0.5 }}/>
            <div style={{ fontFamily: BODY, fontSize: 14, fontWeight: 600, color: PAL.walnut, letterSpacing: '0.3em' }}>5 CHAPTERS</div>
          </div>
        )}
      </Sprite>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// SCENE 2 — PROBLEM (4—10s, 6s)
function Scene_Problem() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: PAL.cream }}>
      <SceneChrome chapter="01 / 05" label="THE QUESTION"/>

      {/* Header: It isn't weakness. */}
      <Header
        eyebrow="THE TRUTH"
        headline="It isn't"
        headlineAccent="weakness."
        startTime={0.1}
      />

      {/* Body: stacked rejections + truth */}
      <div style={{ position: 'absolute', left: 80, right: 80, top: 820 }}>
        <Sprite start={1.2} end={6}>
          {({ localTime: lt }) => (
            <div style={{
              padding: '20px 24px', marginBottom: 14,
              background: PAL.warm, borderRadius: 4,
              opacity: clamp((lt - 1.2) * 3, 0, 1),
              transform: `translateX(${(1 - clamp((lt - 1.2) * 3, 0, 1)) * 12}px)`,
              borderLeft: `3px solid ${PAL.blush}`,
            }}>
              <div style={{ fontFamily: BODY, fontSize: 14, fontWeight: 600, color: PAL.walnut, letterSpacing: '0.25em', marginBottom: 6 }}>NOT</div>
              <div style={{ fontFamily: HEAD, fontSize: 52, fontWeight: 700, color: PAL.ink, lineHeight: 1.05, letterSpacing: '-0.02em' }}>A personality flaw.</div>
            </div>
          )}
        </Sprite>
        <Sprite start={1.8} end={6}>
          {({ localTime: lt }) => (
            <div style={{
              padding: '20px 24px', marginBottom: 14,
              background: PAL.warm, borderRadius: 4,
              opacity: clamp((lt - 1.8) * 3, 0, 1),
              transform: `translateX(${(1 - clamp((lt - 1.8) * 3, 0, 1)) * 12}px)`,
              borderLeft: `3px solid ${PAL.blush}`,
            }}>
              <div style={{ fontFamily: BODY, fontSize: 14, fontWeight: 600, color: PAL.walnut, letterSpacing: '0.25em', marginBottom: 6 }}>NOT</div>
              <div style={{ fontFamily: HEAD, fontSize: 52, fontWeight: 700, color: PAL.ink, lineHeight: 1.05, letterSpacing: '-0.02em' }}>A failure to bond.</div>
            </div>
          )}
        </Sprite>
        <Sprite start={2.6} end={6}>
          {({ localTime: lt }) => (
            <div style={{
              padding: '24px 28px', marginTop: 20,
              background: PAL.terracottaDeep, borderRadius: 4,
              opacity: clamp((lt - 2.6) * 3, 0, 1),
              transform: `translateX(${(1 - clamp((lt - 2.6) * 3, 0, 1)) * 12}px)`,
            }}>
              <div style={{ fontFamily: BODY, fontSize: 14, fontWeight: 600, color: PAL.warm, opacity: 0.8, letterSpacing: '0.25em', marginBottom: 6 }}>BUT</div>
              <div style={{ fontFamily: HEAD, fontSize: 72, fontWeight: 400, fontStyle: 'italic', color: PAL.warm, lineHeight: 1, letterSpacing: '-0.02em' }}>chemistry.</div>
            </div>
          )}
        </Sprite>
      </div>

      <Sprite start={4.4} end={6}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1780,
            textAlign: 'center', fontFamily: HEAD, fontSize: 26, fontWeight: 400, fontStyle: 'italic',
            color: PAL.inkSoft, lineHeight: 1.4,
            opacity: clamp((lt - 4.4) * 2, 0, 1),
          }}>Your hormones just fell off a cliff.</div>
        )}
      </Sprite>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// SCENE 3 — HORMONE CLIFF (10—22s, 12s)
function Scene_Cliff() {
  const { localTime } = useSprite();
  const T = clamp(localTime / 8, 0, 1);

  const W = 920, H = 460;
  const px = (x) => 60 + x * (W - 120);
  const py = (y) => 30 + (1 - y) * (H - 70);

  const points = Array.from({ length: 60 }, (_, i) => {
    const t = i / 59;
    let est, prog;
    if (t < 0.7) { est = 0.85 + 0.1 * Math.sin(t * 8); prog = 0.92 + 0.06 * Math.cos(t * 6); }
    else if (t < 0.78) {
      const f = (t - 0.7) / 0.08;
      est = lerp(0.92, 0.06, Easing.easeInOutCubic(f));
      prog = lerp(0.96, 0.04, Easing.easeInOutCubic(f));
    }
    else { est = 0.06 + 0.02 * Math.sin(t * 20); prog = 0.04 + 0.02 * Math.cos(t * 22); }
    return { t, est, prog };
  });

  const drawn = Math.min(points.length - 1, Math.floor(points.length * T));
  const pathFrom = (key) => points.slice(0, drawn + 1).map((p, i) =>
    `${i === 0 ? 'M' : 'L'} ${px(p.t).toFixed(1)} ${py(p[key]).toFixed(1)}`).join(' ');

  return (
    <div style={{ position: 'absolute', inset: 0, background: PAL.cream }}>
      <SceneChrome chapter="02 / 05" label="THE HORMONE CLIFF"/>

      <Header
        eyebrow="IN 72 HOURS"
        headline="Your hormones"
        headlineAccent="drop 100×."
        startTime={0.1}
      />

      {/* Chart card — y=820, h=600 */}
      <div style={{
        position: 'absolute', left: 80, top: 820, right: 80,
        padding: '24px 24px 28px', background: PAL.warm,
        border: `1px solid ${PAL.blush}`, borderRadius: 8,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <div style={{ fontFamily: BODY, fontSize: 13, fontWeight: 600, color: PAL.walnut, letterSpacing: '0.25em' }}>HORMONE LEVELS</div>
          <div style={{ fontFamily: BODY, fontSize: 13, fontWeight: 500, color: PAL.walnut, letterSpacing: '0.15em' }}>PREGNANCY → POSTPARTUM</div>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 460 }}>
          <defs>
            <linearGradient id="estg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={PAL.terracottaDeep} stopOpacity="0.25"/>
              <stop offset="100%" stopColor={PAL.terracottaDeep} stopOpacity="0"/>
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75, 1].map(g => (
            <line key={g} x1={px(0)} y1={py(g)} x2={px(1)} y2={py(g)} stroke={PAL.blush} strokeWidth="1"/>
          ))}
          <line x1={px(0)} y1={py(0)} x2={px(1)} y2={py(0)} stroke={PAL.walnut} strokeWidth="1.5"/>

          {T > 0.4 && (
            <g>
              <line x1={px(0.74)} y1={py(0)} x2={px(0.74)} y2={py(1)}
                stroke={PAL.walnut} strokeWidth="1" strokeDasharray="4 4" opacity="0.5"/>
              <text x={px(0.74)} y={py(1) - 8} textAnchor="middle"
                fontFamily={BODY} fontSize="14" fontWeight="600" fill={PAL.walnut} letterSpacing="3">BIRTH</text>
            </g>
          )}
          <text x={px(0.1)} y={py(0) + 24} textAnchor="middle" fontFamily={BODY} fontSize="13" fill={PAL.walnut} letterSpacing="2">PREGNANCY</text>
          <text x={px(0.85)} y={py(0) + 24} textAnchor="middle" fontFamily={BODY} fontSize="13" fill={PAL.walnut} letterSpacing="2">DAY 1—7</text>

          {drawn > 0 && (
            <>
              <path d={`${pathFrom('prog')} L ${px(points[drawn].t)} ${py(0)} L ${px(0)} ${py(0)} Z`}
                fill="url(#estg)" opacity="0.6"/>
              <path d={pathFrom('prog')} stroke={PAL.terracottaDeep} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <path d={pathFrom('est')} stroke={PAL.walnut} strokeWidth="3" fill="none"
                strokeDasharray="6 6" strokeLinecap="round"/>
            </>
          )}

          <g transform={`translate(${W - 280}, 30)`}>
            <line x1="0" y1="6" x2="22" y2="6" stroke={PAL.terracottaDeep} strokeWidth="4" strokeLinecap="round"/>
            <text x="30" y="11" fontFamily={BODY} fontSize="14" fontWeight="500" fill={PAL.ink}>PROGESTERONE</text>
            <line x1="0" y1="32" x2="22" y2="32" stroke={PAL.walnut} strokeWidth="3" strokeDasharray="6 6"/>
            <text x="30" y="37" fontFamily={BODY} fontSize="14" fontWeight="500" fill={PAL.ink}>ESTROGEN</text>
          </g>
        </svg>
      </div>

      {/* Caption — y=1500 */}
      <Sprite start={5} end={12}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1500,
            textAlign: 'center', fontFamily: HEAD, fontSize: 32, fontWeight: 400, fontStyle: 'italic',
            color: PAL.inkSoft, lineHeight: 1.4,
            opacity: clamp((lt - 5) * 1.2, 0, 1),
          }}>
            The biggest hormonal shift<br/>of your life.
          </div>
        )}
      </Sprite>
      <Sprite start={6.5} end={12}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1700,
            textAlign: 'center', fontFamily: HEAD, fontSize: 38, fontWeight: 700, fontStyle: 'italic',
            color: PAL.terracottaDeep, lineHeight: 1.2, letterSpacing: '-0.01em',
            opacity: clamp((lt - 6.5) * 1.5, 0, 1),
          }}>It's no wonder you're crying.</div>
        )}
      </Sprite>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// SCENE 4 — BABY BLUES (22—34s, 12s)
function Scene_BabyBlues() {
  const symptoms = [
    { t: 1.4, label: "Sudden tears (over nothing)" },
    { t: 1.8, label: "Mood swings, irritability" },
    { t: 2.2, label: "Anxiety, racing thoughts" },
    { t: 2.6, label: "Trouble sleeping" },
    { t: 3.0, label: "Feeling overwhelmed" },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, background: PAL.cream }}>
      <SceneChrome chapter="03 / 05" label="WHAT'S NORMAL"/>

      <Header
        eyebrow="THIS IS THE"
        headline="Baby"
        headlineAccent="Blues."
        startTime={0.1}
      />

      {/* Timeline strip — y=820 */}
      <Sprite start={0.6} end={12}>
        {({ localTime: lt }) => {
          const tt = clamp((lt - 0.6) / 2, 0, 1);
          return (
            <div style={{ position: 'absolute', left: 80, right: 80, top: 820 }}>
              <div style={{ fontFamily: BODY, fontSize: 13, fontWeight: 600, color: PAL.walnut, letterSpacing: '0.25em', marginBottom: 16 }}>WHEN IT HAPPENS</div>
              <div style={{ position: 'relative', height: 70 }}>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 28, height: 4, background: PAL.blush, borderRadius: 2 }}/>
                <div style={{
                  position: 'absolute', left: '14%',
                  width: `${tt * (75 - 14)}%`, top: 28, height: 4,
                  background: PAL.terracottaDeep, borderRadius: 2,
                }}/>
                {[
                  { p: 0, label: 'BIRTH' },
                  { p: 14, label: 'DAY 3' },
                  { p: 50, label: 'PEAK' },
                  { p: 75, label: 'DAY 14' },
                  { p: 100, label: 'GONE' },
                ].map((m, i) => (
                  <div key={i} style={{
                    position: 'absolute', left: `${m.p}%`, top: 18, transform: 'translateX(-50%)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  }}>
                    <div style={{ width: 10, height: 24, background: m.p === 50 ? PAL.terracottaDeep : PAL.walnut, borderRadius: 2 }}/>
                    <div style={{ fontFamily: BODY, fontSize: 11, fontWeight: 600, color: m.p === 50 ? PAL.terracottaDeep : PAL.walnut, letterSpacing: '0.15em', whiteSpace: 'nowrap' }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      </Sprite>

      {/* Symptoms list — y=1000 */}
      <div style={{ position: 'absolute', left: 80, right: 80, top: 1000 }}>
        <Sprite start={1.0} end={12}>
          {({ localTime: lt }) => (
            <div style={{ fontFamily: BODY, fontSize: 13, fontWeight: 600, color: PAL.walnut, letterSpacing: '0.25em', marginBottom: 16, opacity: clamp((lt - 1.0) * 3, 0, 1) }}>WHAT IT FEELS LIKE</div>
          )}
        </Sprite>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {symptoms.map((s, i) => (
            <Sprite key={i} start={s.t} end={12}>
              {({ localTime: lt }) => {
                const op = clamp((lt - s.t) * 3, 0, 1);
                const tx = (1 - op) * 12;
                return (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 18,
                    padding: '16px 20px', background: PAL.warm,
                    border: `1px solid ${PAL.blush}`, borderRadius: 4,
                    opacity: op, transform: `translateX(${tx}px)`,
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 18,
                      background: PAL.terracottaDeep + '22',
                      color: PAL.terracottaDeep,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: HEAD, fontSize: 22, fontWeight: 700, fontStyle: 'italic',
                    }}>{i + 1}</div>
                    <div style={{ fontFamily: BODY, fontSize: 22, fontWeight: 500, color: PAL.ink }}>{s.label}</div>
                  </div>
                );
              }}
            </Sprite>
          ))}
        </div>
      </div>

      {/* Footer fact — y=1660 */}
      <Sprite start={4.5} end={12}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1660,
            padding: '20px 24px', background: PAL.terracottaDeep + '15',
            borderRadius: 4, opacity: clamp((lt - 4.5) * 2, 0, 1),
            display: 'flex', alignItems: 'center', gap: 18,
          }}>
            <div style={{ fontFamily: HEAD, fontSize: 64, fontWeight: 700, fontStyle: 'italic', color: PAL.terracottaDeep, lineHeight: 1, letterSpacing: '-0.02em' }}>4 in 5</div>
            <div style={{ fontFamily: BODY, fontSize: 19, fontWeight: 500, color: PAL.ink, lineHeight: 1.35 }}>
              new mothers experience this.<br/>
              <span style={{ color: PAL.inkSoft, fontWeight: 400 }}>You are in the majority.</span>
            </div>
          </div>
        )}
      </Sprite>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// SCENE 5 — WHEN TO WORRY (PPD) (34—48s, 14s)
function Scene_PPD() {
  const left = [
    { t: 0.6, label: "Lasts a few days to 2 weeks" },
    { t: 1.0, label: "Mood lifts between waves" },
    { t: 1.4, label: "You can still enjoy the baby" },
    { t: 1.8, label: "Sleep & support help" },
  ];
  const right = [
    { t: 3.4, label: "Lasts beyond 2 weeks" },
    { t: 3.8, label: "Persistent sadness, numbness" },
    { t: 4.2, label: "Trouble bonding with baby" },
    { t: 4.6, label: "Thoughts of harm" },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, background: PAL.cream }}>
      <SceneChrome chapter="04 / 05" label="WHEN TO WORRY"/>

      <Header
        eyebrow="THE LINE"
        headline="Blues — or"
        headlineAccent="something more?"
        accentColor={PAL.warning}
        eyebrowColor={PAL.warning}
        startTime={0.1}
      />

      {/* Two-column comparison — y=820, h=720 */}
      <div style={{ position: 'absolute', left: 80, right: 80, top: 820, display: 'flex', gap: 16 }}>
        <Sprite start={0.3} end={14}>
          {({ localTime: lt }) => (
            <div style={{
              flex: 1, padding: '22px 22px',
              background: PAL.warm,
              border: `1px solid ${PAL.terracottaDeep}33`,
              borderRadius: 6, opacity: clamp((lt - 0.3) * 3, 0, 1),
            }}>
              <div style={{ fontFamily: BODY, fontSize: 12, fontWeight: 700, color: PAL.terracottaDeep, letterSpacing: '0.3em', marginBottom: 6 }}>NORMAL</div>
              <div style={{ fontFamily: HEAD, fontSize: 40, fontWeight: 400, fontStyle: 'italic', color: PAL.ink, marginBottom: 22, letterSpacing: '-0.01em', lineHeight: 1 }}>Baby Blues</div>
              {left.map((s, i) => (
                <Sprite key={i} start={s.t} end={14}>
                  {({ localTime: lt2 }) => (
                    <div style={{
                      display: 'flex', gap: 10, alignItems: 'flex-start',
                      marginBottom: 12, opacity: clamp((lt2 - s.t) * 3, 0, 1),
                    }}>
                      <div style={{ color: PAL.terracottaDeep, fontFamily: HEAD, fontWeight: 700, fontSize: 18, marginTop: 2 }}>✓</div>
                      <div style={{ fontFamily: BODY, fontSize: 17, color: PAL.ink, lineHeight: 1.35, fontWeight: 500 }}>{s.label}</div>
                    </div>
                  )}
                </Sprite>
              ))}
            </div>
          )}
        </Sprite>

        <Sprite start={3.0} end={14}>
          {({ localTime: lt }) => (
            <div style={{
              flex: 1, padding: '22px 22px',
              background: PAL.warning + '0c',
              border: `2px solid ${PAL.warning}`,
              borderRadius: 6, opacity: clamp((lt - 3.0) * 3, 0, 1),
            }}>
              <div style={{ fontFamily: BODY, fontSize: 12, fontWeight: 700, color: PAL.warning, letterSpacing: '0.3em', marginBottom: 6 }}>SEEK HELP</div>
              <div style={{ fontFamily: HEAD, fontSize: 40, fontWeight: 400, fontStyle: 'italic', color: PAL.warning, marginBottom: 22, letterSpacing: '-0.01em', lineHeight: 1 }}>PPD / PPA</div>
              {right.map((s, i) => (
                <Sprite key={i} start={s.t} end={14}>
                  {({ localTime: lt2 }) => (
                    <div style={{
                      display: 'flex', gap: 10, alignItems: 'flex-start',
                      marginBottom: 12, opacity: clamp((lt2 - s.t) * 3, 0, 1),
                    }}>
                      <div style={{ color: PAL.warning, fontFamily: BODY, fontWeight: 700, fontSize: 18, marginTop: 2 }}>!</div>
                      <div style={{ fontFamily: BODY, fontSize: 17, color: PAL.ink, lineHeight: 1.35, fontWeight: 500 }}>{s.label}</div>
                    </div>
                  )}
                </Sprite>
              ))}
            </div>
          )}
        </Sprite>
      </div>

      {/* Bottom stat banner — y=1500 */}
      <Sprite start={6.5} end={14}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1500,
            padding: '22px 26px',
            background: PAL.warning, borderRadius: 6,
            opacity: clamp((lt - 6.5) * 2, 0, 1),
            display: 'flex', alignItems: 'center', gap: 22,
          }}>
            <div style={{ fontFamily: HEAD, fontSize: 60, fontWeight: 700, fontStyle: 'italic', color: PAL.warm, lineHeight: 1, letterSpacing: '-0.02em' }}>1 in 7</div>
            <div style={{ fontFamily: BODY, fontSize: 19, fontWeight: 500, color: PAL.warm, lineHeight: 1.4 }}>
              experience postpartum depression.<br/>
              <span style={{ opacity: 0.85, fontWeight: 400 }}>It is treatable. It is not your fault.</span>
            </div>
          </div>
        )}
      </Sprite>

      {/* Helpline — y=1680 */}
      <Sprite start={8.5} end={14}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1680,
            padding: '18px 24px',
            border: `1px solid ${PAL.warning}`, borderRadius: 6,
            opacity: clamp((lt - 8.5) * 2, 0, 1),
          }}>
            <div style={{ fontFamily: BODY, fontSize: 12, fontWeight: 700, color: PAL.warning, letterSpacing: '0.3em', marginBottom: 6 }}>U.S. HELPLINE — 24/7</div>
            <div style={{ fontFamily: HEAD, fontSize: 36, fontWeight: 700, color: PAL.ink, letterSpacing: '-0.01em' }}>1-833-TLC-MAMA</div>
          </div>
        )}
      </Sprite>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// SCENE 6 — WHAT TO DO (48—62s, 14s)
function Scene_Tools() {
  const tools = [
    { t: 0.4, n: '01', word: "Eat",      line: "Low blood sugar = bigger waves. Snack every 2–3 hrs." },
    { t: 1.4, n: '02', word: "Daylight", line: "10 minutes of morning sun resets cortisol & melatonin." },
    { t: 2.4, n: '03', word: "Name it",  line: "Say out loud: \"This is hormones, not me.\"" },
    { t: 3.4, n: '04', word: "Ask",      line: "One person. One specific thing. Today." },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, background: PAL.cream }}>
      <SceneChrome chapter="05 / 05" label="THE TOOLKIT"/>

      <Header
        eyebrow="FOUR THINGS"
        headline="that actually"
        headlineAccent="help."
        startTime={0.1}
      />

      {/* Tool cards — y=820 */}
      <div style={{ position: 'absolute', left: 80, right: 80, top: 820, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {tools.map((t, i) => (
          <Sprite key={i} start={t.t} end={14}>
            {({ localTime: lt }) => {
              const op = clamp((lt - t.t) * 3, 0, 1);
              const tx = (1 - op) * 16;
              return (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 24,
                  padding: '24px 28px', background: PAL.warm,
                  borderLeft: `4px solid ${PAL.terracottaDeep}`,
                  borderRadius: 4,
                  opacity: op, transform: `translateX(${tx}px)`,
                }}>
                  <div style={{
                    fontFamily: HEAD, fontSize: 60, fontWeight: 700, fontStyle: 'italic',
                    color: PAL.terracottaDeep, lineHeight: 1, letterSpacing: '-0.02em',
                    minWidth: 80,
                  }}>{t.n}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: HEAD, fontSize: 48, fontWeight: 700, color: PAL.ink, lineHeight: 1.05, letterSpacing: '-0.025em', marginBottom: 6 }}>{t.word}</div>
                    <div style={{ fontFamily: BODY, fontSize: 19, fontWeight: 400, color: PAL.inkSoft, lineHeight: 1.4 }}>{t.line}</div>
                  </div>
                </div>
              );
            }}
          </Sprite>
        ))}
      </div>

      {/* Footer line — y=1700 */}
      <Sprite start={6.0} end={14}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1700,
            textAlign: 'center', fontFamily: HEAD, fontSize: 36, fontWeight: 400, fontStyle: 'italic',
            color: PAL.terracottaDeep, lineHeight: 1.3,
            opacity: clamp((lt - 6.0) * 1.5, 0, 1),
          }}>Tiny inputs. Real outputs.</div>
        )}
      </Sprite>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// SCENE 7 — CLOSING (62—75s, 13s)
function Scene_Closing() {
  const { localTime } = useSprite();
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #FBF6EE 0%, #F5E8D5 100%)' }}>
      {/* Soft warm blobs to match index */}
      <div style={{
        position: 'absolute', right: -160, top: -160, width: 720, height: 720, borderRadius: '50%',
        background: `radial-gradient(circle, rgba(240,182,86,0.55), transparent 70%)`,
        opacity: clamp(localTime / 1.5, 0, 1),
      }}/>
      <div style={{
        position: 'absolute', left: -120, bottom: -120, width: 540, height: 540, borderRadius: '50%',
        background: `radial-gradient(circle, rgba(226,120,69,0.28), transparent 70%)`,
        opacity: clamp(localTime / 1.5, 0, 1),
      }}/>

      <div style={{ position: 'absolute', right: 80, top: 116, opacity: clamp(localTime * 2, 0, 1) }}>
        <VillageMark color={PAL.ink}/>
      </div>

      <Sprite start={0.3} end={13}>
        <TextSprite text="A REMINDER" x={540} y={620} size={20} weight={600}
          color={PAL.terracottaDeep} font={BODY} align="center" letterSpacing="0.4em"/>
      </Sprite>

      <Sprite start={0.6} end={13}>
        <TextSprite text="You are not" x={540} y={820} size={104} weight={400}
          color={PAL.ink} font={BODY} align="center" letterSpacing="-0.01em" entryDur={0.6}/>
      </Sprite>
      <Sprite start={1.4} end={13}>
        <TextSprite text="broken." x={540} y={970} size={140} weight={400}
          color={PAL.terracottaDeep} font={"italic " + HEAD} align="center"
          letterSpacing="-0.03em" entryDur={0.6}/>
      </Sprite>

      <Sprite start={2.6} end={13}>
        <TextSprite text="You are" x={540} y={1180} size={84} weight={400}
          color={PAL.inkSoft} font={BODY} align="center" entryDur={0.5}/>
      </Sprite>
      <Sprite start={3.3} end={13}>
        <TextSprite text="recalibrating." x={540} y={1310} size={108} weight={400}
          color={PAL.terracottaDeep} font={"italic " + HEAD} align="center"
          letterSpacing="-0.025em" entryDur={0.6}/>
      </Sprite>

      <Sprite start={5.0} end={13}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: '50%', top: 1500,
            width: clamp((lt - 5.0) * 200, 0, 200), height: 1,
            marginLeft: -clamp((lt - 5.0) * 100, 0, 100),
            background: PAL.terracottaDeep, opacity: 0.45,
          }}/>
        )}
      </Sprite>

      <Sprite start={5.4} end={13}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1550,
            textAlign: 'center', fontFamily: BODY, fontSize: 22, fontWeight: 400,
            color: PAL.walnut, lineHeight: 1.5,
            opacity: clamp((lt - 5.4) * 2, 0, 1),
          }}>
            Up next<br/>
            <span style={{ color: PAL.terracottaDeep, fontStyle: 'italic', fontFamily: HEAD, fontSize: 32 }}>Night Sweats &amp; Body Fluids</span>
          </div>
        )}
      </Sprite>

      <Sprite start={6.5} end={13}>
        {({ localTime: lt }) => {
          const op = clamp((lt - 6.5) * 2, 0, 1);
          const ty = (1 - op) * 16;
          return (
            <div style={{
              position: 'absolute', left: 0, right: 0, top: 1740,
              display: 'flex', justifyContent: 'center',
              opacity: op, transform: `translateY(${ty}px)`,
            }}>
              <div style={{
                padding: '22px 44px', background: PAL.terracottaDeep,
                color: PAL.warm, fontFamily: BODY, fontSize: 22, fontWeight: 600,
                borderRadius: 4, letterSpacing: '0.01em',
                boxShadow: '0 12px 32px rgba(226,114,75,0.4)',
              }}>Open the village  →</div>
            </div>
          );
        }}
      </Sprite>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
function Video() {
  return (
    <div data-video-root data-screen-label="t=0.0s">
      <ScreenLabel/>
      <Sprite start={0}  end={4} ><LocalTimeline duration={4} ><Scene_Hook/></LocalTimeline></Sprite>
      <Sprite start={4}  end={10}><LocalTimeline duration={6} ><Scene_Problem/></LocalTimeline></Sprite>
      <Sprite start={10} end={22}><LocalTimeline duration={12}><Scene_Cliff/></LocalTimeline></Sprite>
      <Sprite start={22} end={34}><LocalTimeline duration={12}><Scene_BabyBlues/></LocalTimeline></Sprite>
      <Sprite start={34} end={48}><LocalTimeline duration={14}><Scene_PPD/></LocalTimeline></Sprite>
      <Sprite start={48} end={62}><LocalTimeline duration={14}><Scene_Tools/></LocalTimeline></Sprite>
      <Sprite start={62} end={75}><LocalTimeline duration={13}><Scene_Closing/></LocalTimeline></Sprite>
    </div>
  );
}

window.Video = Video;
