import { useState, useEffect, useRef } from "react";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = end / 50;
    const t = setInterval(() => {
      current += step;
      if (current >= end) { setVal(end); clearInterval(t); }
      else setVal(Math.floor(current));
    }, 20);
    return () => clearInterval(t);
  }, [inView, end]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

function HeroDevice() {
  const buttons = [
    { icon: "💧", label: "Water", color: "#7c9cf8" },
    { icon: "🍖", label: "Food", color: "#c8a96e" },
    { icon: "🌿", label: "Outside", color: "#4ade80" },
    { icon: "🎾", label: "Play", color: "#e879a0" },
    { icon: "❤️", label: "Love", color: "#f87171" },
    { icon: "😴", label: "Sleep", color: "#a78bfa" },
  ];
  const messages = [
    "🐕 Kira pressed WATER → treat dispensed ✓",
    "🐕 Kira pressed FOOD → treat dispensed ✓",
    "🐕 Kira pressed PLAY → treat dispensed ✓",
    "🐕 Kira pressed OUTSIDE → treat dispensed ✓",
  ];
  const activeMap = [0, 1, 3, 2];
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(p => (p + 1) % 4), 2500);
    return () => clearInterval(t);
  }, []);
  const activeBtn = activeMap[tick];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <div style={{
        background: "linear-gradient(150deg,#1a1714,#0d0b09)",
        border: "1px solid #2a2520", borderRadius: 32, padding: "32px 28px",
        width: 340, boxShadow: "0 60px 120px rgba(0,0,0,0.7)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80" }} />
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,#c8a96e33,transparent)" }} />
          <span style={{ fontSize: 10, color: "#444", letterSpacing: "0.12em", fontFamily: "monospace" }}>PETEACHER·01</span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(270deg,#c8a96e33,transparent)" }} />
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} style={{ width: 3, height: 14, borderRadius: 2, background: "#2a2520" }} />
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {buttons.map((btn, i) => {
            const isActive = i === activeBtn;
            return (
              <div key={i} style={{
                width: 88, height: 88, borderRadius: 20,
                background: isActive ? btn.color : "#161210",
                border: `2px solid ${isActive ? btn.color : "#2a2520"}`,
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", gap: 4,
                transform: isActive ? "scale(0.93)" : "scale(1)",
                boxShadow: isActive ? `0 0 24px ${btn.color}55` : "none",
                transition: "all 0.25s ease",
              }}>
                <span style={{ fontSize: 30 }}>{btn.icon}</span>
                <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: isActive ? "#0a0a0a" : "#555" }}>{btn.label}</span>
              </div>
            );
          })}
        </div>
        <div style={{ background: "#0d0b09", border: "1px solid #2a2520", borderRadius: 16, padding: "12px 16px", width: "100%", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 20 }}>🎁</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: "#c8a96e", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Reward Dispenser</div>
            <div style={{ fontSize: 10, color: "#444", marginTop: 2 }}>Instant positive reinforcement</div>
          </div>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
        </div>
      </div>
      <div style={{
        background: "rgba(200,169,110,0.08)", border: "1px solid rgba(200,169,110,0.2)",
        borderRadius: 100, padding: "10px 22px", color: "#c8a96e", fontSize: 13,
        transition: "opacity 0.3s",
      }}>
        {messages[tick]}
      </div>
    </div>
  );
}

