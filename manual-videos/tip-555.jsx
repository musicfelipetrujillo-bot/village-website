// tip-555.jsx — Quick Tip 02: The 5-5-5 Rule
// 28s, 9:16

const { Stage, Sprite, useSprite, TextSprite, TimelineContext, useTime } = window;

function ScreenLabel555() {
  const time = useTime();
  React.useEffect(() => {
    const root = document.querySelector('[data-video-root]');
    if (root) root.setAttribute('data-screen-label', `t=${time.toFixed(1)}s`);
  }, [Math.floor(time)]);
  return null;
}

function S_555_Title() {
  return (
    <TipTitleCard
      eyebrow="TIP 02 · RECOVERY"
      title="The 5-5-5"
      titleAccent="Rule."
      subtitle={"How to actually rest\nin the first 15 days."}
    />
  );
}

// Three-column 5/5/5 explainer
function S_555_Rule() {
  const cols = [
    { t: 0.4, n: '5', word: "DAYS",  loc: "in bed", body: "Eat, sleep, hold baby. That's it. Someone else cooks, cleans, hosts." },
    { t: 1.6, n: '5', word: "DAYS",  loc: "on the bed", body: "Sit up, take meals there. Short walks to the bathroom. No stairs." },
    { t: 2.8, n: '5', word: "DAYS",  loc: "near the bed", body: "Couch, garden chair, slow shower. Still no errands. Still no guests." },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, background: TIPS_PAL.cream }}>
      <TipsChrome tipNum="02" label="THE 5-5-5 RULE"/>

      <Sprite start={0.1} end={11}>
        <TextSprite text="THE FIRST 15 DAYS" x={540} y={400} size={22} weight={600}
          color={TIPS_PAL.terracottaDeep} font={TIPS_BODY} align="center" letterSpacing="0.4em"/>
      </Sprite>
      <Sprite start={0.3} end={11}>
        <TextSprite text="Slower" x={540} y={520} size={108} weight={700}
          color={TIPS_PAL.ink} font={TIPS_HEAD} align="center" letterSpacing="-0.025em"/>
      </Sprite>
      <Sprite start={0.5} end={11}>
        <TextSprite text="is healing." x={540} y={650} size={108} weight={400}
          color={TIPS_PAL.terracottaDeep} font={"italic " + TIPS_HEAD} align="center" letterSpacing="-0.025em"/>
      </Sprite>

      {/* Three cards stacked */}
      <div style={{ position: 'absolute', left: 80, right: 80, top: 850, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {cols.map((c, i) => (
          <Sprite key={i} start={c.t} end={11}>
            {({ localTime: lt }) => {
              const op = tClamp((lt - c.t) * 3, 0, 1);
              return (
                <div style={{
                  display: 'flex', alignItems: 'flex-start', gap: 22,
                  padding: '22px 26px', background: TIPS_PAL.warm,
                  borderLeft: `4px solid ${TIPS_PAL.terracottaDeep}`,
                  borderRadius: 4,
                  opacity: op, transform: `translateX(${(1 - op) * 16}px)`,
                }}>
                  <div style={{
                    fontFamily: TIPS_HEAD, fontSize: 96, fontWeight: 700, fontStyle: 'italic',
                    color: TIPS_PAL.terracottaDeep, lineHeight: 0.85, letterSpacing: '-0.04em',
                    minWidth: 90, marginTop: -6,
                  }}>{c.n}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
                      <div style={{ fontFamily: TIPS_BODY, fontSize: 14, fontWeight: 700, color: TIPS_PAL.walnut, letterSpacing: '0.3em' }}>{c.word}</div>
                      <div style={{ fontFamily: TIPS_HEAD, fontSize: 32, fontWeight: 400, fontStyle: 'italic', color: TIPS_PAL.ink, letterSpacing: '-0.01em' }}>{c.loc}</div>
                    </div>
                    <div style={{ fontFamily: TIPS_BODY, fontSize: 18, fontWeight: 400, color: TIPS_PAL.inkSoft, lineHeight: 1.45 }}>{c.body}</div>
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

function S_555_Close() {
  return (
    <TipsClosing
      takeaway="Rest is"
      takeawayItalic="not lazy."
    />
  );
}

function Video() {
  return (
    <div data-video-root data-screen-label="t=0.0s">
      <ScreenLabel555/>
      <Sprite start={0}  end={4} ><TLocalTimeline duration={4} ><S_555_Title/></TLocalTimeline></Sprite>
      <Sprite start={4}  end={22}><TLocalTimeline duration={18}><S_555_Rule/></TLocalTimeline></Sprite>
      <Sprite start={22} end={28}><TLocalTimeline duration={6} ><S_555_Close/></TLocalTimeline></Sprite>
    </div>
  );
}

window.Video_555 = Video;
