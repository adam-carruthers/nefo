import { Button } from "@/components/ui/button";
import type { SimpleQuestion } from "./simpleQuestion";
import useQuestions from "./useQuestions";
import { Input } from "@/components/ui/input";
import { CircleCheck, CircleX } from "lucide-react";

interface SimpleQuizProps {
  title: string;
  questionText: string;
  questions: SimpleQuestion[];
  inputType?: "number" | undefined;
  goHome: () => void;
}

function SimpleQuiz({
  title,
  questionText,
  questions,
  goHome,
  inputType,
}: SimpleQuizProps) {
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
    <div className="grow flex items-center justify-center bg-violet-100">
      <div className="w-full max-w-md pt-4 px-0 bg-white rounded shadow">
        <Button
          className="mx-6 px-0 py-0 text-gray-600"
          variant="link"
          onClick={goHome}
        >
          &lt; Return home
        </Button>
        <p className="text-primary px-6 mb-2">
          Question {currentIndex + 1}/{questions.length} - {title}
        </p>
        <h2 className="text-lg font-bold my-1 px-6">{questionText}</h2>
        <div className="border-l-4 pl-4 text-xl mx-6 my-4">
          {currentQuestion.question}
        </div>
        {currentState === "correct" && (
          <div className="w-full mt-2 pt-3 pb-4 px-6 green-theme bg-background text-primary">
            <div className="flex items-center gap-2 font-bold mt-1">
              <CircleCheck /> That's correct!
            </div>
            {currentIndex < questions.length - 1 && (
              <Button onClick={nextQ} className="w-full mt-3 mb-2">
                Next
              </Button>
            )}
          </div>
        )}
        {currentState === "incorrect" && (
          <div className="w-full mt-2 pt-3 pb-6 px-6 red-theme bg-background text-primary">
            <div className="flex items-center gap-2 font-bold my-1">
              <CircleX /> That's not quite right
            </div>
            <p>You wrote: {err}</p>
            <p>The correct answer is: {currentQuestion.answer}</p>
            {currentIndex < questions.length - 1 && (
              <Button onClick={nextQ} className="w-full mt-3 mb-2">
                Next
              </Button>
            )}
          </div>
        )}
        {currentState !== "q" && currentIndex == questions.length - 1 && (
          <div className="px-6 pt-4 pb-6">
            <p>
              The quiz is over! You scored {correctCounter}/{questions.length}.
            </p>
            <p>
              <Button onClick={goHome} className="w-full mt-2">
                Return to homepage
              </Button>
            </p>
          </div>
        )}
        {currentState === "q" && (
          <form onSubmit={onSubmit}>
            <div className="flex flex-col sm:flex-row w-full px-6 items-center gap-2 pb-10 pt-2">
              <Input
                ref={inputRef}
                type={inputType}
                className="grow w-full sm:w-auto"
              />
              <Button
                type="submit"
                variant="default"
                className="w-full sm:w-auto"
              >
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
