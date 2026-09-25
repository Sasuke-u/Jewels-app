import { useState, useEffect } from "react";
import { X, ShoppingCart, Check } from "lucide-react";
import type { Product } from "../types/product";

interface Props {
  product: Product | null;
  onClose: () => void;
  onAdd: (product: Product) => void;
}

const DEFAULT_METALS = ["18K Yellow Gold", "Rose Gold", "Platinum"];
const DEFAULT_CARATS = ["0.5ct", "1.0ct", "1.5ct"];

export default function QuickViewModal({ product, onClose, onAdd }: Props) {
  const [selectedMetal, setSelectedMetal] = useState("");
  const [selectedCarat, setSelectedCarat] = useState("");
  const [added, setAdded] = useState(false);

  const metals = product?.metals ?? DEFAULT_METALS;
  const carats = product?.carats ?? DEFAULT_CARATS;

  useEffect(() => {
    if (product) {
      setSelectedMetal(metals[0]);
      setSelectedCarat(carats[0]);
      setAdded(false);
    }
  }, [product]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!product) return null;

  const handleAdd = () => {
    onAdd(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(9,9,11,0.75)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-surface"
        style={{
          width: "100%",
          maxWidth: "820px",
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: "6px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "rgba(9,9,11,0.5)",
            border: "1px solid var(--line)",
            borderRadius: "50%",
            width: "34px",
            height: "34px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--ivory)",
            zIndex: 5,
          }}
        >
          <X size={18} />
        </button>

        {/* Image */}
        <div style={{ backgroundColor: "var(--charcoal-light)" }}>
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: "320px" }}
          />
        </div>

        {/* Details */}
        <div style={{ padding: "40px 36px", display: "flex", flexDirection: "column" }}>
          {product.category && <span className="eyebrow">{product.category}</span>}

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "30px",
              fontWeight: 500,
              color: "var(--ivory)",
              margin: "10px 0 8px",
            }}
          >
            {product.title}
          </h2>

          <span
            className="gold-gradient-text"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "22px",
              fontWeight: 600,
              marginBottom: "20px",
              display: "block",
            }}
          >
            ${product.price.toFixed(2)}
          </span>

          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "14px",
              lineHeight: 1.7,
              marginBottom: "28px",
            }}
          >
            {product.description ||
              "Handcrafted with precision, this piece embodies timeless elegance and enduring quality — a treasure to be cherished for generations."}
          </p>

          {/* Metal swatches */}
          <div style={{ marginBottom: "24px" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "10px",
                display: "block",
              }}
            >
              Metal: <span style={{ color: "var(--ivory)" }}>{selectedMetal}</span>
            </span>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {metals.map((metal) => (
                <button
                  key={metal}
                  onClick={() => setSelectedMetal(metal)}
                  style={{
                    padding: "9px 16px",
                    fontSize: "12px",
                    fontWeight: 500,
                    borderRadius: "2px",
                    cursor: "pointer",
                    border: selectedMetal === metal ? "1px solid var(--gold)" : "1px solid var(--line)",
                    backgroundColor: selectedMetal === metal ? "rgba(212,175,55,0.12)" : "transparent",
                    color: selectedMetal === metal ? "var(--gold)" : "var(--text-muted)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {metal}
                </button>
              ))}
            </div>
          </div>

          {/* Carat selection */}
          <div style={{ marginBottom: "32px" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "10px",
                display: "block",
              }}
            >
              Carat: <span style={{ color: "var(--ivory)" }}>{selectedCarat}</span>
            </span>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {carats.map((carat) => (
                <button
                  key={carat}
                  onClick={() => setSelectedCarat(carat)}
                  style={{
                    width: "52px",
                    height: "40px",
                    fontSize: "12px",
                    fontWeight: 500,
                    borderRadius: "2px",
                    cursor: "pointer",
                    border: selectedCarat === carat ? "1px solid var(--gold)" : "1px solid var(--line)",
                    backgroundColor: selectedCarat === carat ? "rgba(212,175,55,0.12)" : "transparent",
                    color: selectedCarat === carat ? "var(--gold)" : "var(--text-muted)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {carat}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAdd}
            disabled={added}
            className={added ? "" : "btn-gold"}
            style={{
              marginTop: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              ...(added && {
                backgroundColor: "var(--charcoal-light)",
                color: "var(--gold)",
                border: "1px solid var(--gold)",
                padding: "14px 28px",
                borderRadius: "2px",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                cursor: "default",
              }),
            }}
          >
            {added ? (
              <>
                <Check size={16} />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}