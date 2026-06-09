// tip-witching.jsx — Quick Tip 03: Witching Hour
// 28s, 9:16

const { Stage, Sprite, useSprite, TextSprite, TimelineContext, useTime } = window;

function ScreenLabelW() {
  const time = useTime();
  React.useEffect(() => {
    const root = document.querySelector('[data-video-root]');
    if (root) root.setAttribute('data-screen-label', `t=${time.toFixed(1)}s`);
  }, [Math.floor(time)]);
  return null;
}

function S_Witching_Title() {
  return (
    <TipTitleCard
      eyebrow="TIP 03 · FUSSY EVENINGS"
      title="The Witching"
      titleAccent="Hour."
      subtitle={"Why your baby loses it\nat 5 p.m. (and what helps)."}
    />
  );
}

// Clock arc showing the 5-11pm danger window
function S_Witching_When() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: TIPS_PAL.cream }}>
      <TipsChrome tipNum="03" label="WHEN IT HAPPENS"/>

      <Sprite start={0.1} end={9}>
        <TextSprite text="EVERY EVENING" x={540} y={400} size={22} weight={600}
          color={TIPS_PAL.terracottaDeep} font={TIPS_BODY} align="center" letterSpacing="0.4em"/>
      </Sprite>
      <Sprite start={0.3} end={9}>
        <TextSprite text="5 p.m. to" x={540} y={530} size={108} weight={700}
          color={TIPS_PAL.ink} font={TIPS_HEAD} align="center" letterSpacing="-0.025em"/>
      </Sprite>
      <Sprite start={0.5} end={9}>
        <TextSprite text="11 p.m." x={540} y={670} size={140} weight={400}
          color={TIPS_PAL.terracottaDeep} font={"italic " + TIPS_HEAD} align="center" letterSpacing="-0.03em"/>
      </Sprite>

      {/* Clock face */}
      <Sprite start={1.0} end={9}>
        {({ localTime: lt }) => {
          const fillProg = tClamp((lt - 1.0) / 2, 0, 1);
          // Arc from 5 (150°) to 11 (330°), 180° span
          const r = 230;
          const cx = 540, cy = 1180;
          const startA = 150, endA = 150 + 180 * fillProg;
          const arc = (a1, a2) => {
            const rad = (a) => (a - 90) * Math.PI / 180;
            const x1 = cx + r * Math.cos(rad(a1)), y1 = cy + r * Math.sin(rad(a1));
            const x2 = cx + r * Math.cos(rad(a2)), y2 = cy + r * Math.sin(rad(a2));
            const large = a2 - a1 > 180 ? 1 : 0;
            return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
          };
          return (
            <svg style={{ position: 'absolute', left: 0, top: 0 }} width="1080" height="1920">
              {/* Outer ring */}
              <circle cx={cx} cy={cy} r={r + 10} fill="none" stroke={TIPS_PAL.blush} strokeWidth="2"/>
              <circle cx={cx} cy={cy} r={r} fill={TIPS_PAL.warm}/>
              {/* Filled danger arc */}
              {fillProg > 0 && (
                <path d={arc(startA, endA)} fill={TIPS_PAL.terracottaDeep} opacity="0.85"/>
              )}
              {/* Hour ticks */}
              {Array.from({ length: 12 }, (_, i) => {
                const a = (i * 30 - 90) * Math.PI / 180;
                const x1 = cx + (r - 18) * Math.cos(a), y1 = cy + (r - 18) * Math.sin(a);
                const x2 = cx + (r - 4) * Math.cos(a),  y2 = cy + (r - 4) * Math.sin(a);
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={TIPS_PAL.walnut} strokeWidth={i % 3 === 0 ? 4 : 2}/>;
              })}
              {/* Hour labels */}
              {[12, 3, 6, 9].map((h, i) => {
                const ang = (i * 90 - 90) * Math.PI / 180;
                const lx = cx + (r - 50) * Math.cos(ang);
                const ly = cy + (r - 50) * Math.sin(ang) + 8;
                return <text key={h} x={lx} y={ly} textAnchor="middle" fontFamily={TIPS_HEAD} fontWeight="700" fontSize="28" fill={TIPS_PAL.ink}>{h}</text>;
              })}
              {/* Center mark */}
              <circle cx={cx} cy={cy} r="6" fill={TIPS_PAL.ink}/>
              {/* "5" and "11" labels */}
              <text x={cx + (r + 50) * Math.cos((150 - 90) * Math.PI / 180)}
                    y={cy + (r + 50) * Math.sin((150 - 90) * Math.PI / 180) + 10}
                    textAnchor="middle" fontFamily={TIPS_BODY} fontWeight="700" fontSize="24" fill={TIPS_PAL.terracottaDeep}>5 PM</text>
              <text x={cx + (r + 50) * Math.cos((330 - 90) * Math.PI / 180)}
                    y={cy + (r + 50) * Math.sin((330 - 90) * Math.PI / 180) + 10}
                    textAnchor="middle" fontFamily={TIPS_BODY} fontWeight="700" fontSize="24" fill={TIPS_PAL.terracottaDeep}>11 PM</text>
            </svg>
          );
        }}
      </Sprite>

      <Sprite start={3.5} end={9}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1620,
            textAlign: 'center', fontFamily: TIPS_HEAD, fontSize: 30, fontWeight: 400, fontStyle: 'italic',
            color: TIPS_PAL.inkSoft, lineHeight: 1.4,
            opacity: tClamp((lt - 3.5) * 2, 0, 1),
          }}>
            Babies' nervous systems are<br/>
            overstimulated by day's end.
          </div>
        )}
      </Sprite>
      <Sprite start={5.5} end={9}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1780,
            textAlign: 'center', fontFamily: TIPS_HEAD, fontSize: 32, fontWeight: 700, fontStyle: 'italic',
            color: TIPS_PAL.terracottaDeep, lineHeight: 1.2, letterSpacing: '-0.01em',
            opacity: tClamp((lt - 5.5) * 2, 0, 1),
          }}>It's not your fault.</div>
        )}
      </Sprite>
    </div>
  );
}

