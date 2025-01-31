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
      <div className="text-primary bg-purple-100 text-xs font-medium px-3 py-1 rounded-md mb-2 max-w-fit">
        {QuestionTypeMapper[questionType]}
      </div>
      <Markdown
        className={"mb-12"}
      >{`**Question ${questionNumber.toString()})** ${question}`}</Markdown>

      <div className="flex flex-col gap-4 max-w-lg">
        <Draggable onPosChange={getChangedPos}>
          {optionsArr.map(([key, option]) => (
            <div
              key={key}
              className="px-6 py-2 border rounded-sm cursor-pointer border-gray-200 select-none"
            >
              {key}) {option}
            </div>
          ))}
        </Draggable>
      </div>
    </>
  );
};

export default DragAndDropQuestion;
