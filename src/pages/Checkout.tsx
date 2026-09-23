import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CreditCard, Zap, DollarSign, Lock, CheckCircle } from "lucide-react";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "paypal">("card");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Address State
  const [shipping, setShipping] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax
  const shippingFee = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const grandTotal = subtotal + tax + shippingFee;

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: 80, padding: "0 20px" }}>
        <h2 style={{ fontSize: 22, color: "#111", marginBottom: 12 }}>No Items to Checkout</h2>
        <p style={{ color: "#777", marginBottom: 24, fontSize: 14 }}>
          Your shopping cart is currently empty. Please add items before checking out.
        </p>
        <Link
          to="/"
          style={{
            display: "inline-block",
            backgroundColor: "#111",
            color: "#fff",
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

    // Simulate payment processing latency
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

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 0 60px" }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, color: "#111", marginBottom: 28 }}>
        Checkout & Order Review
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32 }}>
        {/* Left Column: Shipping & Payment */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Shipping Section */}
          <div style={{ border: "1px solid #eaeaea", borderRadius: 10, padding: 24, backgroundColor: "#fff" }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: "#111", color: "#fff", fontSize: 12, display: "inline-flex", alignItems: "center", justifyCenter: "center", justifyContent: "center" }}>1</span>
              Shipping Details
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#444" }}>Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={shipping.fullName}
                  onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                  style={{ padding: "10px 12px", border: "1px solid #ddd", borderRadius: 6, fontSize: 14, outline: "none" }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#444" }}>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={shipping.email}
                  onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                  style={{ padding: "10px 12px", border: "1px solid #ddd", borderRadius: 6, fontSize: 14, outline: "none" }}
                />
              </div>

              <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#444" }}>Delivery Address</label>
                <input
                  type="text"
                  required
                  placeholder="Street Address, Apartment, Suite"
                  value={shipping.address}
                  onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                  style={{ padding: "10px 12px", border: "1px solid #ddd", borderRadius: 6, fontSize: 14, outline: "none" }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#444" }}>City</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mumbai"
                  value={shipping.city}
                  onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                  style={{ padding: "10px 12px", border: "1px solid #ddd", borderRadius: 6, fontSize: 14, outline: "none" }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#444" }}>PIN / Zip Code</label>
                <input
                  type="text"
                  required
                  placeholder="400001"
                  value={shipping.zip}
                  onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
                  style={{ padding: "10px 12px", border: "1px solid #ddd", borderRadius: 6, fontSize: 14, outline: "none" }}
                />
              </div>
            </div>
          </div>

          {/* Payment Method Section */}
          <div style={{ border: "1px solid #eaeaea", borderRadius: 10, padding: 24, backgroundColor: "#fff" }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: "#111", color: "#fff", fontSize: 12, display: "inline-flex", alignItems: "center", justifyCenter: "center", justifyContent: "center" }}>2</span>
              Payment Option
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                style={{
                  padding: "14px 8px",
                  borderRadius: 8,
                  border: paymentMethod === "card" ? "2px solid #111" : "1px solid #ddd",
                  backgroundColor: paymentMethod === "card" ? "#f9f9f9" : "#fff",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#111",
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
                  border: paymentMethod === "upi" ? "2px solid #111" : "1px solid #ddd",
                  backgroundColor: paymentMethod === "upi" ? "#f9f9f9" : "#fff",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#111",
                }}
              >
                <Zap size={20} color="#c9932f" />
                <span>UPI / Instant</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("paypal")}
                style={{
                  padding: "14px 8px",
                  borderRadius: 8,
                  border: paymentMethod === "paypal" ? "2px solid #111" : "1px solid #ddd",
                  backgroundColor: paymentMethod === "paypal" ? "#f9f9f9" : "#fff",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#111",
                }}
              >
                <DollarSign size={20} color="#2563eb" />
                <span>PayPal</span>
              </button>
            </div>

            <div style={{ backgroundColor: "#f9f9f9", padding: 14, borderRadius: 8, fontSize: 13, color: "#666" }}>
              {paymentMethod === "card" && "Mocked Credit Card Authorization (Visa/Mastercard/Amex supported)."}
              {paymentMethod === "upi" && "Instant VPA notification will be triggered upon clicking Place Order."}
              {paymentMethod === "paypal" && "Secure PayPal Express sandbox checkout simulated."}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary Sidebar */}
        <div>
          <div style={{ border: "1px solid #eaeaea", borderRadius: 10, padding: 24, backgroundColor: "#fff", position: "sticky", top: 20 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid #eee" }}>
              Order Summary
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxHeight: 180, overflowY: "auto", marginBottom: 16 }}>
              {cart.map((item) => (
                <div key={item.product.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img src={item.product.image} alt={item.product.title} style={{ width: 42, height: 42, objectFit: "cover", borderRadius: 6 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#111", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.product.title}
                    </div>
                    <div style={{ fontSize: 12, color: "#777" }}>Qty: {item.quantity}</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid #eee", paddingTop: 14, display: "flex", flexDirection: "column", gap: 8, fontSize: 14, color: "#555" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: 600, color: "#111" }}>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Tax (8%)</span>
                <span style={{ fontWeight: 600, color: "#111" }}>${tax.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Shipping</span>
                <span style={{ fontWeight: 600, color: shippingFee === 0 ? "#16a34a" : "#111" }}>
                  {shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>

              <div style={{ borderTop: "1px solid #111", paddingTop: 12, marginTop: 6, display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 800, color: "#111" }}>
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
                backgroundColor: "#111",
                color: "#fff",
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
