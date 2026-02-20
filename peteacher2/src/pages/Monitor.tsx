export default function Monitor() {
  return (
    <div>
      <h1 style={{ 
        fontFamily: "'Playfair Display', serif", 
        fontSize: 48, 
        fontWeight: 900, 
        letterSpacing: "-0.03em",
        color: "#f8f6f1", 
        marginBottom: 40 
      }}>
        实时监控
      </h1>

      {/* 摄像头画面 */}
      <div style={{ 
        background: "#1a1714", 
        borderRadius: 24, 
        padding: 32, 
        marginBottom: 40,
        border: "1px solid #2a2520"
      }}>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: 12, 
          marginBottom: 16 
        }}>
          <div style={{ 
            width: 12, 
            height: 12, 
            background: "#4ade80", 
            borderRadius: "50%", 
            boxShadow: "0 0 12px #4ade80" 
          }} />
          <span style={{ color: "#4ade80", fontWeight: 600 }}>Kira • 在线 • 最后活动 3秒前</span>
        </div>
        
        <img 
          src="https://picsum.photos/id/237/1200/620" 
          alt="实时画面" 
          style={{ 
            width: "100%", 
            borderRadius: 16, 
            border: "1px solid #2a2520" 
          }} 
        />
      </div>

      {/* 数据卡片 */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", 
        gap: 20 
      }}>
        <div style={{ 
          background: "#161210", 
          padding: 28, 
          borderRadius: 20, 
          border: "1px solid #2a2520" 
        }}>
          <div style={{ color: "#888", fontSize: 13, marginBottom: 8 }}>今日按压次数</div>
          <div style={{ 
            fontSize: 62, 
            fontWeight: 700, 
            color: "#c8a96e", 
            lineHeight: 1 
          }}>47</div>
        </div>

        <div style={{ 
          background: "#161210", 
          padding: 28, 
          borderRadius: 20, 
          border: "1px solid #2a2520" 
        }}>
          <div style={{ color: "#888", fontSize: 13, marginBottom: 8 }}>当前词汇量</div>
          <div style={{ 
            fontSize: 62, 
            fontWeight: 700, 
            color: "#c8a96e", 
            lineHeight: 1 
          }}>12</div>
        </div>

        <div style={{ 
          background: "#161210", 
          padding: 28, 
          borderRadius: 20, 
          border: "1px solid #2a2520" 
        }}>
          <div style={{ color: "#888", fontSize: 13, marginBottom: 8 }}>今日喂食</div>
          <div style={{ 
            fontSize: 62, 
            fontWeight: 700, 
            color: "#c8a96e", 
            lineHeight: 1 
          }}>3次</div>
        </div>
      </div>
    </div>
  );
}
