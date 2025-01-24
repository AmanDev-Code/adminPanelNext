import React, { useState, useEffect } from "react";
import Ongoing from "../../../Organisers/OrganisersDashboard/Ongoing"; // Import the Ongoing component
import Step1 from "./fromSteps/Step1";
import Step2 from "./fromSteps/Step2";
import Step3 from "./fromSteps/Step3";
import Step4 from "./fromSteps/Step4";
import Step5 from "./fromSteps/Step5";
import SummaryDialog from "../Recommendations/SummaryDialog";
import styles from "../../OrganisersStyles/EventFormsStyles/ProgressBar.module.scss";

interface ProgressBarProps {
  steps: string[];
  setActiveTab: React.Dispatch<
    React.SetStateAction<
      | "Ongoing"
      | "Previous Events"
      | "Request"
      | "Recommendation"
      | "Create an Events"
    >
  >;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, setActiveTab }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission
  const [isSummaryDialogOpen, setIsSummaryDialogOpen] = useState(false);

  useEffect(() => {
    updateProgressLine();
  }, [currentStep]);

  const updateProgressLine = () => {
    const totalSteps = steps.length - 1; // Total steps minus 1 to calculate percentage
    const progressPercentage = (currentStep / totalSteps) * 100;
    const progressBarLine = document.querySelector(
      `.${styles.line}`
    ) as HTMLElement;

    if (progressBarLine) {
      progressBarLine.style.width = `${progressPercentage}%`;
    }
  };

  const handleNext = () => {
    if (currentStep === 3) {
      // Open SummaryDialog for Step 4
      setIsSummaryDialogOpen(true);
      return;
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStepData = (stepName: string, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [stepName]: data,
    }));
  };

  const handleSummaryConfirm = () => {
    setIsSummaryDialogOpen(false);
    setCurrentStep((prev) => prev + 1); // Move to Step 5
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/save-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Send the formData to the API
      });

      if (!response.ok) throw new Error("Failed to save data.");

      const result = await response.json();
      console.log("Event added successfully with eventID:", result.eventID);

      setActiveTab("Ongoing"); // Switch to Ongoing tab after submission
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Step1
            data={formData["Step1"] || {}}
            onDataChange={(data) => handleStepData("Step1", data)}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 1:
        return (
          <Step2
            data={formData["Step2"] || {}}
            onDataChange={(data) => handleStepData("Step2", data)}
          />
        );
      case 2:
        return (
          <Step3
            data={formData["Step3"] || {}}
            onDataChange={(data) => handleStepData("Step3", data)}
          />
        );
      case 3:
        return (
          <Step4
            data={formData["Step4"] || {}}
            onDataChange={(data) => handleStepData("Step4", data)}
          />
        );
      case 4:
        return (
          <Step5
            data={formData}
            onDataChange={(updatedData) => setFormData(updatedData)}
          />
        );
      default:
        return null;
    }
  };

  if (isSubmitted) {
    // Render the Ongoing component after submission
    return <Ongoing />;
  }

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <div className={styles.progressBar}>
          <h2 className={styles.title}>Create a New Event</h2>

          <div className={styles.barContainer}>
            <div className={styles.lineContainer}>
              <div className={styles.line}></div>
            </div>
            {steps.map((_, index) => (
              <div
                key={index}
                className={`${styles.step} ${index <= currentStep ? styles.active : ""}`}
              >
                <div className={`${styles.circle} ${index <= currentStep ? styles.active : ""}`}>
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.stepContent}>{renderStep()}</div>

          <div className={styles.stepbuttons}>
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={styles.StepButton}
            >
              Previous
            </button>
            {currentStep === steps.length - 1 ? (
              <button onClick={handleSubmit} className={styles.StepButton}>
                Submit
              </button>
            ) : (
              <button onClick={handleNext} className={styles.StepButton}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Summary Dialog for Step 4 */}
      {currentStep === 3 && (
        <SummaryDialog
          open={isSummaryDialogOpen}
          onClose={() => setIsSummaryDialogOpen(false)}
          selections={formData["Step4"]?.acceptedRequests || []}
          onSubmit={handleSummaryConfirm}
        />
      )}
    </section>
  );
};

export default ProgressBar;