import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  
  // Calculate total price based on quantities
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleCheckout = () => {
    alert("Thank you for your purchase!");
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <h2>Your cart is empty</h2>
        <Link to="/" style={{ color: "gold", textDecoration: "underline" }}>
          Go shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <div
          key={item.product.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            borderBottom: "1px solid #444",
            padding: "12px 0",
          }}
        >
          <img src={item.product.image} alt={item.product.title} width={50} />
          <span style={{ flex: 1 }}>{item.product.title}</span>
          
          {/* Quantity Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={() => updateQuantity(item.product.id, -1)}>-</button>
            <span style={{ minWidth: 20, textAlign: "center" }}>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.product.id, 1)}>+</button>
          </div>

          <span style={{ minWidth: 80, textAlign: "right" }}>
            ${(item.product.price * item.quantity).toFixed(2)}
          </span>
          
          <button onClick={() => removeFromCart(item.product.id)} style={{ marginLeft: 8 }}>
            Remove
          </button>
        </div>
      ))}
      
      <h3 style={{ textAlign: "right", marginTop: 20 }}>Total: ${total.toFixed(2)}</h3>
      
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 30 }}>
        <button onClick={clearCart} style={{ backgroundColor: "#555" }}>Clear cart</button>
        <button 
          onClick={handleCheckout} 
          style={{ backgroundColor: "gold", color: "black", fontWeight: "bold", padding: "10px 20px" }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}