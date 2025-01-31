import React, { useState } from "react";

interface SingleQuestionProps {
  questionNumber: number;
  question: string;
  options: string[];
}

const SingleQuestion: React.FC<SingleQuestionProps> = ({
  questionNumber,
  options,
  question,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<null | string>(null);

  const handleOptionClick = (answer: string) => () => {
    setSelectedAnswer(answer);
  };

  return (
    <>
      <h3 className="text-lg font-bold mb-12">
        Question {questionNumber}: {question}
      </h3>

      <div className="flex flex-col gap-4 max-w-lg">
        {options.map((option) => {
          const activeClass =
            selectedAnswer === option
              ? "border-primary bg-purple-100"
              : "border-gray-200";

          return (
            <div
              className={`px-6 py-2 border  rounded-sm cursor-pointer select-none ${activeClass}`}
              onClick={handleOptionClick(option)}
            >
              {option}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SingleQuestion;
