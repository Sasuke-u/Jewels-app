import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { jewelryProducts } from "../data/products";
import { useCart } from "../context/CartContext";
import { ArrowLeft } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const product = jewelryProducts.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div style={{ textAlign: "center", marginTop: 80 }}>
        <h2>Product not found</h2>
        <Link to="/" style={{ color: "var(--gold)" }}>
          Back to shop
        </Link>
      </div>
    );
  }

  const related = jewelryProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div style={{ padding: "20px 0 60px" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#555",
          fontSize: 14,
          marginBottom: 24,
          padding: 0,
        }}
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48,
          alignItems: "start",
        }}
      >
        <div
          style={{
            aspectRatio: "1 / 1",
            borderRadius: 16,
            overflow: "hidden",
            background: "#f5f2ee",
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div>
          {product.category && (
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: "var(--gold)",
              }}
            >
              {product.category}
            </span>
          )}
          <h1
            style={{
              fontSize: 32,
              margin: "8px 0 12px",
              lineHeight: 1.2,
            }}
          >
            {product.title}
          </h1>
          <p style={{ fontSize: 24, fontWeight: 700, color: "var(--gold)", margin: "0 0 20px" }}>
            ${product.price.toFixed(2)}
          </p>

          <p style={{ color: "#666", lineHeight: 1.7, marginBottom: 28, fontSize: 15 }}>
            {product.description ||
              "Handcrafted with care, this piece brings timeless elegance to any occasion. Made with premium materials and finished with meticulous attention to detail."}
          </p>

          <button
            className="btn-gold"
            onClick={handleAdd}
            style={{ padding: "14px 32px", fontSize: 15, width: "100%", maxWidth: 320 }}
          >
            {added ? "Added to Cart ✓" : "Add to Cart"}
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <div style={{ marginTop: 70 }}>
          <h2 style={{ fontSize: 24, marginBottom: 24 }}>You may also like</h2>
          <div
            style={{
              display: "grid",
              gap: 24,
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            }}
          >
            {related.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="product-card"
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
              >
                <div style={{ aspectRatio: "1 / 1", overflow: "hidden" }}>
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: 14 }}>
                  <h4 style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 500 }}>{p.title}</h4>
                  <p style={{ margin: 0, fontWeight: 700, color: "var(--gold)" }}>${p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}












































































































































































































































































































































































































































































































