import { Question } from "./constants"

export const formatQuestionString = (question: Question) => {
  const replace = new RegExp(`\\b${question.keyword}\\b`, 'gi')
  return question.germanText.replace(replace, '__________')
}