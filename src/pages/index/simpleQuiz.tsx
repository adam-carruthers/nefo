import { Button } from "@/components/ui/button";
import type { SimpleQuestion } from "./simpleQuestion";
import useQuestions from "./useQuestions";
import { Input } from "@/components/ui/input";

interface SimpleQuizProps {
  title: string;
  questions: SimpleQuestion[];
  inputType?: "number" | undefined;
  goHome: () => void;
}

function SimpleQuiz({ title, questions, goHome, inputType }: SimpleQuizProps) {
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
    <div className="flex min-h-screen items-center justify-center bg-slate-400">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <p>
          <i>
            Question {currentIndex + 1}/{questions.length} - {title}
          </i>
        </p>
        <h2 className="text-xl font-bold my-5">{currentQuestion.question}</h2>
        {currentState === "correct" && <p>That's correct!</p>}
        {currentState === "incorrect" && (
          <>
            <p>
              You wrote {err}. That's not correct. It is{" "}
              {currentQuestion.answer}.
            </p>
          </>
        )}
        {currentState !== "q" && currentIndex < questions.length - 1 && (
          <p>
            <Button onClick={nextQ}>Next</Button>
          </p>
        )}
        {currentState !== "q" && currentIndex == questions.length - 1 && (
          <>
            <p>
              The quiz is over! You scored {correctCounter}/{questions.length}.
            </p>
            <p>
              <Button onClick={goHome}>Return to homepage</Button>
            </p>
          </>
        )}
        {currentState === "q" && (
          <form onSubmit={onSubmit}>
            <div className="flex w-full max-w-sm items-center gap-2">
              <Input ref={inputRef} type={inputType} />
              <Button type="submit" variant="outline">
                Submit
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default SimpleQuiz;
