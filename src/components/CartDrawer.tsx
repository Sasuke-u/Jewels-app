import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Plus, Minus, Trash2, ShoppingBag, Tag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useCartDrawer } from "../context/CartDrawerContext";

const VALID_PROMO_CODES: Record<string, number> = {
  NERUSU10: 0.1,
  WELCOME15: 0.15,
};

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { isOpen, closeDrawer } = useCartDrawer();
  const navigate = useNavigate();

  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState("");

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountRate = appliedPromo ? VALID_PROMO_CODES[appliedPromo] : 0;
  const discount = subtotal * discountRate;
  const total = subtotal - discount;

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (VALID_PROMO_CODES[code]) {
      setAppliedPromo(code);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
      setAppliedPromo(null);
    }
  };

  const handleCheckout = () => {
    closeDrawer();
    navigate("/checkout");
  };

  const handleViewCart = () => {
    closeDrawer();
    navigate("/cart");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(9,9,11,0.7)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          zIndex: 200,
        }}
      />

      {/* Drawer */}
      <div
        className="glass-surface"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "var(--charcoal)",
          borderLeft: "1px solid var(--line)",
          zIndex: 201,
          display: "flex",
          flexDirection: "column",
          animation: "slideInDrawer 0.3s ease-out",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "22px 24px",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "22px",
              fontWeight: 500,
              color: "var(--ivory)",
              margin: 0,
            }}
          >
            Your Selection ({cart.length})
          </h3>
          <button
            onClick={closeDrawer}
            aria-label="Close cart"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              display: "flex",
              padding: 4,
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        {cart.length === 0 ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40 }}>
            <ShoppingBag size={40} color="var(--gold)" style={{ marginBottom: 16 }} />
            <p style={{ color: "var(--text-muted)", fontSize: 14, textAlign: "center" }}>
              Your selection is empty.
            </p>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  style={{
                    display: "flex",
                    gap: 14,
                    padding: "16px 0",
                    borderBottom: "1px solid var(--line)",
                  }}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 4, flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "var(--ivory)",
                        fontFamily: "'Cormorant Garamond', serif",
                        marginBottom: 6,
                      }}
                    >
                      {item.product.title}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid var(--line)",
                          borderRadius: 4,
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          style={{
                            width: 24,
                            height: 24,
                            border: "none",
                            background: "transparent",
                            color: "var(--ivory)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ minWidth: 22, textAlign: "center", fontSize: 12, color: "var(--ivory)" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          style={{
                            width: 24,
                            height: 24,
                            border: "none",
                            background: "transparent",
                            color: "var(--ivory)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "var(--gold)" }}>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    aria-label="Remove item"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--text-muted)",
                      display: "flex",
                      alignSelf: "flex-start",
                      padding: 2,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#e05252")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Promo code */}
            <div style={{ padding: "0 24px" }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <div style={{ flex: 1, display: "flex", alignItems: "center", border: "1px solid var(--line)", borderRadius: 4, padding: "0 10px" }}>
                  <Tag size={14} color="var(--text-muted)" style={{ marginRight: 8, flexShrink: 0 }} />
                  <input
                    placeholder="Promo code"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    style={{
                      flex: 1,
                      border: "none",
                      background: "transparent",
                      color: "var(--ivory)",
                      fontSize: 13,
                      padding: "9px 0",
                      outline: "none",
                    }}
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="btn-outline-gold"
                  style={{ padding: "0 16px", fontSize: 11 }}
                >
                  Apply
                </button>
              </div>
              {promoError && (
                <p style={{ color: "#e05252", fontSize: 12, margin: "0 0 8px" }}>{promoError}</p>
              )}
              {appliedPromo && (
                <p style={{ color: "#4ade80", fontSize: 12, margin: "0 0 8px" }}>
                  "{appliedPromo}" applied — {Math.round(discountRate * 100)}% off
                </p>
              )}
            </div>

            {/* Summary */}
            <div style={{ padding: "16px 24px 24px", borderTop: "1px solid var(--line)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-muted)", marginBottom: 6 }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {appliedPromo && (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#4ade80", marginBottom: 6 }}>
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "var(--ivory)",
                  marginTop: 10,
                  marginBottom: 20,
                }}
              >
                <span>Total</span>
                <span className="gold-gradient-text">${total.toFixed(2)}</span>
              </div>

              <button onClick={handleCheckout} className="btn-gold" style={{ width: "100%", marginBottom: 10 }}>
                Checkout
              </button>
              <button
                onClick={handleViewCart}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  fontSize: 12,
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                View full cart
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes slideInDrawer {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}