import type { Question } from "./questionBase";
import { randInt } from "./randomUtils";
import convert_num_to_fr_fr_text, { OPERATOR_MAP } from "@/translations/fr-fr";

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

function getMathsQuestionText(
  first: number,
  operator: keyof typeof OPERATOR_MAP,
  second: number,
): string {
  return `${convert_num_to_fr_fr_text(first)} ${OPERATOR_MAP[operator]} ${convert_num_to_fr_fr_text(second)}`;
}

interface RawMathQuestion {
  question: string;
  answer: number;
}

function generateMathsToDigitQuestionsRaw(
  n_questions: number,
): RawMathQuestion[] {
  const questions: RawMathQuestion[] = [];

  for (let i = 0; i < n_questions; i++) {
    const operator = "+-*/"[randInt(0, 3)] as keyof typeof OPERATOR_MAP;

    const bound = "+-".indexOf(operator) !== -1 ? 100 : 10;

    const n1 = randInt(-bound, bound);
    const n2 = randInt(1, bound);
    let question: string;
    let answer: number;

    if (operator == "+") {
      const n3 = n1 + n2;
      question = getMathsQuestionText(n1, operator, n2);
      answer = n3;
    } else if (operator == "-") {
      const n3 = n1 - n2;
      question = getMathsQuestionText(n1, operator, n2);
      answer = n3;
    } else if (operator == "*") {
      const n3 = n1 * n2;
      question = getMathsQuestionText(n1, operator, n2);
      answer = n3;
    } else {
      // operator == "/"
      const n3 = n1 * n2;
      // n1 = n3 / n2
      question = getMathsQuestionText(n3, operator, n2);
      answer = n1;
    }

    questions.push({
      question,
      answer,
    });
  }

  return questions;
}

export function generateMathsToDigitQuestions(
  n_questions: number,
): SimpleQuestion[] {
  return generateMathsToDigitQuestionsRaw(n_questions).map((q) => ({
    ...q,
    answer: q.answer.toString(),
  }));
}

export function generateMathsToWordQuestions(
  n_questions: number,
): SimpleQuestion[] {
  return generateMathsToDigitQuestionsRaw(n_questions).map((q) => ({
    ...q,
    answer: convert_num_to_fr_fr_text(q.answer),
  }));
}
