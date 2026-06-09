// tip-latch.jsx — Quick Tip 04: A Good Latch
// 28s, 9:16

const { Stage: StageL, Sprite: SpriteL, useSprite: useSpriteL, TextSprite: TextSpriteL, TimelineContext: CtxL, useTime: useTimeL } = window;

function ScreenLabelLatch() {
  const time = useTimeL();
  React.useEffect(() => {
    const root = document.querySelector('[data-video-root]');
    if (root) root.setAttribute('data-screen-label', `t=${time.toFixed(1)}s`);
  }, [Math.floor(time)]);
  return null;
}

function S_Latch_Title() {
  return (
    <TipTitleCard
      eyebrow="TIP 04 · BREASTFEEDING"
      title="A good"
      titleAccent="latch."
      subtitle={"You can hear it. You can feel it.\nFour signs to look for."}
    />
  );
}

function S_Latch_Signs() {
  const signs = [
    { t: 0.4, n: '01', head: "Wide open mouth",      body: "Like a yawn — chin pressed in, lips flanged out like a fish." },
    { t: 1.6, n: '02', head: "More areola below",    body: "Baby takes in more of the bottom of the areola than the top." },
    { t: 2.8, n: '03', head: "Slow, deep swallows",  body: "You'll hear a soft 'kah' sound — not clicks, not smacking." },
    { t: 4.0, n: '04', head: "No pinching pain",     body: "Tugging is normal. Pinching, biting, sharp pain — unlatch and try again." },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, background: TIPS_PAL.cream }}>
      <TipsChrome tipNum="04" label="A GOOD LATCH"/>

      <SpriteL start={0.1} end={14}>
        <TextSpriteL text="WHAT TO LISTEN &amp; LOOK FOR" x={540} y={400} size={22} weight={600}
          color={TIPS_PAL.terracottaDeep} font={TIPS_BODY} align="center" letterSpacing="0.4em"/>
      </SpriteL>
      <SpriteL start={0.3} end={14}>
        <TextSpriteL text="Four" x={540} y={520} size={108} weight={700}
          color={TIPS_PAL.ink} font={TIPS_HEAD} align="center" letterSpacing="-0.025em"/>
      </SpriteL>
      <SpriteL start={0.5} end={14}>
        <TextSpriteL text="green flags." x={540} y={650} size={108} weight={400}
          color={TIPS_PAL.terracottaDeep} font={"italic " + TIPS_HEAD} align="center" letterSpacing="-0.025em"/>
      </SpriteL>

      <div style={{ position: 'absolute', left: 80, right: 80, top: 830, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {signs.map((s, i) => (
          <SpriteL key={i} start={s.t} end={14}>
            {({ localTime: lt }) => {
              const op = tClamp((lt - s.t) * 3, 0, 1);
              return (
                <div style={{
                  display: 'flex', alignItems: 'flex-start', gap: 22,
                  padding: '20px 24px', background: TIPS_PAL.warm,
                  borderLeft: `4px solid ${TIPS_PAL.terracottaDeep}`,
                  borderRadius: 4,
                  opacity: op, transform: `translateX(${(1 - op) * 16}px)`,
                }}>
                  <div style={{
                    fontFamily: TIPS_HEAD, fontSize: 56, fontWeight: 400, fontStyle: 'italic',
                    color: TIPS_PAL.terracottaDeep, lineHeight: 1, letterSpacing: '-0.02em',
                    minWidth: 80, marginTop: 4,
                  }}>{s.n}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: TIPS_HEAD, fontSize: 36, fontWeight: 400, fontStyle: 'italic', color: TIPS_PAL.ink, letterSpacing: '-0.01em', marginBottom: 6 }}>{s.head}</div>
                    <div style={{ fontFamily: TIPS_BODY, fontSize: 18, fontWeight: 400, color: TIPS_PAL.inkSoft, lineHeight: 1.45 }}>{s.body}</div>
                  </div>
                </div>
              );
            }}
          </SpriteL>
        ))}
      </div>
    </div>
  );
}

function S_Latch_Close() {
  return (
    <TipsClosing
      takeaway="Painful?"
      takeawayItalic="re-latch."
    />
  );
}

function VideoLatch() {
  return (
    <div data-video-root data-screen-label="t=0.0s">
      <ScreenLabelLatch/>
      <SpriteL start={0}  end={4} ><TLocalTimeline duration={4} ><S_Latch_Title/></TLocalTimeline></SpriteL>
      <SpriteL start={4}  end={22}><TLocalTimeline duration={18}><S_Latch_Signs/></TLocalTimeline></SpriteL>
      <SpriteL start={22} end={28}><TLocalTimeline duration={6} ><S_Latch_Close/></TLocalTimeline></SpriteL>
    </div>
  );
}

window.Video_Latch = VideoLatch;
