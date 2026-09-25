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
  const cameFromCheckout = location.state?.from === "/checkout";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = mode === "signup" ? name : email.split("@")[0];
    login(email, displayName);
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="login-page">
      <h2 className="login-title">
        {mode === "login" ? "Welcome Back" : "Create an Account"}
      </h2>

      {cameFromCheckout && (
        <div className="login-checkout-banner">
          You're browsing as a guest. Please log in or sign up to continue to checkout.
        </div>
      )}

      <p className="login-subtitle">
        {mode === "login"
          ? "Log in to continue to checkout"
          : "Sign up to place your order"}
      </p>

      <form onSubmit={handleSubmit} className="login-form">
        {mode === "signup" && (
          <div className="login-field">
            <label className="login-label">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="login-input"
            />
          </div>
        )}

        <div className="login-field">
          <label className="login-label">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="login-input"
          />
        </div>

        <div className="login-field">
          <label className="login-label">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="login-input"
          />
        </div>

        <button type="submit" className="login-submit-btn">
          {mode === "login" ? "Log In" : "Sign Up"}
        </button>
      </form>

      <p className="login-toggle-text">
        {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="login-toggle-btn"
        >
          {mode === "login" ? "Sign up" : "Log in"}
        </button>
      </p>
    </div>
  );
}