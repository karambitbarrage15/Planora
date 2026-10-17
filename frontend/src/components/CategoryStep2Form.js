const PLANNER_SERVICES = [
  "Catering",
  "Decoration",
  "Photography",
  "Videography",
  "Sound & Lighting",
  "Entertainment",
  "Invitations & RSVP",
  "Transportation",
  "Security",
  "Floral Arrangements",
];

const PERFORMER_TYPES = [
  "Band",
  "DJ",
  "Solo Artist",
  "Dance Group",
  "Comedian",
  "Magician",
  "MC/Host",
  "Orchestra",
  "Other",
];

const CREW_ROLES = [
  "Sound Engineer",
  "Lighting Technician",
  "Stage Manager",
  "Stagehand",
  "Security Personnel",
  "Camera Operator",
  "Makeup Artist",
  "Event Coordinator",
  "Usher",
  "Transport Driver",
];

const BUDGET_RANGES = [
  "Under $1,000",
  "$1,000 - $5,000",
  "$5,000 - $15,000",
  "$15,000 - $50,000",
  "$50,000+",
];

const EXPERIENCE_LEVELS = ["Entry Level", "Intermediate", "Experienced", "Expert"];

function CheckboxGroup({ options, selected, onChange }) {
  const toggleItem = (item) => {
    if (selected.includes(item)) {
      onChange(selected.filter((s) => s !== item));
    } else {
      onChange([...selected, item]);
    }
  };

  return (
    <div className="checkboxGroup">
      {options.map((item) => (
        <label
          key={item}
          className={`checkboxItem ${selected.includes(item) ? "checked" : ""}`}
        >
          <input
            type="checkbox"
            checked={selected.includes(item)}
            onChange={() => toggleItem(item)}
          />
          <span className="checkMark">
            <svg fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          {item}
        </label>
      ))}
    </div>
  );
}

