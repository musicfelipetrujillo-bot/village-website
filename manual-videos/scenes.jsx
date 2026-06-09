// scenes.jsx — Individual scenes for "The 5 S's" video
// Palette:
//   bg cream     #F5EDE4
//   terracotta   #E8B4A0
//   clay         #C9A88B
//   walnut       #7A6C5D
//   ink          #2A241E
//   warm white   #FBF7F1

const PAL = {
  cream: '#F2EAE0',          // editorial cream
  warm:  '#FAF5EE',
  terracotta: '#E8B49C',
  terracottaDeep: '#E2724B', // burnt orange — italic accents + CTA
  clay:  '#B8957A',
  walnut: '#6B5D4F',
  ink:   '#1A1612',          // near-black headline
  inkSoft: '#5A4F45',
  blush: '#EDD8C9',
};

// Editorial type system to match "the village" brand:
// HEAD  = Playfair Display (serif, italic for emotional accent)
// BODY  = Inter (clean sans for body + labels)
const HEAD    = "'Playfair Display', 'Newsreader', Georgia, serif";
const BODY    = "'Inter', system-ui, sans-serif";
const PRIMARY = BODY;
const LABEL   = BODY;
const SERIF   = HEAD;
const SANS    = BODY;
const MONO    = BODY;

// ──────────────────────────────────────────────────────────────
// Brand wordmark — small "the village" mark for corner of every scene
function VillageMark({ x = 80, y = 1820, color, dark }) {
  const fg = color || PAL.ink;
  const bg = dark ? PAL.ink : PAL.ink;
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 6,
        background: bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: PAL.warm, fontFamily: HEAD, fontSize: 17, fontWeight: 700,
        fontStyle: 'italic',
      }}>v</div>
      <div style={{
        fontFamily: BODY, fontSize: 18, fontWeight: 500,
        color: fg, letterSpacing: '0.02em',
      }}>the village</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// LocalTimeline — re-bases TimelineContext using current Sprite's localTime
// so children's <Sprite start={x} end={y}> are relative to scene start.
function LocalTimeline({ duration, children }) {
  const { localTime } = useSprite();
  const value = React.useMemo(
    () => ({ time: localTime, duration: duration, playing: true }),
    [localTime, duration]
  );
  return (
    <TimelineContext.Provider value={value}>
      {children}
    </TimelineContext.Provider>
  );
}

// ──────────────────────────────────────────────────────────────
// Reusable: small "step number" pill
function StepBadge({ n, label, color = PAL.walnut, x, y }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      display: 'flex', alignItems: 'center', gap: 14,
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: 28,
        background: color, color: PAL.warm,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: PRIMARY, fontSize: 30, fontWeight: 700, fontWeight: 500,
        letterSpacing: '-0.01em',
      }}>{n}</div>
      <div style={{
        fontFamily: MONO, fontSize: 14,
        textTransform: 'uppercase', letterSpacing: '0.18em',
        color: PAL.inkSoft,
      }}>{label}</div>
    </div>
  );
}

// Reusable: timestamp label updater (for screen-label comments)
function TimestampLabel() {
  const time = useTime();
  React.useEffect(() => {
    const root = document.querySelector('[data-screen-label]');
    if (root) root.setAttribute('data-screen-label', `t=${time.toFixed(1)}s`);
  }, [Math.floor(time)]);
  return null;
}

// ──────────────────────────────────────────────────────────────
// SCENE 1 — HOOK (0-5s): "Your baby is crying. Again."
function Scene_Hook() {
  const { localTime, progress } = useSprite();

  // Pulsing soft-focus circle (the cry, abstracted)
  const pulseScale = 1 + 0.04 * Math.sin(localTime * 4);
  const pulseOpacity = 0.5 + 0.2 * Math.sin(localTime * 4);

  // Wave rings
  const ringT = (localTime * 0.7) % 1;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `radial-gradient(circle at 50% 45%, ${PAL.blush} 0%, ${PAL.cream} 70%)`,
    }}>
      {/* Wave rings emanating */}
      {[0, 0.33, 0.66].map((offset, i) => {
        const t = (ringT + offset) % 1;
        return (
          <div key={i} style={{
            position: 'absolute',
            left: '50%', top: 720,
            width: 200 + t * 700,
            height: 200 + t * 700,
            marginLeft: -(100 + t * 350),
            marginTop: -(100 + t * 350),
            borderRadius: '50%',
            border: `2px solid ${PAL.terracottaDeep}`,
            opacity: (1 - t) * 0.35,
          }}/>
        );
      })}

      {/* Center "baby" abstraction — soft circle */}
      <div style={{
        position: 'absolute',
        left: 540, top: 720,
        width: 220, height: 220,
        marginLeft: -110, marginTop: -110,
        borderRadius: '50%',
        background: `radial-gradient(circle at 40% 40%, ${PAL.terracotta} 0%, ${PAL.terracottaDeep} 100%)`,
        transform: `scale(${pulseScale})`,
        opacity: pulseOpacity + 0.3,
        boxShadow: `0 30px 80px rgba(216, 152, 128, 0.4)`,
      }}/>

      {/* Headline — appears word by word */}
      <Sprite start={0.5} end={5}>
        <TextSprite
          text="Your baby is"
          x={540} y={1080}
          size={96} weight={700}
          color={PAL.ink}
          font={HEAD}
          align="center"
          letterSpacing="-0.02em"
          entryDur={0.5}
          exitDur={0.4}
        />
      </Sprite>
      <Sprite start={1.2} end={5}>
        <TextSprite
          text="crying."
          x={540} y={1180}
          size={140} weight={400}
          color={PAL.terracottaDeep}
          font={"italic " + HEAD}
          align="center"
          letterSpacing="-0.03em"
          entryDur={0.5}
          exitDur={0.4}
        />
      </Sprite>
      <Sprite start={2.4} end={5}>
        <TextSprite
          text="Again."
          x={540} y={1340}
          size={60} weight={400}
          color={PAL.inkSoft}
          font={"italic " + HEAD}
          align="center"
          letterSpacing="-0.01em"
          entryDur={0.5}
          exitDur={0.4}
        />
      </Sprite>

      {/* Caption space at bottom */}
      <Sprite start={3.2} end={5}>
        <div style={{
          position: 'absolute',
          left: 80, top: 1700, right: 80,
          textAlign: 'center',
          fontFamily: MONO, fontSize: 22,
          color: PAL.inkSoft,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          opacity: clamp((useSprite().localTime - 3.2) * 2, 0, 1),
        }}>
          You've fed. You've changed. Now what?
        </div>
      </Sprite>

      {/* Brand wordmark */}
      <VillageMark x={80} y={120} />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// SCENE 2 — BRIDGE (5-10s): "There's a method"
