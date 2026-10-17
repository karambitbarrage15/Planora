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
    icon: "📋",
    desc: "Organize & coordinate events",
  },
  {
    value: "Performer",
    icon: "🎤",
    desc: "Artists, bands & entertainers",
  },
  {
    value: "Crew",
    icon: "🔧",
    desc: "Technical & support staff",
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
        Tell us about your event — the name, type, dates, and what kind of
        professional you're looking for.
      </p>

      {Object.keys(errors).length > 0 && (
        <div className="errorMessage">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0-9.5a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 0 1.5 0v-3.5A.75.75 0 0 0 8 5.5zM8 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
          </svg>
          Please fill in all required fields
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
            placeholder="e.g., Summer Music Festival 2025"
            value={formData.eventName}
            onChange={(e) => updateFormData("eventName", e.target.value)}
            style={errors.eventName ? { borderColor: "var(--error)" } : {}}
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
            style={errors.eventType ? { borderColor: "var(--error)" } : {}}
          >
            <option value="">Select type...</option>
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
            placeholder="e.g., Mumbai, Maharashtra"
            value={formData.location}
            onChange={(e) => updateFormData("location", e.target.value)}
            style={errors.location ? { borderColor: "var(--error)" } : {}}
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
            style={errors.startDate ? { borderColor: "var(--error)" } : {}}
          />
        </div>

        {/* End Date */}
        <div className="formGroup">
          <label className="label" htmlFor="endDate">
            End Date <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span>
          </label>
          <input
            id="endDate"
            className="input"
            type="date"
            value={formData.endDate}
            onChange={(e) => updateFormData("endDate", e.target.value)}
            style={errors.endDate ? { borderColor: "var(--error)" } : {}}
          />
        </div>

        {/* Venue */}
        <div className="formGroup fullWidth">
          <label className="label" htmlFor="venue">
            Venue <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span>
          </label>
          <input
            id="venue"
            className="input"
            type="text"
            placeholder="e.g., Grand Ballroom, The Oberoi"
            value={formData.venue}
            onChange={(e) => updateFormData("venue", e.target.value)}
          />
        </div>

        {/* Category Selector */}
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
                <span className="categoryIcon">{cat.icon}</span>
                <span className="categoryName">{cat.value}</span>
                <span className="categoryDesc">{cat.desc}</span>
              </div>
            ))}
          </div>
          {errors.category && (
            <span style={{ color: "var(--error)", fontSize: "0.8rem", marginTop: "4px" }}>
              {errors.category}
            </span>
          )}
        </div>
      </div>

      <div className="buttonGroup" style={{ justifyContent: "flex-end" }}>
        <button className="btn btnNext" onClick={handleNext}>
          Continue
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </>
  );
}
