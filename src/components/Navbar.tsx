import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useCartDrawer } from "../context/CartDrawerContext";
import cartIcon from "../assets/cart-icon.png";

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const { openDrawer } = useCartDrawer();

  const cartItemCount = cart?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <nav
      className="glass-surface"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 32px",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Left: Brand + greeting */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          <span
            className="gold-gradient-text"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: "28px",
              letterSpacing: "1px",
            }}
          >
            NS
          </span>
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              color: "var(--ivory)",
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            Jewels
          </span>
        </Link>

        {user && (
          <span
            style={{
              fontSize: "12px",
              color: "var(--text-muted)",
              paddingLeft: "20px",
              borderLeft: "1px solid var(--line)",
              letterSpacing: "0.5px",
            }}
          >
            Welcome, {user.name}
          </span>
        )}
      </div>

      {/* Right: Nav items */}
      <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "var(--ivory)",
            fontWeight: 500,
            fontSize: "13px",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          Home
        </Link>

        {user && (
          <Link
            to="/orders"
            style={{
              textDecoration: "none",
              color: "var(--ivory)",
              fontWeight: 500,
              fontSize: "13px",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            Orders
          </Link>
        )}

        {/* Wishlist icon (heart) */}
        <Link
          to="/wishlist"
          style={{
            textDecoration: "none",
            color: "var(--ivory)",
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
          aria-label="Wishlist"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 21s-7.5-4.6-10-9.1C.5 8.6 2.3 5 6 5c2.1 0 3.6 1.1 6 3.5C14.4 6.1 15.9 5 18 5c3.7 0 5.5 3.6 4 6.9-2.5 4.5-10 9.1-10 9.1z" />
          </svg>
        </Link>

        {/* Cart — opens the slide-out drawer */}
        <button
          onClick={openDrawer}
          aria-label="Open cart"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--ivory)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            position: "relative",
            padding: 0,
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "13px",
          }}
        >
          <img
            src={cartIcon}
            alt="Cart"
            style={{ width: "20px", height: "20px", filter: "invert(1) brightness(2)" }}
          />
          {cartItemCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-10px",
                backgroundColor: "var(--gold)",
                color: "var(--obsidian)",
                borderRadius: "50%",
                width: "16px",
                height: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                fontWeight: 700,
              }}
            >
              {cartItemCount}
            </span>
          )}
        </button>

        {user ? (
          <button
            onClick={logout}
            className="btn-outline-gold"
            style={{ padding: "8px 18px", fontSize: "11px" }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn-gold" style={{ padding: "9px 20px", fontSize: "11px" }}>
            Log In
          </Link>
        )}
      </div>
    </nav>
  );
}