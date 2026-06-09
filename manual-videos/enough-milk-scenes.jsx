// Episode 04 — Is my baby getting enough milk?
// 75s, 9:16 (1080×1920), brand: the village
// Layout system mirrors prior episodes:
//   Chrome y=120 · Header y=380—720 · Body y=800—1700 · Footer y=1750—1840

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
  green:           '#6B8E5A',
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

// ─────────────────────────────────────────────── chrome (matches prior eps)

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

function SceneChrome({ chapter, label }) {
  const { localTime } = useSprite();
  const op = clamp(localTime * 3, 0, 1);
  return (
    <>
      <div style={{
        position: 'absolute', left: 80, top: 120,
        display: 'flex', alignItems: 'center', gap: 18, opacity: op,
      }}>
        <div style={{ fontFamily: BODY, fontSize: 14, fontWeight: 600, color: PAL.walnut, letterSpacing: '0.25em' }}>{chapter}</div>
        <div style={{ width: 50, height: 1, background: PAL.walnut, opacity: 0.4 }}/>
        <div style={{ fontFamily: BODY, fontSize: 14, fontWeight: 600, color: PAL.walnut, letterSpacing: '0.25em', textTransform: 'uppercase' }}>{label}</div>
      </div>
      <div style={{ position: 'absolute', right: 80, top: 116, opacity: op }}>
        <VillageMark color={PAL.ink}/>
      </div>
    </>
  );
}

