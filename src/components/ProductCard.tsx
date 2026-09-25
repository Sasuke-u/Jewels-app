import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Check, Heart, Eye } from "lucide-react";
import type { Product } from "../types/product";
import { useWishlist } from "../context/WishlistContext";
import QuickViewModal from "./QuickViewModal";

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}

export default function ProductCard({ product, onAdd }: Props) {
  const [justAdded, setJustAdded] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const { toggleWishlist, isWishlisted } = useWishlist();
  const liked = isWishlisted(product.id);

  const handleAdd = () => {
    onAdd(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  };

  return (
    <div
      className="product-card"
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Quick View eye icon */}
      <button
        onClick={handleQuickView}
        aria-label="Quick view"
        style={{
          position: "absolute",
          top: "14px",
          right: "56px",
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
        <Eye size={16} color="var(--ivory)" />
      </button>

      {/* Wishlist heart */}
      <button
        onClick={handleWishlist}
        aria-label="Toggle wishlist"
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
        <Heart
          size={16}
          color={liked ? "var(--gold)" : "var(--ivory)"}
          fill={liked ? "var(--gold)" : "none"}
        />
      </button>

      {/* "Added" popup */}
      {justAdded && (
        <div
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            backgroundColor: "var(--gold)",
            color: "var(--obsidian)",
            padding: "6px 12px",
            borderRadius: "2px",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            zIndex: 10,
          }}
        >
          <Check size={13} />
          Added
        </div>
      )}

      <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div style={{ overflow: "hidden", aspectRatio: "1 / 1" }}>
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s ease",
              display: "block",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>

        <div style={{ padding: "22px 20px 0" }}>
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
              fontSize: "18px",
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

      <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
        <button
          onClick={handleAdd}
          disabled={justAdded}
          className={justAdded ? "" : "btn-outline-gold"}
          style={{
            marginTop: "auto",
            fontSize: "11px",
            padding: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            ...(justAdded && {
              backgroundColor: "var(--gold)",
              color: "var(--obsidian)",
              border: "1px solid var(--gold)",
              borderRadius: "2px",
              fontWeight: 600,
              letterSpacing: "1px",
              textTransform: "uppercase",
              cursor: "default",
            }),
          }}
        >
          {justAdded ? (
            <>
              <Check size={16} />
              Added
            </>
          ) : (
            <>
              <ShoppingCart size={16} />
              Add to Cart
            </>
          )}
        </button>
      </div>

      {showQuickView && (
        <QuickViewModal
          product={product}
          onClose={() => setShowQuickView(false)}
          onAdd={onAdd}
        />
      )}
    </div>
  );
}