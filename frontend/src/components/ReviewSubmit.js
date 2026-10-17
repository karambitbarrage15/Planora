import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

function ReviewItem({ label, value, fullWidth }) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  return (
    <div className={`reviewItem ${fullWidth ? "fullWidth" : ""}`}>
      <div className="reviewLabel">{label}</div>
      {Array.isArray(value) ? (
        <div className="reviewTags">
          {value.map((v) => (
            <span key={v} className="reviewTag">{v}</span>
          ))}
        </div>
      ) : (
        <div className="reviewValue">{value}</div>
      )}
    </div>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ReviewSubmit({ formData, onBack, onSubmitSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");

    // Build payload — only include relevant category details
    const payload = {
      eventName: formData.eventName,
      eventType: formData.eventType,
      startDate: formData.startDate,
      endDate: formData.endDate || null,
      location: formData.location,
      venue: formData.venue,
      category: formData.category,
    };

    if (formData.category === "Event Planner") {
      payload.plannerDetails = {
        ...formData.plannerDetails,
        expectedGuests: formData.plannerDetails.expectedGuests
          ? Number(formData.plannerDetails.expectedGuests)
          : null,
      };
    } else if (formData.category === "Performer") {
      payload.performerDetails = {
        ...formData.performerDetails,
        numberOfPerformers: formData.performerDetails.numberOfPerformers
          ? Number(formData.performerDetails.numberOfPerformers)
          : null,
      };
    } else if (formData.category === "Crew") {
      payload.crewDetails = {
        ...formData.crewDetails,
        numberOfCrew: formData.crewDetails.numberOfCrew
          ? Number(formData.crewDetails.numberOfCrew)
          : null,
      };
    }

    try {
      const res = await fetch(`${API_URL}/requirements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit requirement");
      }

      onSubmitSuccess(data.data);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const { category } = formData;
  const details =
    category === "Event Planner"
      ? formData.plannerDetails
      : category === "Performer"
      ? formData.performerDetails
      : formData.crewDetails;

  return (
    <>
      <h2 className="stepTitle">Review & Submit</h2>
      <p className="stepDescription">
        Please review all the details below before submitting your requirement.
      </p>

      {error && (
        <div className="errorMessage">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0-9.5a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 0 1.5 0v-3.5A.75.75 0 0 0 8 5.5zM8 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
          </svg>
          {error}
        </div>
      )}

      {/* Event Basics */}
      <div className="reviewSection">
        <h3 className="reviewSectionTitle">Event Basics</h3>
        <div className="reviewGrid">
          <ReviewItem label="Event Name" value={formData.eventName} fullWidth />
          <ReviewItem label="Event Type" value={formData.eventType} />
          <ReviewItem label="Category" value={formData.category} />
          <ReviewItem label="Start Date" value={formatDate(formData.startDate)} />
          <ReviewItem label="End Date" value={formatDate(formData.endDate)} />
          <ReviewItem label="Location" value={formData.location} />
          <ReviewItem label="Venue" value={formData.venue} />
        </div>
      </div>

      {/* Category-Specific Details */}
      <div className="reviewSection">
        <h3 className="reviewSectionTitle">
          {category === "Event Planner" ? "Planning Details" : category === "Performer" ? "Performance Details" : "Crew Details"}
        </h3>
        <div className="reviewGrid">
          {category === "Event Planner" && (
            <>
              <ReviewItem label="Budget Range" value={details.budgetRange} />
              <ReviewItem label="Expected Guests" value={details.expectedGuests} />
              <ReviewItem label="Theme" value={details.theme} />
              <ReviewItem label="Catering" value={details.cateringPreferences} />
              <ReviewItem label="Decoration" value={details.decorationType} />
              <ReviewItem label="Services Needed" value={details.servicesNeeded} fullWidth />
              <ReviewItem label="Timeline" value={details.timeline} fullWidth />
              <ReviewItem label="Additional Requirements" value={details.additionalRequirements} fullWidth />
            </>
          )}
          {category === "Performer" && (
            <>
              <ReviewItem label="Performance Type" value={details.performanceType} />
              <ReviewItem label="Genre" value={details.genre} />
              <ReviewItem label="Number of Performers" value={details.numberOfPerformers} />
              <ReviewItem label="Duration" value={details.performanceDuration} />
              <ReviewItem label="Stage Requirements" value={details.stageRequirements} />
              <ReviewItem label="Travel & Accommodation" value={details.travelAccommodation ? "Yes" : "No"} />
              <ReviewItem label="Equipment Needed" value={details.equipmentNeeded} fullWidth />
              <ReviewItem label="Special Requirements" value={details.specialRequirements} fullWidth />
            </>
          )}
          {category === "Crew" && (
            <>
              <ReviewItem label="Number of Crew" value={details.numberOfCrew} />
              <ReviewItem label="Experience Level" value={details.experienceLevel} />
              <ReviewItem label="Shift Duration" value={details.shiftDuration} />
              <ReviewItem label="Equipment Provided" value={details.equipmentProvided ? "Yes" : "No"} />
              <ReviewItem label="Dress Code" value={details.dressCode} />
              <ReviewItem label="Safety Requirements" value={details.safetyRequirements} />
              <ReviewItem label="Crew Roles" value={details.crewRoles} fullWidth />
              <ReviewItem label="Additional Notes" value={details.additionalNotes} fullWidth />
            </>
          )}
        </div>
      </div>

      <div className="buttonGroup">
        <button className="btn btnBack" onClick={onBack} disabled={isSubmitting}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <button className="btn btnSubmit" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="spinner" />
              Submitting...
            </>
          ) : (
            <>
              Submit Requirement
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </>
          )}
        </button>
      </div>
    </>
  );
}
