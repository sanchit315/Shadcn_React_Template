import React, { useState } from "react";
import Option from "./option";
import Markdown from "react-markdown";
import { QuestionType, QuestionTypeMapper } from "@/enums/questions.enum";

interface MultiSelectQuestionProps {
  questionNumber: number;
  question: string;
  options: Record<string, string>;
  questionType: QuestionType;
  optionChange: (value: string[]) => void;
}

const MultiSelectQuestion: React.FC<MultiSelectQuestionProps> = ({
  options,
  question,
  questionType,
  questionNumber,
  optionChange,
}) => {
  const [selectedKeys, setSelectedKeys] = useState<null | string[]>(null);

  const handleOptionClick = (key: string) => {
    setSelectedKeys((prev) => {
      let keys = [];
      if (prev) {
        const findIndex = prev.findIndex((v) => v === key);
        if (findIndex !== -1) {
          keys = prev.filter((v) => v !== key);
        } else {
          keys = [...prev, key];
        }
      } else {
        keys = [key];
      }
      optionChange(keys);
      return keys;
    });
  };

  return (
    <>
      <p className="text-sm text-gray-600 mb-2">
        {QuestionTypeMapper[questionType]}
      </p>
      <Markdown className={"mb-12"}>{question}</Markdown>

      <div className="flex flex-col gap-4 max-w-lg">
        {Object.entries(options).map(([key, option]) => (
          <Option
            key={key}
            optionKey={key}
            option={option}
            selectedKeys={selectedKeys}
            onOptionClick={handleOptionClick}
          />
        ))}
      </div>
    </>
  );
};

export default MultiSelectQuestion;
