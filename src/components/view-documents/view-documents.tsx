import { Button } from "../ui/button";

interface ViewDocumentsProps {
  endQuiz: () => void;
  skipQuiz: () => void;
  startQuiz: () => void;
}

const ViewDocuments: React.FC<ViewDocumentsProps> = ({
  endQuiz,
  skipQuiz,
  startQuiz,
}) => {
  return (
    <div className="flex-1 flex flex-col mt-12">
      <div className="flex-1 mb-4">DOCUMENT WILL GO HERE</div>

      <div className="flex align-middle justify-between">
        <Button variant="outline" onClick={endQuiz}>
          End Quiz
        </Button>
        <div className="flex gap-6">
          <Button variant="outline" onClick={skipQuiz}>
            Skip Quiz
          </Button>
          <Button variant="default" onClick={startQuiz}>
            Start Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewDocuments;
