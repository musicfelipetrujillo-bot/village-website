// tip-3am.jsx — Quick Tip 01: The 3 a.m. Spiral
// 28s, 9:16

const { Stage, Sprite, useSprite, TextSprite, TimelineContext, useTime } = window;

function ScreenLabel3() {
  const time = useTime();
  React.useEffect(() => {
    const root = document.querySelector('[data-video-root]');
    if (root) root.setAttribute('data-screen-label', `t=${time.toFixed(1)}s`);
  }, [Math.floor(time)]);
  return null;
}

// Scene A — title (0-4s)
function S_3am_Title() {
  return (
    <TipTitleCard
      eyebrow="TIP 01 · ANXIETY"
      title="The 3 a.m."
      titleAccent="Spiral."
      subtitle={"What to do when you're\nGoogling the unthinkable."}
    />
  );
}

// Scene B — the spiral demo (4-14s)
function S_3am_Spiral() {
  const { localTime } = useSprite();
  const queries = [
    { t: 0.4, q: "is it normal for my baby to..." },
    { t: 1.4, q: "should i be worried if..." },
    { t: 2.4, q: "why does my baby..." },
    { t: 3.4, q: "could it be..." },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, background: TIPS_PAL.cream }}>
      <TipsChrome tipNum="01" label="THE SPIRAL"/>

      {/* Phone frame */}
      <Sprite start={0.1} end={10}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: '50%', top: 380,
            transform: `translateX(-50%) scale(${0.94 + tClamp(lt * 0.5, 0, 0.06)})`,
            width: 720, padding: 24,
            background: '#0a0807', borderRadius: 36,
            border: '6px solid #2a2520',
            opacity: tClamp(lt * 2, 0, 1),
            boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
          }}>
            <div style={{
              background: '#1a1612', borderRadius: 24, padding: '24px 24px 32px',
              minHeight: 700,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', fontFamily: TIPS_BODY, fontSize: 14, fontWeight: 600, marginBottom: 24 }}>
                <span>3:14 AM</span>
                <span style={{ letterSpacing: 4 }}>•••</span>
              </div>
              {/* Search box */}
              <div style={{
                background: '#2a2520', borderRadius: 8, padding: '14px 18px',
                display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20,
              }}>
                <div style={{ width: 16, height: 16, borderRadius: 8, border: '2px solid #888' }}/>
                <div style={{ color: TIPS_PAL.warm, fontFamily: TIPS_BODY, fontSize: 18, fontWeight: 500 }}>
                  is it normal for my baby to{lt > 0.3 && lt % 0.6 > 0.3 ? '|' : ' '}
                </div>
              </div>
              {/* Stacked queries */}
              {queries.map((q, i) => (
                <Sprite key={i} start={q.t} end={10}>
                  {({ localTime: lt2 }) => {
                    const op = tClamp((lt2 - q.t) * 3, 0, 1);
                    return (
                      <div style={{
                        padding: '14px 18px',
                        borderTop: i === 0 ? 'none' : '1px solid #2a2520',
                        opacity: op,
                        transform: `translateX(${(1 - op) * 12}px)`,
                        display: 'flex', alignItems: 'center', gap: 14,
                      }}>
                        <div style={{ width: 14, height: 14, color: '#666', fontFamily: TIPS_BODY, fontSize: 14 }}>↗</div>
                        <div style={{ color: '#aaa', fontFamily: TIPS_BODY, fontSize: 17, fontWeight: 400 }}>{q.q}</div>
                      </div>
                    );
                  }}
                </Sprite>
              ))}
            </div>
          </div>
        )}
      </Sprite>

      {/* Caption */}
      <Sprite start={5.5} end={10}>
        {({ localTime: lt }) => (
          <div style={{
            position: 'absolute', left: 80, right: 80, top: 1640,
            textAlign: 'center',
            fontFamily: TIPS_HEAD, fontSize: 38, fontWeight: 400, fontStyle: 'italic',
            color: TIPS_PAL.terracottaDeep, lineHeight: 1.4,
            opacity: tClamp((lt - 5.5) * 2, 0, 1),
          }}>
            <span style={{ color: TIPS_PAL.ink, fontFamily: TIPS_BODY, fontSize: 22, fontWeight: 600, fontStyle: 'normal', letterSpacing: '0.2em' }}>STOP.</span><br/>
            <span style={{ marginTop: 12, display: 'inline-block' }}>Close the tab.</span>
          </div>
        )}
      </Sprite>
    </div>
  );
}

// Scene C — the better way (14-23s)
function S_3am_BetterWay() {
  const steps = [
    { t: 0.2, n: '01', word: "Breathe", line: "4 seconds in, 6 out. Three rounds." },
    { t: 1.4, n: '02', word: "Text",    line: "One real human. Not a forum." },
    { t: 2.6, n: '03', word: "Decide",  line: "Sleep on it — or call the nurse line." },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, background: TIPS_PAL.cream }}>
      <TipsChrome tipNum="01" label="DO THIS INSTEAD"/>

      <Sprite start={0.1} end={9}>
        <TextSprite text="DO THIS INSTEAD" x={540} y={400} size={22} weight={600}
          color={TIPS_PAL.terracottaDeep} font={TIPS_BODY} align="center" letterSpacing="0.4em"/>
      </Sprite>
      <Sprite start={0.3} end={9}>
        <TextSprite text="Three steps." x={540} y={520} size={104} weight={400}
          color={TIPS_PAL.terracottaDeep} font={"italic " + TIPS_HEAD} align="center" letterSpacing="-0.03em"/>
      </Sprite>

      <div style={{ position: 'absolute', left: 80, right: 80, top: 760, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {steps.map((s, i) => (
          <Sprite key={i} start={s.t} end={9}>
            {({ localTime: lt }) => {
              const op = tClamp((lt - s.t) * 3, 0, 1);
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
                  }}>{s.n}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: TIPS_HEAD, fontSize: 48, fontWeight: 700, color: TIPS_PAL.ink, lineHeight: 1.05, letterSpacing: '-0.025em', marginBottom: 6 }}>{s.word}</div>
                    <div style={{ fontFamily: TIPS_BODY, fontSize: 20, fontWeight: 400, color: TIPS_PAL.inkSoft, lineHeight: 1.4 }}>{s.line}</div>
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

// Scene D — closing (23-28s)
function S_3am_Close() {
  return (
    <TipsClosing
      takeaway="Real moms,"
      takeawayItalic="real answers."
    />
  );
}

function Video() {
  return (
    <div data-video-root data-screen-label="t=0.0s">
      <ScreenLabel3/>
      <Sprite start={0}  end={4} ><TLocalTimeline duration={4} ><S_3am_Title/></TLocalTimeline></Sprite>
      <Sprite start={4}  end={14}><TLocalTimeline duration={10}><S_3am_Spiral/></TLocalTimeline></Sprite>
      <Sprite start={14} end={23}><TLocalTimeline duration={9} ><S_3am_BetterWay/></TLocalTimeline></Sprite>
      <Sprite start={23} end={28}><TLocalTimeline duration={5} ><S_3am_Close/></TLocalTimeline></Sprite>
    </div>
  );
}

window.Video_3am = Video;
