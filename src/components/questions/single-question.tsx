import React, { useState } from "react";
import Option from "./option";

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
  const [selectedOption, setSelectedOption] = useState<null | string>(null);

  const handleOptionClick = (answer: string) => {
    setSelectedOption(answer);
  };

  return (
    <>
      <h3 className="text-lg font-bold mb-12">
        Question {questionNumber}: {question}
      </h3>

      <div className="flex flex-col gap-4 max-w-lg">
        {options.map((option) => (
          <Option
            key={option}
            option={option}
            selectedOption={selectedOption}
            onOptionClick={handleOptionClick}
          />
        ))}
      </div>
    </>
  );
};

export default SingleQuestion;
