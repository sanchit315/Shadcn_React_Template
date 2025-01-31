import { useState } from "react";
import SingleQuestion from "./single-question";
import MultiSelectQuestion from "./multi-select-question";
import { Button } from "../ui/button";
import { Spinner } from "../ui/loader";
import useSWR from "swr";
import { QuestionType } from "@/enums/questions.enum";
import DragAndDropQuestion from "./drag-and-drop-question";

interface QuestionsProps {
  endQuiz: () => void;
}

const Questions: React.FC<QuestionsProps> = ({ endQuiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const {
    data: questionRes,
    error,
    isLoading,
  } = useSWR(`http://localhost:3000/question/${currentQuestionIndex}`, {
    revalidateOnFocus: false,
  });

  if (error) {
    return <p>Error loading data</p>;
  }
  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col mt-12">
        <Spinner />
      </div>
    );
  }

  const question = questionRes.question;
  const totalCount = question.totalCount;

  const handleNextQuestion = () => {
    if (currentQuestionIndex === totalCount) {
      // Todo: Move to chat screen
      return;
    }
    setCurrentQuestionIndex((prev) => prev + 1);
    console.log(answers);
  };

  const handleOptionsChange = (answer: string[]) => {
    setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answer }));
  };

  const renderQuestion = () => {
    switch (question.type) {
      case QuestionType.SINGLE_SELECT:
      case QuestionType.TRUE_FALSE:
        return (
          <SingleQuestion
            questionNumber={currentQuestionIndex + 1}
            question={question.question}
            questionType={question.type}
            options={question.options}
            optionChange={handleOptionsChange}
          />
        );
      case QuestionType.MULTI_SELECT:
        return (
          <MultiSelectQuestion
            questionNumber={currentQuestionIndex + 1}
            question={question.question}
            options={question.options}
            questionType={question.type}
            optionChange={handleOptionsChange}
          />
        );
      case QuestionType.ORDERING:
        return (
          <DragAndDropQuestion
            questionNumber={currentQuestionIndex + 1}
            question={question.question}
            options={question.options}
            questionType={question.type}
            optionChange={handleOptionsChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col mt-12">
      <div className="flex-1 mb-4"> {renderQuestion()}</div>

      <div className="flex align-middle justify-between">
        <Button variant="destructive" onClick={endQuiz}>
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
