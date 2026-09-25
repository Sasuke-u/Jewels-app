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
    <div className="confirmation-page">
      <div className="confirmation-icon-wrap">
        <CheckCircle size={64} color="var(--gold)" />
      </div>

      <h1 className="confirmation-title">Order Placed</h1>
      <p className="confirmation-subtitle">
        Thank you for your purchase! Order receipt sent to{" "}
        <strong className="confirmation-email">{order.shipping.email}</strong>.
      </p>

      <div className="confirmation-box">
        <div className="confirmation-meta-row">
          <div className="confirmation-meta-block">
            <span className="confirmation-meta-label">Order Reference</span>
            <strong className="confirmation-meta-ref">{order.orderId}</strong>
          </div>
          <div className="confirmation-meta-block">
            <span className="confirmation-meta-label">Date</span>
            <strong className="confirmation-meta-value">{order.date}</strong>
          </div>
          <div className="confirmation-meta-block">
            <span className="confirmation-meta-label">Payment Method</span>
            <strong className="confirmation-meta-value">{order.paymentMethod}</strong>
          </div>
        </div>

        <h4 className="confirmation-items-heading">
          Items Purchased ({order.items.length})
        </h4>

        <div className="confirmation-items-list">
          {order.items.map((item) => (
            <div key={item.product.id} className="confirmation-item">
              <img src={item.product.image} alt={item.product.title} className="confirmation-item-image" />
              <div className="confirmation-item-info">
                <div className="confirmation-item-title">{item.product.title}</div>
                <div className="confirmation-item-qty">Qty: {item.quantity}</div>
              </div>
              <div className="confirmation-item-price">
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="confirmation-total-row">
          <span>Grand Total Paid</span>
          <span className="gold-gradient-text">${order.grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <Link to="/" className="btn-gold confirmation-cta">
        <ShoppingBag size={18} />
        <span>Keep Shopping</span>
      </Link>
    </div>
  );
}