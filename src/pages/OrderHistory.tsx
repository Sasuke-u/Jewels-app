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
        <Package size={48} color="var(--champagne)" style={{ marginBottom: 16 }} />
        <h2 style={{ fontSize: 20, color: "var(--navy)", marginBottom: 8, fontFamily: "'Jost', sans-serif" }}>
          No orders yet
        </h2>
        <p style={{ color: "var(--text-muted)", marginBottom: 24, fontSize: 14 }}>
          Your past orders will show up here once you make a purchase.
        </p>
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "var(--navy)",
            color: "var(--champagne-light)",
            textDecoration: "none",
            padding: "12px 28px",
            borderRadius: 4,
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          <ShoppingBag size={16} />
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "20px 0 60px" }}>
      <h2 style={{ fontSize: 26, fontWeight: 700, color: "var(--navy)", marginBottom: 24, fontFamily: "'Jost', sans-serif" }}>
        My Orders
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {orders.slice().reverse().map((order) => (
          <div
            key={order.orderId}
            style={{
              border: "1px solid var(--line)",
              borderRadius: 10,
              padding: 20,
              backgroundColor: "#fff",
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
                <span style={{ fontSize: 12, color: "var(--text-muted)", display: "block" }}>
                  Order Reference
                </span>
                <strong style={{ fontSize: 15, color: "var(--navy)" }}>{order.orderId}</strong>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: 12, color: "var(--text-muted)", display: "block" }}>
                  Date
                </span>
                <strong style={{ fontSize: 14, color: "var(--navy)" }}>{order.date}</strong>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
              {order.items.map((item) => (
                <div key={item.product.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 6 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)" }}>
                      {item.product.title}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                      Qty: {item.quantity}
                    </div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--champagne)" }}>
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
              <span style={{ fontSize: 16, fontWeight: 800, color: "var(--navy)" }}>
                ${order.grandTotal.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}