function Scene_Bridge() {
  const { localTime } = useSprite();

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: PAL.cream,
    }}>
      {/* Section label */}
      <Sprite start={0.2} end={5}>
        <TextSprite
          text="A METHOD"
          x={540} y={400}
          size={22} weight={500}
          color={PAL.walnut}
          font={MONO}
          align="center"
          letterSpacing="0.3em"
        />
      </Sprite>

      {/* Big number 5 */}
      <Sprite start={0.6} end={5}>
        {({ localTime: lt }) => {
          const scale = lt < 0.6 ? Easing.easeOutBack(lt / 0.6) : 1;
          return (
            <div style={{
              position: 'absolute',
              left: 540, top: 850,
              transform: `translate(-50%, -50%) scale(${scale})`,
              fontFamily: HEAD,
              fontSize: 580,
              fontWeight: 700,
              color: PAL.terracottaDeep,
              lineHeight: 1,
              letterSpacing: '-0.05em',
            }}>5</div>
          );
        }}
      </Sprite>

      {/* "S's" subtitle */}
      <Sprite start={1.4} end={5}>
        <TextSprite
          text="S's"
          x={540} y={1180}
          size={150} weight={700}
          color={PAL.ink}
          font={HEAD}
          align="center"
          letterSpacing="-0.02em"
        />
      </Sprite>

      {/* Tagline */}
      <Sprite start={2.2} end={5}>
        <TextSprite
          text="that calm almost any newborn"
          x={540} y={1380}
          size={36} weight={400}
          color={PAL.terracottaDeep}
          font={"italic " + HEAD}
          align="center"
          letterSpacing="-0.005em"
        />
      </Sprite>

      {/* Attribution */}
      <Sprite start={3.0} end={5}>
        <div style={{
          position: 'absolute',
          left: 80, top: 1620, right: 80,
          textAlign: 'center',
          fontFamily: MONO, fontSize: 18,
          color: PAL.walnut,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          opacity: clamp((localTime - 3.0) * 2, 0, 1),
        }}>
          Pediatrician-developed · Evidence-based
        </div>
      </Sprite>

      {/* Caption */}
      <Sprite start={3.5} end={5}>
        <div style={{
          position: 'absolute',
          left: 120, top: 1720, right: 120,
          textAlign: 'center',
          fontFamily: HEAD, fontSize: 32, fontWeight: 400, fontStyle: "italic",
          color: PAL.terracottaDeep,
          opacity: clamp((localTime - 3.5) * 2, 0, 1),
        }}>
          Each one mimics the womb.
        </div>
      </Sprite>

      {/* Brand wordmark */}
      <VillageMark x={80} y={120} />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Reusable scene wrapper for each "S"
