import { Question } from "../models";
import { QuestionSet } from "../models/questionSet";

import questionSet1 from "../assets/questions/sam-and-amanda-goodbye.json"

export class QuestionSetRetriever {
  static #questionSets: Record<string, QuestionSet> = {
    "set-1": questionSet1,
  }

  static get = (id: string) => {
    return QuestionSetRetriever.#questionSets[id];
  }

  /**
   * @returns list of the title and IDs for the valid question sets.
   */
  static getValidSets = (): Array<{ id: string, title: string }> => {
    return Object.keys(QuestionSetRetriever.#questionSets).reduce((prev, key) => {
      const set = QuestionSetRetriever.#questionSets[key];
      const validation = QuestionSetRetriever.questionSetIsValid(set);
      if (typeof validation !== "string") {
        return [...prev, { id: key, title: set.title }];
      }
      console.error(`${key}: ${validation}`);
      return prev;
    }, [])
  }

  /**
 * Verifies the question set from the JSON is valid, returns if it is.
 * @param set the set to validate
 * @return if set is valid, or error message
 */
static questionSetIsValid = (set: QuestionSet): string | boolean => {
  if (!set.title) return "Question set is missing a title.";
  if (!set.questions || set.questions.length < 1) return "Question set is missing questions.";
  if (set.questions.some((question: Question) => !question.question || !question.answers || question.answers.length < 1)) {
    return "A question in question set is invalid."
  }
  return true;
}
}