import type { Product } from "../types/product";

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}

export default function ProductCard({ product, onAdd }: Props) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
      <img src={product.image} alt={product.title} width={120} />
      <h4>{product.title}</h4>
      <p>${product.price}</p>
      <button
        onClick={() => onAdd(product)}
        style={{
          padding: "8px 16px",
          borderRadius: 8,
          border: "none",
          background: "gold",
          color: "#222",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Add to cart
      </button>
    </div>
  );
}