"use client";

import { useState } from "react";
import StepIndicator from "@/components/StepIndicator";
import EventBasicsForm from "@/components/EventBasicsForm";
import CategoryStep2Form from "@/components/CategoryStep2Form";
import CategoryStep3Form from "@/components/CategoryStep3Form";
import ReviewSubmit from "@/components/ReviewSubmit";
import SuccessScreen from "@/components/SuccessScreen";

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
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

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

  if (isSubmitted) {
    return (
      <div className="appContainer">
        <header className="header">
          <h1 className="logo">Planora</h1>
          <p className="subtitle">Event Requirement Posting</p>
        </header>
        <SuccessScreen
          data={submittedData}
          onNewRequirement={handleNewRequirement}
        />
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <EventBasicsForm
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <CategoryStep2Form
            category={formData.category}
            formData={formData}
            updateNestedFormData={updateNestedFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <CategoryStep3Form
            category={formData.category}
            formData={formData}
            updateNestedFormData={updateNestedFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <ReviewSubmit
            formData={formData}
            onBack={prevStep}
            onSubmitSuccess={handleSubmitSuccess}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="appContainer">
      <header className="header">
        <h1 className="logo">Planora</h1>
        <p className="subtitle">Event Requirement Posting</p>
      </header>
      <StepIndicator currentStep={currentStep} />
      <div className="formCard" key={currentStep}>
        {renderStep()}
      </div>
    </div>
  );
}
