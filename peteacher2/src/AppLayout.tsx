import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const menuItems = [
  { path: "/app/monitor", label: "监控", icon: "📹" },
  { path: "/app/feed", label: "喂食训练", icon: "🍖" },
  { path: "/app/pets", label: "我的宠物", icon: "🐕" },
  { path: "/app/history", label: "设备历史", icon: "📜" },
  { path: "/app/settings", label: "设置", icon: "⚙️" },
];

export default function AppLayout() {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  return (
    <div style={{ 
      display: "flex", 
      minHeight: "100vh", 
      background: "#0a0a0a", 
      color: "#f8f6f1", 
      fontFamily: "'DM Sans', sans-serif" 
    }}>
      {/* 左侧侧边栏 */}
      <div style={{
        width: 260, 
        background: "#0f0d0b", 
        borderRight: "1px solid #1a1714",
        padding: "32px 20px", 
        display: "flex", 
        flexDirection: "column", 
        gap: 8
      }}>
        <div style={{ 
          fontFamily: "'Playfair Display', serif", 
          fontSize: 28, 
          fontWeight: 700, 
          marginBottom: 40, 
          color: "#c8a96e" 
        }}>
          Peteacher
        </div>

        {menuItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setActive(item.path)}
            style={{
              padding: "14px 20px", 
              borderRadius: 16,
              background: active === item.path ? "#c8a96e" : "transparent",
              color: active === item.path ? "#0a0a0a" : "#888",
              fontSize: 15, 
              fontWeight: 500,
              textDecoration: "none", 
              display: "flex", 
              alignItems: "center", 
              gap: 12,
              transition: "all 0.2s"
            }}
          >
            <span style={{ fontSize: 22 }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>

      {/* 右侧内容区 */}
      <div style={{ flex: 1, padding: "40px" }}>
        <Outlet />
      </div>
    </div>
  );
}
