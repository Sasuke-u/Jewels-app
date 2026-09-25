import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: 80, padding: "0 20px" }}>
        <ShoppingBag size={48} color="var(--gold)" style={{ marginBottom: 16 }} />
        <h2 style={{ fontSize: 22, color: "var(--ivory)", marginBottom: 8 }}>
          Your cart is empty
        </h2>
        <p style={{ color: "var(--text-muted)", marginBottom: 24, fontSize: 14 }}>
          Looks like you haven't added anything yet.
        </p>
        <Link to="/" className="btn-gold" style={{ textDecoration: "none", display: "inline-block" }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "20px 0 60px" }}>
      <h2 style={{ fontSize: 28, fontWeight: 500, color: "var(--ivory)", marginBottom: 24 }}>
        Your Cart
      </h2>

      <div style={{ border: "1px solid var(--line)", borderRadius: 6, overflow: "hidden" }}>
        {cart.map((item, idx) => (
          <div
            key={item.product.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "16px 20px",
              borderBottom: idx < cart.length - 1 ? "1px solid var(--line)" : "none",
              backgroundColor: "var(--charcoal)",
            }}
          >
            <Link
              to={`/product/${item.product.id}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                flex: 1,
                minWidth: 0,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={item.product.image}
                alt={item.product.title}
                style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 4, flexShrink: 0 }}
              />

              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 500, fontSize: 15, color: "var(--ivory)", marginBottom: 4, fontFamily: "'Cormorant Garamond', serif" }}>
                  {item.product.title}
                </div>
                <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
                  ${item.product.price.toFixed(2)} each
                </div>
              </div>
            </Link>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid var(--line)",
                borderRadius: 4,
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <button
                onClick={() => updateQuantity(item.product.id, -1)}
                style={{
                  width: 28,
                  height: 28,
                  border: "none",
                  backgroundColor: "var(--charcoal-light)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--ivory)",
                }}
              >
                <Minus size={14} />
              </button>
              <span style={{ minWidth: 28, textAlign: "center", fontSize: 14, fontWeight: 600, color: "var(--ivory)" }}>
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.product.id, 1)}
                style={{
                  width: 28,
                  height: 28,
                  border: "none",
                  backgroundColor: "var(--charcoal-light)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--ivory)",
                }}
              >
                <Plus size={14} />
              </button>
            </div>

            <span style={{ minWidth: 70, textAlign: "right", fontWeight: 700, fontSize: 15, color: "var(--gold)", flexShrink: 0 }}>
              ${(item.product.price * item.quantity).toFixed(2)}
            </span>

            <button
              onClick={() => removeFromCart(item.product.id)}
              style={{
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                color: "var(--text-muted)",
                display: "flex",
                alignItems: "center",
                padding: 4,
                flexShrink: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e05252")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
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
          borderTop: "1px solid var(--line)",
        }}
      >
        <span style={{ fontSize: 16, color: "var(--text-muted)" }}>Total</span>
        <span className="gold-gradient-text" style={{ fontSize: 26, fontWeight: 700 }}>
          ${total.toFixed(2)}
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 24 }}>
        <button
          onClick={clearCart}
          className="btn-outline-gold"
          style={{ padding: "12px 20px" }}
        >
          Clear Cart
        </button>
        <button
          onClick={handleCheckout}
          className="btn-gold"
          style={{ flex: 1 }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}