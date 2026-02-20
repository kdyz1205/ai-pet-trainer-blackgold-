import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";   // ← 你原来的销售页
import AppLayout from "./AppLayout";       // ← 新建的 App 端（带侧边栏）

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 首页保持你原来的漂亮销售页 */}
        <Route path="/" element={<LandingPage />} />
        
        {/* App 端（监控、喂食训练等） */}
        <Route path="/app/*" element={<AppLayout />} />
      </Routes>
    </Router>
  );
}