function Header({ eyebrow, headline, headlineAccent,
                  eyebrowColor = PAL.terracottaDeep,
                  accentColor = PAL.terracottaDeep,
                  align = 'left', startTime = 0.1 }) {
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
            color={PAL.ink} font={HEAD} align={align} letterSpacing="-0.025em"/>
        </Sprite>
      )}
      {headlineAccent && (
        <Sprite start={startTime + 0.4} end={20}>
          <TextSprite text={headlineAccent} x={x} y={580} size={104} weight={400}
            color={accentColor} font={"italic " + HEAD} align={align} letterSpacing="-0.025em"/>
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

// ───────────────────────────────────────────── SCENE 1 · HOOK (0—4s)
function Scene_Hook() {
  return (
    <div style={{ position: 'absolute', inset: 0,
      background: `radial-gradient(circle at 50% 55%, ${PAL.blush} 0%, ${PAL.cream} 70%)` }}>
      <SceneChrome chapter="A FIELD GUIDE" label="ENOUGH MILK"/>

      <Sprite start={0.2} end={4}>
        {({ localTime: lt }) => {
          const op = clamp(lt * 2, 0, 1);
          return (
            <div style={{
              position: 'absolute', left: '50%', top: 580,
              transform: `translate(-50%, 0)`, opacity: op,
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

      <Sprite start={0.5} end={4}>
        <TextSprite text="A FIELD GUIDE TO POSTPARTUM" x={540} y={740} size={24} weight={600}
          color={PAL.walnut} font={BODY} align="center" letterSpacing="0.4em"/>
      </Sprite>

      <Sprite start={0.9} end={4}>
        <TextSprite text="Enough" x={540} y={820} size={148} weight={700}
          color={PAL.ink} font={HEAD} align="center" letterSpacing="-0.035em" entryDur={0.6}/>
      </Sprite>
      <Sprite start={1.2} end={4}>
        <TextSprite text="milk?" x={540} y={970} size={148} weight={400}
          color={PAL.terracottaDeep} font={"italic " + HEAD} align="center"
          letterSpacing="-0.035em" entryDur={0.6}/>
      </Sprite>

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

      <Sprite start={2.0} end={4}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1240,
            textAlign: 'center', fontFamily: HEAD, fontSize: 40, fontWeight: 400, fontStyle: 'italic',
            color: PAL.inkSoft, lineHeight: 1.35, letterSpacing: '-0.01em',
            opacity: clamp((lt - 2.0) * 2, 0, 1),
          }}>How to know — without<br/>weighing every feed.</div>
        )}
      </Sprite>

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

// ───────────────────────────────────────────── SCENE 2 · THE FEAR (4—10s)
function Scene_Fear() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: PAL.cream }}>
      <SceneChrome chapter="01 / 05" label="THE QUESTION"/>

      <Header
        eyebrow="THE 3 A.M. THOUGHT"
        headline="What if it's"
        headlineAccent="not enough?"
        startTime={0.1}
      />

      <div style={{ position: 'absolute', left: 80, right: 80, top: 820 }}>
        <Sprite start={1.0} end={6}>
          {({ localTime: lt }) => (
            <div style={{
              padding: '20px 24px', marginBottom: 14,
              background: PAL.warm, borderRadius: 4,
              opacity: clamp((lt - 1.0) * 3, 0, 1),
              transform: `translateX(${(1 - clamp((lt - 1.0) * 3, 0, 1)) * 12}px)`,
              borderLeft: `3px solid ${PAL.blush}`,
            }}>
              <div style={{ fontFamily: BODY, fontSize: 14, fontWeight: 600, color: PAL.walnut, letterSpacing: '0.25em', marginBottom: 6 }}>YOU CAN'T SEE</div>
              <div style={{ fontFamily: HEAD, fontSize: 48, fontWeight: 700, color: PAL.ink, lineHeight: 1.05, letterSpacing: '-0.02em' }}>The ounces.</div>
            </div>
          )}
        </Sprite>
        <Sprite start={1.6} end={6}>
          {({ localTime: lt }) => (
            <div style={{
              padding: '20px 24px', marginBottom: 14,
              background: PAL.warm, borderRadius: 4,
              opacity: clamp((lt - 1.6) * 3, 0, 1),
              transform: `translateX(${(1 - clamp((lt - 1.6) * 3, 0, 1)) * 12}px)`,
              borderLeft: `3px solid ${PAL.blush}`,
            }}>
              <div style={{ fontFamily: BODY, fontSize: 14, fontWeight: 600, color: PAL.walnut, letterSpacing: '0.25em', marginBottom: 6 }}>YOU CAN'T HEAR</div>
              <div style={{ fontFamily: HEAD, fontSize: 48, fontWeight: 700, color: PAL.ink, lineHeight: 1.05, letterSpacing: '-0.02em' }}>The intake.</div>
            </div>
          )}
        </Sprite>
        <Sprite start={2.4} end={6}>
          {({ localTime: lt }) => (
            <div style={{
              padding: '24px 28px', marginTop: 20,
              background: PAL.terracottaDeep, borderRadius: 4,
              opacity: clamp((lt - 2.4) * 3, 0, 1),
              transform: `translateX(${(1 - clamp((lt - 2.4) * 3, 0, 1)) * 12}px)`,
            }}>
              <div style={{ fontFamily: BODY, fontSize: 14, fontWeight: 600, color: PAL.warm, opacity: 0.8, letterSpacing: '0.25em', marginBottom: 6 }}>BUT THE BABY</div>
              <div style={{ fontFamily: HEAD, fontSize: 72, fontWeight: 400, fontStyle: 'italic', color: PAL.warm, lineHeight: 1, letterSpacing: '-0.02em' }}>tells you.</div>
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
          }}>You can read four signals from the outside.</div>
        )}
      </Sprite>
    </div>
  );
}

