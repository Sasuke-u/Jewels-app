import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, ShoppingBag } from "lucide-react";

interface OrderSummary {
  orderId: string;
  date: string;
  items: Array<{
    product: {
      id: number;
      title: string;
      price: number;
      image: string;
    };
    quantity: number;
  }>;
  subtotal: number;
  tax: number;
  shippingFee: number;
  grandTotal: number;
  shipping: {
    fullName: string;
    email: string;
    address: string;
    city: string;
  };
  paymentMethod: string;
}

export default function OrderConfirmation() {
  const [order, setOrder] = useState<OrderSummary | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = sessionStorage.getItem("latest_order");
    if (saved) {
      setOrder(JSON.parse(saved));
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!order) return null;

  return (
    <div style={{ maxWidth: 650, margin: "60px auto", padding: "0 20px", textAlign: "center" }}>
      <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
        <CheckCircle size={64} color="var(--gold)" />
      </div>

      <h1 style={{ fontSize: 36, fontWeight: 500, color: "var(--ivory)", margin: "0 0 8px", fontFamily: "'Cormorant Garamond', serif", letterSpacing: 1 }}>
        Order Placed
      </h1>
      <p style={{ color: "var(--text-muted)", fontSize: 15, marginBottom: 32 }}>
        Thank you for your purchase! Order receipt sent to <strong style={{ color: "var(--ivory)" }}>{order.shipping.email}</strong>.
      </p>

      <div style={{ border: "1px solid var(--line)", borderRadius: 6, padding: 24, backgroundColor: "var(--charcoal)", textAlign: "left", marginBottom: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--line)", paddingBottom: 14, marginBottom: 16, fontSize: 13, color: "var(--text-muted)" }}>
          <div>
            <span style={{ color: "var(--text-muted)", display: "block" }}>Order Reference</span>
            <strong style={{ fontSize: 15, color: "var(--gold)" }}>{order.orderId}</strong>
          </div>
          <div>
            <span style={{ color: "var(--text-muted)", display: "block" }}>Date</span>
            <strong style={{ color: "var(--ivory)" }}>{order.date}</strong>
          </div>
          <div>
            <span style={{ color: "var(--text-muted)", display: "block" }}>Payment Method</span>
            <strong style={{ color: "var(--ivory)" }}>{order.paymentMethod}</strong>
          </div>
        </div>

        <h4 style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1.5 }}>
          Items Purchased ({order.items.length})
        </h4>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
          {order.items.map((item) => (
            <div key={item.product.id} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <img src={item.product.image} alt={item.product.title} style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 4 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--ivory)", fontFamily: "'Cormorant Garamond', serif" }}>{item.product.title}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Qty: {item.quantity}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--gold)" }}>
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid var(--gold)", paddingTop: 14, display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 800, color: "var(--ivory)" }}>
          <span>Grand Total Paid</span>
          <span className="gold-gradient-text">${order.grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <Link to="/" className="btn-gold" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
        <ShoppingBag size={18} />
        <span>Keep Shopping</span>
      </Link>
    </div>
  );
}