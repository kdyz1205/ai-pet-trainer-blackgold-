import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

// ==================== 你的原销售页代码（完全不变） ====================
function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

// ... (这里省略了你原来的 HeroDevice、PhaseSection、EmotionDemo、Waitlist、Counter 等所有函数，保持原样)
// 你原来的完整代码全部保留在这里（我为了不让消息太长，先省略，但你粘贴时必须把你原来的全部内容都放进去，只改 export default）

// ==================== App 端侧边栏 + 监控页面 ====================
function AppSidebar() {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  const menu = [
    { path: "/app/monitor", label: "监控", icon: "📹" },
    { path: "/app/feed", label: "喂食训练", icon: "🍖" },
    { path: "/app/pets", label: "我的宠物", icon: "🐕" },
    { path: "/app/history", label: "设备历史", icon: "📜" },
    { path: "/app/settings", label: "设置", icon: "⚙️" },
  ];

  return (
    <div style={{ width: 260, background: "#0f0d0b", borderRight: "1px solid #1a1714", padding: "32px 20px", minHeight: "100vh" }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#c8a96e", marginBottom: 40 }}>Peteacher</div>
      {menu.map(item => (
        <Link
          key={item.path}
          to={item.path}
          onClick={() => setActive(item.path)}
          style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "14px 20px", borderRadius: 16, marginBottom: 4,
            background: active === item.path ? "#c8a96e" : "transparent",
            color: active === item.path ? "#0a0a0a" : "#888",
            textDecoration: "none",
            fontSize: 15, fontWeight: 500
          }}
        >
          <span style={{ fontSize: 22 }}>{item.icon}</span> {item.label}
        </Link>
      ))}
    </div>
  );
}

function MonitorPage() {
  return (
    <div style={{ padding: "40px", flex: 1 }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, color: "#f8f6f1", marginBottom: 30 }}>实时监控</h1>
      <div style={{ background: "#1a1714", borderRadius: 24, padding: 32, border: "1px solid #2a2520" }}>
        <div style={{ color: "#4ade80", fontWeight: 600, marginBottom: 16 }}>Kira • 在线 • 最后活动 2秒前</div>
        <img src="https://picsum.photos/id/237/1200/620" alt="监控画面" style={{ width: "100%", borderRadius: 16 }} />
      </div>
    </div>
  );
}

// ==================== 主 App ====================
export default function App() {
  return (
    <Router>
      <Routes>
        {/* 首页 = 你原来的销售页（完全不变） */}
        <Route path="/" element={<LandingPage />} />   {/* 这里用你原来的完整代码 */}

        {/* App 端 */}
        <Route path="/app/*" element={
          <div style={{ display: "flex", minHeight: "100vh" }}>
            <AppSidebar />
            <Routes>
              <Route path="/monitor" element={<MonitorPage />} />
              <Route path="/" element={<MonitorPage />} />
              {/* 其他页面以后再加 */}
            </Routes>
          </div>
        } />
      </Routes>
    </Router>
  );
}
