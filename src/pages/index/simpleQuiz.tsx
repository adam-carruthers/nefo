import type { SimpleQuestion } from "./simpleQuestion";
import useQuestions from "./useQuestions";

interface SimpleQuizProps {
  questions: SimpleQuestion[];
  inputType?: "number" | undefined;
  goHome: () => void;
}

function SimpleQuiz({ questions, goHome, inputType }: SimpleQuizProps) {
  const {
    currentState,
    currentIndex,
    currentQuestion,
    correctCounter,
    err,
    inputRef,
    onSubmit,
    nextQ,
  } = useQuestions(questions);

  return (
    <>
      <h2>Words to digits!</h2>
      <p>
        <i>
          Question {currentIndex + 1}/{questions.length}
        </i>
      </p>
      <p>{currentQuestion.question}</p>
      {currentState === "correct" && <p>That's correct!</p>}
      {currentState === "incorrect" && (
        <>
          <p>
            You wrote {err}. That's not correct. It is {currentQuestion.answer}.
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
          <input ref={inputRef} type={inputType} />
          <input type="submit" />
        </form>
      )}
    </>
  );
}

export default SimpleQuiz;
