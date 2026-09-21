import type { Product } from "../types/product";

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}

export default function ProductCard({ product, onAdd }: Props) {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "8px",
        overflow: "hidden",
        border: "1px solid #eaeaea",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <img
        src={product.image}
        alt={product.title}
        style={{ width: "100%", height: "280px", objectFit: "cover" }}
      />
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
        <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: "600" }}>
          {product.title}
        </h3>
        <span style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "20px" }}>
          ${product.price.toFixed(2)}
        </span>
        
        <button
          onClick={() => onAdd(product)}
          style={{
            marginTop: "auto",
            backgroundColor: "#111",
            color: "#fff",
            border: "none",
            padding: "12px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.2s"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#444")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#111")}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
