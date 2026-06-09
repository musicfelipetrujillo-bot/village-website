// Episode 03 — Why won't my baby sleep unless held?
// 75s, 9:16 (1080×1920), brand: the village
// Layout system mirrors Tears & Mood:
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
  midnightDeep:    '#13110D',
  warning:         '#B85234',
  // Sleep-episode accent — a deeper indigo-walnut for night feel
  night:           '#2E2A3A',
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
// SHARED CHROME (matches Tears & Mood)

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

function Header({ eyebrow, headline, headlineAccent, subhead,
                  eyebrowColor = PAL.terracottaDeep,
                  headlineColor = PAL.ink,
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
// SCENE 1 — HOOK / TITLE (0—4s)
function Scene_Hook() {
  return (
    <div style={{ position: 'absolute', inset: 0,
      background: `radial-gradient(circle at 50% 55%, ${PAL.blush} 0%, ${PAL.cream} 70%)` }}>
      <SceneChrome chapter="A FIELD GUIDE" label="THE CONTACT NAP"/>

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

      <Sprite start={0.5} end={4}>
        <TextSprite text="A FIELD GUIDE TO POSTPARTUM" x={540} y={740} size={24} weight={600}
          color={PAL.walnut} font={BODY} align="center" letterSpacing="0.4em"/>
      </Sprite>

      <Sprite start={0.9} end={4}>
        <TextSprite text="The Contact" x={540} y={820} size={130} weight={700}
          color={PAL.ink} font={HEAD} align="center"
          letterSpacing="-0.035em" entryDur={0.6}/>
      </Sprite>
      <Sprite start={1.2} end={4}>
        <TextSprite text="Nap." x={540} y={970} size={148} weight={400}
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
          }}>Why your baby won't sleep<br/>unless they're held.</div>
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

// ──────────────────────────────────────────────────────────────
// SCENE 2 — THE QUESTION (4—10s, 6s)
function Scene_Question() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: PAL.cream }}>
      <SceneChrome chapter="01 / 05" label="THE QUESTION"/>

      <Header
        eyebrow="THE QUIET FEAR"
        headline="Have I"
        headlineAccent="spoiled them?"
        startTime={0.1}
      />

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
              <div style={{ fontFamily: HEAD, fontSize: 52, fontWeight: 700, color: PAL.ink, lineHeight: 1.05, letterSpacing: '-0.02em' }}>A bad habit.</div>
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
              <div style={{ fontFamily: HEAD, fontSize: 52, fontWeight: 700, color: PAL.ink, lineHeight: 1.05, letterSpacing: '-0.02em' }}>Spoiled.</div>
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
              <div style={{ fontFamily: HEAD, fontSize: 72, fontWeight: 400, fontStyle: 'italic', color: PAL.warm, lineHeight: 1, letterSpacing: '-0.02em' }}>biology.</div>
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
          }}>Newborns don't yet know they exist apart from you.</div>
        )}
      </Sprite>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// SCENE 3 — THE FOURTH TRIMESTER (10—22s, 12s)
