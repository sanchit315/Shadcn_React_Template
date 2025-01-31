import Stepper from "@/components/ui/stepper";
import { questions } from "./quiz-data";
import { useState } from "react";
import SingleQuestion from "@/components/questions/single-question";
import MultiSelectQuestion from "@/components/questions/multi-select-question";

const QuizScreen = () => {
  const steps = [
    "Policy and process",
    "Process Training",
    "AI Client Training",
    "Certificate",
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const question = questions[currentQuestionIndex];

  const renderQuestion = () => {
    switch (question.type) {
      case "SINGLE_SELECT":
        return (
          <SingleQuestion
            questionNumber={currentQuestionIndex + 1}
            question={question.question}
            options={question.options}
          />
        );
      case "TRUE_FALSE":
        return (
          <SingleQuestion
            questionNumber={currentQuestionIndex + 1}
            question={question.question}
            options={question.options}
          />
        );
      case "MULTI_SELECT":
        return (
          <MultiSelectQuestion
            questionNumber={currentQuestionIndex + 1}
            question={question.question}
            options={question.options}
          />
        );
      default:
        return null;
    }
  };
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <Stepper steps={steps} currentStep={2} />

      <div className="mt-16">{renderQuestion()}</div>
    </section>
  );
};

export default QuizScreen;
