import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: 80, padding: "0 20px" }}>
        <Heart size={48} color="var(--gold)" style={{ marginBottom: 16 }} />
        <h2 style={{ fontSize: 22, color: "var(--ivory)", marginBottom: 8 }}>
          Your wishlist is empty
        </h2>
        <p style={{ color: "var(--text-muted)", marginBottom: 24, fontSize: 14 }}>
          Save pieces you love by tapping the heart icon on any product.
        </p>
        <Link to="/" className="btn-gold" style={{ textDecoration: "none", display: "inline-block" }}>
          Browse Collection
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px 0 60px" }}>
      <h2 style={{ fontSize: 28, fontWeight: 500, color: "var(--ivory)", marginBottom: 24 }}>
        My Wishlist ({wishlist.length})
      </h2>

      <div
        style={{
          display: "grid",
          gap: 24,
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        }}
      >
        {wishlist.map((product) => (
          <div key={product.id} className="product-card" style={{ position: "relative" }}>
            <button
              onClick={() => toggleWishlist(product)}
              aria-label="Remove from wishlist"
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                zIndex: 10,
                background: "rgba(9,9,11,0.5)",
                border: "none",
                borderRadius: "50%",
                width: "34px",
                height: "34px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backdropFilter: "blur(4px)",
              }}
            >
              <Heart size={16} color="var(--gold)" fill="var(--gold)" />
            </button>

            <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ overflow: "hidden", aspectRatio: "1 / 1" }}>
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>

              <div style={{ padding: "18px 18px 0" }}>
                {product.category && (
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                    }}
                  >
                    {product.category}
                  </span>
                )}
                <h3
                  style={{
                    margin: "8px 0 6px",
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "var(--ivory)",
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  {product.title}
                </h3>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "var(--text-muted)",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </Link>

            <div style={{ padding: "18px", display: "flex", gap: 8 }}>
              <button
                onClick={() => addToCart(product)}
                className="btn-outline-gold"
                style={{
                  flex: 1,
                  fontSize: "11px",
                  padding: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <ShoppingCart size={14} />
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                aria-label="Remove"
                style={{
                  width: 38,
                  border: "1px solid var(--line)",
                  background: "transparent",
                  borderRadius: "2px",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#e05252")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}