import { QuestionType, QuestionTypeMapper } from "@/enums/questions.enum";
import React from "react";
import { Draggable } from "react-drag-reorder";
import Markdown from "react-markdown";

interface DragAndDropQuestionProps {
  questionNumber: number;
  question: string;
  questionType: QuestionType;
  options: Record<string, string>;
  optionChange: (value: string[]) => void;
}

const DragAndDropQuestion: React.FC<DragAndDropQuestionProps> = ({
  options,
  question,
  questionType,
  questionNumber,
  optionChange,
}) => {
  const optionsArr = Object.entries(options);
  const getChangedPos = () => {
    optionChange(optionsArr.map(([key]) => key));
  };

  return (
    <>
      <p className="text-sm text-gray-600 mb-2">
        {QuestionTypeMapper[questionType]}
      </p>
      <Markdown className={"mb-12"}>{question}</Markdown>

      <div className="flex flex-col gap-4 max-w-lg">
        <Draggable onPosChange={getChangedPos}>
          {optionsArr.map(([key, option]) => (
            <div
              key={key}
              className="px-6 py-2 border rounded-sm cursor-pointer border-gray-200 select-none"
            >
              {option}
            </div>
          ))}
        </Draggable>
      </div>
    </>
  );
};

export default DragAndDropQuestion;
