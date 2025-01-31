import { QuestionType } from "@/enums/questions.enum";

export interface Question {
  type: QuestionType;
  question: string;
  options: string[];
  answer: string[] | string;
}
