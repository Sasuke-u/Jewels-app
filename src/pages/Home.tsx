import { useState } from "react";
import ProductCard from "../components/ProductCard";
import CategoryBar from "../components/CategoryBar";
import { useCart } from "../context/CartContext";
import { jewelryProducts, categories } from "../data/products";

type SortOption = "popularity" | "price-low" | "price-high";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("popularity");
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
  } else {
    // "Popularity" — lower id treated as longer-standing / bestselling item
    filtered = [...filtered].sort((a, b) => a.id - b.id);
  }

  const activeFilterCount = [
    search !== "",
    activeCategory !== "All",
    minPrice !== "",
    maxPrice !== "",
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("All");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("popularity");
  };

  const filterInputStyle = {
    width: 80,
    padding: "8px 10px",
    border: "1px solid var(--line)",
    borderRadius: 4,
    fontSize: 13,
    outline: "none",
    backgroundColor: "var(--charcoal)",
    color: "var(--ivory)",
    fontFamily: "'Montserrat', sans-serif",
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
          borderRadius: 6,
          background: "linear-gradient(135deg, var(--charcoal), var(--obsidian))",
          border: "1px solid var(--line)",
        }}
      >
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            fontSize: 44,
            margin: "0 0 12px",
            color: "var(--ivory)",
          }}
        >
          Timeless Elegance,<br />Handcrafted for You
        </h1>
        <p style={{ color: "var(--text-muted)", marginBottom: 28, fontSize: 15, fontFamily: "'Montserrat', sans-serif" }}>
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
            borderRadius: 2,
            border: "1px solid var(--line)",
            outline: "none",
            fontSize: 14,
            backgroundColor: "var(--charcoal)",
            color: "var(--ivory)",
            fontFamily: "'Montserrat', sans-serif",
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
            style={filterInputStyle}
          />
          <span style={{ color: "var(--text-muted)", fontSize: 13 }}>–</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            style={filterInputStyle}
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
              color: "var(--ivory)",
              outline: "none",
              backgroundColor: "var(--charcoal)",
              cursor: "pointer",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            <option value="popularity">Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {activeFilterCount > 0 && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "var(--obsidian)",
              backgroundColor: "var(--gold)",
              padding: "3px 9px",
              borderRadius: 20,
            }}
          >
            {activeFilterCount} active
          </span>
        )}

        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            style={{
              marginLeft: "auto",
              background: "none",
              border: "none",
              color: "var(--gold)",
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
          <button onClick={clearFilters} className="btn-gold">
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