function SceneCard({ n, sLetter, title, subtitle, tip, children, accent = PAL.terracottaDeep }) {
  const { localTime } = useSprite();

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: PAL.cream,
    }}>
      {/* Top: step indicator */}
      <Sprite start={0} end={9}>
        <div style={{
          position: 'absolute', left: 80, top: 120,
          display: 'flex', alignItems: 'center', gap: 18,
          opacity: clamp(localTime * 3, 0, 1),
        }}>
          <div style={{
            fontFamily: MONO, fontSize: 18,
            color: PAL.walnut, letterSpacing: '0.25em',
          }}>{`0${n} / 05`}</div>
          <div style={{
            width: 80, height: 1, background: PAL.walnut, opacity: 0.4,
          }}/>
          <div style={{
            fontFamily: MONO, fontSize: 18,
            color: PAL.walnut, letterSpacing: '0.25em',
          }}>THE 5 S's</div>
        </div>
      </Sprite>

      {/* Brand wordmark — top right */}
      <Sprite start={0} end={9}>
        <div style={{
          position: 'absolute', right: 80, top: 116,
          opacity: clamp(localTime * 3, 0, 1),
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            fontFamily: BODY, fontSize: 18, fontWeight: 500,
            color: PAL.ink, letterSpacing: '0.02em',
          }}>the village</div>
          <div style={{
            width: 28, height: 28, borderRadius: 6,
            background: PAL.ink,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: PAL.warm, fontFamily: HEAD, fontSize: 17, fontWeight: 700,
            fontStyle: 'italic',
          }}>v</div>
        </div>
      </Sprite>

      {/* Big "S" letter watermark */}
      <Sprite start={0.1} end={9}>
        {({ localTime: lt }) => {
          const op = clamp(lt * 1.5, 0, 0.18);
          return (
            <div style={{
              position: 'absolute',
              left: -60, top: 250,
              fontFamily: HEAD,
              fontSize: 900,
              fontWeight: 700,
              color: accent,
              opacity: op,
              lineHeight: 0.85,
              letterSpacing: '-0.05em',
              pointerEvents: 'none',
            }}>{sLetter}</div>
          );
        }}
      </Sprite>

      {/* Title */}
      <Sprite start={0.3} end={9}>
        <TextSprite
          text={title}
          x={80} y={440}
          size={150} weight={700}
          color={PAL.ink}
          font={HEAD}
          letterSpacing="-0.03em"
          entryDur={0.55}
        />
      </Sprite>

      {/* Subtitle */}
      <Sprite start={0.7} end={9}>
        <TextSprite
          text={subtitle}
          x={80} y={620}
          size={32} weight={400}
          color={PAL.inkSoft}
          font={BODY}
          letterSpacing="-0.005em"
          entryDur={0.5}
        />
      </Sprite>

      {/* Visual demo area — children render here */}
      <div style={{
        position: 'absolute',
        left: 80, top: 760,
        width: 920, height: 800,
      }}>
        {children}
      </div>

      {/* Tip card at bottom */}
      <Sprite start={5.5} end={9}>
        {({ localTime: lt }) => {
          const op = clamp(lt * 2, 0, 1);
          const ty = (1 - clamp(lt * 2, 0, 1)) * 20;
          return (
            <div style={{
              position: 'absolute',
              left: 80, top: 1660, width: 920,
              padding: '24px 28px',
              background: PAL.warm,
              border: `1px solid ${accent}40`,
              borderLeft: `4px solid ${accent}`,
              borderRadius: 4,
              opacity: op,
              transform: `translateY(${ty}px)`,
            }}>
              <div style={{
                fontFamily: MONO, fontSize: 14,
                color: accent, letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}>Tip</div>
              <div style={{
                fontFamily: SERIF, fontSize: 30,
                color: PAL.ink, lineHeight: 1.3,
                letterSpacing: '-0.005em',
              }}>{tip}</div>
            </div>
          );
        }}
      </Sprite>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// SwaddlePanel — overhead view, recognizable baby + blanket using SVG
// stage 1: blanket diamond + baby visible, top corner being folded down
// stage 2: top folded behind shoulders, left corner crossing over body
// stage 3: bottom corner folded up over feet
// stage 4: right corner crossed over — fully wrapped (only head shows)
function SwaddlePanel({ stage, label, stepNum, accent }) {
  // Colors for the blanket: light side = blush, shadow side = clay
  const blanketLight = '#F5D9CB';
  const blanketShade = '#E5BFA8';
  const blanketDeep  = '#CFA284';

  return (
    <div style={{
      position: 'relative',
      width: 340, height: 360,
      background: PAL.warm,
      borderRadius: 16,
      border: `2px solid ${PAL.cream}`,
      padding: 14,
      boxShadow: '0 4px 18px rgba(122,108,93,0.12)',
    }}>
      {/* Step number */}
      <div style={{
        position: 'absolute', top: 14, left: 18,
        width: 38, height: 38, borderRadius: 19,
        background: accent, color: PAL.warm,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: PRIMARY, fontSize: 22, fontWeight: 800,
        zIndex: 10,
      }}>{stepNum}</div>

      {/* Diagram — SVG overhead view */}
      <svg viewBox="0 0 360 320" style={{
        position: 'absolute', left: 0, top: 26,
        width: '100%', height: 270,
      }}>
        <defs>
          <linearGradient id={`mat-${stepNum}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F8EFE7"/>
            <stop offset="100%" stopColor="#EFE2D2"/>
          </linearGradient>
        </defs>

        {/* Mattress under everything */}
        <rect x="20" y="30" width="320" height="270" rx="14"
          fill={`url(#mat-${stepNum})`} stroke={PAL.cream} strokeWidth="2"/>

        {/* Blanket — diamond shape with rounded points (always visible base) */}
        <g>
          {/* Bottom triangle (always shows) */}
          <path
            d={
              stage >= 3
                ? `M 60 180 L 180 230 L 300 180 L 230 270 Q 180 285 130 270 Z`
                : `M 60 180 L 180 320 L 300 180 L 240 280 Q 180 300 120 280 Z`
            }
            fill={blanketShade}
          />

          {/* Top triangle (folds down at stage 1+) */}
          <path
            d={
              stage >= 1
                ? `M 60 180 L 180 130 L 300 180 L 240 165 Q 180 158 120 165 Z`
                : `M 60 180 L 180 40 L 300 180 L 240 130 Q 180 120 120 130 Z`
            }
            fill={blanketLight}
          />

          {/* Left triangle (crosses over body at stage 2+) */}
          {stage >= 2 ? (
            <path
              d={`M 60 180 L 240 145 L 240 240 L 60 200 Z`}
              fill={blanketShade}
              opacity="0.96"
            />
          ) : (
            <path
              d={`M 60 180 L 110 110 L 110 250 Z`}
              fill={blanketShade}
              opacity="0.85"
            />
          )}

          {/* Right triangle (crosses over body at stage 4) */}
          {stage >= 4 ? (
            <path
              d={`M 300 180 L 130 150 L 130 250 L 300 205 Z`}
              fill={blanketDeep}
            />
          ) : (
            <path
              d={`M 300 180 L 250 110 L 250 250 Z`}
              fill={blanketDeep}
              opacity="0.85"
            />
          )}
        </g>

        {/* Baby — visible to varying degrees depending on stage */}
        {/* Body (only visible if not fully wrapped on that side) */}
        {stage < 4 && (
          <ellipse cx="180" cy="225" rx="30" ry="55" fill="#F4C3A8"/>
        )}
        {/* Arms tucked at sides (visible in stages 1) */}
        {stage <= 1 && (
          <>
            <ellipse cx="148" cy="215" rx="14" ry="36" fill="#EFB597" transform="rotate(-8 148 215)"/>
            <ellipse cx="212" cy="215" rx="14" ry="36" fill="#EFB597" transform="rotate(8 212 215)"/>
          </>
        )}
        {/* Right arm only (visible in stage 2 — left already wrapped) */}
        {stage === 2 && (
          <ellipse cx="212" cy="215" rx="14" ry="36" fill="#EFB597" transform="rotate(8 212 215)"/>
        )}
        {/* Feet poking out (visible in stages 1-2) */}
        {stage <= 2 && (
          <>
            <ellipse cx="168" cy="285" rx="10" ry="14" fill="#EFB597"/>
            <ellipse cx="192" cy="285" rx="10" ry="14" fill="#EFB597"/>
          </>
        )}

        {/* Head — always visible, on top of everything */}
        <g>
          {/* Head circle */}
          <circle cx="180" cy="170" r="34" fill="#F4C3A8"/>
          {/* Hair tuft */}
          <path d="M 158 148 Q 180 138 202 148 Q 188 142 180 144 Q 172 142 158 148 Z" fill="#8B6F58"/>
          {/* Eyes (closed — sleeping) */}
          <path d="M 167 168 Q 172 172 177 168" stroke="#3D342B" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M 183 168 Q 188 172 193 168" stroke="#3D342B" strokeWidth="2" fill="none" strokeLinecap="round"/>
          {/* Cheeks */}
          <circle cx="163" cy="180" r="4" fill="#E89882" opacity="0.6"/>
          <circle cx="197" cy="180" r="4" fill="#E89882" opacity="0.6"/>
          {/* Mouth — small smile */}
          <path d="M 174 188 Q 180 192 186 188" stroke="#3D342B" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </g>

        {/* Action arrow showing what happens THIS step */}
        {stage === 1 && (
          <g>
            <path d="M 180 60 L 180 110 M 170 100 L 180 112 L 190 100"
              stroke={accent} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        )}
        {stage === 2 && (
          <g>
            <path d="M 80 220 L 150 220 M 138 210 L 152 220 L 138 230"
              stroke={accent} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        )}
        {stage === 3 && (
          <g>
            <path d="M 180 295 L 180 245 M 170 255 L 180 243 L 190 255"
              stroke={accent} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        )}
        {stage === 4 && (
          <g>
            <path d="M 280 220 L 210 220 M 222 210 L 208 220 L 222 230"
              stroke={accent} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        )}
      </svg>

      {/* Caption */}
      <div style={{
        position: 'absolute',
        left: 16, right: 16, bottom: 14,
        fontFamily: PRIMARY, fontSize: 18, fontWeight: 700,
        color: PAL.ink, lineHeight: 1.25,
        textAlign: 'center',
      }}>{label}</div>
    </div>
  );
}

// SCENE 3 — SWADDLE (10-19s)
// 4-panel storyboard: lay flat, fold top, wrap left, tuck up + wrap right
function Scene_Swaddle() {
  const accent = PAL.terracottaDeep;
  // Show panels in sequence: each appears at a different time
  const panels = [
    { stage: 1, label: 'Fold top corner down', t: 0.6 },
    { stage: 2, label: 'Wrap left side over', t: 1.6 },
    { stage: 3, label: 'Bring bottom up', t: 2.6 },
    { stage: 4, label: 'Wrap right side over', t: 3.6 },
  ];

  return (
    <SceneCard
      n={1}
      sLetter="S"
      title="Swaddle"
      subtitle="Snug like the womb."
      tip="Snug at the chest, loose at the hips. Arms down by their sides."
      accent={accent}
    >
      {/* 2x2 grid of swaddle steps */}
      <div style={{
        position: 'absolute',
        left: 0, top: 20,
        width: 920, height: 780,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: 20,
        padding: 24,
      }}>
        {panels.map((p, i) => (
          <Sprite key={i} start={p.t} end={9}>
            {({ localTime: lt }) => {
              const op = clamp(lt * 2.5, 0, 1);
              const sc = 0.92 + 0.08 * clamp(lt * 2.5, 0, 1);
              return (
                <div style={{
                  opacity: op,
                  transform: `scale(${sc})`,
                  transformOrigin: 'center',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <SwaddlePanel
                    stage={p.stage}
                    label={p.label}
                    stepNum={i + 1}
                    accent={accent}
                  />
                </div>
              );
            }}
          </Sprite>
        ))}
      </div>
    </SceneCard>
  );
}

// ──────────────────────────────────────────────────────────────
// HoldPanel — shows baby in a specific pose with YES/NO badge
function HoldPanel({ pose, label, accent, ok = true }) {
  const isHold = pose === 'side' || pose === 'stomach';

  return (
    <div style={{
      position: 'relative',
      width: 420, height: 320,
      background: PAL.warm,
      borderRadius: 16,
      border: `2px solid ${ok ? accent : '#C44'}33`,
      padding: 16,
      boxShadow: '0 4px 18px rgba(122,108,93,0.12)',
    }}>
      <div style={{
        position: 'absolute', top: 14, left: 18,
        padding: '6px 14px', borderRadius: 14,
        background: ok ? accent : '#C44', color: PAL.warm,
        fontFamily: PRIMARY, fontSize: 16, fontWeight: 800,
        letterSpacing: '0.05em',
      }}>{ok ? '✓ YES' : '✕ NO'}</div>

      <div style={{ position: 'absolute', left: 0, top: 60, width: 420, height: 200 }}>
        {isHold ? (
          <>
            {/* Forearm cradle */}
            <div style={{ position: 'absolute', left: 30, top: 110, width: 320, height: 60, background: PAL.clay, borderRadius: 30, opacity: 0.9 }}/>
            <div style={{ position: 'absolute', left: 320, top: 115, width: 50, height: 50, background: PAL.clay, borderRadius: '40% 50% 50% 40%' }}/>
            {pose === 'side' ? (
              <>
                <div style={{ position: 'absolute', left: 90, top: 60, width: 200, height: 80, background: PAL.terracotta, borderRadius: 40, transform: 'rotate(-3deg)' }}/>
                <div style={{ position: 'absolute', left: 240, top: 50, width: 70, height: 70, background: PAL.terracottaDeep, borderRadius: '50%' }}/>
                <div style={{ position: 'absolute', left: 252, top: 78, width: 6, height: 8, borderRadius: '50%', background: PAL.ink }}/>
              </>
            ) : (
              <>
                <div style={{ position: 'absolute', left: 90, top: 70, width: 200, height: 70, background: PAL.terracotta, borderRadius: 40 }}/>
                <div style={{ position: 'absolute', left: 240, top: 60, width: 70, height: 70, background: PAL.terracottaDeep, borderRadius: '50%' }}/>
                <div style={{ position: 'absolute', left: 130, top: 130, width: 14, height: 30, background: PAL.terracottaDeep, borderRadius: 8 }}/>
              </>
            )}
          </>
        ) : (
          <>
            {/* Crib mattress */}
            <div style={{ position: 'absolute', left: 40, top: 130, width: 340, height: 50, background: PAL.clay, borderRadius: 6, opacity: 0.5 }}/>
            <div style={{ position: 'absolute', left: 40, top: 125, width: 340, height: 12, background: PAL.warm, border: `1px solid ${PAL.clay}`, borderRadius: 6 }}/>
            {pose === 'back-sleep' ? (
              <>
                <div style={{ position: 'absolute', left: 140, top: 80, width: 140, height: 50, background: PAL.terracotta, borderRadius: 30 }}/>
                <div style={{ position: 'absolute', left: 252, top: 70, width: 70, height: 70, background: PAL.terracottaDeep, borderRadius: '50%' }}/>
                <div style={{ position: 'absolute', left: 270, top: 95, width: 6, height: 8, borderRadius: '50%', background: PAL.ink }}/>
                <div style={{ position: 'absolute', left: 295, top: 95, width: 6, height: 8, borderRadius: '50%', background: PAL.ink }}/>
                <div style={{ position: 'absolute', left: 145, top: 60, width: 16, height: 40, background: PAL.terracottaDeep, borderRadius: 8, transform: 'rotate(-20deg)' }}/>
              </>
            ) : (
              <>
                <div style={{ position: 'absolute', left: 140, top: 90, width: 200, height: 50, background: PAL.terracotta, borderRadius: 30 }}/>
                <div style={{ position: 'absolute', left: 110, top: 80, width: 70, height: 70, background: PAL.terracottaDeep, borderRadius: '50%' }}/>
                <div style={{ position: 'absolute', left: 130, top: 60, width: 200, height: 100, border: '4px solid #C44', borderRadius: '50%', opacity: 0.85 }}/>
                <div style={{ position: 'absolute', left: 140, top: 105, width: 180, height: 4, background: '#C44', transform: 'rotate(-20deg)' }}/>
              </>
            )}
          </>
        )}
      </div>

      <div style={{
        position: 'absolute', left: 20, right: 20, bottom: 18,
        fontFamily: PRIMARY, fontSize: 22, fontWeight: 700,
        color: PAL.ink, lineHeight: 1.2, textAlign: 'center',
      }}>{label}</div>
    </div>
  );
}

// SCENE 4 — SIDE / STOMACH (19-28s)
function Scene_Side() {
  const accent = PAL.walnut;

  return (
    <SceneCard
      n={2}
      sLetter="S"
      title="Side"
      subtitle="Or stomach — only in your arms."
      tip="Side or stomach soothes when holding. For sleep, always lay them on their back."
      accent={accent}
    >
      <div style={{ position: 'absolute', left: 0, top: 20, width: 920, height: 880 }}>
        {/* Section header: WHILE HOLDING */}
        <Sprite start={0.4} end={9}>
          {({ localTime: lt }) => (
            <div style={{
              position: 'absolute', left: 30, top: 0,
              fontFamily: LABEL, fontSize: 18, fontWeight: 700,
              color: PAL.walnut, letterSpacing: '0.25em', textTransform: 'uppercase',
              opacity: clamp(lt * 2, 0, 1),
            }}>While holding · soothe</div>
          )}
        </Sprite>
        <Sprite start={0.7} end={9}>
          {({ localTime: lt }) => {
            const op = clamp(lt * 2.5, 0, 1);
            return (
              <div style={{ position: 'absolute', left: 30, top: 40, opacity: op,
                transform: `scale(${0.92 + op * 0.08})`, transformOrigin: 'left top' }}>
                <HoldPanel pose="side" label="On their side" accent={accent} ok />
              </div>
            );
          }}
        </Sprite>
        <Sprite start={1.4} end={9}>
          {({ localTime: lt }) => {
            const op = clamp(lt * 2.5, 0, 1);
            return (
              <div style={{ position: 'absolute', left: 470, top: 40, opacity: op,
                transform: `scale(${0.92 + op * 0.08})`, transformOrigin: 'left top' }}>
                <HoldPanel pose="stomach" label="On their stomach" accent={accent} ok />
              </div>
            );
          }}
        </Sprite>

        {/* Divider */}
        <Sprite start={2.6} end={9}>
          {({ localTime: lt }) => (
            <div style={{ position: 'absolute', left: 30, right: 30, top: 400,
              height: 1, background: PAL.walnut, opacity: clamp(lt * 1.5, 0, 0.3) }}/>
          )}
        </Sprite>

        {/* FOR SLEEP */}
        <Sprite start={3.0} end={9}>
          {({ localTime: lt }) => (
            <div style={{
              position: 'absolute', left: 30, top: 430,
              fontFamily: LABEL, fontSize: 18, fontWeight: 700,
              color: '#C44', letterSpacing: '0.25em', textTransform: 'uppercase',
              opacity: clamp(lt * 2, 0, 1),
            }}>For sleep · always on back</div>
          )}
        </Sprite>
        <Sprite start={3.4} end={9}>
          {({ localTime: lt }) => {
            const op = clamp(lt * 2.5, 0, 1);
            return (
              <div style={{ position: 'absolute', left: 30, top: 470, opacity: op,
                transform: `scale(${0.92 + op * 0.08})`, transformOrigin: 'left top' }}>
                <HoldPanel pose="back-sleep" label="On their back to sleep" accent={accent} ok />
              </div>
            );
          }}
        </Sprite>
        <Sprite start={4.1} end={9}>
          {({ localTime: lt }) => {
            const op = clamp(lt * 2.5, 0, 1);
            return (
              <div style={{ position: 'absolute', left: 470, top: 470, opacity: op,
                transform: `scale(${0.92 + op * 0.08})`, transformOrigin: 'left top' }}>
                <HoldPanel pose="back-no" label="Never on stomach to sleep" accent={accent} ok={false} />
              </div>
            );
          }}
        </Sprite>
      </div>
    </SceneCard>
  );
}

// SCENE 5 — SHUSH (28-37s)
function Scene_Shush() {
  const { localTime } = useSprite();

  return (
    <SceneCard
      n={3}
      sLetter="S"
      title="Shush"
      subtitle="Loud. Steady. By their ear."
      tip="As loud as their cry. White noise, a hairdryer, or your voice all work."
      accent={PAL.terracottaDeep}
    >
      {/* Sound waves emanating */}
      <div style={{
        position: 'absolute',
        left: 460, top: 410,
        width: 700, height: 600,
        marginLeft: -350, marginTop: -300,
      }}>
        {/* Source — mouth/speaker abstraction */}
        <div style={{
          position: 'absolute',
          left: 80, top: 240,
          width: 120, height: 120,
          background: PAL.terracottaDeep,
          borderRadius: '50%',
          opacity: 0.9,
        }}/>

        {/* Animated wave arcs */}
        {[0, 1, 2, 3, 4].map(i => {
          const phase = (localTime * 1.2 + i * 0.2) % 2;
          const on = phase < 1;
          const t = on ? phase : 0;
          const op = on ? (1 - t) * 0.7 : 0;
          return (
            <svg key={i}
              style={{
                position: 'absolute',
                left: 180 + i * 80,
                top: 220,
                width: 80, height: 160,
                opacity: op,
              }}
              viewBox="0 0 80 160"
            >
              <path
                d={`M 20 ${20 + t * 10} Q 60 80 20 ${140 - t * 10}`}
                stroke={PAL.terracottaDeep}
                strokeWidth={4 + i * 0.5}
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          );
        })}

        {/* Baby ear (target) */}
        <Sprite start={1.5} end={9}>
          {({ localTime: lt }) => (
            <div style={{
              position: 'absolute',
              left: 540, top: 240,
              width: 120, height: 120,
              background: PAL.terracotta,
              borderRadius: '50% 60% 50% 50%',
              opacity: clamp(lt * 2, 0, 1),
            }}/>
          )}
        </Sprite>
        <Sprite start={2.0} end={9}>
          <div style={{
            position: 'absolute',
            left: 530, top: 380,
            fontFamily: MONO, fontSize: 16,
            color: PAL.walnut, letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>baby's ear</div>
        </Sprite>

        {/* "SHHHH" big text */}
        <Sprite start={0.5} end={9}>
          {({ localTime: lt }) => {
            const offset = Math.sin(lt * 8) * 4;
            return (
              <div style={{
                position: 'absolute',
                left: 0, top: 480,
                width: 700,
                textAlign: 'center',
                fontFamily: HEAD,
                fontSize: 220,
                fontWeight: 400,
                fontStyle: "italic",
                color: PAL.terracottaDeep,
                letterSpacing: '0.05em',
                lineHeight: 1,
                opacity: clamp(lt * 2, 0, 1),
                transform: `translateX(${offset}px)`,
              }}>
                shhhh
              </div>
            );
          }}
        </Sprite>
      </div>
    </SceneCard>
  );
}

// SCENE 6 — SWING (37-46s)
function Scene_Swing() {
  const { localTime } = useSprite();

  // Tiny, fast jiggle (the "jiggle, not rock" insight)
  const jiggle = Math.sin(localTime * 14) * 6;
  const drift = Math.sin(localTime * 1.2) * 30;

  return (
    <SceneCard
      n={4}
      sLetter="S"
      title="Swing"
      subtitle="Tiny, fast jiggles — not big rocks."
      tip="Support the head. Movements should be small and rhythmic, like a baby's natural jitter."
      accent={PAL.clay}
    >
      <div style={{
        position: 'absolute',
        left: 460, top: 410,
        width: 700, height: 600,
        marginLeft: -350, marginTop: -300,
      }}>
        {/* Motion trail dots */}
        {[0, 1, 2, 3, 4, 5].map(i => {
          const t = (localTime * 0.8 + i * 0.15) % 1;
          return (
            <div key={i} style={{
              position: 'absolute',
              left: 320 + Math.sin(t * Math.PI * 2) * 60,
              top: 220 + i * 8,
              width: 12 - i * 1.5,
              height: 12 - i * 1.5,
              background: PAL.clay,
              borderRadius: '50%',
              opacity: (1 - t) * 0.4,
            }}/>
          );
        })}

        {/* Bundled baby (already swaddled) */}
        <div style={{
          position: 'absolute',
          left: 250, top: 200,
          width: 200, height: 320,
          transform: `translate(${jiggle}px, ${drift}px) rotate(${jiggle * 0.3}deg)`,
          transformOrigin: 'center top',
        }}>
          {/* Body wrap */}
          <div style={{
            position: 'absolute', inset: 60,
            top: 80, left: 30, width: 140, height: 220,
            background: PAL.clay,
            borderRadius: '70px / 110px',
          }}/>
          {/* Head */}
          <div style={{
            position: 'absolute',
            left: 50, top: 0,
            width: 100, height: 100,
            background: PAL.terracottaDeep,
            borderRadius: '50%',
          }}/>
        </div>

        {/* Frequency indicator */}
        <Sprite start={2.0} end={9}>
          {({ localTime: lt }) => {
            const op = clamp(lt * 2, 0, 1);
            return (
              <div style={{
                position: 'absolute',
                left: 480, top: 280,
                opacity: op,
              }}>
                <div style={{
                  fontFamily: MONO, fontSize: 16,
                  color: PAL.walnut, letterSpacing: '0.15em',
                  textTransform: 'uppercase', marginBottom: 12,
                }}>frequency</div>
                <div style={{
                  fontFamily: HEAD, fontSize: 64, fontWeight: 700,
                  color: PAL.ink, lineHeight: 1, marginBottom: 4,
                }}>~3 Hz</div>
                <div style={{
                  fontFamily: HEAD, fontSize: 22, fontWeight: 400, fontStyle: "italic",
                  color: PAL.inkSoft,
                }}>small &amp; quick</div>

                {/* Sine wave visualization */}
                <svg width="200" height="60" style={{ marginTop: 16 }} viewBox="0 0 200 60">
                  <path
                    d={`M 0 30 ${Array.from({length: 40}, (_, i) => {
                      const x = i * 5;
                      const y = 30 + Math.sin(i * 0.6 + localTime * 6) * 18;
                      return `L ${x} ${y}`;
                    }).join(' ')}`}
                    stroke={PAL.terracottaDeep}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            );
          }}
        </Sprite>
      </div>
    </SceneCard>
  );
}

// SCENE 7 — SUCK (46-55s)
function Scene_Suck() {
  const { localTime } = useSprite();

  return (
    <SceneCard
      n={5}
      sLetter="S"
      title="Suck"
      subtitle="The icing on the cake."
      tip="A pacifier, clean finger, or breast — sucking activates the calming reflex once they're already settling."
      accent={PAL.walnut}
    >
      <div style={{
        position: 'absolute',
        left: 460, top: 410,
        width: 700, height: 600,
        marginLeft: -350, marginTop: -300,
      }}>
        {/* Three icon cards: pacifier, finger, breast */}
        {[
          { label: 'pacifier', delay: 0.4 },
          { label: 'clean finger', delay: 0.8 },
          { label: 'breast', delay: 1.2 },
        ].map((item, i) => (
          <Sprite key={i} start={item.delay} end={9}>
            {({ localTime: lt }) => {
              const op = clamp(lt * 2, 0, 1);
              const ty = (1 - clamp(lt * 2, 0, 1)) * 24;
              return (
                <div style={{
                  position: 'absolute',
                  left: 60 + i * 200,
                  top: 80,
                  width: 180, height: 220,
                  background: PAL.warm,
                  border: `1px solid ${PAL.clay}`,
                  borderRadius: 6,
                  opacity: op,
                  transform: `translateY(${ty}px)`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '32px 16px',
                }}>
                  {/* Simple shape glyph */}
                  <div style={{
                    width: 90, height: 90,
                    background: i === 0 ? PAL.terracotta : i === 1 ? PAL.clay : PAL.terracottaDeep,
                    borderRadius: i === 0 ? '50% 50% 30% 30%' : i === 1 ? '20px 20px 40px 40px' : '50%',
                    opacity: 0.9,
                  }}/>
                  <div style={{
                    fontFamily: MONO, fontSize: 14,
                    color: PAL.inkSoft, letterSpacing: '0.15em',
                    textTransform: 'uppercase', textAlign: 'center',
                  }}>{item.label}</div>
                </div>
              );
            }}
          </Sprite>
        ))}

        {/* Order note */}
        <Sprite start={2.5} end={9}>
          {({ localTime: lt }) => {
            const op = clamp(lt * 2, 0, 1);
            return (
              <div style={{
                position: 'absolute',
                left: 0, top: 380, width: 700,
                textAlign: 'center',
                opacity: op,
              }}>
                <div style={{
                  fontFamily: MONO, fontSize: 14,
                  color: PAL.walnut, letterSpacing: '0.25em',
                  textTransform: 'uppercase', marginBottom: 16,
                }}>The order matters</div>
                <div style={{
                  fontFamily: HEAD, fontSize: 42, fontWeight: 400, fontStyle: "italic",
                  color: PAL.terracottaDeep,
                  lineHeight: 1.3,
                }}>
                  Suck comes <em>last</em>.<br/>
                  After the other four.
                </div>
              </div>
            );
          }}
        </Sprite>
      </div>
    </SceneCard>
  );
}

// ──────────────────────────────────────────────────────────────
// SCENE 8 — RECAP (55-62s)
function Scene_Recap() {
  const { localTime } = useSprite();

  const items = [
    { n: 1, word: 'Swaddle' },
    { n: 2, word: 'Side' },
    { n: 3, word: 'Shush' },
    { n: 4, word: 'Swing' },
    { n: 5, word: 'Suck' },
  ];

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: PAL.cream,
    }}>
      {/* Header */}
      <Sprite start={0.1} end={7}>
        <TextSprite
          text="REMEMBER"
          x={540} y={200}
          size={22} weight={500}
          color={PAL.walnut}
          font={MONO}
          align="center"
          letterSpacing="0.3em"
        />
      </Sprite>

      <Sprite start={0.4} end={7}>
        <TextSprite
          text="The 5 S's"
          x={540} y={310}
          size={110} weight={700}
          color={PAL.ink}
          font={HEAD}
          align="center"
          letterSpacing="-0.03em"
        />
      </Sprite>

      {/* List of 5 S's, staggered in */}
      {items.map((item, i) => (
        <Sprite key={item.n} start={1.0 + i * 0.35} end={7}>
          {({ localTime: lt }) => {
            const op = clamp(lt * 2.5, 0, 1);
            const tx = (1 - clamp(lt * 2.5, 0, 1)) * 40;
            return (
              <div style={{
                position: 'absolute',
                left: 140, top: 530 + i * 150,
                display: 'flex', alignItems: 'center', gap: 36,
                opacity: op,
                transform: `translateX(${tx}px)`,
              }}>
                <div style={{
                  width: 80, height: 80, borderRadius: 40,
                  background: PAL.terracottaDeep,
                  color: PAL.warm,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: HEAD, fontSize: 38,
                  fontWeight: 700,
                }}>{item.n}</div>
                <div style={{
                  fontFamily: HEAD, fontSize: 92, fontWeight: 700,
                  color: PAL.ink, letterSpacing: '-0.01em',
                  lineHeight: 1,
                }}>{item.word}</div>
              </div>
            );
          }}
        </Sprite>
      ))}

      {/* Closing note */}
      <Sprite start={3.5} end={7}>
        {({ localTime: lt }) => {
          const op = clamp(lt * 1.5, 0, 1);
          return (
            <div style={{
              position: 'absolute',
              left: 80, top: 1440, width: 920,
              textAlign: 'center',
              opacity: op,
            }}>
              <div style={{
                fontFamily: HEAD, fontSize: 44, fontWeight: 400, fontStyle: "italic",
                color: PAL.terracottaDeep,
                lineHeight: 1.3,
              }}>
                Combine all five.<br/>
                Hold for 5 minutes.
              </div>
            </div>
          );
        }}
      </Sprite>

      {/* Watermark / disclaimer */}
      <Sprite start={4.5} end={7}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute',
            left: 80, top: 1610, right: 80,
            textAlign: 'center',
            fontFamily: BODY, fontSize: 15,
            color: PAL.walnut,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            opacity: clamp(lt * 1.5, 0, 0.6),
          }}>
            Talk to your pediatrician · Every baby is different
          </div>
        )}
      </Sprite>

      {/* CTA button matching reference */}
      <Sprite start={5.0} end={7}>
        {({ localTime: lt }) => {
          const op = clamp(lt * 2, 0, 1);
          const ty = (1 - clamp(lt * 2, 0, 1)) * 16;
          return (
            <div style={{
              position: 'absolute',
              left: 0, right: 0, top: 1700,
              display: 'flex', justifyContent: 'center',
              opacity: op,
              transform: `translateY(${ty}px)`,
            }}>
              <div style={{
                padding: '20px 40px',
                background: PAL.terracottaDeep,
                color: PAL.warm,
                fontFamily: BODY, fontSize: 22, fontWeight: 600,
                borderRadius: 4,
                letterSpacing: '0.01em',
                boxShadow: '0 8px 24px rgba(226, 114, 75, 0.25)',
              }}>More tips in the app  →</div>
            </div>
          );
        }}
      </Sprite>

      <Sprite start={5.5} end={7}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute',
            left: 0, right: 0, top: 1830,
            display: 'flex', justifyContent: 'center',
            opacity: clamp(lt * 2, 0, 1),
          }}>
            <VillageMark x={0} y={0} />
          </div>
        )}
      </Sprite>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// MAIN