// A diagram of in-utero vs out-of-utero conditions, with the gap
// (the "fourth trimester") between them.
function Scene_FourthTrimester() {
  const { localTime } = useSprite();

  const inwomb = [
    { label: "Constant motion",  hot: false },
    { label: "Snug, contained",  hot: false },
    { label: "Muffled heartbeat",hot: false },
    { label: "Warm, dim",        hot: false },
    { label: "Fed continuously", hot: false },
  ];
  const outwomb = [
    { label: "Stillness",   hot: true },
    { label: "Open space",  hot: true },
    { label: "Loud silence",hot: true },
    { label: "Cold, bright",hot: true },
    { label: "Hungry — wait",hot: true },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, background: PAL.cream }}>
      <SceneChrome chapter="02 / 05" label="THE FOURTH TRIMESTER"/>

      <Header
        eyebrow="0–12 WEEKS"
        headline="Born"
        headlineAccent="three months early."
        startTime={0.1}
      />

      {/* Two-column world comparison — y=820 */}
      <div style={{ position: 'absolute', left: 80, right: 80, top: 820, display: 'flex', gap: 16 }}>
        {/* IN WOMB — terracotta-warm card */}
        <Sprite start={0.4} end={12}>
          {({ localTime: lt }) => (
            <div style={{
              flex: 1, padding: '22px 22px',
              background: PAL.warm,
              border: `1px solid ${PAL.blush}`,
              borderRadius: 6, opacity: clamp((lt - 0.4) * 3, 0, 1),
              minHeight: 560,
            }}>
              <div style={{ fontFamily: BODY, fontSize: 12, fontWeight: 700, color: PAL.terracottaDeep, letterSpacing: '0.3em', marginBottom: 6 }}>40 WEEKS</div>
              <div style={{ fontFamily: HEAD, fontSize: 40, fontWeight: 400, fontStyle: 'italic', color: PAL.ink, marginBottom: 10, letterSpacing: '-0.01em', lineHeight: 1 }}>In the womb</div>

              {/* tiny illustration: round vessel */}
              <div style={{ height: 90, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 14 }}>
                <svg viewBox="0 0 200 90" width="100%" height="90">
                  <ellipse cx="100" cy="50" rx="64" ry="34" fill={PAL.terracotta} opacity="0.45"/>
                  <ellipse cx="100" cy="50" rx="64" ry="34" fill="none" stroke={PAL.terracottaDeep} strokeWidth="1.5"/>
                  <circle cx="100" cy="50" r="14" fill={PAL.terracottaDeep}/>
                  <path d="M 92 50 Q 100 38 108 50 Q 100 62 92 50 Z" fill={PAL.warm} opacity="0.9"/>
                </svg>
              </div>

              {inwomb.map((s, i) => (
                <Sprite key={i} start={0.8 + i * 0.18} end={12}>
                  {({ localTime: lt2 }) => (
                    <div style={{
                      display: 'flex', gap: 10, alignItems: 'flex-start',
                      marginBottom: 10, opacity: clamp((lt2 - (0.8 + i * 0.18)) * 3, 0, 1),
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

        {/* OUT — colder card */}
        <Sprite start={3.0} end={12}>
          {({ localTime: lt }) => (
            <div style={{
              flex: 1, padding: '22px 22px',
              background: PAL.cream,
              border: `1px solid ${PAL.walnut}33`,
              borderRadius: 6, opacity: clamp((lt - 3.0) * 3, 0, 1),
              minHeight: 560,
            }}>
              <div style={{ fontFamily: BODY, fontSize: 12, fontWeight: 700, color: PAL.walnut, letterSpacing: '0.3em', marginBottom: 6 }}>DAY 1</div>
              <div style={{ fontFamily: HEAD, fontSize: 40, fontWeight: 400, fontStyle: 'italic', color: PAL.ink, marginBottom: 10, letterSpacing: '-0.01em', lineHeight: 1 }}>The world</div>

              <div style={{ height: 90, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 14 }}>
                <svg viewBox="0 0 200 90" width="100%" height="90">
                  <rect x="20" y="22" width="160" height="56" fill="none" stroke={PAL.walnut} strokeWidth="1.5" strokeDasharray="6 4"/>
                  <circle cx="100" cy="50" r="10" fill={PAL.walnut}/>
                </svg>
              </div>

              {outwomb.map((s, i) => (
                <Sprite key={i} start={3.4 + i * 0.18} end={12}>
                  {({ localTime: lt2 }) => (
                    <div style={{
                      display: 'flex', gap: 10, alignItems: 'flex-start',
                      marginBottom: 10, opacity: clamp((lt2 - (3.4 + i * 0.18)) * 3, 0, 1),
                    }}>
                      <div style={{ color: PAL.walnut, fontFamily: BODY, fontWeight: 700, fontSize: 18, marginTop: 2 }}>—</div>
                      <div style={{ fontFamily: BODY, fontSize: 17, color: PAL.ink, lineHeight: 1.35, fontWeight: 500 }}>{s.label}</div>
                    </div>
                  )}
                </Sprite>
              ))}
            </div>
          )}
        </Sprite>
      </div>

      {/* Caption */}
      <Sprite start={6.2} end={12}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1480,
            textAlign: 'center', fontFamily: HEAD, fontSize: 32, fontWeight: 400, fontStyle: 'italic',
            color: PAL.inkSoft, lineHeight: 1.4,
            opacity: clamp((lt - 6.2) * 1.4, 0, 1),
          }}>
            Their nervous system expects<br/>to still be inside you.
          </div>
        )}
      </Sprite>

      <Sprite start={8.2} end={12}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1700,
            textAlign: 'center', fontFamily: HEAD, fontSize: 38, fontWeight: 700, fontStyle: 'italic',
            color: PAL.terracottaDeep, lineHeight: 1.2, letterSpacing: '-0.01em',
            opacity: clamp((lt - 8.2) * 1.5, 0, 1),
          }}>You <span style={{textDecoration: 'underline', textDecorationColor: PAL.terracotta, textUnderlineOffset: 8}}>are</span> the bed.</div>
        )}
      </Sprite>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// SCENE 4 — THE SLEEP CYCLE GAP (22—36s, 14s)
// Two stacked sleep-cycle bars: adult vs newborn. Adult cycles ~90 min;
// newborn ~45 min and starts in light "active" sleep — the crash window.
function Scene_Cycles() {
  const { localTime } = useSprite();
  const T = clamp(localTime / 6, 0, 1);

  const W = 920, H = 320, padX = 60, padY = 20;
  const px = (x) => padX + x * (W - padX * 2);

  // Adult: 90-min cycle, deep early, REM late.
  // We'll show 2 cycles across width.
  const adult = (t) => {
    // 0..1 across two cycles. Within each cycle: starts deep (low), moves through stages, brief REM near top.
    const c = (t * 2) % 1;
    // shape: drop fast to deep at 0.2, hold deep till 0.5, rise to REM peak around 0.85, fall.
    if (c < 0.2) return lerp(0.5, 0.95, c / 0.2);            // rises into REM-ish? no, simulate light->deep
    if (c < 0.5) return lerp(0.95, 0.1, (c - 0.2) / 0.3);     // descend to deep
    if (c < 0.8) return lerp(0.1, 0.55, (c - 0.5) / 0.3);     // rise back
    return lerp(0.55, 0.92, (c - 0.8) / 0.2);                 // REM peak
  };

  // Newborn: ~45-min cycle, STARTS in active(light) sleep at top,
  // deep sleep brief in middle, ends with another light/active phase.
  const newborn = (t) => {
    const c = (t * 4) % 1;
    if (c < 0.2) return lerp(0.85, 0.92, c / 0.2);
    if (c < 0.45) return lerp(0.92, 0.2, (c - 0.2) / 0.25);   // dive to deep
    if (c < 0.6) return lerp(0.2, 0.2, 0);                    // brief deep hold
    return lerp(0.2, 0.95, (c - 0.6) / 0.4);                  // back to active
  };

  const sample = (fn, n = 120) => Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    return { t, y: fn(t) };
  });

  const A = sample(adult), N = sample(newborn);
  const drawnA = Math.min(A.length - 1, Math.floor(A.length * T));
  const drawnN = Math.min(N.length - 1, Math.floor(N.length * Math.max(0, (T * 1.5 - 0.5))));

  const yLine = (yTop, h, yVal) => yTop + (1 - yVal) * h;

  const pathFor = (arr, drawn, yTop, h) =>
    arr.slice(0, drawn + 1).map((p, i) =>
      `${i === 0 ? 'M' : 'L'} ${px(p.t).toFixed(1)} ${yLine(yTop, h, p.y).toFixed(1)}`).join(' ');

  // dropped highlight markers — newborn light-sleep traps where they wake when set down
  const trapPoints = [0.05, 0.30, 0.55, 0.80, 0.95];

  return (
    <div style={{ position: 'absolute', inset: 0, background: PAL.cream }}>
      <SceneChrome chapter="03 / 05" label="THE SLEEP CYCLE GAP"/>

      <Header
        eyebrow="THE 20-MINUTE TRAP"
        headline="They sleep"
        headlineAccent="lighter than you."
        startTime={0.1}
      />

      {/* Chart card — y=820 */}
      <div style={{
        position: 'absolute', left: 80, top: 820, right: 80,
        padding: '22px 24px 26px', background: PAL.warm,
        border: `1px solid ${PAL.blush}`, borderRadius: 8,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <div style={{ fontFamily: BODY, fontSize: 13, fontWeight: 600, color: PAL.walnut, letterSpacing: '0.25em' }}>SLEEP DEPTH</div>
          <div style={{ fontFamily: BODY, fontSize: 13, fontWeight: 500, color: PAL.walnut, letterSpacing: '0.15em' }}>OVER 90 MIN</div>
        </div>
        <svg viewBox={`0 0 ${W} ${H + 100}`} style={{ width: '100%', height: 410 }}>
          <defs>
            <linearGradient id="adultg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={PAL.walnut} stopOpacity="0.20"/>
              <stop offset="100%" stopColor={PAL.walnut} stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="newg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={PAL.terracottaDeep} stopOpacity="0.30"/>
              <stop offset="100%" stopColor={PAL.terracottaDeep} stopOpacity="0"/>
            </linearGradient>
          </defs>

          {/* Adult row */}
          <text x={padX} y={20} fontFamily={BODY} fontSize="13" fontWeight="600" fill={PAL.walnut} letterSpacing="3">YOU</text>
          <text x={padX} y={36} fontFamily={BODY} fontSize="11" fill={PAL.walnut} opacity="0.8" letterSpacing="2">90-MIN CYCLE · DEEP FIRST</text>
          <line x1={padX} y1={padY + 130} x2={W - padX} y2={padY + 130} stroke={PAL.walnut} strokeWidth="1" opacity="0.3"/>
          {drawnA > 0 && (
            <>
              <path d={`${pathFor(A, drawnA, padY + 50, 80)} L ${px(A[drawnA].t)} ${padY + 130} L ${px(0)} ${padY + 130} Z`}
                fill="url(#adultg)"/>
              <path d={pathFor(A, drawnA, padY + 50, 80)} stroke={PAL.walnut} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </>
          )}

          {/* Divider */}
          <line x1={padX} y1={padY + 160} x2={W - padX} y2={padY + 160} stroke={PAL.blush} strokeWidth="1.5"/>

          {/* Newborn row */}
          <text x={padX} y={padY + 190} fontFamily={BODY} fontSize="13" fontWeight="600" fill={PAL.terracottaDeep} letterSpacing="3">NEWBORN</text>
          <text x={padX} y={padY + 206} fontFamily={BODY} fontSize="11" fill={PAL.terracottaDeep} opacity="0.85" letterSpacing="2">45-MIN CYCLE · LIGHT FIRST</text>
          <line x1={padX} y1={padY + 290} x2={W - padX} y2={padY + 290} stroke={PAL.walnut} strokeWidth="1" opacity="0.3"/>
          {drawnN > 0 && (
            <>
              <path d={`${pathFor(N, drawnN, padY + 220, 70)} L ${px(N[drawnN].t)} ${padY + 290} L ${px(0)} ${padY + 290} Z`}
                fill="url(#newg)"/>
              <path d={pathFor(N, drawnN, padY + 220, 70)} stroke={PAL.terracottaDeep} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>

              {/* Wake-trap markers when curve sits HIGH (light sleep) */}
              {trapPoints.map((tt, i) => {
                if (T < tt + 0.05) return null;
                const y = yLine(padY + 220, 70, newborn(tt));
                return (
                  <g key={i}>
                    <circle cx={px(tt)} cy={y} r="6" fill={PAL.warning}/>
                    <circle cx={px(tt)} cy={y} r="11" fill="none" stroke={PAL.warning} strokeWidth="1.5" opacity="0.45"/>
                  </g>
                );
              })}
            </>
          )}

          {/* Y-axis labels for newborn band */}
          <text x={W - padX + 6} y={padY + 226} fontFamily={BODY} fontSize="10" fill={PAL.walnut} letterSpacing="1">LIGHT</text>
          <text x={W - padX + 6} y={padY + 290} fontFamily={BODY} fontSize="10" fill={PAL.walnut} letterSpacing="1">DEEP</text>
          <text x={W - padX + 6} y={padY + 56} fontFamily={BODY} fontSize="10" fill={PAL.walnut} letterSpacing="1">REM</text>
          <text x={W - padX + 6} y={padY + 130} fontFamily={BODY} fontSize="10" fill={PAL.walnut} letterSpacing="1">DEEP</text>

          {/* Trap legend */}
          <g transform={`translate(${padX}, ${padY + 320})`}>
            <circle cx="6" cy="6" r="5" fill={PAL.warning}/>
            <text x="20" y="10" fontFamily={BODY} fontSize="13" fontWeight="500" fill={PAL.ink}>= a moment they'd wake if you set them down</text>
          </g>
        </svg>
      </div>

      <Sprite start={7} end={14}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1500,
            textAlign: 'center', fontFamily: HEAD, fontSize: 32, fontWeight: 400, fontStyle: 'italic',
            color: PAL.inkSoft, lineHeight: 1.4,
            opacity: clamp((lt - 7) * 1.2, 0, 1),
          }}>
            They take ~20 minutes<br/>to reach deep sleep.
          </div>
        )}
      </Sprite>

      <Sprite start={9} end={14}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1700,
            textAlign: 'center', fontFamily: HEAD, fontSize: 38, fontWeight: 700, fontStyle: 'italic',
            color: PAL.terracottaDeep, lineHeight: 1.2, letterSpacing: '-0.01em',
            opacity: clamp((lt - 9) * 1.5, 0, 1),
          }}>Set them down too soon — they pop back up.</div>
        )}
      </Sprite>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// SCENE 5 — THE TRANSFER (36—50s, 14s)
