import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "24px 0",
        marginBottom: 40,
        borderBottom: "1px solid #eaeaea"
    }}>
      <Link to="/" style={{ color: "#000", textDecoration: "none", fontSize: "28px", fontWeight: "bold", letterSpacing: "-0.5px" }}>
        Nerusu Jewels
      </Link>
      <div style={{ display: "flex", gap: 30 }}>
        <Link to="/" style={{ color: "#444", textDecoration: "none", fontWeight: "500" }}>
          Shop
        </Link>
        <Link to="/cart" style={{ color: "#444", textDecoration: "none", fontWeight: "500" }}>
          Cart ({totalItems})
        </Link>
      </div>
    </nav>
  );
}