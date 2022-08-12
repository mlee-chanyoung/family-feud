import type { Answer } from "./answer";

export type Question = {
  answers: Array<Answer>,
  question: string,
};
