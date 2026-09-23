import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirectTo = location.state?.from || "/";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = mode === "signup" ? name : email.split("@")[0];
    login(email, displayName);
    navigate(redirectTo, { replace: true });
  };

  return (
    <div style={{ maxWidth: 380, margin: "60px auto", padding: "0 20px" }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, textAlign: "center", marginBottom: 8 }}>
        {mode === "login" ? "Welcome Back" : "Create an Account"}
      </h2>
      <p style={{ textAlign: "center", color: "#777", fontSize: 14, marginBottom: 28 }}>
        {mode === "login"
          ? "Log in to continue to checkout"
          : "Sign up to place your order"}
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 14 }}
      >
        {mode === "signup" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#444" }}>Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              style={{ padding: "10px 12px", border: "1px solid #ddd", borderRadius: 6, fontSize: 14, outline: "none" }}
            />
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#444" }}>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{ padding: "10px 12px", border: "1px solid #ddd", borderRadius: 6, fontSize: 14, outline: "none" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#444" }}>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{ padding: "10px 12px", border: "1px solid #ddd", borderRadius: 6, fontSize: 14, outline: "none" }}
          />
        </div>

        <button
          type="submit"
          style={{
            marginTop: 8,
            padding: "12px",
            backgroundColor: "#111",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          {mode === "login" ? "Log In" : "Sign Up"}
        </button>
      </form>

      <p style={{ textAlign: "center", fontSize: 13, color: "#666", marginTop: 20 }}>
        {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          style={{
            background: "none",
            border: "none",
            color: "#111",
            fontWeight: 700,
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          {mode === "login" ? "Sign up" : "Log in"}
        </button>
      </p>
    </div>
  );
}