function PhaseSection({
  num, month, icon, title, subtitle, accent, bullets, delay,
}: {
  num: string; month: string; icon: string; title: string; subtitle: string;
  accent: string; bullets: string[]; delay: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} style={{
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center",
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(48px)",
      transition: `opacity 0.8s ${delay}s, transform 0.8s ${delay}s`,
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            background: accent + "18", border: `1px solid ${accent}44`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
          }}>{icon}</div>
          <span style={{ fontSize: 11, color: accent, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600 }}>{month}</span>
        </div>
        <div>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,3vw,44px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#f8f6f1", marginBottom: 8 }}>{title}</h3>
          <p style={{ fontSize: 16, color: "#666" }}>{subtitle}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {bullets.map((b, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{
                width: 24, height: 24, borderRadius: "50%", flexShrink: 0, marginTop: 2,
                background: accent + "18", border: `1px solid ${accent}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, color: accent, fontWeight: 700,
              }}>{i + 1}</div>
              <p style={{ fontSize: 15, color: "#888", lineHeight: 1.65 }}>{b}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Visual panels */}
      <div style={{ background: "#0f0d0b", border: "1px solid #1e1b18", borderRadius: 28, padding: 28 }}>
        <div style={{ fontFamily: "monospace", fontSize: 10, color: "#333", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>PHASE {num} · LIVE PREVIEW</div>
        {num === "01" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "#161210", borderRadius: 16, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontSize: 32 }}>🔊</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: "#c8a96e", fontWeight: 600, marginBottom: 8 }}>Sound plays</div>
                <div style={{ height: 3, background: "#1e1b18", borderRadius: 2 }}>
                  <div style={{ height: "100%", width: "65%", background: "#c8a96e", borderRadius: 2 }} />
                </div>
              </div>
              <span style={{ color: "#444", fontSize: 18 }}>→</span>
              <span style={{ fontSize: 32 }}>🎁</span>
            </div>
            <div style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.12)", borderRadius: 16, padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 6 }}>🐕</div>
              <div style={{ fontSize: 13, color: "#4ade80" }}>Curiosity → Approach → Reward</div>
            </div>
            <div style={{ background: "#161210", borderRadius: 16, padding: "12px 16px" }}>
              <div style={{ fontSize: 10, color: "#444", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Association strength — Day 14</div>
              <div style={{ height: 4, background: "#1e1b18", borderRadius: 2 }}>
                <div style={{ height: "100%", width: "78%", background: "linear-gradient(90deg,#c8a96e,#e8d5b0)", borderRadius: 2 }} />
              </div>
            </div>
          </div>
        )}
        {num === "02" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { btn: "💧", label: "Water", obj: "🥣", objName: "Water Bowl", color: "#7c9cf8" },
              { btn: "🍖", label: "Food", obj: "🍽️", objName: "Food Bowl", color: "#c8a96e" },
              { btn: "🌿", label: "Outside", obj: "🚪", objName: "Front Door", color: "#4ade80" },
              { btn: "🎾", label: "Play", obj: "🧸", objName: "Toy Basket", color: "#e879a0" },
            ].map((item, i) => (
              <div key={i} style={{
                background: item.color + "08", border: `1px solid ${item.color}20`,
                borderRadius: 14, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12,
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "#161210", border: `2px solid ${item.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{item.btn}</div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 10, color: item.color, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{item.label}</span>
                  <span style={{ fontSize: 10, color: "#444" }}> = {item.objName}</span>
                </div>
                <span style={{ fontSize: 22 }}>{item.obj}</span>
              </div>
            ))}
          </div>
        )}
        {num === "03" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "rgba(232,121,160,0.06)", border: "1px solid rgba(232,121,160,0.15)", borderRadius: 16, padding: 16 }}>
              <div style={{ fontSize: 10, color: "#e879a0", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>Vocabulary Growth</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 56 }}>
                {[15, 28, 40, 52, 63, 78, 94].map((h, i) => (
                  <div key={i} style={{ flex: 1, height: `${h}%`, background: `rgba(232,121,160,${0.2 + i * 0.11})`, borderRadius: "4px 4px 0 0" }} />
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                <span style={{ fontSize: 9, color: "#444" }}>Week 1</span>
                <span style={{ fontSize: 9, color: "#e879a0" }}>Week 12 · 47 words</span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { n: "47", label: "Words learned", color: "#e879a0" },
                { n: "94%", label: "Accuracy", color: "#e879a0" },
                { n: "0", label: "Human prompts", color: "#4ade80" },
                { n: "3×", label: "Faster than avg", color: "#c8a96e" },
              ].map((s, i) => (
                <div key={i} style={{ background: "#161210", borderRadius: 14, padding: "12px 14px", border: "1px solid #2a2520" }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 900, color: s.color }}>{s.n}</div>
                  <div style={{ fontSize: 10, color: "#555", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EmotionDemo() {
  const { ref, inView } = useInView();
  const emotions = [
    { icon: "💧", label: "Thirsty", color: "#7c9cf8" },
    { icon: "🍖", label: "Hungry", color: "#c8a96e" },
    { icon: "❤️", label: "Love", color: "#e879a0" },
    { icon: "😟", label: "Scared", color: "#94a3b8" },
    { icon: "🎾", label: "Play", color: "#4ade80" },
    { icon: "🌿", label: "Outside", color: "#86efac" },
    { icon: "😴", label: "Tired", color: "#a78bfa" },
    { icon: "😣", label: "Pain", color: "#f87171" },
  ];
  const [pressed, setPressed] = useState<number | null>(null);
  const [log, setLog] = useState<{ icon: string; label: string; time: string }[]>([]);

  const handlePress = (i: number) => {
    const em = emotions[i];
    setPressed(i);
    setLog(prev => [
      { icon: em.icon, label: em.label, time: new Date().toLocaleTimeString() },
      ...prev.slice(0, 4),
    ]);
    setTimeout(() => setPressed(null), 700);
  };

  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(48px)", transition: "opacity 0.8s, transform 0.8s" }}>
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <div style={{ fontSize: 11, color: "#c8a96e", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>Month 3+ · The Vision</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1, color: "#f8f6f1", marginBottom: 16 }}>
          Your pet now has<br /><em style={{ color: "#c8a96e", fontStyle: "italic" }}>a voice.</em>
        </h2>
        <p style={{ fontSize: 17, color: "#666", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
          Once vocabulary is mastered, the AI autonomously designs new curricula — teaching your pet to express needs and emotions through buttons alone.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>
        <div style={{ background: "#0f0d0b", border: "1px solid #1e1b18", borderRadius: 28, padding: 28 }}>
          <div style={{ fontFamily: "monospace", fontSize: 10, color: "#333", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>INTERACTIVE · CLICK ANY BUTTON</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
            {emotions.map((em, i) => (
              <div key={i} onClick={() => handlePress(i)} style={{
                height: 74, borderRadius: 16, cursor: "pointer",
                background: pressed === i ? em.color : "#161210",
                border: `2px solid ${pressed === i ? em.color : "#2a2520"}`,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
                transform: pressed === i ? "scale(0.91)" : "scale(1)",
                boxShadow: pressed === i ? `0 0 22px ${em.color}55` : "none",
                transition: "all 0.2s ease",
              }}>
                <span style={{ fontSize: 26 }}>{em.icon}</span>
                <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: pressed === i ? "#0a0a0a" : "#555" }}>{em.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "#0f0d0b", border: "1px solid #1e1b18", borderRadius: 28, padding: 28, minHeight: 220 }}>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: "#333", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>COMMUNICATION LOG</div>
            {log.length === 0 ? (
              <div style={{ color: "#2a2520", fontSize: 14, textAlign: "center", paddingTop: 40 }}>Press a button to see Kira speak…</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {log.map((entry, i) => (
                  <div key={i} style={{
                    background: i === 0 ? "rgba(200,169,110,0.08)" : "#0d0b09",
                    border: `1px solid ${i === 0 ? "rgba(200,169,110,0.2)" : "#1a1714"}`,
                    borderRadius: 12, padding: "10px 14px", fontSize: 13,
                    color: i === 0 ? "#c8a96e" : "#444", opacity: 1 - i * 0.2,
                    transition: "all 0.3s",
                  }}>
                    {entry.icon} Kira pressed <strong style={{ color: i === 0 ? "#e8d5b0" : "#666" }}>"{entry.label}"</strong>
                    <span style={{ float: "right", fontSize: 10, color: "#333" }}>{entry.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ background: "rgba(232,121,160,0.04)", border: "1px solid rgba(232,121,160,0.12)", borderRadius: 24, padding: 20 }}>
            <div style={{ fontSize: 10, color: "#e879a0", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>AI Insight</div>
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7 }}>Kira presses "Thirsty" most at 3PM daily. AI will now schedule water reminders and introduce "More water" as her next vocabulary target.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Waitlist() {
  const { ref, inView } = useInView();
  const [email, setEmail] = useState("");
  const [pet, setPet] = useState("dog");
  const [done, setDone] = useState(false);
  const pets = [{ key: "dog", icon: "🐕", label: "Dog" }, { key: "cat", icon: "🐈", label: "Cat" }, { key: "rabbit", icon: "🐰", label: "Rabbit" }, { key: "bird", icon: "🦜", label: "Bird" }];

  return (
    <div id="waitlist" ref={ref} style={{ textAlign: "center", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(48px)", transition: "opacity 0.8s, transform 0.8s" }}>
      <div style={{ fontSize: 11, color: "#c8a96e", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>Early Access</div>
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(40px,6vw,80px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.94, color: "#f8f6f1", marginBottom: 24 }}>
        Give your pet<br /><em style={{ color: "#c8a96e", fontStyle: "italic" }}>a voice.</em>
      </h2>
      <p style={{ fontSize: 17, color: "#666", marginBottom: 40 }}>Limited first batch. Join 2,400+ on the waitlist.</p>
      {done ? (
        <div style={{ maxWidth: 440, margin: "0 auto", background: "rgba(200,169,110,0.08)", border: "1px solid rgba(200,169,110,0.2)", borderRadius: 28, padding: 40 }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>🎉</div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: "#f8f6f1", marginBottom: 8 }}>You're on the list.</div>
          <div style={{ fontSize: 14, color: "#666" }}>We'll reach out when your device is ready to ship.</div>
        </div>
      ) : (
        <div style={{ maxWidth: 440, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", gap: 8 }}>
            {pets.map(p => (
              <div key={p.key} onClick={() => setPet(p.key)} style={{
                flex: 1, padding: "12px 4px", borderRadius: 16, cursor: "pointer",
                textAlign: "center", fontSize: 13, fontWeight: 500,
                background: pet === p.key ? "#c8a96e" : "#161210",
                border: `2px solid ${pet === p.key ? "#c8a96e" : "#2a2520"}`,
                color: pet === p.key ? "#0a0a0a" : "#555",
                transition: "all 0.2s",
              }}>
                <div style={{ fontSize: 20, marginBottom: 2 }}>{p.icon}</div>{p.label}
              </div>
            ))}
          </div>
          <input
            type="email" placeholder="your@email.com" value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: "100%", padding: "16px 20px", borderRadius: 18, background: "#161210", border: "2px solid #2a2520", color: "#f8f6f1", fontSize: 15, fontFamily: "inherit", outline: "none" }}
          />
          <button onClick={() => email && setDone(true)} style={{ width: "100%", padding: 16, borderRadius: 100, background: "#c8a96e", color: "#0a0a0a", border: "none", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
            Reserve My Device →
          </button>
          <div style={{ fontSize: 12, color: "#444" }}>No payment now · Free shipping for early backers · Ships Q4 2025</div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const phases = [
    {
      num: "01", month: "Month 1", icon: "🎁", title: "The device earns trust.", subtitle: "Pavlovian foundation", accent: "#c8a96e",
      bullets: ["Device plays a tone and dispenses a treat — before any training begins.", "Pet learns: this object = good things. Pure association, no commands.", "After 5–7 days, the pet actively approaches and interacts on its own."],
    },
    {
      num: "02", month: "Month 2", icon: "🔗", title: "Words meet the world.", subtitle: "Language begins", accent: "#7c9cf8",
      bullets: ["Each button is placed next to its object: water bowl, food dish, front door.", "You say the word. The device echoes it. Pet presses → instant reward.", "Repetition builds a stable word–object–action map in the pet's mind."],
    },
    {
      num: "03", month: "Month 3+", icon: "🤖", title: "AI takes the wheel.", subtitle: "Adaptive intelligence", accent: "#e879a0",
      bullets: ["AI analyses press speed, accuracy, and consistency across every session.", "Hints fade automatically. Difficulty scales per individual pet.", "Pet expresses needs and emotions via buttons — no human prompting needed."],
    },
  ];

  return (
    <div style={{ background: "#0a0a0a", color: "#f8f6f1", fontFamily: "'DM Sans',sans-serif", fontWeight: 300, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::selection{background:rgba(200,169,110,0.25)}
        a{text-decoration:none;color:inherit}
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: scrolled ? "14px 60px" : "24px 60px", background: scrolled ? "rgba(10,10,10,0.9)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid #1a1714" : "none", transition: "all 0.35s ease" }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>
          Pete<span style={{ color: "#c8a96e" }}>.</span>acher
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {["How It Works", "Science", "Specs"].map(l => (
            <a key={l} href="#" style={{ fontSize: 14, color: "#666", letterSpacing: "0.02em" }}>{l}</a>
          ))}
          <a href="#waitlist" style={{ fontSize: 14, fontWeight: 600, color: "#0a0a0a", background: "#c8a96e", padding: "10px 22px", borderRadius: 100 }}>Join Waitlist</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "140px 40px 80px" }}>
        <div style={{ fontSize: 11, color: "#c8a96e", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 600, marginBottom: 28 }}>Plug-and-Play Pet Language Device</div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(52px,9vw,120px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.92, maxWidth: 900, marginBottom: 28 }}>
          Your pet has more<br />to say than<br /><em style={{ color: "#c8a96e", fontStyle: "italic" }}>you know.</em>
        </h1>
        <p style={{ fontSize: "clamp(16px,1.8vw,20px)", color: "#666", maxWidth: 540, lineHeight: 1.7, marginBottom: 48 }}>
          A physical device that teaches pets to understand words — and eventually press buttons to tell you exactly what they want.
        </p>
        <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 72 }}>
          <a href="#waitlist" style={{ background: "#c8a96e", color: "#0a0a0a", padding: "16px 36px", borderRadius: 100, fontSize: 16, fontWeight: 600 }}>Join the Waitlist</a>
          <a href="#how" style={{ color: "#555", fontSize: 15 }}>See how it works →</a>
        </div>
        <HeroDevice />
      </section>

      {/* STATS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: "1px solid #1a1714", borderBottom: "1px solid #1a1714" }}>
        {[{ end: 200, suffix: "+", label: "Words teachable" }, { end: 14, suffix: " days", label: "First word avg" }, { end: 94, suffix: "%", label: "Pet success rate" }, { end: 2400, suffix: "+", label: "On waitlist" }].map((s, i) => (
          <div key={i} style={{ padding: "52px 40px", borderRight: i < 3 ? "1px solid #1a1714" : "none" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 52, fontWeight: 900, letterSpacing: "-0.03em", color: "#f8f6f1", marginBottom: 8 }}>
              <Counter end={s.end} suffix={s.suffix} />
            </div>
            <div style={{ fontSize: 11, color: "#444", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* HOW IT WORKS */}
      <section id="how" style={{ maxWidth: 1160, margin: "0 auto", padding: "120px 60px" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <div style={{ fontSize: 11, color: "#c8a96e", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>The System</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1, color: "#f8f6f1" }}>
            Three phases.<br /><em style={{ color: "#c8a96e", fontStyle: "italic" }}>One brilliant pet.</em>
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 96 }}>
          {phases.map((p, i) => <PhaseSection key={i} {...p} delay={i * 0.1} />)}
        </div>
      </section>

      {/* PULL QUOTE */}
      <div style={{ textAlign: "center", padding: "96px 40px", borderTop: "1px solid #1a1714", borderBottom: "1px solid #1a1714", background: "#080806" }}>
        <blockquote style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(22px,3vw,42px)", fontStyle: "italic", fontWeight: 400, color: "#f8f6f1", maxWidth: 800, margin: "0 auto", lineHeight: 1.4 }}>
          "The difference between a pet that obeys and a pet that <span style={{ color: "#c8a96e" }}>communicates</span> is the difference between a tool and a partner."
        </blockquote>
        <div style={{ fontSize: 11, color: "#333", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 20 }}>— Peteacher design philosophy</div>
      </div>

      {/* EMOTION DEMO */}
      <section style={{ maxWidth: 1160, margin: "0 auto", padding: "120px 60px" }}>
        <EmotionDemo />
      </section>

      {/* SPECS */}
      <section style={{ maxWidth: 1160, margin: "0 auto", padding: "0 60px 120px", borderTop: "1px solid #1a1714", paddingTop: 80 }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontSize: 11, color: "#c8a96e", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>The Hardware</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(32px,4vw,56px)", fontWeight: 900, letterSpacing: "-0.03em", color: "#f8f6f1" }}>
            Designed for <em style={{ color: "#c8a96e", fontStyle: "italic" }}>daily life.</em>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {[
            { icon: "🔌", title: "Plug & Play", desc: "Zero setup. Place buttons next to objects, plug in, and start training the same day." },
            { icon: "🎁", title: "Built-in Dispenser", desc: "Automatic treat release on correct button press. Timing is the key to learning." },
            { icon: "🔊", title: "Voice + Sound", desc: "Plays your voice or AI-generated audio for each button. Word–object–sound trinity." },
            { icon: "📱", title: "App Connected", desc: "Review sessions, track vocabulary growth, and let AI adjust the curriculum daily." },
            { icon: "🌐", title: "Works Offline", desc: "Core training needs no internet. Cloud sync when you're connected." },
            { icon: "🧩", title: "Expandable", desc: "Start with 6 buttons. Expand to 200+. Attach buttons to any surface, anywhere." },
          ].map((s, i) => (
            <div key={i} style={{ background: "#0f0d0b", border: "1px solid #1a1714", borderRadius: 24, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
              <span style={{ fontSize: 32 }}>{s.icon}</span>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color: "#f8f6f1" }}>{s.title}</div>
              <div style={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WAITLIST */}
      <section style={{ padding: "120px 60px", borderTop: "1px solid #1a1714" }}>
        <Waitlist />
      </section>

      {/* FOOTER */}
      <footer style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "28px 60px", borderTop: "1px solid #1a1714" }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700 }}>
          Pete<span style={{ color: "#c8a96e" }}>.</span>acher
        </div>
        <div style={{ fontSize: 13, color: "#333" }}>© 2025 Peteacher · Teaching pets to speak.</div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy", "Terms", "Contact"].map(l => (
            <a key={l} href="#" style={{ fontSize: 13, color: "#444" }}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