// ───────────────────────────────────────────── SCENE 3 · THE DIAPER MATH (10—24s)
// Wet & dirty diaper count by day — a wet/dirty diary grid that fills in.
function Scene_Diapers() {
  const { localTime } = useSprite();
  // Day-by-day expected wet/dirty counts (typical newborn benchmarks)
  const days = [
    { d: 1, wet: 1, dirty: 1, label: 'DAY 1' },
    { d: 2, wet: 2, dirty: 2, label: 'DAY 2' },
    { d: 3, wet: 3, dirty: 3, label: 'DAY 3' },
    { d: 4, wet: 4, dirty: 3, label: 'DAY 4' },
    { d: 5, wet: 6, dirty: 3, label: 'DAY 5' },
    { d: 6, wet: 6, dirty: 4, label: 'DAY 6+' },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, background: PAL.cream }}>
      <SceneChrome chapter="02 / 05" label="SIGNAL ONE · DIAPERS"/>

      <Header
        eyebrow="WHAT GOES IN"
        headline="comes"
        headlineAccent="back out."
        startTime={0.1}
      />

      <div style={{
        position: 'absolute', left: 80, right: 80, top: 820,
        padding: '22px 24px 26px', background: PAL.warm,
        border: `1px solid ${PAL.blush}`, borderRadius: 8,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
          <div style={{ fontFamily: BODY, fontSize: 13, fontWeight: 600, color: PAL.walnut, letterSpacing: '0.25em' }}>EXPECTED COUNT</div>
          <div style={{ fontFamily: BODY, fontSize: 13, fontWeight: 500, color: PAL.walnut, letterSpacing: '0.15em' }}>FIRST WEEK</div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 18, height: 18, borderRadius: 3, background: PAL.terracottaDeep, opacity: 0.85 }}/>
            <div style={{ fontFamily: BODY, fontSize: 13, fontWeight: 500, color: PAL.ink, letterSpacing: '0.05em' }}>WET</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 18, height: 18, borderRadius: 3, background: PAL.walnut }}/>
            <div style={{ fontFamily: BODY, fontSize: 13, fontWeight: 500, color: PAL.ink, letterSpacing: '0.05em' }}>DIRTY</div>
          </div>
        </div>

        {days.map((row, i) => {
          const rowStart = 0.4 + i * 0.5;
          return (
            <Sprite key={row.d} start={rowStart} end={14}>
              {({ localTime: lt }) => {
                const op = clamp((lt - rowStart) * 3, 0, 1);
                const fill = clamp((lt - rowStart) / 0.6, 0, 1);
                const wetN = Math.floor(row.wet * fill);
                const dirtyN = Math.floor(row.dirty * fill);
                return (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '10px 0',
                    borderBottom: i < days.length - 1 ? `1px solid ${PAL.blush}` : 'none',
                    opacity: op,
                  }}>
                    <div style={{
                      fontFamily: BODY, fontSize: 12, fontWeight: 700,
                      color: PAL.walnut, letterSpacing: '0.2em', minWidth: 70,
                    }}>{row.label}</div>
                    <div style={{ display: 'flex', gap: 6, minWidth: 240 }}>
                      {Array.from({ length: 6 }, (_, j) => (
                        <div key={j} style={{
                          width: 30, height: 30, borderRadius: 4,
                          background: j < wetN ? PAL.terracottaDeep : 'transparent',
                          border: `1.5px solid ${j < row.wet ? PAL.terracottaDeep : PAL.blush}`,
                          opacity: j < row.wet ? 1 : 0.5,
                        }}/>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {Array.from({ length: 4 }, (_, j) => (
                        <div key={j} style={{
                          width: 30, height: 30, borderRadius: 4,
                          background: j < dirtyN ? PAL.walnut : 'transparent',
                          border: `1.5px solid ${j < row.dirty ? PAL.walnut : PAL.blush}`,
                          opacity: j < row.dirty ? 1 : 0.5,
                        }}/>
                      ))}
                    </div>
                  </div>
                );
              }}
            </Sprite>
          );
        })}
      </div>

      <Sprite start={5.5} end={14}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1500,
            textAlign: 'center', fontFamily: HEAD, fontSize: 32, fontWeight: 400, fontStyle: 'italic',
            color: PAL.inkSoft, lineHeight: 1.4,
            opacity: clamp((lt - 5.5) * 1.4, 0, 1),
          }}>By day 6, expect 6 wet &amp; 3–4 dirty<br/>diapers a day.</div>
        )}
      </Sprite>

      <Sprite start={8.5} end={14}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1700,
            textAlign: 'center', fontFamily: HEAD, fontSize: 38, fontWeight: 700, fontStyle: 'italic',
            color: PAL.terracottaDeep, lineHeight: 1.2, letterSpacing: '-0.01em',
            opacity: clamp((lt - 8.5) * 1.5, 0, 1),
          }}>What goes in is coming out.</div>
        )}
      </Sprite>
    </div>
  );
}

