import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { jewelryProducts } from "../data/products";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const { addToCart } = useCart();

  const filtered = jewelryProducts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h2 style={{ fontSize: "32px", margin: "0 0 10px 0", fontWeight: "300" }}>Handmade Necklaces</h2>
        <p style={{ color: "#666", marginBottom: 24 }}>Discover our artisan-crafted jewelry collection</p>
        <input
          placeholder="Search collections..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "14px 24px",
            width: "100%",
            maxWidth: 450,
            borderRadius: 30,
            border: "1px solid #ddd",
            outline: "none",
            fontSize: "16px",
          }}
        />
      </div>

      <div style={{
          display: "grid",
          gap: 30,
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      }}>
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={addToCart} />
        ))}
      </div>
    </div>
  );
}