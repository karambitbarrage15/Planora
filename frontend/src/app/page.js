"use client";

import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import StepIndicator from "@/components/StepIndicator";
import EventBasicsForm from "@/components/EventBasicsForm";
import CategoryStep2Form from "@/components/CategoryStep2Form";
import CategoryStep3Form from "@/components/CategoryStep3Form";
import ReviewSubmit from "@/components/ReviewSubmit";
import SuccessScreen from "@/components/SuccessScreen";
import FlowingRedBackground from "@/components/FlowingRedBackground";

const INITIAL_FORM_DATA = {
  // Step 1 - Event Basics
  eventName: "",
  eventType: "",
  startDate: "",
  endDate: "",
  location: "",
  venue: "",
  category: "",

  // Event Planner
  plannerDetails: {
    budgetRange: "",
    expectedGuests: "",
    servicesNeeded: [],
    theme: "",
    cateringPreferences: "",
    decorationType: "",
    timeline: "",
    additionalRequirements: "",
  },

  // Performer
  performerDetails: {
    performanceType: "",
    genre: "",
    numberOfPerformers: "",
    performanceDuration: "",
    equipmentNeeded: [],
    stageRequirements: "",
    travelAccommodation: false,
    specialRequirements: "",
  },

  // Crew
  crewDetails: {
    crewRoles: [],
    numberOfCrew: "",
    experienceLevel: "",
    shiftDuration: "",
    equipmentProvided: false,
    dressCode: "",
    safetyRequirements: "",
    additionalNotes: "",
  },
};

export default function Home() {
  const [view, setView] = useState("landing"); // "landing" | "wizard"
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const startPosting = (preselectedCategory = "") => {
    setFormData({
      ...INITIAL_FORM_DATA,
      category: preselectedCategory || "",
    });
    setCurrentStep(1);
    setIsSubmitted(false);
    setSubmittedData(null);
    setView("wizard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const backToHome = () => {
    setView("landing");
    setIsSubmitted(false);
    setSubmittedData(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateNestedFormData = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmitSuccess = (data) => {
    setSubmittedData(data);
    setIsSubmitted(true);
  };

  const handleNewRequirement = () => {
    setFormData(INITIAL_FORM_DATA);
    setCurrentStep(1);
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  // If in landing view, render LandingPage
  if (view === "landing") {
    return <LandingPage onStartPosting={startPosting} />;
  }

  // Wizard view
  return (
    <div className="wizardPageWrapper">
      {/* Animated red flowing background like nodebase.raghavseth.in */}
      <FlowingRedBackground />

      {/* Top Bar with Back Button Aligned to the Side (Not middle) */}
      <div className="wizardTopNav">
        <button className="btnSideBack" onClick={backToHome}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          BACK TO HOME
        </button>

        <div className="wizardTopBrand">
          <span>PLANORA</span>
        </div>
      </div>

      <div className="appContainer">
        <header className="header">
          <h1 className="logo">PLANORA</h1>
          <p className="subtitle">EVENT REQUIREMENT POSTING</p>
        </header>

        {isSubmitted ? (
          <SuccessScreen
            data={submittedData}
            onNewRequirement={handleNewRequirement}
            onViewFeed={backToHome}
          />
        ) : (
          <>
            <StepIndicator currentStep={currentStep} />
            <div className="formCard" key={currentStep}>
              {currentStep === 1 && (
                <EventBasicsForm
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={nextStep}
                />
              )}
              {currentStep === 2 && (
                <CategoryStep2Form
                  category={formData.category}
                  formData={formData}
                  updateNestedFormData={updateNestedFormData}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
              {currentStep === 3 && (
                <CategoryStep3Form
                  category={formData.category}
                  formData={formData}
                  updateNestedFormData={updateNestedFormData}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
              {currentStep === 4 && (
                <ReviewSubmit
                  formData={formData}
                  onBack={prevStep}
                  onSubmitSuccess={handleSubmitSuccess}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