// ───────────────────────────────────────────── SCENE 4 · WEIGHT CURVE (24—38s)
// The "5–7% loss is normal, regain by 2 weeks" curve.
function Scene_Weight() {
  const { localTime } = useSprite();
  const T = clamp(localTime / 7, 0, 1);

  const W = 920, H = 380, padX = 60, padY = 40;
  const px = (x) => padX + x * (W - padX * 2);
  const py = (y) => padY + (1 - y) * (H - padY * 2);

  // x = 0..1 maps to 0..14 days
  // y = weight as % of birth weight (0.92 = -8% loss)
  // Drop until day 4 to ~ -7%, slow rise, regain by day 14.
  const curve = (t) => {
    const d = t * 14;
    if (d <= 4) return lerp(1.0, 0.93, Easing.easeOutQuad(d / 4));
    return lerp(0.93, 1.005, Easing.easeInOutCubic((d - 4) / 10));
  };

  const points = Array.from({ length: 100 }, (_, i) => {
    const t = i / 99;
    return { t, y: curve(t) };
  });
  const drawn = Math.min(points.length - 1, Math.floor(points.length * T));
  const path = points.slice(0, drawn + 1).map((p, i) =>
    `${i === 0 ? 'M' : 'L'} ${px(p.t).toFixed(1)} ${py((p.y - 0.88) / 0.14).toFixed(1)}`).join(' ');

  return (
    <div style={{ position: 'absolute', inset: 0, background: PAL.cream }}>
      <SceneChrome chapter="03 / 05" label="SIGNAL TWO · WEIGHT"/>

      <Header
        eyebrow="A NORMAL DIP"
        headline="They lose first."
        headlineAccent="Then climb."
        startTime={0.1}
      />

      <div style={{
        position: 'absolute', left: 80, right: 80, top: 820,
        padding: '22px 24px 26px', background: PAL.warm,
        border: `1px solid ${PAL.blush}`, borderRadius: 8,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <div style={{ fontFamily: BODY, fontSize: 13, fontWeight: 600, color: PAL.walnut, letterSpacing: '0.25em' }}>WEIGHT vs BIRTH</div>
          <div style={{ fontFamily: BODY, fontSize: 13, fontWeight: 500, color: PAL.walnut, letterSpacing: '0.15em' }}>FIRST 14 DAYS</div>
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 380 }}>
          <defs>
            <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={PAL.terracottaDeep} stopOpacity="0.22"/>
              <stop offset="100%" stopColor={PAL.terracottaDeep} stopOpacity="0"/>
            </linearGradient>
          </defs>

          {/* Birth-weight reference line at y=1.0 (so (1-0.88)/0.14 = 0.857) */}
          <line x1={px(0)} y1={py((1.0 - 0.88) / 0.14)} x2={px(1)} y2={py((1.0 - 0.88) / 0.14)}
            stroke={PAL.walnut} strokeWidth="1.5" strokeDasharray="6 6" opacity="0.55"/>
          <text x={px(1) + 6} y={py((1.0 - 0.88) / 0.14) + 4} fontFamily={BODY} fontSize="11" fontWeight="600" fill={PAL.walnut} letterSpacing="2">BIRTH</text>

          {/* Safe band: 5–10% loss zone (between y=0.95 and y=0.90) */}
          <rect
            x={px(0)} y={py((0.95 - 0.88) / 0.14)}
            width={px(1) - px(0)}
            height={py((0.90 - 0.88) / 0.14) - py((0.95 - 0.88) / 0.14)}
            fill={PAL.green} opacity="0.10"/>
          <text x={px(0.05)} y={py((0.92 - 0.88) / 0.14) + 4} fontFamily={BODY} fontSize="11" fontWeight="600" fill={PAL.green} letterSpacing="2">NORMAL · 5–10% DIP</text>

          {/* X-axis ticks */}
          {[0, 4, 7, 14].map(d => (
            <g key={d}>
              <line x1={px(d / 14)} y1={py(0)} x2={px(d / 14)} y2={py(0) + 6} stroke={PAL.walnut} opacity="0.5"/>
              <text x={px(d / 14)} y={py(0) + 22} textAnchor="middle" fontFamily={BODY} fontSize="11" fontWeight="600" fill={PAL.walnut} letterSpacing="2">D{d}</text>
            </g>
          ))}

          {/* Curve */}
          {drawn > 1 && (
            <>
              <path d={`${path} L ${px(points[drawn].t)} ${py(0)} L ${px(0)} ${py(0)} Z`} fill="url(#wg)"/>
              <path d={path} stroke={PAL.terracottaDeep} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </>
          )}

          {/* Annotations: lowest point */}
          {T > 0.3 && (() => {
            const ix = points.findIndex(p => p.t >= 4 / 14);
            const p = points[ix];
            return (
              <g>
                <circle cx={px(p.t)} cy={py((p.y - 0.88) / 0.14)} r="6" fill={PAL.terracottaDeep}/>
                <text x={px(p.t) + 12} y={py((p.y - 0.88) / 0.14) + 4} fontFamily={BODY} fontSize="13" fontWeight="600" fill={PAL.ink}>−7%</text>
              </g>
            );
          })()}

          {T > 0.85 && (
            <g>
              <circle cx={px(1)} cy={py((1.005 - 0.88) / 0.14)} r="6" fill={PAL.green}/>
              <text x={px(1) - 80} y={py((1.005 - 0.88) / 0.14) - 12} fontFamily={BODY} fontSize="13" fontWeight="600" fill={PAL.green}>BACK TO BIRTH WT.</text>
            </g>
          )}
        </svg>
      </div>

      <Sprite start={6} end={14}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1480,
            textAlign: 'center', fontFamily: HEAD, fontSize: 32, fontWeight: 400, fontStyle: 'italic',
            color: PAL.inkSoft, lineHeight: 1.4,
            opacity: clamp((lt - 6) * 1.3, 0, 1),
          }}>5–10% loss in week one is normal.<br/>Birth weight by day 14.</div>
        )}
      </Sprite>

      <Sprite start={9} end={14}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1700,
            textAlign: 'center', fontFamily: HEAD, fontSize: 38, fontWeight: 700, fontStyle: 'italic',
            color: PAL.terracottaDeep, lineHeight: 1.2, letterSpacing: '-0.01em',
            opacity: clamp((lt - 9) * 1.5, 0, 1),
          }}>The pediatrician is watching the curve, not the day.</div>
        )}
      </Sprite>
    </div>
  );
}

