import { useState } from "react";
import ProductCard from "../components/ProductCard";
import CategoryBar from "../components/CategoryBar";
import { useCart } from "../context/CartContext";
import { jewelryProducts, categories } from "../data/products";

type SortOption = "default" | "price-low" | "price-high";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const { addToCart } = useCart();

  const categoryNames = categories.map((c) => c.name);

  let filtered = jewelryProducts.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesMin = minPrice === "" || p.price >= Number(minPrice);
    const matchesMax = maxPrice === "" || p.price <= Number(maxPrice);
    return matchesSearch && matchesCategory && matchesMin && matchesMax;
  });

  if (sortBy === "price-low") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("All");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("default");
  };

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

      {/* Filter & Sort Bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 16,
          padding: "20px 0",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <label style={{ fontSize: 13, color: "var(--text-muted)" }}>Price:</label>
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            style={{
              width: 80,
              padding: "8px 10px",
              border: "1px solid var(--line)",
              borderRadius: 4,
              fontSize: 13,
              outline: "none",
            }}
          />
          <span style={{ color: "var(--text-muted)", fontSize: 13 }}>–</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            style={{
              width: 80,
              padding: "8px 10px",
              border: "1px solid var(--line)",
              borderRadius: 4,
              fontSize: 13,
              outline: "none",
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <label style={{ fontSize: 13, color: "var(--text-muted)" }}>Sort:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            style={{
              padding: "8px 10px",
              border: "1px solid var(--line)",
              borderRadius: 4,
              fontSize: 13,
              color: "var(--navy)",
              outline: "none",
              backgroundColor: "#fff",
              cursor: "pointer",
            }}
          >
            <option value="default">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {(search || activeCategory !== "All" || minPrice || maxPrice || sortBy !== "default") && (
          <button
            onClick={clearFilters}
            style={{
              marginLeft: "auto",
              background: "none",
              border: "none",
              color: "var(--champagne)",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <p style={{ fontSize: 16, color: "var(--text-muted)", marginBottom: 16 }}>
            No products found matching your filters.
          </p>
          <button
            onClick={clearFilters}
            style={{
              backgroundColor: "var(--navy)",
              color: "var(--champagne-light)",
              border: "none",
              padding: "10px 24px",
              borderRadius: 4,
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
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
      )}
    </div>
  );
}