export default function SuccessScreen({ data, onNewRequirement, onViewFeed }) {
  return (
    <div className="formCard">
      <div className="successScreen">
        <div className="successIcon">
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="successTitle">Requirement Submitted!</h2>
        <p className="successMessage">
          Your event requirement for <strong>"{data?.eventName}"</strong> has been
          successfully recorded in MongoDB and categorized under{" "}
          <strong>{data?.category}</strong>.
          <br />
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "8px", display: "inline-block" }}>
            MongoDB ID: {data?._id}
          </span>
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          {onViewFeed && (
            <button className="btnPrimaryHero" style={{ padding: "12px 24px", fontSize: "0.95rem" }} onClick={onViewFeed}>
              View in Live Feed →
            </button>
          )}
          <button className="btnNewRequirement" style={{ padding: "12px 24px", fontSize: "0.95rem" }} onClick={onNewRequirement}>
            Post Another Requirement
          </button>
        </div>
      </div>
    </div>
  );
}
