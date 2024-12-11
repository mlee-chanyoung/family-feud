import { QuestionSet } from "../../models/QuestionSet"

declare module "*.json" {
  const value: QuestionSet;
  export default value;
};