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
    <div className="pdp-page">
      <button onClick={() => navigate(-1)} className="pdp-back-btn">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="pdp-grid">
        <div className="pdp-image-wrap">
          <img src={product.image} alt={product.title} className="pdp-image" />
        </div>

        <div>
          {product.category && <span className="pdp-category">{product.category}</span>}
          <h1 className="pdp-title">{product.title}</h1>
          <p className="pdp-price">${product.price.toFixed(2)}</p>

          <p className="pdp-description">
            {product.description ||
              "Handcrafted with care, this piece brings timeless elegance to any occasion. Made with premium materials and finished with meticulous attention to detail."}
          </p>

          <button className="btn-gold pdp-add-btn" onClick={handleAdd}>
            {added ? "Added to Cart ✓" : "Add to Cart"}
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <div className="pdp-related">
          <h2 className="pdp-related-title">You may also like</h2>
          <div className="pdp-related-grid">
            {related.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="product-card pdp-related-card">
                <div className="pdp-related-image-wrap">
                  <img src={p.image} alt={p.title} className="pdp-related-image" />
                </div>
                <div className="pdp-related-info">
                  <h4 className="pdp-related-name">{p.title}</h4>
                  <p className="pdp-related-price">${p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}