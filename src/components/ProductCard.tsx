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
    <div className="product-card product-card-inner">
      {/* Quick View eye icon */}
      <button
        onClick={handleQuickView}
        aria-label="Quick view"
        className="product-card-icon-btn product-card-quickview-btn"
      >
        <Eye size={16} color="var(--ivory)" />
      </button>

      {/* Wishlist heart */}
      <button
        onClick={handleWishlist}
        aria-label="Toggle wishlist"
        className="product-card-icon-btn product-card-wishlist-btn"
      >
        <Heart
          size={16}
          color={liked ? "var(--gold)" : "var(--ivory)"}
          fill={liked ? "var(--gold)" : "none"}
        />
      </button>

      {/* "Added" popup */}
      {justAdded && (
        <div className="product-card-added-badge">
          <Check size={13} />
          Added
        </div>
      )}

      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-card-image-wrap">
          <img src={product.image} alt={product.title} className="product-card-image" />
        </div>

        <div className="product-card-body">
          {product.category && <span className="product-card-category">{product.category}</span>}
          <h3 className="product-card-title">{product.title}</h3>
          <span className="product-card-price">${product.price.toFixed(2)}</span>
        </div>
      </Link>

      <div className="product-card-footer">
        <button
          onClick={handleAdd}
          disabled={justAdded}
          className={`product-card-add-btn ${justAdded ? "added" : "btn-outline-gold"}`}
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
        <QuickViewModal product={product} onClose={() => setShowQuickView(false)} onAdd={onAdd} />
      )}
    </div>
  );
}