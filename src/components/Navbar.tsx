import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import snLogo from "../assets/sn-logo.png";
import cartIcon from "../assets/cart-icon.png";

export default function Navbar() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "24px 0",
        marginBottom: 40,
        borderBottom: "1px solid #eaeaea"
    }}>
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: "#000",
          textDecoration: "none",
        }}
      >
        <img src={snLogo} alt="SN Logo" style={{ width: "36px", height: "36px" }} />
        <span style={{ fontSize: "28px", fontWeight: "bold", letterSpacing: "-0.5px" }}>
          Nerusu Jewels
        </span>
      </Link>

      <div style={{ display: "flex", gap: 30, alignItems: "center" }}>
        <Link to="/" style={{ color: "#444", textDecoration: "none", fontWeight: "500" }}>
          Shop
        </Link>

        <Link
          to="/cart"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <img src={cartIcon} alt="Cart" style={{ width: "28px", height: "28px" }} />
          {totalItems > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-10px",
                backgroundColor: "#D90000",
                color: "#fff",
                borderRadius: "50%",
                width: "18px",
                height: "18px",
                fontSize: "11px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {totalItems}
            </span>
          )}
        </Link>

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "transparent",
            border: "1px solid #111",
            color: "#111",
            padding: "8px 16px",
            borderRadius: "4px",
            fontWeight: "500",
            fontSize: "14px",
            cursor: "pointer",
            transition: "background-color 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#111";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#111";
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}