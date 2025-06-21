import type { Question } from "./questionBase";
import { randInt } from "./randomUtils";
import convert_num_to_fr_fr_text from "./translations/fr-fr";

export interface SimpleQuestion extends Question {
  question: string;
}

export function generateWordToDigitQuestions(
  n_questions: number,
): SimpleQuestion[] {
  const questions: SimpleQuestion[] = [];

  for (let i = 0; i < n_questions; i++) {
    const n = randInt(-9_999, 9_999);
    const word = convert_num_to_fr_fr_text(n);
    questions.push({
      answer: n.toString(),
      question: word,
    });
  }

  return questions;
}

export function generateDigitToWordQuestions(
  n_questions: number,
): SimpleQuestion[] {
  // Digit to word questions are just word to digit questions flipped around
  return generateWordToDigitQuestions(n_questions).map(
    ({ answer, question }) => ({
      answer: question,
      question: answer,
    }),
  );
}