function Video() {
  return (
    <>
      <TimestampLabel />

      <Sprite start={0} end={5}>
        <LocalTimeline duration={5}><Scene_Hook /></LocalTimeline>
      </Sprite>

      <Sprite start={5} end={10}>
        <LocalTimeline duration={5}><Scene_Bridge /></LocalTimeline>
      </Sprite>

      <Sprite start={10} end={19}>
        <LocalTimeline duration={9}><Scene_Swaddle /></LocalTimeline>
      </Sprite>

      <Sprite start={19} end={28}>
        <LocalTimeline duration={9}><Scene_Side /></LocalTimeline>
      </Sprite>

      <Sprite start={28} end={37}>
        <LocalTimeline duration={9}><Scene_Shush /></LocalTimeline>
      </Sprite>

      <Sprite start={37} end={46}>
        <LocalTimeline duration={9}><Scene_Swing /></LocalTimeline>
      </Sprite>

      <Sprite start={46} end={55}>
        <LocalTimeline duration={9}><Scene_Suck /></LocalTimeline>
      </Sprite>

      <Sprite start={55} end={62}>
        <LocalTimeline duration={7}><Scene_Recap /></LocalTimeline>
      </Sprite>
    </>
  );
}

Object.assign(window, {
  Video,
  PAL, SERIF, SANS, MONO,
});
