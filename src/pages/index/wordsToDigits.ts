import { randInt } from "./randomUtils";
import convert_num_to_fr_fr_text from "./translations/fr-fr";

const N_QUESTIONS = 5;

export interface Question {
  i: number;
  n: number;
  word: string;
}

export function generateQuestions(): Question[] {
  const questions: Question[] = [];

  for (let i = 0; i < N_QUESTIONS; i++) {
    const n = randInt(-999_999, 999_999);
    const word = convert_num_to_fr_fr_text(n);
    questions.push({
      i,
      n,
      word,
    });
  }

  return questions;
}
