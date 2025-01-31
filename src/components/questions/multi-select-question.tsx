import React, { useState } from "react";
import Option from "./option";

interface MultiSelectQuestionProps {
  questionNumber: number;
  question: string;
  options: string[];
}

const MultiSelectQuestion: React.FC<MultiSelectQuestionProps> = ({
  options,
  question,
  questionNumber,
}) => {
  const [selectedOption, setSelectedOption] = useState<null | string[]>(null);

  const handleOptionClick = (answer: string) => {
    setSelectedOption((prev) => {
      if (prev) {
        const findIndex = prev.findIndex((v) => v === answer);
        if (findIndex !== -1) {
          return prev.filter((v) => v !== answer);
        } else {
          return [...prev, answer];
        }
      } else {
        return [answer];
      }
    });
  };

  return (
    <>
      <h3 className="text-lg font-bold mb-12">
        Question {questionNumber}: {question}
      </h3>

      <div className="flex flex-col gap-4 max-w-lg">
        {options.map((option) => (
          <Option
            option={option}
            selectedOption={selectedOption}
            onOptionClick={handleOptionClick}
          />
        ))}
      </div>
    </>
  );
};

export default MultiSelectQuestion;
