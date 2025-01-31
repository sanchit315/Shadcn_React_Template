import { useState } from "react";
import { questions } from "@/screens/quiz/quiz-data";
import SingleQuestion from "./single-question";
import MultiSelectQuestion from "./multi-select-question";
import { Button } from "../ui/button";

interface QuestionsProps {
  endQuiz: () => void;
}

const Questions: React.FC<QuestionsProps> = ({ endQuiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const question = questions[currentQuestionIndex];

  const renderQuestion = () => {
    switch (question.type) {
      case "SINGLE_SELECT":
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

  const handleNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      //
      return;
    }
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  return (
    <div className="flex-1 flex flex-col mt-12">
      <div className="flex-1 mb-4"> {renderQuestion()}</div>

      <div className="flex align-middle justify-between">
        <Button variant="outline" onClick={endQuiz}>
          End Quiz
        </Button>
        <Button variant="default" onClick={handleNextQuestion}>
          Next Question
        </Button>
      </div>
    </div>
  );
};

export default Questions;
