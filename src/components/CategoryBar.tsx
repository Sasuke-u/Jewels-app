interface Props {
  active: string;
  onSelect: (category: string) => void;
  categories: string[];
}

export default function CategoryBar({ active, onSelect, categories }: Props) {
  return (
    <div className="category-bar">
      <div className="category-bar-track">
        <button
          onClick={() => onSelect("All")}
          className={`category-tab ${active === "All" ? "active" : ""}`}
        >
          All Jewellery
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => onSelect(c)}
            className={`category-tab ${active === c ? "active" : ""}`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}