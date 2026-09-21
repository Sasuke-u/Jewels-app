import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  // Sum up all quantities for the cart badge
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 24,
        marginBottom: 16,
      }}
    >
      <Link to="/" style={{ color: "gold" }}>
        Home
      </Link>
      <Link to="/cart" style={{ color: "gold" }}>
        Cart ({totalItems})
      </Link>
    </nav>
  );
}