// A four-step, illustrated "how to put them down" sequence.
function Scene_Transfer() {
  const steps = [
    { t: 0.4, n: '01', mins: 'WAIT',     word: "Floppy arm test.",   line: "Lift their arm an inch. If it flops, they're deep enough." },
    { t: 1.6, n: '02', mins: '+10 SEC',  word: "Lower slowly.",      line: "Bottom first, then back. Keep your hands on them." },
    { t: 2.8, n: '03', mins: '+30 SEC',  word: "Stay put.",          line: "Don't pull your hands away. Wait through any stir." },
    { t: 4.0, n: '04', mins: 'STEP BACK',word: "Now you can leave.", line: "If they wake — start over. It is not a failure." },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, background: PAL.cream }}>
      <SceneChrome chapter="04 / 05" label="THE TRANSFER"/>

      <Header
        eyebrow="HOW TO PUT THEM DOWN"
        headline="The"
        headlineAccent="floppy-arm test."
        startTime={0.1}
      />

      <div style={{ position: 'absolute', left: 80, right: 80, top: 820, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {steps.map((s, i) => (
          <Sprite key={i} start={s.t} end={14}>
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
                    minWidth: 76,
                  }}>{s.n}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: BODY, fontSize: 11, fontWeight: 700, color: PAL.walnut, letterSpacing: '0.3em', marginBottom: 4 }}>{s.mins}</div>
                    <div style={{ fontFamily: HEAD, fontSize: 44, fontWeight: 700, color: PAL.ink, lineHeight: 1.05, letterSpacing: '-0.025em', marginBottom: 4 }}>{s.word}</div>
                    <div style={{ fontFamily: BODY, fontSize: 18, fontWeight: 400, color: PAL.inkSoft, lineHeight: 1.4 }}>{s.line}</div>
                  </div>
                </div>
              );
            }}
          </Sprite>
        ))}
      </div>

      <Sprite start={6.5} end={14}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1700,
            textAlign: 'center', fontFamily: HEAD, fontSize: 36, fontWeight: 400, fontStyle: 'italic',
            color: PAL.terracottaDeep, lineHeight: 1.3,
            opacity: clamp((lt - 6.5) * 1.5, 0, 1),
          }}>Slow is fast.</div>
        )}
      </Sprite>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// SCENE 6 — IF YOU CAN'T (50—64s, 14s)
