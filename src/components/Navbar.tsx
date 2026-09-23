import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/sn-logo (2).png";
import cartIcon from "../assets/cart-icon.png";

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const cartItemCount = cart?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 32px",
        borderBottom: "1px solid #eaeaea",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logo}
          alt="Nerusu Jewels"
          style={{ height: "45px", objectFit: "contain" }}
        />
      </Link>

      {/* Navigation Items */}
      <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
        <Link
          to="/"
          style={{ textDecoration: "none", color: "#333", fontWeight: 600, fontSize: "14px" }}
        >
          Home
        </Link>

        <Link
          to="/cart"
          style={{
            textDecoration: "none",
            color: "#333",
            fontWeight: 600,
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <img src={cartIcon} alt="Cart" style={{ width: "22px", height: "22px" }} />
          <span>Cart</span>
          {cartItemCount > 0 && (
            <span
              style={{
                backgroundColor: "#111",
                color: "#fff",
                borderRadius: "50%",
                padding: "2px 7px",
                fontSize: "11px",
                fontWeight: 700,
              }}
            >
              {cartItemCount}
            </span>
          )}
        </Link>

        <Link
          to="/checkout"
          style={{ textDecoration: "none", color: "#333", fontWeight: 600, fontSize: "14px" }}
        >
          Checkout
        </Link>

        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "14px", color: "#555" }}>Hi, {user.name}</span>
            <button
              onClick={logout}
              style={{
                background: "none",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "4px 10px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "#fff",
              backgroundColor: "#111",
              padding: "8px 16px",
              borderRadius: "6px",
              fontWeight: 600,
              fontSize: "13px",
            }}
          >
            Log In
          </Link>
        )}
      </div>
    </nav>
  );
}