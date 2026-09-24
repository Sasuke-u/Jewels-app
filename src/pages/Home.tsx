import { useState } from "react";
import ProductCard from "../components/ProductCard";
import CategoryBar from "../components/CategoryBar";
import { useCart } from "../context/CartContext";
import { jewelryProducts, categories } from "../data/products";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const { addToCart } = useCart();

  const categoryNames = categories.map((c) => c.name);

  const filtered = jewelryProducts.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <CategoryBar
        active={activeCategory}
        onSelect={setActiveCategory}
        categories={categoryNames}
      />

      <div
        style={{
          textAlign: "center",
          padding: "70px 20px",
          margin: "24px 0 0",
          borderRadius: 16,
          background: "linear-gradient(135deg, var(--navy-deep), var(--navy))",
          color: "var(--cream)",
        }}
      >
        <h1
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 500,
            fontSize: 40,
            margin: "0 0 12px",
            color: "var(--champagne-light)",
          }}
        >
          Timeless Elegance,<br />Handcrafted for You
        </h1>
        <p style={{ color: "rgba(247,243,234,0.7)", marginBottom: 28, fontSize: 16 }}>
          Discover our artisan-crafted jewelry collection
        </p>
        <input
          placeholder="Search collections..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "14px 24px",
            width: "100%",
            maxWidth: 420,
            borderRadius: 30,
            border: "1px solid var(--line)",
            outline: "none",
            fontSize: 15,
            fontFamily: "'Inter', sans-serif",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gap: 28,
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          padding: "32px 0",
        }}
      >
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={addToCart} />
        ))}
      </div>
    </div>
  );
}