// ───────────────────────────────────────────── SCENE 5 · THE OTHER SIGNALS (38—54s)
// Two more cues: feeding behavior & contentment.
function Scene_Cues() {
  const cues = [
    { t: 0.4, n: '03', word: "Swallows.",     line: "Open-pause-close. Listen for the small \"kah\" after each chin drop." },
    { t: 1.6, n: '04', word: "8–12 feeds",     line: "In 24 hours. Both sides offered. They lead — you follow." },
    { t: 2.8, n: '05', word: "Soft after.",    line: "A satisfied baby unclenches their fists, drifts off the breast." },
    { t: 4.0, n: '06', word: "Alert windows.", line: "Bright eyes, looking around, calm body — between feeds." },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, background: PAL.cream }}>
      <SceneChrome chapter="04 / 05" label="THE OTHER FOUR"/>

      <Header
        eyebrow="WHAT YOU'LL NOTICE"
        headline="At the breast"
        headlineAccent="& after."
        startTime={0.1}
      />

      <div style={{ position: 'absolute', left: 80, right: 80, top: 820, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {cues.map((s, i) => (
          <Sprite key={i} start={s.t} end={16}>
            {({ localTime: lt }) => {
              const op = clamp((lt - s.t) * 3, 0, 1);
              const tx = (1 - op) * 16;
              return (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 22,
                  padding: '22px 26px', background: PAL.warm,
                  borderLeft: `4px solid ${PAL.terracottaDeep}`,
                  borderRadius: 4,
                  opacity: op, transform: `translateX(${tx}px)`,
                }}>
                  <div style={{
                    fontFamily: HEAD, fontSize: 56, fontWeight: 700, fontStyle: 'italic',
                    color: PAL.terracottaDeep, lineHeight: 1, letterSpacing: '-0.02em',
                    minWidth: 80,
                  }}>{s.n}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: HEAD, fontSize: 44, fontWeight: 700, color: PAL.ink, lineHeight: 1.05, letterSpacing: '-0.025em', marginBottom: 4 }}>{s.word}</div>
                    <div style={{ fontFamily: BODY, fontSize: 19, fontWeight: 400, color: PAL.inkSoft, lineHeight: 1.4 }}>{s.line}</div>
                  </div>
                </div>
              );
            }}
          </Sprite>
        ))}
      </div>

      <Sprite start={6.5} end={16}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1700,
            textAlign: 'center', fontFamily: HEAD, fontSize: 36, fontWeight: 400, fontStyle: 'italic',
            color: PAL.terracottaDeep, lineHeight: 1.3,
            opacity: clamp((lt - 6.5) * 1.5, 0, 1),
          }}>Six signals. One body, telling you the truth.</div>
        )}
      </Sprite>
    </div>
  );
}