function PlannerStep2({ formData, updateNestedFormData }) {
  const details = formData.plannerDetails;
  return (
    <div className="formGrid">
      <div className="formGroup">
        <label className="label" htmlFor="budgetRange">Budget Range</label>
        <select
          id="budgetRange"
          className="select"
          value={details.budgetRange}
          onChange={(e) => updateNestedFormData("plannerDetails", "budgetRange", e.target.value)}
        >
          <option value="">Select range...</option>
          {BUDGET_RANGES.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      <div className="formGroup">
        <label className="label" htmlFor="expectedGuests">Expected Guests</label>
        <input
          id="expectedGuests"
          className="input"
          type="number"
          min="1"
          placeholder="e.g., 150"
          value={details.expectedGuests}
          onChange={(e) => updateNestedFormData("plannerDetails", "expectedGuests", e.target.value)}
        />
      </div>

      <div className="formGroup fullWidth">
        <label className="label" htmlFor="theme">Theme / Style</label>
        <input
          id="theme"
          className="input"
          type="text"
          placeholder="e.g., Rustic Bohemian, Black Tie, Tropical"
          value={details.theme}
          onChange={(e) => updateNestedFormData("plannerDetails", "theme", e.target.value)}
        />
      </div>

      <div className="formGroup fullWidth">
        <label className="label">Services Needed</label>
        <CheckboxGroup
          options={PLANNER_SERVICES}
          selected={details.servicesNeeded}
          onChange={(val) => updateNestedFormData("plannerDetails", "servicesNeeded", val)}
        />
      </div>
    </div>
  );
}

function PerformerStep2({ formData, updateNestedFormData }) {
  const details = formData.performerDetails;
  return (
    <div className="formGrid">
      <div className="formGroup">
        <label className="label" htmlFor="performanceType">Performance Type</label>
        <select
          id="performanceType"
          className="select"
          value={details.performanceType}
          onChange={(e) => updateNestedFormData("performerDetails", "performanceType", e.target.value)}
        >
          <option value="">Select type...</option>
          {PERFORMER_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="formGroup">
        <label className="label" htmlFor="genre">Genre / Style</label>
        <input
          id="genre"
          className="input"
          type="text"
          placeholder="e.g., Jazz, Bollywood, EDM"
          value={details.genre}
          onChange={(e) => updateNestedFormData("performerDetails", "genre", e.target.value)}
        />
      </div>

      <div className="formGroup">
        <label className="label" htmlFor="numberOfPerformers">Number of Performers</label>
        <input
          id="numberOfPerformers"
          className="input"
          type="number"
          min="1"
          placeholder="e.g., 5"
          value={details.numberOfPerformers}
          onChange={(e) => updateNestedFormData("performerDetails", "numberOfPerformers", e.target.value)}
        />
      </div>

      <div className="formGroup">
        <label className="label" htmlFor="performanceDuration">Performance Duration</label>
        <input
          id="performanceDuration"
          className="input"
          type="text"
          placeholder="e.g., 2 hours, 45 mins"
          value={details.performanceDuration}
          onChange={(e) => updateNestedFormData("performerDetails", "performanceDuration", e.target.value)}
        />
      </div>
    </div>
  );
}

function CrewStep2({ formData, updateNestedFormData }) {
  const details = formData.crewDetails;
  return (
    <div className="formGrid">
      <div className="formGroup fullWidth">
        <label className="label">Crew Roles Needed</label>
        <CheckboxGroup
          options={CREW_ROLES}
          selected={details.crewRoles}
          onChange={(val) => updateNestedFormData("crewDetails", "crewRoles", val)}
        />
      </div>

      <div className="formGroup">
        <label className="label" htmlFor="numberOfCrew">Total Crew Members</label>
        <input
          id="numberOfCrew"
          className="input"
          type="number"
          min="1"
          placeholder="e.g., 10"
          value={details.numberOfCrew}
          onChange={(e) => updateNestedFormData("crewDetails", "numberOfCrew", e.target.value)}
        />
      </div>

      <div className="formGroup">
        <label className="label" htmlFor="experienceLevel">Experience Level</label>
        <select
          id="experienceLevel"
          className="select"
          value={details.experienceLevel}
          onChange={(e) => updateNestedFormData("crewDetails", "experienceLevel", e.target.value)}
        >
          <option value="">Select level...</option>
          {EXPERIENCE_LEVELS.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      <div className="formGroup">
        <label className="label" htmlFor="shiftDuration">Shift Duration</label>
        <input
          id="shiftDuration"
          className="input"
          type="text"
          placeholder="e.g., 8 hours, Full day"
          value={details.shiftDuration}
          onChange={(e) => updateNestedFormData("crewDetails", "shiftDuration", e.target.value)}
        />
      </div>
    </div>
  );
}

const STEP_TITLES = {
  "Event Planner": { title: "Planning Details", desc: "Tell us about the scope, budget, and services you need." },
  Performer: { title: "Performance Details", desc: "What type of performance are you looking for?" },
  Crew: { title: "Crew Requirements", desc: "What roles and how many crew members do you need?" },
};

export default function CategoryStep2Form({ category, formData, updateNestedFormData, onNext, onBack }) {
  const info = STEP_TITLES[category] || {};

  return (
    <>
      <h2 className="stepTitle">{info.title}</h2>
      <p className="stepDescription">{info.desc}</p>

      {category === "Event Planner" && (
        <PlannerStep2 formData={formData} updateNestedFormData={updateNestedFormData} />
      )}
      {category === "Performer" && (
        <PerformerStep2 formData={formData} updateNestedFormData={updateNestedFormData} />
      )}
      {category === "Crew" && (
        <CrewStep2 formData={formData} updateNestedFormData={updateNestedFormData} />
      )}

      <div className="buttonGroup">
        <button className="btn btnBack" onClick={onBack}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <button className="btn btnNext" onClick={onNext}>
          Continue
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </>
  );
}
