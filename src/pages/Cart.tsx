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
      <div className="cart-page-empty">
        <ShoppingBag size={48} color="var(--gold)" style={{ marginBottom: 16 }} />
        <h2 className="cart-page-empty-title">Your cart is empty</h2>
        <p className="cart-page-empty-text">Looks like you haven't added anything yet.</p>
        <Link to="/" className="btn-gold cart-page-empty-link">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2 className="cart-page-title">Your Cart</h2>

      <div className="cart-page-list">
        {cart.map((item, idx) => (
          <div
            key={item.product.id}
            className="cart-page-row"
            style={{ borderBottom: idx < cart.length - 1 ? "1px solid var(--line)" : "none" }}
          >
            <Link to={`/product/${item.product.id}`} className="cart-page-item-link">
              <img src={item.product.image} alt={item.product.title} className="cart-page-item-image" />
              <div className="cart-page-item-info">
                <div className="cart-page-item-title">{item.product.title}</div>
                <div className="cart-page-item-unit-price">${item.product.price.toFixed(2)} each</div>
              </div>
            </Link>

            <div className="cart-page-row-controls">
              <div className="cart-page-qty-stepper">
                <button
                  onClick={() => updateQuantity(item.product.id, -1)}
                  className="cart-page-qty-btn"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="cart-page-qty-value">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, 1)}
                  className="cart-page-qty-btn"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              <span className="cart-page-line-price">
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>

              <button
                onClick={() => removeFromCart(item.product.id)}
                className="cart-page-remove-btn"
                aria-label="Remove item"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-page-total-row">
        <span className="cart-page-total-label">Total</span>
        <span className="gold-gradient-text cart-page-total-value">${total.toFixed(2)}</span>
      </div>

      <div className="cart-page-actions">
        <button onClick={clearCart} className="btn-outline-gold cart-page-clear-btn">
          Clear Cart
        </button>
        <button onClick={handleCheckout} className="btn-gold cart-page-checkout-btn">
          Checkout
        </button>
      </div>
    </div>
  );
}