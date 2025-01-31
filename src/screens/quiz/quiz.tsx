import Stepper from "@/components/ui/stepper";
import { useState } from "react";
import ViewDocuments from "@/components/view-documents/view-documents";
import Questions from "@/components/questions/questions";

const QuizScreen = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    "Policy and process",
    "Process Training",
    "AI Client Training",
    "Certificate",
  ];

  const handleEndQuiz = () => {
    console.log("Quiz End");
  };

  const handleSkipQuiz = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleStartQuiz = () => {
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <section className="flex flex-col flex-1 container gap-6 pb-8 pt-6 md:py-10">
      <Stepper steps={steps} currentStep={currentStep} />

      {currentStep === 1 && (
        <ViewDocuments
          endQuiz={handleEndQuiz}
          skipQuiz={handleSkipQuiz}
          startQuiz={handleStartQuiz}
        />
      )}

      {currentStep === 2 && <Questions endQuiz={handleEndQuiz} />}
    </section>
  );
};

export default QuizScreen;
