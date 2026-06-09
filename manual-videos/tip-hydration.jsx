// tip-hydration.jsx — Quick Tip 06: Drink when baby eats
// 28s, 9:16

const { Stage: StageH, Sprite: SpriteH, useSprite: useSpriteH, TextSprite: TextSpriteH, TimelineContext: CtxH, useTime: useTimeH } = window;

function ScreenLabelHydration() {
  const time = useTimeH();
  React.useEffect(() => {
    const root = document.querySelector('[data-video-root]');
    if (root) root.setAttribute('data-screen-label', `t=${time.toFixed(1)}s`);
  }, [Math.floor(time)]);
  return null;
}

function S_Hyd_Title() {
  return (
    <TipTitleCard
      eyebrow="TIP 06 · RECOVERY"
      title="Drink when"
      titleAccent="baby eats."
      subtitle={"The simplest hydration rule —\nyour body asks twice."}
    />
  );
}

function S_Hyd_Pairs() {
  // Each row: baby feed paired with a glass of water
  const rows = [
    { t: 0.4, when: 'EVERY FEED',  body: "Glass of water in your free hand. Sip while baby sips. No timer needed." },
    { t: 1.6, when: 'EVERY PUMP',  body: "Pumping pulls another 100 mL. Refill before you start, not after." },
    { t: 2.8, when: 'OVERNIGHT',   body: "Bedside bottle, room temp. The 3 a.m. wake is for both of you." },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, background: TIPS_PAL.cream }}>
      <TipsChrome tipNum="06" label="HYDRATION"/>

      <SpriteH start={0.1} end={14}>
        <TextSpriteH text="THE 1-FOR-1 RULE" x={540} y={400} size={22} weight={600}
          color={TIPS_PAL.terracottaDeep} font={TIPS_BODY} align="center" letterSpacing="0.4em"/>
      </SpriteH>
      <SpriteH start={0.3} end={14}>
        <TextSpriteH text="One glass" x={540} y={520} size={108} weight={700}
          color={TIPS_PAL.ink} font={TIPS_HEAD} align="center" letterSpacing="-0.025em"/>
      </SpriteH>
      <SpriteH start={0.5} end={14}>
        <TextSpriteH text="per feed." x={540} y={650} size={108} weight={400}
          color={TIPS_PAL.terracottaDeep} font={"italic " + TIPS_HEAD} align="center" letterSpacing="-0.025em"/>
      </SpriteH>

      {/* Pairs rendered as side-by-side bottle + glass icons */}
      <div style={{ position: 'absolute', left: 80, right: 80, top: 850, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {rows.map((r, i) => (
          <SpriteH key={i} start={r.t} end={14}>
            {({ localTime: lt }) => {
              const op = tClamp((lt - r.t) * 3, 0, 1);
              return (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 24,
                  padding: '24px 28px', background: TIPS_PAL.warm,
                  borderLeft: `4px solid ${TIPS_PAL.terracottaDeep}`,
                  borderRadius: 4,
                  opacity: op, transform: `translateX(${(1 - op) * 16}px)`,
                }}>
                  {/* Mini icon: bottle + glass */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, minWidth: 92 }}>
                    {/* baby bottle */}
                    <svg width="32" height="64" viewBox="0 0 32 64">
                      <rect x="10" y="0" width="12" height="6" rx="2" fill={TIPS_PAL.walnut}/>
                      <rect x="6"  y="6" width="20" height="6" rx="2" fill={TIPS_PAL.terracotta}/>
                      <path d="M 6 12 Q 4 16 4 22 L 4 58 Q 4 62 8 62 L 24 62 Q 28 62 28 58 L 28 22 Q 28 16 26 12 Z" fill="#FBF6EE" stroke={TIPS_PAL.walnut} strokeWidth="1.5"/>
                      <rect x="8" y="34" width="16" height="22" fill={TIPS_PAL.terracottaDeep} opacity="0.5"/>
                    </svg>
                    {/* equals */}
                    <div style={{ fontFamily: TIPS_HEAD, fontSize: 28, fontWeight: 400, fontStyle: 'italic', color: TIPS_PAL.walnut, marginBottom: 18 }}>+</div>
                    {/* water glass */}
                    <svg width="36" height="60" viewBox="0 0 36 60">
                      <path d="M 4 4 L 32 4 L 28 56 Q 28 58 26 58 L 10 58 Q 8 58 8 56 Z" fill="#FBF6EE" stroke={TIPS_PAL.walnut} strokeWidth="1.5"/>
                      <path d="M 6 24 L 30 24 L 28 56 Q 28 58 26 58 L 10 58 Q 8 58 8 56 Z" fill={TIPS_PAL.terracotta} opacity="0.5"/>
                      <ellipse cx="18" cy="24" rx="12" ry="2" fill={TIPS_PAL.terracottaDeep} opacity="0.6"/>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: TIPS_BODY, fontSize: 13, fontWeight: 700, color: TIPS_PAL.walnut, letterSpacing: '0.3em', marginBottom: 6 }}>{r.when}</div>
                    <div style={{ fontFamily: TIPS_BODY, fontSize: 19, fontWeight: 400, color: TIPS_PAL.inkSoft, lineHeight: 1.45 }}>{r.body}</div>
                  </div>
                </div>
              );
            }}
          </SpriteH>
        ))}
      </div>

      {/* Footer reminder */}
      <SpriteH start={4.5} end={14}>
        {({ localTime: lt }) => {
          const op = tClamp((lt - 4.5) * 2, 0, 1);
          return (
            <div style={{
              position: 'absolute', left: 80, right: 80, bottom: 160,
              textAlign: 'center', fontFamily: TIPS_HEAD, fontSize: 30, fontStyle: 'italic',
              color: TIPS_PAL.inkSoft, opacity: op,
            }}>
              You'll know you're hydrated when your urine looks like pale lemonade.
            </div>
          );
        }}
      </SpriteH>
    </div>
  );
}

function S_Hyd_Close() {
  return (
    <TipsClosing
      takeaway="Their thirst"
      takeawayItalic="is yours."
    />
  );
}

function VideoHyd() {
  return (
    <div data-video-root data-screen-label="t=0.0s">
      <ScreenLabelHydration/>
      <SpriteH start={0}  end={4} ><TLocalTimeline duration={4} ><S_Hyd_Title/></TLocalTimeline></SpriteH>
      <SpriteH start={4}  end={22}><TLocalTimeline duration={18}><S_Hyd_Pairs/></TLocalTimeline></SpriteH>
      <SpriteH start={22} end={28}><TLocalTimeline duration={6} ><S_Hyd_Close/></TLocalTimeline></SpriteH>
    </div>
  );
}

window.Video_Hyd = VideoHyd;
