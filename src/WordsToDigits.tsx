import { useMemo } from "react"
import { convertRandomToRandomInt } from "./randomUtils";
import convert_num_to_fr_fr_text from "./translations/fr-fr";

interface WordsToDigitsProps {
  randState: number[]
}

interface Question {
  i: number;
  n: number;
  word: string;
}

function generateQuestionFromRandomNumber(rand: number, i: number): Question {
  const n = convertRandomToRandomInt(rand, -999_999, 999_999);
  const word = convert_num_to_fr_fr_text(n);
  return {
    i,
    n,
    word
  }
}

function WordsToDigits({ randState }: WordsToDigitsProps) {
  const questions = useMemo(() => randState.map(generateQuestionFromRandomNumber), [randState])

  return (
    <>
      <h2>
        Words to digits!
      </h2>
      {questions.map(q => (
        <p key={q.i}>
          {q.n} = {q.word}
        </p>
      ))}
    </>
  )
}

export default WordsToDigits