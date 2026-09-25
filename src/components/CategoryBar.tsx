interface Props {
  active: string;
  onSelect: (category: string) => void;
  categories: string[];
}

export default function CategoryBar({ active, onSelect, categories }: Props) {
  const tabStyle = (isActive: boolean) => ({
    background: "none",
    border: "none",
    cursor: "pointer",
    fontWeight: isActive ? 600 : 400,
    color: isActive ? "var(--gold)" : "var(--text-muted)",
    fontSize: 13,
    letterSpacing: "1px",
    textTransform: "uppercase" as const,
    fontFamily: "'Montserrat', sans-serif",
    padding: "0 0 8px",
    borderBottom: isActive ? "2px solid var(--gold)" : "2px solid transparent",
    transition: "color 0.2s ease, border-color 0.2s ease",
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 32,
        flexWrap: "wrap",
        padding: "16px 20px 0",
        borderBottom: "1px solid var(--line)",
        background: "var(--obsidian)",
      }}
    >
      <button onClick={() => onSelect("All")} style={tabStyle(active === "All")}>
        All Jewellery
      </button>
      {categories.map((c) => (
        <button key={c} onClick={() => onSelect(c)} style={tabStyle(active === c)}>
          {c}
        </button>
      ))}
    </div>
  );
}