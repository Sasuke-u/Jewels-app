interface Category {
  name: string;
  image: string;
}

interface Props {
  categories: Category[];
  onSelect: (category: string) => void;
}

export default function CategoryGrid({ categories, onSelect }: Props) {
  return (
    <div style={{ margin: "50px 0" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, margin: "0 0 6px" }}>
          Find Your Perfect Match
        </h2>
        <p style={{ color: "#888" }}>Shop by Categories</p>
      </div>

      <div
        style={{
          display: "grid",
          gap: 24,
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        }}
      >
        {categories.map((c) => (
          <button
            key={c.name}
            onClick={() => onSelect(c.name)}
            style={{
              border: "none",
              padding: 0,
              cursor: "pointer",
              background: "none",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "1 / 1",
                borderRadius: 12,
                overflow: "hidden",
                marginBottom: 10,
              }}
            >
              <img
                src={c.image}
                alt={c.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: "#2b2b2b",
              }}
            >
              {c.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}