// Permission slip + safety lines for contact napping.
function Scene_Permission() {
  const safe = [
    { t: 0.6, label: "Awake & alert. No couch, no recliner." },
    { t: 1.0, label: "Baby on your chest, face turned to the side." },
    { t: 1.4, label: "Nothing covering their face." },
    { t: 1.8, label: "If you might doze — move to the floor." },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, background: PAL.cream }}>
      <SceneChrome chapter="05 / 05" label="A PERMISSION SLIP"/>

      <Header
        eyebrow="IF YOU CAN'T PUT THEM DOWN"
        headline="Hold them."
        headlineAccent="It's allowed."
        startTime={0.1}
      />

      {/* Permission card — y=820 */}
      <Sprite start={0.4} end={14}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 820,
            padding: '26px 28px',
            background: PAL.terracottaDeep,
            borderRadius: 6,
            opacity: clamp((lt - 0.4) * 3, 0, 1),
          }}>
            <div style={{ fontFamily: BODY, fontSize: 12, fontWeight: 700, color: PAL.warm, opacity: 0.85, letterSpacing: '0.3em', marginBottom: 8 }}>OFFICIAL PERMISSION SLIP</div>
            <div style={{ fontFamily: HEAD, fontSize: 52, fontWeight: 400, fontStyle: 'italic', color: PAL.warm, lineHeight: 1.1, letterSpacing: '-0.015em' }}>
              The bed can wait.<br/>
              Your back can heal.<br/>
              The dishes can sit.
            </div>
            <div style={{ fontFamily: BODY, fontSize: 18, fontWeight: 500, color: PAL.warm, opacity: 0.92, marginTop: 18, lineHeight: 1.45 }}>
              Holding a sleeping newborn isn't a habit you'll have to break. They will outgrow it. They always do.
            </div>
          </div>
        )}
      </Sprite>

      {/* Safety rules card — y=1240 */}
      <Sprite start={2.6} end={14}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1240,
            padding: '22px 24px',
            background: PAL.warm,
            border: `1px solid ${PAL.warning}`,
            borderRadius: 6,
            opacity: clamp((lt - 2.6) * 3, 0, 1),
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 14, background: PAL.warning,
                color: PAL.warm, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: BODY, fontWeight: 700, fontSize: 18,
              }}>!</div>
              <div style={{ fontFamily: BODY, fontSize: 12, fontWeight: 700, color: PAL.warning, letterSpacing: '0.3em' }}>SAFE-CONTACT RULES</div>
            </div>
            {safe.map((s, i) => (
              <Sprite key={i} start={s.t + 2.6} end={14}>
                {({ localTime: lt2 }) => (
                  <div style={{
                    display: 'flex', gap: 12, alignItems: 'flex-start',
                    marginBottom: 10, opacity: clamp((lt2 - (s.t + 2.6)) * 3, 0, 1),
                  }}>
                    <div style={{ color: PAL.warning, fontFamily: BODY, fontWeight: 700, fontSize: 17, marginTop: 2, minWidth: 18 }}>{(i + 1).toString().padStart(2, '0')}</div>
                    <div style={{ fontFamily: BODY, fontSize: 18, color: PAL.ink, lineHeight: 1.4, fontWeight: 500 }}>{s.label}</div>
                  </div>
                )}
              </Sprite>
            ))}
          </div>
        )}
      </Sprite>

      <Sprite start={7.5} end={14}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1700,
            textAlign: 'center', fontFamily: HEAD, fontSize: 32, fontWeight: 400, fontStyle: 'italic',
            color: PAL.inkSoft, lineHeight: 1.4,
            opacity: clamp((lt - 7.5) * 1.5, 0, 1),
          }}>You aren't building a problem. You're building a person.</div>
        )}
      </Sprite>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// SCENE 7 — CLOSING (64—75s, 11s)
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

      <Sprite start={0.3} end={11}>
        <TextSprite text="A REMINDER" x={540} y={620} size={20} weight={600}
          color={PAL.terracottaDeep} font={BODY} align="center" letterSpacing="0.4em"/>
      </Sprite>

      <Sprite start={0.6} end={11}>
        <TextSprite text="They will" x={540} y={820} size={104} weight={400}
          color={PAL.ink} font={BODY} align="center" letterSpacing="-0.01em" entryDur={0.6}/>
      </Sprite>
      <Sprite start={1.4} end={11}>
        <TextSprite text="outgrow it." x={540} y={970} size={134} weight={400}
          color={PAL.terracottaDeep} font={"italic " + HEAD} align="center"
          letterSpacing="-0.03em" entryDur={0.6}/>
      </Sprite>

      <Sprite start={2.6} end={11}>
        <TextSprite text="You won't" x={540} y={1180} size={84} weight={400}
          color={PAL.inkSoft} font={BODY} align="center" entryDur={0.5}/>
      </Sprite>
      <Sprite start={3.3} end={11}>
        <TextSprite text="miss this stage." x={540} y={1310} size={108} weight={400}
          color={PAL.terracottaDeep} font={"italic " + HEAD} align="center"
          letterSpacing="-0.025em" entryDur={0.6}/>
      </Sprite>

      <Sprite start={4.6} end={11}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: '50%', top: 1500,
            width: clamp((lt - 4.6) * 200, 0, 200), height: 1,
            marginLeft: -clamp((lt - 4.6) * 100, 0, 100),
            background: PAL.terracottaDeep, opacity: 0.45,
          }}/>
        )}
      </Sprite>

      <Sprite start={5.0} end={11}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1550,
            textAlign: 'center', fontFamily: BODY, fontSize: 22, fontWeight: 400,
            color: PAL.walnut, lineHeight: 1.5,
            opacity: clamp((lt - 5.0) * 2, 0, 1),
          }}>
            Up next<br/>
            <span style={{ color: PAL.terracottaDeep, fontStyle: 'italic', fontFamily: HEAD, fontSize: 32 }}>Is My Baby Getting Enough Milk?</span>
          </div>
        )}
      </Sprite>

      <Sprite start={6.0} end={11}>
        {({ localTime: lt }) => {
          const op = clamp((lt - 6.0) * 2, 0, 1);
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
      <Sprite start={4}  end={10}><LocalTimeline duration={6} ><Scene_Question/></LocalTimeline></Sprite>
      <Sprite start={10} end={22}><LocalTimeline duration={12}><Scene_FourthTrimester/></LocalTimeline></Sprite>
      <Sprite start={22} end={36}><LocalTimeline duration={14}><Scene_Cycles/></LocalTimeline></Sprite>
      <Sprite start={36} end={50}><LocalTimeline duration={14}><Scene_Transfer/></LocalTimeline></Sprite>
      <Sprite start={50} end={64}><LocalTimeline duration={14}><Scene_Permission/></LocalTimeline></Sprite>
      <Sprite start={64} end={75}><LocalTimeline duration={11}><Scene_Closing/></LocalTimeline></Sprite>
    </div>
  );
}

window.Video = Video;