// ───────────────────────────────────────────── SCENE 6 · WHEN TO CALL (54—66s)
function Scene_Call() {
  const flags = [
    { t: 0.6, label: "Fewer than 6 wet diapers/day after day 6" },
    { t: 1.0, label: "Dark orange, brick-red, or sparse urine" },
    { t: 1.4, label: "Still below birth weight at 2 weeks" },
    { t: 1.8, label: "Lethargic, hard to wake for feeds" },
    { t: 2.2, label: "No swallows you can hear or see" },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, background: PAL.cream }}>
      <SceneChrome chapter="05 / 05" label="WHEN TO CALL"/>

      <Header
        eyebrow="DON'T WONDER · ASK"
        headline="Call your"
        headlineAccent="IBCLC if —"
        accentColor={PAL.warning}
        eyebrowColor={PAL.warning}
        startTime={0.1}
      />

      <Sprite start={0.4} end={12}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 820,
            padding: '24px 28px',
            background: PAL.warning + '0c',
            border: `2px solid ${PAL.warning}`,
            borderRadius: 6,
            opacity: clamp((lt - 0.4) * 3, 0, 1),
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 16, background: PAL.warning,
                color: PAL.warm, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: BODY, fontWeight: 700, fontSize: 20,
              }}>!</div>
              <div style={{ fontFamily: BODY, fontSize: 12, fontWeight: 700, color: PAL.warning, letterSpacing: '0.3em' }}>RED-FLAG SIGNALS</div>
            </div>
            {flags.map((s, i) => (
              <Sprite key={i} start={s.t + 0.4} end={12}>
                {({ localTime: lt2 }) => (
                  <div style={{
                    display: 'flex', gap: 14, alignItems: 'flex-start',
                    padding: '12px 0',
                    borderBottom: i < flags.length - 1 ? `1px solid ${PAL.warning}33` : 'none',
                    opacity: clamp((lt2 - (s.t + 0.4)) * 3, 0, 1),
                  }}>
                    <div style={{ color: PAL.warning, fontFamily: BODY, fontWeight: 700, fontSize: 17, marginTop: 2, minWidth: 22, letterSpacing: '0.1em' }}>{(i + 1).toString().padStart(2, '0')}</div>
                    <div style={{ fontFamily: BODY, fontSize: 19, color: PAL.ink, lineHeight: 1.4, fontWeight: 500 }}>{s.label}</div>
                  </div>
                )}
              </Sprite>
            ))}
          </div>
        )}
      </Sprite>

      {/* Helpline / IBCLC card */}
      <Sprite start={5.5} end={12}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1620,
            padding: '18px 24px',
            background: PAL.warm,
            border: `1px solid ${PAL.blush}`,
            borderRadius: 6,
            opacity: clamp((lt - 5.5) * 2, 0, 1),
          }}>
            <div style={{ fontFamily: BODY, fontSize: 12, fontWeight: 700, color: PAL.terracottaDeep, letterSpacing: '0.3em', marginBottom: 6 }}>FREE · 24/7 · U.S.</div>
            <div style={{ fontFamily: HEAD, fontSize: 30, fontWeight: 700, color: PAL.ink, letterSpacing: '-0.01em', marginBottom: 4 }}>National Breastfeeding Helpline</div>
            <div style={{ fontFamily: HEAD, fontSize: 32, fontWeight: 400, fontStyle: 'italic', color: PAL.terracottaDeep }}>1-800-994-9662</div>
          </div>
        )}
      </Sprite>
    </div>
  );
}

