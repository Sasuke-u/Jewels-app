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

  return (
    <div>
      <CategoryBar
        active={activeCategory}
        onSelect={setActiveCategory}
        categories={categoryNames}
      />

      <div className="home-page">
        <div className="home-hero">
          <h1 className="home-hero-title">
            Timeless Elegance,<br />Handcrafted for You
          </h1>
          <p className="home-hero-subtitle">
            Discover our artisan-crafted jewelry collection
          </p>
          <input
            placeholder="Search collections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="home-search-input"
          />
        </div>

        {/* Filter & Sort Bar */}
        <div className="filter-bar">
          <div className="filter-group">
            <label className="filter-label">Price:</label>
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="filter-input"
            />
            <span className="filter-dash">–</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">Sort:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="filter-select"
            >
              <option value="popularity">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {activeFilterCount > 0 && (
            <span className="filter-badge">{activeFilterCount} active</span>
          )}

          {activeFilterCount > 0 && (
            <button onClick={clearFilters} className="clear-filters-btn">
              Clear filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state-text">
              No products found matching your filters.
            </p>
            <button onClick={clearFilters} className="btn-gold">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}