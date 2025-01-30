import React from "react";

interface StepperProps {
  steps: string[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <>
      <ol className="flex items-center w-full">
        {steps.map((step, index) => {
          const isOnLastStep = () => index + 1 === steps.length;
          const isOnCurrentStep = () => index + 2 <= currentStep;

          const afterClasses = isOnLastStep()
            ? ""
            : `after:content-[''] after:w-full after:h-1 after:border-b ${
                isOnCurrentStep()
                  ? "after:border-primary"
                  : "after:border-gray-200"
              } after:border-4 after:inline-block`;
          const lastItemClass = isOnLastStep() ? "" : "w-full";
          const textClass = isOnCurrentStep()
            ? "text-primary"
            : "text-gray-500";

          return (
            <li
              key={step}
              className={`relative flex items-center  ${lastItemClass} ${afterClasses}`}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 border text-primary border-primary">
                {index + 1}
              </div>
              <span className={`text-sm absolute -bottom-7 ${textClass}`}>
                {step}
              </span>
            </li>
          );
        })}
      </ol>
    </>
  );
};

export default Stepper;
