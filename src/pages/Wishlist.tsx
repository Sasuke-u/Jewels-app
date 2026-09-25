import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-empty">
        <Heart size={48} color="var(--gold)" style={{ marginBottom: 16 }} />
        <h2 className="wishlist-empty-title">Your wishlist is empty</h2>
        <p className="wishlist-empty-text">
          Save pieces you love by tapping the heart icon on any product.
        </p>
        <Link to="/" className="btn-gold wishlist-empty-link">
          Browse Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <h2 className="wishlist-title">My Wishlist ({wishlist.length})</h2>

      <div className="wishlist-grid">
        {wishlist.map((product) => (
          <div key={product.id} className="product-card wishlist-card">
            <button
              onClick={() => toggleWishlist(product)}
              aria-label="Remove from wishlist"
              className="wishlist-heart-btn"
            >
              <Heart size={16} color="var(--gold)" fill="var(--gold)" />
            </button>

            <Link to={`/product/${product.id}`} className="wishlist-card-link">
              <div className="wishlist-card-image-wrap">
                <img src={product.image} alt={product.title} className="wishlist-card-image" />
              </div>

              <div className="wishlist-card-body">
                {product.category && <span className="wishlist-card-category">{product.category}</span>}
                <h3 className="wishlist-card-title">{product.title}</h3>
                <span className="wishlist-card-price">${product.price.toFixed(2)}</span>
              </div>
            </Link>

            <div className="wishlist-card-actions">
              <button onClick={() => addToCart(product)} className="btn-outline-gold wishlist-add-btn">
                <ShoppingCart size={14} />
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                aria-label="Remove"
                className="wishlist-remove-btn"
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