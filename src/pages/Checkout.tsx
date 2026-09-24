import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CreditCard, Zap, DollarSign, Lock } from "lucide-react";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "paypal">("card");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [shipping, setShipping] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const shippingFee = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const grandTotal = subtotal + tax + shippingFee;

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: 80, padding: "0 20px" }}>
        <h2 style={{ fontSize: 22, color: "var(--navy)", marginBottom: 12, fontFamily: "'Jost', sans-serif" }}>
          No Items to Checkout
        </h2>
        <p style={{ color: "var(--text-muted)", marginBottom: 24, fontSize: 14 }}>
          Your shopping cart is currently empty. Please add items before checking out.
        </p>
        <Link
          to="/"
          style={{
            display: "inline-block",
            backgroundColor: "var(--navy)",
            color: "var(--champagne-light)",
            padding: "12px 24px",
            borderRadius: 6,
            fontWeight: 600,
            textDecoration: "none",
            fontSize: 14,
          }}
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = "NJ-" + Math.floor(100000 + Math.random() * 900000);
      const orderData = {
        orderId,
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        items: [...cart],
        subtotal,
        tax,
        shippingFee,
        grandTotal,
        shipping,
        paymentMethod: paymentMethod.toUpperCase(),
      };

      sessionStorage.setItem("latest_order", JSON.stringify(orderData));
      clearCart();
      setIsSubmitting(false);
      navigate("/order-confirmation");
    }, 1500);
  };

  const inputStyle = {
    padding: "10px 12px",
    border: "1px solid var(--line)",
    borderRadius: 6,
    fontSize: 14,
    outline: "none",
    fontFamily: "'Inter', sans-serif",
  };

  const labelStyle = { fontSize: 12, fontWeight: 600, color: "var(--navy)" };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 0 60px" }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, color: "var(--navy)", marginBottom: 28, fontFamily: "'Jost', sans-serif" }}>
        Checkout &amp; Order Review
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ border: "1px solid var(--line)", borderRadius: 10, padding: 24, backgroundColor: "#fff" }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", marginBottom: 16, display: "flex", alignItems: "center", gap: 8, fontFamily: "'Jost', sans-serif" }}>
              <span style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: "var(--navy)", color: "var(--champagne-light)", fontSize: 12, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>1</span>
              Shipping Details
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={shipping.fullName}
                  onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={shipping.email}
                  onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={labelStyle}>Delivery Address</label>
                <input
                  type="text"
                  required
                  placeholder="Street Address, Apartment, Suite"
                  value={shipping.address}
                  onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={labelStyle}>City</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mumbai"
                  value={shipping.city}
                  onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={labelStyle}>PIN / Zip Code</label>
                <input
                  type="text"
                  required
                  placeholder="400001"
                  value={shipping.zip}
                  onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          <div style={{ border: "1px solid var(--line)", borderRadius: 10, padding: 24, backgroundColor: "#fff" }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", marginBottom: 16, display: "flex", alignItems: "center", gap: 8, fontFamily: "'Jost', sans-serif" }}>
              <span style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: "var(--navy)", color: "var(--champagne-light)", fontSize: 12, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>2</span>
              Payment Option
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                style={{
                  padding: "14px 8px",
                  borderRadius: 8,
                  border: paymentMethod === "card" ? "2px solid var(--navy)" : "1px solid var(--line)",
                  backgroundColor: paymentMethod === "card" ? "var(--cream)" : "#fff",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--navy)",
                }}
              >
                <CreditCard size={20} />
                <span>Credit/Debit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("upi")}
                style={{
                  padding: "14px 8px",
                  borderRadius: 8,
                  border: paymentMethod === "upi" ? "2px solid var(--navy)" : "1px solid var(--line)",
                  backgroundColor: paymentMethod === "upi" ? "var(--cream)" : "#fff",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--navy)",
                }}
              >
                <Zap size={20} color="var(--champagne)" />
                <span>UPI / Instant</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("paypal")}
                style={{
                  padding: "14px 8px",
                  borderRadius: 8,
                  border: paymentMethod === "paypal" ? "2px solid var(--navy)" : "1px solid var(--line)",
                  backgroundColor: paymentMethod === "paypal" ? "var(--cream)" : "#fff",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--navy)",
                }}
              >
                <DollarSign size={20} color="#2563eb" />
                <span>PayPal</span>
              </button>
            </div>

            <div style={{ backgroundColor: "var(--cream)", padding: 14, borderRadius: 8, fontSize: 13, color: "var(--text-muted)" }}>
              {paymentMethod === "card" && "Mocked Credit Card Authorization (Visa/Mastercard/Amex supported)."}
              {paymentMethod === "upi" && "Instant VPA notification will be triggered upon clicking Place Order."}
              {paymentMethod === "paypal" && "Secure PayPal Express sandbox checkout simulated."}
            </div>
          </div>
        </div>

        <div>
          <div style={{ border: "1px solid var(--line)", borderRadius: 10, padding: 24, backgroundColor: "#fff", position: "sticky", top: 20 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid var(--line)", fontFamily: "'Jost', sans-serif" }}>
              Order Summary
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxHeight: 180, overflowY: "auto", marginBottom: 16 }}>
              {cart.map((item) => (
                <div key={item.product.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img src={item.product.image} alt={item.product.title} style={{ width: 42, height: 42, objectFit: "cover", borderRadius: 6 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.product.title}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Qty: {item.quantity}</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--champagne)" }}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid var(--line)", paddingTop: 14, display: "flex", flexDirection: "column", gap: 8, fontSize: 14, color: "var(--text-muted)" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: 600, color: "var(--navy)" }}>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Tax (8%)</span>
                <span style={{ fontWeight: 600, color: "var(--navy)" }}>${tax.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Shipping</span>
                <span style={{ fontWeight: 600, color: shippingFee === 0 ? "#16a34a" : "var(--navy)" }}>
                  {shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>

              <div style={{ borderTop: "1px solid var(--navy)", paddingTop: 12, marginTop: 6, display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 800, color: "var(--navy)" }}>
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                marginTop: 20,
                padding: "14px",
                backgroundColor: "var(--navy)",
                color: "var(--champagne-light)",
                border: "none",
                borderRadius: 6,
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              {isSubmitting ? (
                "Processing Payment..."
              ) : (
                <>
                  <Lock size={16} />
                  <span>Place Order (${grandTotal.toFixed(2)})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}