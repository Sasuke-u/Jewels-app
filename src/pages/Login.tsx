// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const gems = [
  { top: "8%", left: "10%", size: 40, color: "#c026d3", delay: 0.2 },
  { top: "15%", left: "85%", size: 50, color: "#3b82f6", delay: 0.5 },
  { top: "75%", left: "6%", size: 55, color: "#c026d3", delay: 0.8 },
  { top: "80%", left: "88%", size: 42, color: "#3b82f6", delay: 1.1 },
  { top: "40%", left: "5%", size: 30, color: "#3b82f6", delay: 1.4 },
  { top: "45%", left: "92%", size: 35, color: "#c026d3", delay: 1.7 },
  { top: "20%", left: "40%", size: 22, color: "#c026d3", delay: 2.0 },
  { top: "65%", left: "60%", size: 26, color: "#3b82f6", delay: 2.3 },
  { top: "88%", left: "35%", size: 28, color: "#c026d3", delay: 2.6 },
  { top: "10%", left: "60%", size: 24, color: "#3b82f6", delay: 2.9 },
];

const stars = Array.from({ length: 60 }, () => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 2 + 1,
  delay: Math.random() * 3,
}));

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (identifier && password) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    }
  };

  const brandName = "NERUSU JEWELS";

  return (
    <div className="login-page">
      {/* Full-page animated background */}
      <div className="bg-animation">
        {stars.map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              backgroundColor: "#fff",
              opacity: 0,
              animation: `twinkle 2.5s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}

        {gems.map((g, i) => (
          <div
            key={i}
            className="gem"
            style={{
              top: g.top,
              left: g.left,
              width: g.size,
              height: g.size,
              opacity: 0,
              animation: `popIn 0.7s ease-out ${g.delay}s forwards, float 4s ease-in-out ${g.delay + 0.7}s infinite`,
            }}
          >
            <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%" }}>
              <polygon
                points="12,2 22,9 12,22 2,9"
                fill={g.color}
                opacity="0.9"
                style={{ filter: `drop-shadow(0 0 6px ${g.color})` }}
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Centered content: logo → form → brand name */}
      <div className="content-column">
        <div className="sn-monogram">
          <svg width="90" height="90" viewBox="0 0 160 160">
            <defs>
              <linearGradient id="snGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff7d6" />
                <stop offset="25%" stopColor="#f3d27a" />
                <stop offset="50%" stopColor="#c9932f" />
                <stop offset="75%" stopColor="#f3d27a" />
                <stop offset="100%" stopColor="#8a6416" />
              </linearGradient>
              <filter id="snShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.5" />
              </filter>
            </defs>
            <text
              x="80"
              y="100"
              textAnchor="middle"
              fontFamily="'Playfair Display', 'Georgia', serif"
              fontStyle="italic"
              fontWeight="700"
              fontSize="72"
              fill="url(#snGradient)"
              filter="url(#snShadow)"
              stroke="#5c430f"
              strokeWidth="0.5"
            >
              SN
            </text>
          </svg>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#111", textAlign: "center", margin: 0 }}>
            Sign In
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", fontWeight: 600, color: "#111" }}>
              Mobile Number or Username
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              style={{ padding: "12px", border: "1px solid #111", borderRadius: "4px", fontSize: "14px", outline: "none" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", fontWeight: 600, color: "#111" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ padding: "12px", border: "1px solid #111", borderRadius: "4px", fontSize: "14px", outline: "none" }}
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: "8px",
              backgroundColor: "#111",
              color: "#fff",
              border: "none",
              padding: "13px",
              borderRadius: "4px",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#333")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#111")}
          >
            Log In
          </button>
        </form>

        <h1 className="brand-text">
          {brandName.split("").map((char, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                opacity: 0,
                animation: `letterPop 0.4s ease-out ${1.6 + i * 0.05}s forwards`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      </div>

      <style>{`
        .login-page {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: radial-gradient(circle at center, #3b0764 0%, #1e0836 35%, #000 75%);
        }

        .bg-animation {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .gem {
          position: absolute;
        }

        .content-column {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          padding: 24px;
        }

        .sn-monogram {
          opacity: 0;
          animation: diamondFade 1.2s ease-out 0.3s forwards, pulse 3s ease-in-out 1.5s infinite;
        }

        .login-form {
          width: 100%;
          max-width: 360px;
          background: rgba(255, 255, 255, 0.97);
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 8px;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.5);
        }

        .brand-text {
          display: flex;
          gap: 2px;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 4px;
          color: #fff;
          margin: 0;
          white-space: nowrap;
        }

        @media (max-width: 480px) {
          .sn-monogram svg { width: 70px; height: 70px; }
          .brand-text { font-size: 14px; letter-spacing: 2px; }
          .login-form { padding: 24px 20px; }
        }

        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.4) rotate(-15deg); }
          70% { opacity: 1; transform: scale(1.15) rotate(5deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.8; }
        }
        @keyframes diamondFade {
          0% { opacity: 0; transform: scale(0.6); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          0%, 100% { filter: drop-shadow(0 0 15px #d946ef) drop-shadow(0 0 30px #3b82f6); }
          50% { filter: drop-shadow(0 0 25px #d946ef) drop-shadow(0 0 45px #3b82f6); }
        }
        @keyframes letterPop {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}