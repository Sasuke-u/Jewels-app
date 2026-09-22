interface Props {
  active: string;
  onSelect: (category: string) => void;
  categories: string[];
}

export default function CategoryBar({ active, onSelect, categories }: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 32,
        flexWrap: "wrap",
        padding: "14px 20px",
        borderBottom: "1px solid #eee",
        background: "#fff",
      }}
    >
      <button
        onClick={() => onSelect("All")}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontWeight: active === "All" ? 700 : 500,
          color: active === "All" ? "var(--gold)" : "#2b2b2b",
          fontSize: 14,
        }}
      >
        All Jewellery
      </button>
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontWeight: active === c ? 700 : 500,
            color: active === c ? "var(--gold)" : "#2b2b2b",
            fontSize: 14,
          }}
        >
          {c}
        </button>
      ))}
    </div>
  );
}