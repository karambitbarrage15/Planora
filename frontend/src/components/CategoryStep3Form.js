const PERFORMER_EQUIPMENT = [
  "Microphones",
  "Amplifiers",
  "Speakers",
  "Drum Kit",
  "Keyboard/Piano",
  "DJ Console",
  "Lighting Rig",
  "Monitors",
  "Mixing Board",
  "Projector/Screen",
];

function ToggleSwitch({ label, checked, onChange }) {
  return (
    <div className="toggleGroup">
      <div className="toggleSwitch">
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span className="toggleSlider" onClick={() => onChange(!checked)} />
      </div>
      <span className="toggleLabel">{label}</span>
    </div>
  );
}

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
          <input type="checkbox" checked={selected.includes(item)} onChange={() => toggleItem(item)} />
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

function PlannerStep3({ formData, updateNestedFormData }) {
  const details = formData.plannerDetails;
  return (
    <div className="formGrid">
      <div className="formGroup">
        <label className="label" htmlFor="cateringPreferences">Catering Preferences</label>
        <input
          id="cateringPreferences"
          className="input"
          type="text"
          placeholder="e.g., Vegetarian, Multi-cuisine"
          value={details.cateringPreferences}
          onChange={(e) => updateNestedFormData("plannerDetails", "cateringPreferences", e.target.value)}
        />
      </div>

      <div className="formGroup">
        <label className="label" htmlFor="decorationType">Decoration Style</label>
        <input
          id="decorationType"
          className="input"
          type="text"
          placeholder="e.g., Floral, Minimalist, Grand"
          value={details.decorationType}
          onChange={(e) => updateNestedFormData("plannerDetails", "decorationType", e.target.value)}
        />
      </div>

      <div className="formGroup fullWidth">
        <label className="label" htmlFor="timeline">Event Timeline / Schedule</label>
        <textarea
          id="timeline"
          className="textarea"
          placeholder="Outline the event schedule, key moments, or milestones..."
          value={details.timeline}
          onChange={(e) => updateNestedFormData("plannerDetails", "timeline", e.target.value)}
        />
      </div>

      <div className="formGroup fullWidth">
        <label className="label" htmlFor="additionalRequirements">Additional Requirements</label>
        <textarea
          id="additionalRequirements"
          className="textarea"
          placeholder="Any other specifics or special requests..."
          value={details.additionalRequirements}
          onChange={(e) => updateNestedFormData("plannerDetails", "additionalRequirements", e.target.value)}
        />
      </div>
    </div>
  );
}

function PerformerStep3({ formData, updateNestedFormData }) {
  const details = formData.performerDetails;
  return (
    <div className="formGrid">
      <div className="formGroup fullWidth">
        <label className="label">Equipment Needed</label>
        <CheckboxGroup
          options={PERFORMER_EQUIPMENT}
          selected={details.equipmentNeeded}
          onChange={(val) => updateNestedFormData("performerDetails", "equipmentNeeded", val)}
        />
      </div>

      <div className="formGroup fullWidth">
        <label className="label" htmlFor="stageRequirements">Stage Requirements</label>
        <input
          id="stageRequirements"
          className="input"
          type="text"
          placeholder="e.g., 20x15 ft stage, Indoor, Outdoor"
          value={details.stageRequirements}
          onChange={(e) => updateNestedFormData("performerDetails", "stageRequirements", e.target.value)}
        />
      </div>

      <div className="formGroup fullWidth">
        <ToggleSwitch
          label="Travel & Accommodation Required"
          checked={details.travelAccommodation}
          onChange={(val) => updateNestedFormData("performerDetails", "travelAccommodation", val)}
        />
      </div>

      <div className="formGroup fullWidth">
        <label className="label" htmlFor="specialRequirements">Special Requirements</label>
        <textarea
          id="specialRequirements"
          className="textarea"
          placeholder="Any rider requirements, backstage needs, dietary restrictions..."
          value={details.specialRequirements}
          onChange={(e) => updateNestedFormData("performerDetails", "specialRequirements", e.target.value)}
        />
      </div>
    </div>
  );
}

function CrewStep3({ formData, updateNestedFormData }) {
  const details = formData.crewDetails;
  return (
    <div className="formGrid">
      <div className="formGroup fullWidth">
        <ToggleSwitch
          label="Equipment Provided by Organizer"
          checked={details.equipmentProvided}
          onChange={(val) => updateNestedFormData("crewDetails", "equipmentProvided", val)}
        />
      </div>

      <div className="formGroup">
        <label className="label" htmlFor="dressCode">Dress Code</label>
        <input
          id="dressCode"
          className="input"
          type="text"
          placeholder="e.g., All black, Formal, Casual"
          value={details.dressCode}
          onChange={(e) => updateNestedFormData("crewDetails", "dressCode", e.target.value)}
        />
      </div>

      <div className="formGroup">
        <label className="label" htmlFor="safetyRequirements">Safety Requirements</label>
        <input
          id="safetyRequirements"
          className="input"
          type="text"
          placeholder="e.g., Hard hats, Safety vests"
          value={details.safetyRequirements}
          onChange={(e) => updateNestedFormData("crewDetails", "safetyRequirements", e.target.value)}
        />
      </div>

      <div className="formGroup fullWidth">
        <label className="label" htmlFor="additionalNotes">Additional Notes</label>
        <textarea
          id="additionalNotes"
          className="textarea"
          placeholder="Any other information for the crew..."
          value={details.additionalNotes}
          onChange={(e) => updateNestedFormData("crewDetails", "additionalNotes", e.target.value)}
        />
      </div>
    </div>
  );
}

const STEP_TITLES = {
  "Event Planner": { title: "Additional Preferences", desc: "Refine your event with catering, decoration, and schedule details." },
  Performer: { title: "Technical & Logistics", desc: "Specify equipment needs, stage setup, and special requirements." },
  Crew: { title: "Logistics & Notes", desc: "Add details about equipment, dress code, and safety." },
};

export default function CategoryStep3Form({ category, formData, updateNestedFormData, onNext, onBack }) {
  const info = STEP_TITLES[category] || {};

  return (
    <>
      <h2 className="stepTitle">{info.title}</h2>
      <p className="stepDescription">{info.desc}</p>

      {category === "Event Planner" && (
        <PlannerStep3 formData={formData} updateNestedFormData={updateNestedFormData} />
      )}
      {category === "Performer" && (
        <PerformerStep3 formData={formData} updateNestedFormData={updateNestedFormData} />
      )}
      {category === "Crew" && (
        <CrewStep3 formData={formData} updateNestedFormData={updateNestedFormData} />
      )}

      <div className="buttonGroup">
        <button className="btn btnBack" onClick={onBack}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <button className="btn btnNext" onClick={onNext}>
          Review & Submit
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </>
  );
}
