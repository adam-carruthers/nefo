import type { Question } from "./questionBase";
import type {
  ConvertNumberToText,
  OperatorMap,
} from "@/context/language/context";
import { randInt } from "./randomUtils";

export interface SimpleQuestion extends Question {
  question: string;
}

export function generateWordToDigitQuestions(
  n_questions: number,
  convertNumberToText: ConvertNumberToText,
): SimpleQuestion[] {
  const questions: SimpleQuestion[] = [];

  for (let i = 0; i < n_questions; i++) {
    const n = randInt(-9_999, 9_999);
    const word = convertNumberToText(n);
    questions.push({
      answer: n.toString(),
      question: word,
    });
  }

  return questions;
}

export function generateDigitToWordQuestions(
  n_questions: number,
  convertNumberToText: ConvertNumberToText,
): SimpleQuestion[] {
  // Digit to word questions are just word to digit questions flipped around
  return generateWordToDigitQuestions(n_questions, convertNumberToText).map(
    ({ answer, question }) => ({
      answer: question,
      question: answer,
    }),
  );
}

function getMathsQuestionText(
  first: number,
  operator: keyof OperatorMap,
  second: number,
  convertNumberToText: ConvertNumberToText,
  operatorMap: OperatorMap,
): string {
  return `${convertNumberToText(first)} ${operatorMap[operator]} ${convertNumberToText(second)}`;
}

interface RawMathQuestion {
  question: string;
  answer: number;
}

function generateMathsToDigitQuestionsRaw(
  n_questions: number,
  convertNumberToText: ConvertNumberToText,
  operatorMap: OperatorMap,
): RawMathQuestion[] {
  const questions: RawMathQuestion[] = [];

  for (let i = 0; i < n_questions; i++) {
    const operator = "+-*/"[randInt(0, 3)] as keyof OperatorMap;

    const bound = "+-".indexOf(operator) !== -1 ? 100 : 10;

    const n1 = randInt(-bound, bound);
    const n2 = randInt(1, bound);
    let question: string;
    let answer: number;

    if (operator == "+") {
      const n3 = n1 + n2;
      question = getMathsQuestionText(
        n1,
        operator,
        n2,
        convertNumberToText,
        operatorMap,
      );
      answer = n3;
    } else if (operator == "-") {
      const n3 = n1 - n2;
      question = getMathsQuestionText(
        n1,
        operator,
        n2,
        convertNumberToText,
        operatorMap,
      );
      answer = n3;
    } else if (operator == "*") {
      const n3 = n1 * n2;
      question = getMathsQuestionText(
        n1,
        operator,
        n2,
        convertNumberToText,
        operatorMap,
      );
      answer = n3;
    } else {
      // operator == "/"
      const n3 = n1 * n2;
      // n1 = n3 / n2
      question = getMathsQuestionText(
        n3,
        operator,
        n2,
        convertNumberToText,
        operatorMap,
      );
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
  convertNumberToText: ConvertNumberToText,
  operatorMap: OperatorMap,
): SimpleQuestion[] {
  return generateMathsToDigitQuestionsRaw(
    n_questions,
    convertNumberToText,
    operatorMap,
  ).map((q) => ({
    ...q,
    answer: q.answer.toString(),
  }));
}

export function generateMathsToWordQuestions(
  n_questions: number,
  convertNumberToText: ConvertNumberToText,
  operatorMap: OperatorMap,
): SimpleQuestion[] {
  return generateMathsToDigitQuestionsRaw(
    n_questions,
    convertNumberToText,
    operatorMap,
  ).map((q) => ({
    ...q,
    answer: convertNumberToText(q.answer),
  }));
}
