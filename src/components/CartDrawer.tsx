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
      <div onClick={closeDrawer} className="cart-drawer-backdrop" />

      {/* Drawer */}
      <div className="glass-surface cart-drawer">
        {/* Header */}
        <div className="cart-drawer-header">
          <h3 className="cart-drawer-title">Your Selection ({cart.length})</h3>
          <button onClick={closeDrawer} aria-label="Close cart" className="cart-drawer-close">
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        {cart.length === 0 ? (
          <div className="cart-drawer-empty">
            <ShoppingBag size={40} color="var(--gold)" style={{ marginBottom: 16 }} />
            <p className="cart-drawer-empty-text">Your selection is empty.</p>
          </div>
        ) : (
          <>
            <div className="cart-drawer-items">
              {cart.map((item) => (
                <div key={item.product.id} className="cart-drawer-item">
                  <img src={item.product.image} alt={item.product.title} className="cart-drawer-item-image" />
                  <div className="cart-drawer-item-info">
                    <div className="cart-drawer-item-title">{item.product.title}</div>
                    <div className="cart-drawer-item-row">
                      <div className="cart-drawer-qty-stepper">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="cart-drawer-qty-btn"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="cart-drawer-qty-value">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="cart-drawer-qty-btn"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="cart-drawer-item-price">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    aria-label="Remove item"
                    className="cart-drawer-remove-btn"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Promo code */}
            <div className="cart-drawer-promo">
              <div className="cart-drawer-promo-row">
                <div className="cart-drawer-promo-input-wrap">
                  <Tag size={14} color="var(--text-muted)" style={{ marginRight: 8, flexShrink: 0 }} />
                  <input
                    placeholder="Promo code"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="cart-drawer-promo-input"
                  />
                </div>
                <button onClick={handleApplyPromo} className="btn-outline-gold cart-drawer-promo-apply">
                  Apply
                </button>
              </div>
              {promoError && <p className="cart-drawer-promo-error">{promoError}</p>}
              {appliedPromo && (
                <p className="cart-drawer-promo-success">
                  "{appliedPromo}" applied — {Math.round(discountRate * 100)}% off
                </p>
              )}
            </div>

            {/* Summary */}
            <div className="cart-drawer-summary">
              <div className="cart-drawer-summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {appliedPromo && (
                <div className="cart-drawer-summary-row cart-drawer-discount-row">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="cart-drawer-summary-total">
                <span>Total</span>
                <span className="gold-gradient-text">${total.toFixed(2)}</span>
              </div>

              <button onClick={handleCheckout} className="btn-gold cart-drawer-checkout-btn">
                Checkout
              </button>
              <button onClick={handleViewCart} className="cart-drawer-view-cart-btn">
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