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
  // const {
  //   data: questionRes,
  //   error,
  //   isLoading,
  // } = useSWR(`http://localhost:3000/question/${currentQuestionIndex}`, {
  //   revalidateOnFocus: false,
  // });

  // if (error) return <p>Error loading data</p>;
  // if (isLoading)
  //   return (
  //     <div className="flex-1 flex flex-col mt-12">
  //       <Spinner />
  //     </div>
  //   );

  const question = {
    question:
      "As a sales representative, you need to follow up with a lead who has shortlisted workspace options from myHQ. What would be the appropriate steps to schedule a visit for the lead to tour the facilities?",
    type: "ORDERING",
    options: {
      a: "Send a follow-up email to the lead, inquiring about their availability for a visit and suggesting potential dates/times.",
      b: "Confirm the visit details with the lead, including the date, time, and location(s).",
      c: "If the lead does not respond to the initial follow-up, send additional reminders to ensure they are still interested and willing to schedule a visit.",
      d: "Once the lead confirms their availability, send a calendar invitation with the visit details for their reference.",
    },
    answer: ["a", "c", "b", "d"],
  };
  const totalCount = 10;

  const renderQuestion = () => {
    switch (question.type) {
      case QuestionType.SINGLE_SELECT:
      case QuestionType.TRUE_FALSE:
        return (
          <SingleQuestion
            questionNumber={currentQuestionIndex + 1}
            question={question.question}
            options={question.options}
          />
        );
      case QuestionType.MULTI_SELECT:
        return (
          <MultiSelectQuestion
            questionNumber={currentQuestionIndex + 1}
            question={question.question}
            options={question.options}
          />
        );
      case QuestionType.ORDERING:
        return (
          <DragAndDropQuestion
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
    if (currentQuestionIndex === totalCount) {
      // Todo: Move to chat screen
      return;
    }
    setCurrentQuestionIndex((prev) => prev + 1);
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
