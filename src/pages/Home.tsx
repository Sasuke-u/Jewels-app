import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/jewelery")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <p style={{ textAlign: "center", fontSize: 18 }}>
        Cart: {cart.length} items | Total: ${total.toFixed(2)}
        {cart.length > 0 && (
          <button onClick={() => setCart([])} style={{ marginLeft: 12 }}>
            Clear
          </button>
        )}
      </p>

      <input
        placeholder="Search jewelry"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          display: "block",
          margin: "0 auto 24px",
          padding: "10px 16px",
          width: 280,
          borderRadius: 8,
          border: "1px solid gold",
        }}
      />
      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        }}
      >
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={addToCart} />
        ))}
      </div>
    </div>
  );
}