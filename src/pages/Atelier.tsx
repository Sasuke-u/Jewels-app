import { useState } from "react";
import { Link } from "react-router-dom";
import { Gem, CheckCircle } from "lucide-react";

type JewelryType = "Ring" | "Necklace" | "Earrings" | "Bracelet" | "Other";

interface AtelierFormData {
  fullName: string;
  email: string;
  phone: string;
  jewelryType: JewelryType;
  description: string;
}

const initialFormData: AtelierFormData = {
  fullName: "",
  email: "",
  phone: "",
  jewelryType: "Ring",
  description: "",
};

export default function Atelier() {
  const [formData, setFormData] = useState<AtelierFormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    field: keyof AtelierFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleNewRequest = () => {
    setFormData(initialFormData);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="atelier-page">
        <div className="atelier-confirmation">
          <CheckCircle size={56} color="var(--gold)" style={{ marginBottom: 20 }} />
          <h2 className="atelier-confirmation-title">Thank You, {formData.fullName.split(" ")[0] || "there"}</h2>
          <p className="atelier-confirmation-text">
            Your bespoke consultation request has been received. A member of the NS Atelier
            team will reach out to you within 48 hours to begin bringing your vision to life.
          </p>
          <div className="atelier-confirmation-actions">
            <button onClick={handleNewRequest} className="btn-outline-gold">
              Submit Another Request
            </button>
            <Link to="/" className="btn-gold atelier-confirmation-link">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="atelier-page">
      <div className="atelier-hero">
        <Gem size={36} color="var(--gold)" style={{ marginBottom: 16 }} />
        <span className="eyebrow">Bespoke Consultation</span>
        <h1 className="atelier-title gold-gradient-text">The NS Atelier</h1>
        <p className="atelier-subtitle">
          Have a vision in mind? Share the details below and our master jewelers will
          craft a one-of-a-kind piece made exclusively for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="atelier-form glass-surface">
        <div className="atelier-form-grid">
          <div className="form-field">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Jane Smith"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-field">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              required
              placeholder="jane@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-field">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              required
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-field">
            <label className="form-label">Jewelry Type</label>
            <select
              required
              value={formData.jewelryType}
              onChange={(e) => handleChange("jewelryType", e.target.value)}
              className="form-input atelier-select"
            >
              <option value="Ring">Ring</option>
              <option value="Necklace">Necklace</option>
              <option value="Earrings">Earrings</option>
              <option value="Bracelet">Bracelet</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-field form-field-full">
            <label className="form-label">Tell Us About Your Vision</label>
            <textarea
              required
              placeholder="Describe the piece you'd like created — occasion, style inspiration, gemstones, engravings, or any other details..."
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="form-input atelier-textarea"
              rows={5}
            />
          </div>
        </div>

        <button type="submit" className="btn-gold atelier-submit-btn">
          Request Consultation
        </button>
      </form>
    </div>
  );
}