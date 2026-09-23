import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/checkout");
    } else {
      navigate("/login?redirect=/checkout");
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: 80, padding: "0 20px" }}>
        <ShoppingBag size={48} color="#ccc" style={{ marginBottom: 16 }} />
        <h2 style={{ fontSize: 20, color: "#111", marginBottom: 8 }}>Your cart is empty</h2>
        <p style={{ color: "#888", marginBottom: 24, fontSize: 14 }}>
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/"
          style={{
            display: "inline-block",
            backgroundColor: "#111",
            color: "#fff",
            textDecoration: "none",
            padding: "12px 28px",
            borderRadius: 4,
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "20px 0 60px" }}>
      <h2 style={{ fontSize: 26, fontWeight: 700, color: "#111", marginBottom: 24 }}>
        Your Cart
      </h2>

      <div style={{ border: "1px solid #eaeaea", borderRadius: 8, overflow: "hidden" }}>
        {cart.map((item, idx) => (
          <div
            key={item.product.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "16px 20px",
              borderBottom: idx < cart.length - 1 ? "1px solid #eaeaea" : "none",
              backgroundColor: "#fff",
            }}
          >
            <img
              src={item.product.image}
              alt={item.product.title}
              style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 6, flexShrink: 0 }}
            />

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 15, color: "#111", marginBottom: 4 }}>
                {item.product.title}
              </div>
              <div style={{ fontSize: 13, color: "#888" }}>
                ${item.product.price.toFixed(2)} each
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ddd",
                borderRadius: 6,
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => updateQuantity(item.product.id, -1)}
                style={{
                  width: 28,
                  height: 28,
                  border: "none",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Minus size={14} />
              </button>
              <span style={{ minWidth: 28, textAlign: "center", fontSize: 14, fontWeight: 600 }}>
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.product.id, 1)}
                style={{
                  width: 28,
                  height: 28,
                  border: "none",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Plus size={14} />
              </button>
            </div>

            <span style={{ minWidth: 70, textAlign: "right", fontWeight: 700, fontSize: 15, color: "#111" }}>
              ${(item.product.price * item.quantity).toFixed(2)}
            </span>

            <button
              onClick={() => removeFromCart(item.product.id)}
              style={{
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                color: "#999",
                display: "flex",
                alignItems: "center",
                padding: 4,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#d90000")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#999")}
              aria-label="Remove item"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 24,
          paddingTop: 20,
          borderTop: "1px solid #eaeaea",
        }}
      >
        <span style={{ fontSize: 16, color: "#555" }}>Total</span>
        <span style={{ fontSize: 24, fontWeight: 800, color: "#111" }}>
          ${total.toFixed(2)}
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 24 }}>
        <button
          onClick={clearCart}
          style={{
            backgroundColor: "transparent",
            border: "1px solid #ccc",
            color: "#555",
            padding: "12px 20px",
            borderRadius: 4,
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Clear Cart
        </button>
        <button
          onClick={handleCheckout}
          style={{
            flex: 1,
            backgroundColor: "#111",
            color: "#fff",
            fontWeight: 700,
            fontSize: 14,
            padding: "12px 20px",
            borderRadius: 4,
            border: "none",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#333")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#111")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}