// ───────────────────────────────────────────── SCENE 7 · CLOSING (66—75s)
function Scene_Closing() {
  const { localTime } = useSprite();
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #FBF6EE 0%, #F5E8D5 100%)' }}>
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

      <Sprite start={0.3} end={9}>
        <TextSprite text="A REMINDER" x={540} y={620} size={20} weight={600}
          color={PAL.terracottaDeep} font={BODY} align="center" letterSpacing="0.4em"/>
      </Sprite>

      <Sprite start={0.6} end={9}>
        <TextSprite text="Your body" x={540} y={820} size={104} weight={400}
          color={PAL.ink} font={BODY} align="center" letterSpacing="-0.01em" entryDur={0.6}/>
      </Sprite>
      <Sprite start={1.4} end={9}>
        <TextSprite text="knows the math." x={540} y={970} size={120} weight={400}
          color={PAL.terracottaDeep} font={"italic " + HEAD} align="center"
          letterSpacing="-0.03em" entryDur={0.6}/>
      </Sprite>

      <Sprite start={2.6} end={9}>
        <TextSprite text="Trust the" x={540} y={1180} size={84} weight={400}
          color={PAL.inkSoft} font={BODY} align="center" entryDur={0.5}/>
      </Sprite>
      <Sprite start={3.3} end={9}>
        <TextSprite text="diapers, the scale," x={540} y={1300} size={86} weight={400}
          color={PAL.terracottaDeep} font={"italic " + HEAD} align="center"
          letterSpacing="-0.025em" entryDur={0.6}/>
      </Sprite>
      <Sprite start={4.0} end={9}>
        <TextSprite text="& the swallows." x={540} y={1400} size={86} weight={400}
          color={PAL.terracottaDeep} font={"italic " + HEAD} align="center"
          letterSpacing="-0.025em" entryDur={0.6}/>
      </Sprite>

      <Sprite start={5.0} end={9}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: '50%', top: 1520,
            width: clamp((lt - 5.0) * 200, 0, 200), height: 1,
            marginLeft: -clamp((lt - 5.0) * 100, 0, 100),
            background: PAL.terracottaDeep, opacity: 0.45,
          }}/>
        )}
      </Sprite>

      <Sprite start={5.4} end={9}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1570,
            textAlign: 'center', fontFamily: BODY, fontSize: 22, fontWeight: 400,
            color: PAL.walnut, lineHeight: 1.5,
            opacity: clamp((lt - 5.4) * 2, 0, 1),
          }}>
            Up next<br/>
            <span style={{ color: PAL.terracottaDeep, fontStyle: 'italic', fontFamily: HEAD, fontSize: 32 }}>Cluster Feeding &amp; The Long Night</span>
          </div>
        )}
      </Sprite>

      <Sprite start={6.5} end={9}>
        {({ localTime: lt }) => {
          const op = clamp((lt - 6.5) * 2, 0, 1);
          const ty = (1 - op) * 16;
          return (
            <div style={{
              position: 'absolute', left: 0, right: 0, top: 1750,
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

// ─────────────────────────────────────────────
function Video() {
  return (
    <div data-video-root data-screen-label="t=0.0s">
      <ScreenLabel/>
      <Sprite start={0}  end={4} ><LocalTimeline duration={4} ><Scene_Hook/></LocalTimeline></Sprite>
      <Sprite start={4}  end={10}><LocalTimeline duration={6} ><Scene_Fear/></LocalTimeline></Sprite>
      <Sprite start={10} end={24}><LocalTimeline duration={14}><Scene_Diapers/></LocalTimeline></Sprite>
      <Sprite start={24} end={38}><LocalTimeline duration={14}><Scene_Weight/></LocalTimeline></Sprite>
      <Sprite start={38} end={54}><LocalTimeline duration={16}><Scene_Cues/></LocalTimeline></Sprite>
      <Sprite start={54} end={66}><LocalTimeline duration={12}><Scene_Call/></LocalTimeline></Sprite>
      <Sprite start={66} end={75}><LocalTimeline duration={9} ><Scene_Closing/></LocalTimeline></Sprite>
    </div>
  );
}

window.Video = Video;
