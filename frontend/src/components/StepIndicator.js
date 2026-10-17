const STEPS = [
  { num: 1, label: "Basics" },
  { num: 2, label: "Details" },
  { num: 3, label: "Specifics" },
  { num: 4, label: "Review" },
];

export default function StepIndicator({ currentStep }) {
  return (
    <div className="stepIndicator">
      {STEPS.map((step, index) => (
        <div className="stepItem" key={step.num}>
          <div style={{ position: "relative" }}>
            <div
              className={`stepCircle ${
                currentStep > step.num
                  ? "completed"
                  : currentStep === step.num
                  ? "active"
                  : "inactive"
              }`}
            >
              {currentStep > step.num ? (
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.num
              )}
            </div>
            <span
              className={`stepLabel ${
                currentStep === step.num ? "activeLabel" : ""
              }`}
            >
              {step.label}
            </span>
          </div>
          {index < STEPS.length - 1 && (
            <div
              className={`stepLine ${
                currentStep > step.num ? "completedLine" : ""
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
