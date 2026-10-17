export default function SuccessScreen({ data, onNewRequirement }) {
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
          successfully submitted and categorized under{" "}
          <strong>{data?.category}</strong>.
          <br />
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "8px", display: "inline-block" }}>
            Reference ID: {data?._id}
          </span>
        </p>
        <button className="btnNewRequirement" onClick={onNewRequirement}>
          Post Another Requirement
        </button>
      </div>
    </div>
  );
}
