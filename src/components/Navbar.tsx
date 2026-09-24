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
        padding: "12px 0",
        borderBottom: "1px solid var(--line)",
        backgroundColor: "var(--cream)",
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
      <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
        <Link
          to="/"
          className="brand-font"
          style={{
            textDecoration: "none",
            color: "var(--navy)",
            fontWeight: 500,
            fontSize: "14px",
          }}
        >
          Home
        </Link>

        <Link
          to="/cart"
          style={{
            textDecoration: "none",
            color: "var(--navy)",
            fontWeight: 500,
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
                backgroundColor: "var(--navy)",
                color: "var(--champagne-light)",
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

        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>
              Hi, {user.name}
            </span>
            <button
              onClick={logout}
              style={{
                background: "none",
                border: `1px solid var(--champagne)`,
                borderRadius: "4px",
                padding: "6px 14px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--navy)",
                transition: "background-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--navy)";
                e.currentTarget.style.color = "var(--champagne-light)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--navy)";
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
              color: "var(--champagne-light)",
              backgroundColor: "var(--navy)",
              padding: "8px 18px",
              borderRadius: "4px",
              fontWeight: 600,
              fontSize: "13px",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--navy-deep)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--navy)")}
          >
            Log In
          </Link>
        )}
      </div>
    </nav>
  );
}