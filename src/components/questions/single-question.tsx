import React, { useState } from "react";
import Option from "./option";
import Markdown from "react-markdown";
import { QuestionType, QuestionTypeMapper } from "@/enums/questions.enum";

interface SingleQuestionProps {
  questionNumber: number;
  question: string;
  options: Record<string, string>;
  questionType: QuestionType;
  optionChange: (value: string[]) => void;
}

const SingleQuestion: React.FC<SingleQuestionProps> = ({
  questionNumber,
  options,
  question,
  questionType,
  optionChange,
}) => {
  const [selectedKeys, setSelectedKeys] = useState<null | string[]>(null);

  const handleOptionClick = (key: string) => {
    setSelectedKeys([key]);
    optionChange([key]);
  };

  return (
    <>
      <div className="text-primary bg-purple-100 text-xs font-medium px-3 py-1 rounded-md mb-2 max-w-fit">
        {QuestionTypeMapper[questionType]}
      </div>
      <Markdown
        className={"mb-12"}
      >{`**Question ${questionNumber.toString()})** ${question}`}</Markdown>

      <div className="flex flex-col gap-4 max-w-lg">
        {Object.entries(options).map(([key, option]) => (
          <Option
            key={key}
            optionKey={key}
            option={`${key}) ${option}`}
            selectedKeys={selectedKeys}
            onOptionClick={handleOptionClick}
          />
        ))}
      </div>
    </>
  );
};

export default SingleQuestion;
