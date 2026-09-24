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
        borderBottom: "1px solid var(--line)",
        background: "var(--cream)",
      }}
    >
      <button
        onClick={() => onSelect("All")}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontWeight: active === "All" ? 700 : 500,
          color: active === "All" ? "var(--navy)" : "var(--text-muted)",
          fontSize: 14,
          fontFamily: "'Inter', sans-serif",
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
            color: active === c ? "var(--navy)" : "var(--text-muted)",
            fontSize: 14,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {c}
        </button>
      ))}
    </div>
  );
}