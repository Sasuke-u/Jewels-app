import { Link } from "react-router-dom";
import { Package, ShoppingBag } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface OrderItem {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
  quantity: number;
}

interface Order {
  orderId: string;
  date: string;
  items: OrderItem[];
  grandTotal: number;
  paymentMethod: string;
}

export default function OrderHistory() {
  const { user } = useAuth();

  const orders: Order[] = user
    ? JSON.parse(localStorage.getItem(`nj_orders_${user.email}`) || "[]")
    : [];

  if (orders.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: 80, padding: "0 20px" }}>
        <Package size={48} color="var(--gold)" style={{ marginBottom: 16 }} />
        <h2 style={{ fontSize: 22, color: "var(--ivory)", marginBottom: 8 }}>
          No orders yet
        </h2>
        <p style={{ color: "var(--text-muted)", marginBottom: 24, fontSize: 14 }}>
          Your past orders will show up here once you make a purchase.
        </p>
        <Link to="/" className="btn-gold" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
          <ShoppingBag size={16} />
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "20px 0 60px" }}>
      <h2 style={{ fontSize: 28, fontWeight: 500, color: "var(--ivory)", marginBottom: 24 }}>
        My Orders
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {orders.slice().reverse().map((order) => (
          <div
            key={order.orderId}
            style={{
              border: "1px solid var(--line)",
              borderRadius: 6,
              padding: 20,
              backgroundColor: "var(--charcoal)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                borderBottom: "1px solid var(--line)",
                paddingBottom: 14,
                marginBottom: 14,
              }}
            >
              <div>
                <span style={{ fontSize: 11, color: "var(--text-muted)", display: "block", letterSpacing: "0.5px", textTransform: "uppercase" }}>
                  Order Reference
                </span>
                <strong style={{ fontSize: 15, color: "var(--gold)" }}>{order.orderId}</strong>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: 11, color: "var(--text-muted)", display: "block", letterSpacing: "0.5px", textTransform: "uppercase" }}>
                  Date
                </span>
                <strong style={{ fontSize: 14, color: "var(--ivory)" }}>{order.date}</strong>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
              {order.items.map((item) => (
                <div key={item.product.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 4 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "var(--ivory)", fontFamily: "'Cormorant Garamond', serif" }}>
                      {item.product.title}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                      Qty: {item.quantity}
                    </div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--gold)" }}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid var(--line)",
                paddingTop: 12,
              }}
            >
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                Paid via {order.paymentMethod}
              </span>
              <span style={{ fontSize: 16, fontWeight: 800, color: "var(--ivory)" }}>
                ${order.grandTotal.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}