import { Gem, Leaf, BadgeCheck, ShieldCheck } from "lucide-react";

const BADGES = [
  {
    icon: Gem,
    title: "GIA Certified",
    subtitle: "Verified diamond grading",
  },
  {
    icon: Leaf,
    title: "Ethically Sourced",
    subtitle: "Conflict-free materials",
  },
  {
    icon: BadgeCheck,
    title: "Hallmarked",
    subtitle: "BIS-certified purity",
  },
  {
    icon: ShieldCheck,
    title: "Insured Shipping",
    subtitle: "Fully protected in transit",
  },
];

export default function TrustBadges() {
  return (
    <div className="trust-badges">
      {BADGES.map(({ icon: Icon, title, subtitle }) => (
        <div key={title} className="trust-badge">
          <div className="trust-badge-icon-wrap">
            <Icon size={22} color="var(--gold)" />
          </div>
          <div className="trust-badge-text">
            <span className="trust-badge-title">{title}</span>
            <span className="trust-badge-subtitle">{subtitle}</span>
          </div>
        </div>
      ))}
    </div>
  );
}