// What helps
function S_Witching_Help() {
  const tips = [
    { t: 0.2, n: '01', word: "Dim the lights",  line: "Cuts visual stimulation in half." },
    { t: 1.4, n: '02', word: "White noise",     line: "Mimics womb sounds. Loud is fine." },
    { t: 2.6, n: '03', word: "Move + bounce",   line: "Carrier, yoga ball, slow walk." },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, background: TIPS_PAL.cream }}>
      <TipsChrome tipNum="03" label="WHAT HELPS"/>

      <Sprite start={0.1} end={9}>
        <TextSprite text="WHAT HELPS" x={540} y={400} size={22} weight={600}
          color={TIPS_PAL.terracottaDeep} font={TIPS_BODY} align="center" letterSpacing="0.4em"/>
      </Sprite>
      <Sprite start={0.3} end={9}>
        <TextSprite text="Calm the senses." x={540} y={530} size={88} weight={400}
          color={TIPS_PAL.terracottaDeep} font={"italic " + TIPS_HEAD} align="center" letterSpacing="-0.025em"/>
      </Sprite>

      <div style={{ position: 'absolute', left: 80, right: 80, top: 720, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {tips.map((c, i) => (
          <Sprite key={i} start={c.t} end={9}>
            {({ localTime: lt }) => {
              const op = tClamp((lt - c.t) * 3, 0, 1);
              return (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 24,
                  padding: '24px 28px', background: TIPS_PAL.warm,
                  borderLeft: `4px solid ${TIPS_PAL.terracottaDeep}`,
                  borderRadius: 4,
                  opacity: op, transform: `translateX(${(1 - op) * 16}px)`,
                }}>
                  <div style={{
                    fontFamily: TIPS_HEAD, fontSize: 60, fontWeight: 700, fontStyle: 'italic',
                    color: TIPS_PAL.terracottaDeep, lineHeight: 1, letterSpacing: '-0.02em',
                    minWidth: 80,
                  }}>{c.n}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: TIPS_HEAD, fontSize: 44, fontWeight: 700, color: TIPS_PAL.ink, lineHeight: 1.05, letterSpacing: '-0.025em', marginBottom: 6 }}>{c.word}</div>
                    <div style={{ fontFamily: TIPS_BODY, fontSize: 19, fontWeight: 400, color: TIPS_PAL.inkSoft, lineHeight: 1.4 }}>{c.line}</div>
                  </div>
                </div>
              );
            }}
          </Sprite>
        ))}
      </div>
    </div>
  );
}

function S_Witching_Close() {
  return (
    <TipsClosing
      takeaway="It peaks at 6 weeks,"
      takeawayItalic="then fades."
    />
  );
}

function Video() {
  return (
    <div data-video-root data-screen-label="t=0.0s">
      <ScreenLabelW/>
      <Sprite start={0}  end={4} ><TLocalTimeline duration={4} ><S_Witching_Title/></TLocalTimeline></Sprite>
      <Sprite start={4}  end={13}><TLocalTimeline duration={9} ><S_Witching_When/></TLocalTimeline></Sprite>
      <Sprite start={13} end={22}><TLocalTimeline duration={9} ><S_Witching_Help/></TLocalTimeline></Sprite>
      <Sprite start={22} end={28}><TLocalTimeline duration={6} ><S_Witching_Close/></TLocalTimeline></Sprite>
    </div>
  );
}

window.Video_Witching = Video;
