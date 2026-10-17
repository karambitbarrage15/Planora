import { useState } from "react";

const EVENT_TYPES = [
  "Concert",
  "Wedding",
  "Corporate",
  "Festival",
  "Private Party",
  "Conference",
  "Exhibition",
  "Sports Event",
  "Charity Event",
  "Other",
];

const CATEGORIES = [
  {
    value: "Event Planner",
    desc: "Luxury coordination, budgeting & complete timeline execution",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
        <path d="M9 14l2 2 4-4"/>
      </svg>
    ),
  },
  {
    value: "Performer",
    desc: "Headline DJs, live bands, solo virtuosos & stage artists",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="22"/>
        <line x1="8" y1="22" x2="16" y2="22"/>
      </svg>
    ),
  },
  {
    value: "Crew",
    desc: "Precision sound & lighting engineers, stagehands & technicians",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="21" x2="4" y2="14"/>
        <line x1="4" y1="10" x2="4" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12" y2="3"/>
        <line x1="20" y1="21" x2="20" y2="16"/>
        <line x1="20" y1="12" x2="20" y2="3"/>
        <line x1="1" y1="14" x2="7" y2="14"/>
        <line x1="9" y1="8" x2="15" y2="8"/>
        <line x1="17" y1="16" x2="23" y2="16"/>
      </svg>
    ),
  },
];

export default function EventBasicsForm({ formData, updateFormData, onNext }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.eventName.trim()) newErrors.eventName = "Event name is required";
    if (!formData.eventType) newErrors.eventType = "Event type is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.category) newErrors.category = "Please select a category";
    if (formData.endDate && formData.startDate && new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = "End date must be after start date";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <>
      <h2 className="stepTitle">Event Basics</h2>
      <p className="stepDescription">
        Define the core details of your event and select the professional talent track required.
      </p>

      {Object.keys(errors).length > 0 && (
        <div className="errorMessage">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0-9.5a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 0 1.5 0v-3.5A.75.75 0 0 0 8 5.5zM8 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
          </svg>
          Please complete all required fields
        </div>
      )}

      <div className="formGrid">
        {/* Event Name */}
        <div className="formGroup fullWidth">
          <label className="label" htmlFor="eventName">
            Event Name <span className="required">*</span>
          </label>
          <input
            id="eventName"
            className="input"
            type="text"
            placeholder="e.g., International Gala 2026"
            value={formData.eventName}
            onChange={(e) => updateFormData("eventName", e.target.value)}
            style={errors.eventName ? { borderColor: "var(--lux-red)" } : {}}
          />
        </div>

        {/* Event Type */}
        <div className="formGroup">
          <label className="label" htmlFor="eventType">
            Event Type <span className="required">*</span>
          </label>
          <select
            id="eventType"
            className="select"
            value={formData.eventType}
            onChange={(e) => updateFormData("eventType", e.target.value)}
            style={errors.eventType ? { borderColor: "var(--lux-red)" } : {}}
          >
            <option value="">Select event type...</option>
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="formGroup">
          <label className="label" htmlFor="location">
            Location <span className="required">*</span>
          </label>
          <input
            id="location"
            className="input"
            type="text"
            placeholder="e.g., Paris, France"
            value={formData.location}
            onChange={(e) => updateFormData("location", e.target.value)}
            style={errors.location ? { borderColor: "var(--lux-red)" } : {}}
          />
        </div>

        {/* Start Date */}
        <div className="formGroup">
          <label className="label" htmlFor="startDate">
            Start Date <span className="required">*</span>
          </label>
          <input
            id="startDate"
            className="input"
            type="date"
            value={formData.startDate}
            onChange={(e) => updateFormData("startDate", e.target.value)}
            style={errors.startDate ? { borderColor: "var(--lux-red)" } : {}}
          />
        </div>

        {/* End Date */}
        <div className="formGroup">
          <label className="label" htmlFor="endDate">
            End Date <span style={{ fontSize: "0.68rem", color: "var(--text-dim)", textTransform: "none" }}>(optional)</span>
          </label>
          <input
            id="endDate"
            className="input"
            type="date"
            value={formData.endDate}
            onChange={(e) => updateFormData("endDate", e.target.value)}
            style={errors.endDate ? { borderColor: "var(--lux-red)" } : {}}
          />
        </div>

        {/* Venue */}
        <div className="formGroup fullWidth">
          <label className="label" htmlFor="venue">
            Venue <span style={{ fontSize: "0.68rem", color: "var(--text-dim)", textTransform: "none" }}>(optional)</span>
          </label>
          <input
            id="venue"
            className="input"
            type="text"
            placeholder="e.g., Grand Palais, The Ritz Paris"
            value={formData.venue}
            onChange={(e) => updateFormData("venue", e.target.value)}
          />
        </div>

        {/* Category Selector with Professional SVGs & Crisp Typography */}
        <div className="formGroup fullWidth">
          <label className="label">
            Looking For <span className="required">*</span>
          </label>
          <div className="categorySelector">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.value}
                className={`categoryCard ${
                  formData.category === cat.value ? "selected" : ""
                }`}
                onClick={() => updateFormData("category", cat.value)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    updateFormData("category", cat.value);
                  }
                }}
              >
                <div className="categoryIconWrap">{cat.icon}</div>
                <div className="categoryName">{cat.value}</div>
                <p className="categoryDesc">{cat.desc}</p>
              </div>
            ))}
          </div>
          {errors.category && (
            <span style={{ color: "var(--lux-red)", fontSize: "0.78rem", marginTop: "6px", display: "block" }}>
              {errors.category}
            </span>
          )}
        </div>
      </div>

      <div className="buttonGroup" style={{ justifyContent: "flex-end" }}>
        <button className="btn btnNext" onClick={handleNext}>
          Continue
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </>
  );
}
