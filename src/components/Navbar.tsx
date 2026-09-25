import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useCartDrawer } from "../context/CartDrawerContext";
import cartIcon from "../assets/cart-icon.png";

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const { openDrawer } = useCartDrawer();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const cartItemCount = cart?.reduce((total, item) => total + item.quantity, 0) || 0;

  const closeMobileNav = () => setIsMobileNavOpen(false);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isMobileNavOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileNavOpen]);

  const handleLogout = () => {
    closeMobileNav();
    logout();
  };

  return (
    <>
      <nav className="glass-surface navbar">
        {/* Left: Brand + greeting */}
        <div className="nav-left">
          <Link to="/" className="nav-brand">
            <span className="gold-gradient-text nav-brand-ns">NS</span>
            <span className="nav-brand-jewels">Jewels</span>
          </Link>

          {user && <span className="nav-greeting">Welcome, {user.name}</span>}
        </div>

        {/* Right: Nav items */}
        <div className="nav-right">
          {/* Desktop-only text links + auth button */}
          <div className="nav-desktop-links">
            <Link to="/" className="nav-link">
              Home
            </Link>

            {user && (
              <Link to="/orders" className="nav-link">
                Orders
              </Link>
            )}

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

          {/* Wishlist icon — always visible */}
          <Link to="/wishlist" className="nav-icon-link" aria-label="Wishlist">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 21s-7.5-4.6-10-9.1C.5 8.6 2.3 5 6 5c2.1 0 3.6 1.1 6 3.5C14.4 6.1 15.9 5 18 5c3.7 0 5.5 3.6 4 6.9-2.5 4.5-10 9.1-10 9.1z" />
            </svg>
          </Link>

          {/* Cart — always visible, opens the slide-out drawer */}
          <button onClick={openDrawer} aria-label="Open cart" className="nav-cart-btn">
            <img
              src={cartIcon}
              alt=""
              style={{ width: "20px", height: "20px", filter: "invert(1) brightness(2)" }}
            />
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </button>

          {/* Hamburger — mobile only */}
          <button
            className={`nav-hamburger${isMobileNavOpen ? " open" : ""}`}
            onClick={() => setIsMobileNavOpen((open) => !open)}
            aria-label={isMobileNavOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileNavOpen}
          >
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer + overlay */}
      <div
        className={`mobile-nav-overlay${isMobileNavOpen ? " open" : ""}`}
        onClick={closeMobileNav}
        aria-hidden={!isMobileNavOpen}
      />

      <aside
        className={`mobile-nav-drawer${isMobileNavOpen ? " open" : ""}`}
        aria-hidden={!isMobileNavOpen}
      >
        <div className="mobile-nav-header">
          <span className="gold-gradient-text" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "22px" }}>
            Menu
          </span>
          <button className="mobile-nav-close" onClick={closeMobileNav} aria-label="Close menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {user && <div className="mobile-nav-greeting">Welcome, {user.name}</div>}

        <nav className="mobile-nav-links">
          <Link to="/" className="mobile-nav-link" onClick={closeMobileNav}>
            Home
          </Link>
          <Link to="/wishlist" className="mobile-nav-link" onClick={closeMobileNav}>
            Wishlist
          </Link>
          {user && (
            <Link to="/orders" className="mobile-nav-link" onClick={closeMobileNav}>
              Orders
            </Link>
          )}
        </nav>

        <div className="mobile-nav-footer">
          {user ? (
            <button onClick={handleLogout} className="btn-outline-gold">
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn-gold" onClick={closeMobileNav}>
              Log In
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}