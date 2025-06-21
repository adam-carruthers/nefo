import { useRef, useState } from "react";
import type { Question } from "./wordsToDigits";

interface WordsToDigitsProps {
  questions: Question[];
  goHome: () => void;
}

function WordsToDigits({ questions, goHome }: WordsToDigitsProps) {
  const [currentState, setCurrentState] = useState<
    "q" | "correct" | "incorrect"
  >("q");
  const [err, setErr] = useState<null | string>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCounter, setCorrectCounter] = useState(0);

  const currentQuestion = questions[currentIndex];

  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const guess = inputRef.current?.value;

    if (guess === currentQuestion.n.toString()) {
      setCorrectCounter(correctCounter + 1);
      setCurrentState("correct");
    } else {
      setErr(guess || "nothing");
      setCurrentState("incorrect");
    }
  };

  const nextQ = () => {
    setCurrentState("q");
    setCurrentIndex(currentIndex + 1);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <>
      <h2>Words to digits!</h2>
      <p>
        <i>
          Question {currentIndex + 1}/{questions.length}
        </i>
      </p>
      <p>{currentQuestion.word}</p>
      {currentState === "correct" && <p>That's correct!</p>}
      {currentState === "incorrect" && (
        <>
          <p>
            You wrote {err}. That's not correct. It is {currentQuestion.n}.
          </p>
        </>
      )}
      {currentState !== "q" && currentIndex < questions.length - 1 && (
        <p>
          <button onClick={nextQ}>Next</button>
        </p>
      )}
      {currentState !== "q" && currentIndex == questions.length - 1 && (
        <>
          <p>
            The quiz is over! You scored {correctCounter}/{questions.length}.
          </p>
          <p>
            <button onClick={goHome}>Return to homepage</button>
          </p>
        </>
      )}
      {currentState === "q" && (
        <form onSubmit={onSubmit}>
          <input ref={inputRef} type="number" />
          <input type="submit" />
        </form>
      )}
    </>
  );
}

export default WordsToDigits;
