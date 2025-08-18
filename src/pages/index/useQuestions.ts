import { useRef, useState } from "react";
import type { Question } from "./questionBase";

function useQuestions<Q extends Question>(questions: Q[]) {
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

    const guess = inputRef.current?.value.toLowerCase().replaceAll('-', ' ');

    if (guess === currentQuestion.answer.replaceAll('-', ' ')) {
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

  return {
    currentState,
    currentIndex,
    currentQuestion,
    correctCounter,
    err,
    inputRef,
    onSubmit,
    nextQ,
  };
}

export default useQuestions;
