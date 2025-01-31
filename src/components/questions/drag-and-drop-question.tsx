import React from "react";
import { Draggable } from "react-drag-reorder";

interface DragAndDropQuestionProps {
  questionNumber: number;
  question: string;
  options: Record<string, string>;
}

const DragAndDropQuestion: React.FC<DragAndDropQuestionProps> = ({
  options,
  question,
  questionNumber,
}) => {
  const getChangedPos = (currentPos: number, newPos: number) => {
    console.log(currentPos, newPos);
  };

  return (
    <>
      <h3
        className="text-lg font-bold mb-12"
        dangerouslySetInnerHTML={{
          __html: `Question ${questionNumber}: ${question}`,
        }}
      ></h3>

      <div className="flex flex-col gap-4 max-w-lg">
        <Draggable onPosChange={getChangedPos}>
          {Object.entries(options).map(([key, option]) => (
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
