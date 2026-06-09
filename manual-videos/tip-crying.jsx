// tip-crying.jsx — Quick Tip 07: Your crying spells
// 28s, 9:16

const { Stage: StageC, Sprite: SpriteC, useSprite: useSpriteC, TextSprite: TextSpriteC, TimelineContext: CtxC, useTime: useTimeC } = window;

function ScreenLabelCrying() {
  const time = useTimeC();
  React.useEffect(() => {
    const root = document.querySelector('[data-video-root]');
    if (root) root.setAttribute('data-screen-label', `t=${time.toFixed(1)}s`);
  }, [Math.floor(time)]);
  return null;
}

function S_Cry_Title() {
  return (
    <TipTitleCard
      eyebrow="TIP 07 · MENTAL HEALTH"
      title="Your"
      titleAccent="crying spells."
      subtitle={"Yours, not the baby's.\nWhat's normal — and what isn't."}
    />
  );
}

function S_Cry_Spectrum() {
  // Two columns: green flags vs red flags
  return (
    <div style={{ position: 'absolute', inset: 0, background: TIPS_PAL.cream }}>
      <TipsChrome tipNum="07" label="CRYING SPELLS"/>

      <SpriteC start={0.1} end={14}>
        <TextSpriteC text="A SIMPLE TEST" x={540} y={400} size={22} weight={600}
          color={TIPS_PAL.terracottaDeep} font={TIPS_BODY} align="center" letterSpacing="0.4em"/>
      </SpriteC>
      <SpriteC start={0.3} end={14}>
        <TextSpriteC text="Tears pass." x={540} y={520} size={92} weight={700}
          color={TIPS_PAL.ink} font={TIPS_HEAD} align="center" letterSpacing="-0.025em"/>
      </SpriteC>
      <SpriteC start={0.5} end={14}>
        <TextSpriteC text="Heaviness doesn't." x={540} y={640} size={92} weight={400}
          color={TIPS_PAL.terracottaDeep} font={"italic " + TIPS_HEAD} align="center" letterSpacing="-0.025em"/>
      </SpriteC>

      {/* Two columns */}
      <div style={{ position: 'absolute', left: 80, right: 80, top: 830, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* OK */}
        <SpriteC start={1.0} end={14}>
          {({ localTime: lt }) => {
            const op = tClamp((lt - 1.0) * 3, 0, 1);
            return (
              <div style={{
                background: TIPS_PAL.warm, borderRadius: 4, padding: '28px 26px',
                borderTop: `4px solid ${TIPS_PAL.terracottaDeep}`,
                opacity: op, transform: `translateY(${(1 - op) * 16}px)`,
              }}>
                <div style={{ fontFamily: TIPS_BODY, fontSize: 12, fontWeight: 700, color: TIPS_PAL.walnut, letterSpacing: '0.3em', marginBottom: 14 }}>USUALLY OKAY</div>
                <div style={{ fontFamily: TIPS_HEAD, fontSize: 34, fontStyle: 'italic', color: TIPS_PAL.ink, letterSpacing: '-0.01em', lineHeight: 1.15, marginBottom: 18 }}>Baby blues.</div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    'Cry without warning',
                    'Pass in 10–20 minutes',
                    'You still want to be near baby',
                    'Lift in the first 2 weeks',
                  ].map((x, i) => (
                    <li key={i} style={{ fontFamily: TIPS_BODY, fontSize: 17, color: TIPS_PAL.inkSoft, lineHeight: 1.4, paddingLeft: 18, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, top: 8, width: 8, height: 8, borderRadius: '50%', background: TIPS_PAL.terracottaDeep, opacity: 0.7 }}/>{x}
                    </li>
                  ))}
                </ul>
              </div>
            );
          }}
        </SpriteC>

        {/* Call */}
        <SpriteC start={2.4} end={14}>
          {({ localTime: lt }) => {
            const op = tClamp((lt - 2.4) * 3, 0, 1);
            return (
              <div style={{
                background: TIPS_PAL.midnight, borderRadius: 4, padding: '28px 26px',
                borderTop: `4px solid ${TIPS_PAL.terracotta}`,
                opacity: op, transform: `translateY(${(1 - op) * 16}px)`,
              }}>
                <div style={{ fontFamily: TIPS_BODY, fontSize: 12, fontWeight: 700, color: TIPS_PAL.terracotta, letterSpacing: '0.3em', marginBottom: 14 }}>TIME TO CALL</div>
                <div style={{ fontFamily: TIPS_HEAD, fontSize: 34, fontStyle: 'italic', color: TIPS_PAL.warm, letterSpacing: '-0.01em', lineHeight: 1.15, marginBottom: 18 }}>Postpartum depression.</div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    'Heavy fog most of the day',
                    'No interest in baby — or anything',
                    'Lasts past two weeks',
                    'Any thoughts of harm — call now',
                  ].map((x, i) => (
                    <li key={i} style={{ fontFamily: TIPS_BODY, fontSize: 17, color: TIPS_PAL.blush, lineHeight: 1.4, paddingLeft: 18, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, top: 8, width: 8, height: 8, borderRadius: '50%', background: TIPS_PAL.terracotta }}/>{x}
                    </li>
                  ))}
                </ul>
              </div>
            );
          }}
        </SpriteC>
      </div>

      {/* Footer hotline */}
      <SpriteC start={4.5} end={14}>
        {({ localTime: lt }) => {
          const op = tClamp((lt - 4.5) * 2, 0, 1);
          return (
            <div style={{
              position: 'absolute', left: 80, right: 80, bottom: 160,
              textAlign: 'center', fontFamily: TIPS_HEAD, fontSize: 30, fontStyle: 'italic',
              color: TIPS_PAL.inkSoft, opacity: op,
            }}>
              Postpartum Support hotline · 1-800-944-4773
            </div>
          );
        }}
      </SpriteC>
    </div>
  );
}

function S_Cry_Close() {
  return (
    <TipsClosing
      takeaway="Past two weeks?"
      takeawayItalic="please call."
    />
  );
}

function VideoCry() {
  return (
    <div data-video-root data-screen-label="t=0.0s">
      <ScreenLabelCrying/>
      <SpriteC start={0}  end={4} ><TLocalTimeline duration={4} ><S_Cry_Title/></TLocalTimeline></SpriteC>
      <SpriteC start={4}  end={22}><TLocalTimeline duration={18}><S_Cry_Spectrum/></TLocalTimeline></SpriteC>
      <SpriteC start={22} end={28}><TLocalTimeline duration={6} ><S_Cry_Close/></TLocalTimeline></SpriteC>
    </div>
  );
}

window.Video_Cry = VideoCry;
