// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import snLogo from "../assets/sn-logo.png";

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

  const brandName = "Nerusu Jewels";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background pop-up images — replace these src paths once you send your photos */}
      <img
        src={snLogo}
        alt=""
        style={{
          position: "absolute",
          top: "8%",
          left: "10%",
          width: "70px",
          opacity: 0,
          animation: "popIn 0.6s ease-out 0.3s forwards",
        }}
      />
      <img
        src={snLogo}
        alt=""
        style={{
          position: "absolute",
          bottom: "12%",
          right: "8%",
          width: "90px",
          opacity: 0,
          animation: "popIn 0.6s ease-out 0.8s forwards",
        }}
      />
      <img
        src={snLogo}
        alt=""
        style={{
          position: "absolute",
          top: "15%",
          right: "15%",
          width: "50px",
          opacity: 0,
          animation: "popIn 0.6s ease-out 1.3s forwards",
        }}
      />
      <img
        src={snLogo}
        alt=""
        style={{
          position: "absolute",
          bottom: "20%",
          left: "12%",
          width: "60px",
          opacity: 0,
          animation: "popIn 0.6s ease-out 1.8s forwards",
        }}
      />

      {/* Brand name — letters pop in one by one */}
      <h1
        style={{
          display: "flex",
          fontSize: "32px",
          fontWeight: 800,
          color: "#111",
          marginBottom: "32px",
          fontFamily: "'Playfair Display', serif",
        }}
      >
        {brandName.split("").map((char, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: 0,
              animation: `letterPop 0.4s ease-out ${i * 0.05}s forwards`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "360px",
          border: "1px solid #111",
          borderRadius: "8px",
          padding: "40px 32px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          backgroundColor: "#fff",
          zIndex: 2,
        }}
      >
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

      <style>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.5); }
          70% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes letterPop {
          0% { opacity: 0; transform: translateY(15px) scale(0.7); }
          70% { opacity: 1; transform: translateY(-3px) scale(1.05); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}