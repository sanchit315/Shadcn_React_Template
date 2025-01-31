import { Button } from "../ui/button";
import Markdown from "react-markdown";
import "./view-documents.css";

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
  const markdown = `
# Table of Contents Test

## Introduction
A brief introduction to the document.

## Getting Started
How to begin using this guide.

### Installation
Steps to install the necessary components.

### Configuration
Setting up and configuring the environment.

## Features
A list of key features.

### Core Features
- Fast performance  
- Easy integration  
- Responsive design  

### Advanced Features
- Customizable themes  
- Plugin support  

## Usage
How to use the system effectively.

### Basic Usage
Simple use cases for beginners.

### Pro Tips
Advanced techniques for power users.

## Conclusion
Final thoughts and next steps.`;

  return (
    <div className="flex-1 flex flex-col mt-12">
      <div className="flex flex-1 mb-4">
        <Markdown className="markdown-body">{markdown}</Markdown>
      </div>

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
