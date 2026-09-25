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
      <div className="order-history-empty">
        <Package size={48} color="var(--gold)" style={{ marginBottom: 16 }} />
        <h2 className="order-history-empty-title">No orders yet</h2>
        <p className="order-history-empty-text">
          Your past orders will show up here once you make a purchase.
        </p>
        <Link to="/" className="btn-gold order-history-empty-link">
          <ShoppingBag size={16} />
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="order-history-page">
      <h2 className="order-history-title">My Orders</h2>

      <div className="order-history-list">
        {orders.slice().reverse().map((order) => (
          <div key={order.orderId} className="order-card">
            <div className="order-card-header">
              <div>
                <span className="order-card-label">Order Reference</span>
                <strong className="order-card-ref">{order.orderId}</strong>
              </div>
              <div className="order-card-date-block">
                <span className="order-card-label">Date</span>
                <strong className="order-card-date">{order.date}</strong>
              </div>
            </div>

            <div className="order-card-items">
              {order.items.map((item) => (
                <div key={item.product.id} className="order-card-item">
                  <img src={item.product.image} alt={item.product.title} className="order-card-item-image" />
                  <div className="order-card-item-info">
                    <div className="order-card-item-title">{item.product.title}</div>
                    <div className="order-card-item-qty">Qty: {item.quantity}</div>
                  </div>
                  <div className="order-card-item-price">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="order-card-footer">
              <span className="order-card-payment">Paid via {order.paymentMethod}</span>
              <span className="order-card-total">${order.grandTotal.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}