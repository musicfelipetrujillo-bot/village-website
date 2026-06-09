// tip-pump.jsx — Quick Tip 05: When to pump
// 28s, 9:16

const { Stage: StageP, Sprite: SpriteP, useSprite: useSpriteP, TextSprite: TextSpriteP, TimelineContext: CtxP, useTime: useTimeP } = window;

function ScreenLabelPump() {
  const time = useTimeP();
  React.useEffect(() => {
    const root = document.querySelector('[data-video-root]');
    if (root) root.setAttribute('data-screen-label', `t=${time.toFixed(1)}s`);
  }, [Math.floor(time)]);
  return null;
}

function S_Pump_Title() {
  return (
    <TipTitleCard
      eyebrow="TIP 05 · BREASTFEEDING"
      title="When to"
      titleAccent="pump."
      subtitle={"Supply is built in the morning.\nHere's the daily rhythm."}
    />
  );
}

function S_Pump_Schedule() {
  // Timeline of a day — bars with a "best window" highlighted
  const slots = [
    { t: 0.4, time: '4–6 AM',   label: 'GOLDEN HOUR',     note: 'Prolactin peaks. One pump now = an extra bottle.', best: true },
    { t: 1.6, time: '8–10 AM',  label: 'AFTER A FEED',    note: 'Pump 15 min on the side baby just emptied.',       best: false },
    { t: 2.8, time: '12–4 PM',  label: 'POWER PUMP',      note: 'Once a week: 20-10-10-10-10. Mimics a cluster.',   best: false },
    { t: 4.0, time: '7–10 PM',  label: 'COMFORT ONLY',    note: "Don't drain — engorgement is your morning supply.", best: false },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, background: TIPS_PAL.cream }}>
      <TipsChrome tipNum="05" label="WHEN TO PUMP"/>

      <SpriteP start={0.1} end={14}>
        <TextSpriteP text="A 24-HOUR RHYTHM" x={540} y={400} size={22} weight={600}
          color={TIPS_PAL.terracottaDeep} font={TIPS_BODY} align="center" letterSpacing="0.4em"/>
      </SpriteP>
      <SpriteP start={0.3} end={14}>
        <TextSpriteP text="Mornings" x={540} y={520} size={108} weight={700}
          color={TIPS_PAL.ink} font={TIPS_HEAD} align="center" letterSpacing="-0.025em"/>
      </SpriteP>
      <SpriteP start={0.5} end={14}>
        <TextSpriteP text="build supply." x={540} y={650} size={108} weight={400}
          color={TIPS_PAL.terracottaDeep} font={"italic " + TIPS_HEAD} align="center" letterSpacing="-0.025em"/>
      </SpriteP>

      <div style={{ position: 'absolute', left: 80, right: 80, top: 830, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {slots.map((s, i) => (
          <SpriteP key={i} start={s.t} end={14}>
            {({ localTime: lt }) => {
              const op = tClamp((lt - s.t) * 3, 0, 1);
              const bg = s.best ? TIPS_PAL.terracottaDeep : TIPS_PAL.warm;
              const ink = s.best ? TIPS_PAL.warm : TIPS_PAL.ink;
              const sub = s.best ? TIPS_PAL.blush : TIPS_PAL.inkSoft;
              const lab = s.best ? TIPS_PAL.terracotta : TIPS_PAL.walnut;
              return (
                <div style={{
                  display: 'grid', gridTemplateColumns: '180px 1fr', gap: 24,
                  padding: '20px 24px', background: bg,
                  borderRadius: 4,
                  opacity: op, transform: `translateX(${(1 - op) * 16}px)`,
                }}>
                  <div style={{
                    fontFamily: TIPS_HEAD, fontSize: 38, fontWeight: 400, fontStyle: 'italic',
                    color: ink, letterSpacing: '-0.01em', alignSelf: 'center',
                  }}>{s.time}</div>
                  <div>
                    <div style={{ fontFamily: TIPS_BODY, fontSize: 13, fontWeight: 700, color: lab, letterSpacing: '0.3em', marginBottom: 6 }}>{s.label}</div>
                    <div style={{ fontFamily: TIPS_BODY, fontSize: 18, fontWeight: 400, color: sub, lineHeight: 1.4 }}>{s.note}</div>
                  </div>
                </div>
              );
            }}
          </SpriteP>
        ))}
      </div>
    </div>
  );
}

function S_Pump_Close() {
  return (
    <TipsClosing
      takeaway="Pump in the"
      takeawayItalic="morning."
    />
  );
}

function VideoPump() {
  return (
    <div data-video-root data-screen-label="t=0.0s">
      <ScreenLabelPump/>
      <SpriteP start={0}  end={4} ><TLocalTimeline duration={4} ><S_Pump_Title/></TLocalTimeline></SpriteP>
      <SpriteP start={4}  end={22}><TLocalTimeline duration={18}><S_Pump_Schedule/></TLocalTimeline></SpriteP>
      <SpriteP start={22} end={28}><TLocalTimeline duration={6} ><S_Pump_Close/></TLocalTimeline></SpriteP>
    </div>
  );
}

window.Video_Pump = VideoPump;
