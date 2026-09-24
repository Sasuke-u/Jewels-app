import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Check } from "lucide-react";
import type { Product } from "../types/product";

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}

export default function ProductCard({ product, onAdd }: Props) {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    onAdd(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "8px",
        overflow: "hidden",
        border: "1px solid var(--line)",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 10px 20px rgba(10,25,48,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {justAdded && (
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            backgroundColor: "var(--navy)",
            color: "var(--champagne-light)",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            zIndex: 10,
            animation: "fadeSlideIn 0.2s ease-out",
          }}
        >
          <Check size={14} />
          Added
        </div>
      )}

      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div style={{ overflow: "hidden" }}>
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: "100%",
              height: "280px",
              objectFit: "cover",
              transition: "transform 0.3s",
              display: "block",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>

        <div style={{ padding: "20px 20px 0" }}>
          <h3
            style={{
              margin: "0 0 8px 0",
              fontSize: "16px",
              fontWeight: "600",
              color: "var(--navy)",
              fontFamily: "'Jost', sans-serif",
            }}
          >
            {product.title}
          </h3>
          <span
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "var(--champagne)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            ${product.price.toFixed(2)}
          </span>
        </div>
      </Link>

      <div style={{ padding: "20px", paddingTop: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
        <button
          onClick={handleAdd}
          disabled={justAdded}
          style={{
            marginTop: "auto",
            backgroundColor: justAdded ? "#2e7d32" : "var(--navy)",
            color: "var(--champagne-light)",
            border: "none",
            padding: "12px",
            borderRadius: "4px",
            cursor: justAdded ? "default" : "pointer",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => {
            if (!justAdded) e.currentTarget.style.backgroundColor = "var(--navy-deep)";
          }}
          onMouseLeave={(e) => {
            if (!justAdded) e.currentTarget.style.backgroundColor = "var(--navy)";
          }}
        >
          {justAdded ? (
            <>
              <Check size={18} />
              Added
            </>
          ) : (
            <>
              <ShoppingCart size={18} />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}