import React, { useState } from "react";
import Option from "./option";

interface SingleQuestionProps {
  questionNumber: number;
  question: string;
  options: Record<string, string>;
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
        {Object.entries(options).map(([key, option]) => (
          <Option
            key={key}
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
