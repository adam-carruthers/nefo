import { useState } from "react";
import SimpleQuiz from "./simpleQuiz";
import {
  generateDigitToWordQuestions,
  generateMathsToDigitQuestions,
  generateMathsToWordQuestions,
  generateWordToDigitQuestions,
  type SimpleQuestion,
} from "./simpleQuestion";
import { Button } from "@/components/ui/button";
import icon from "@/assets/icon.svg";

const N_QUESTIONS = 5;

function Menu() {
  const [mode, setMode] = useState("menu");
  const [questions, setQuestions] = useState<SimpleQuestion[] | null>(null);

  const startGame = (mode: string) => {
    if (mode == "words-to-digits")
      setQuestions(generateWordToDigitQuestions(N_QUESTIONS));
    else if (mode == "digits-to-words")
      setQuestions(generateDigitToWordQuestions(N_QUESTIONS));
    else if (mode == "maths-to-digits")
      setQuestions(generateMathsToDigitQuestions(N_QUESTIONS));
    else if (mode == "maths-to-words")
      setQuestions(generateMathsToWordQuestions(N_QUESTIONS));
    setMode(mode);
  };

  const goHome = () => setMode("menu");

  if (mode == "words-to-digits" && questions)
    return (
      <SimpleQuiz
        title="Words to digits"
        questionText="Write down this number in digits"
        questions={questions}
        goHome={goHome}
        inputType="number"
      />
    );
  if (mode == "digits-to-words" && questions)
    return (
      <SimpleQuiz
        title="Digits to words"
        questionText="Write this number in French"
        questions={questions}
        goHome={goHome}
      />
    );
  if (mode == "maths-to-digits" && questions)
    return (
      <SimpleQuiz
        title="Maths to digits"
        questionText="Do the following calculation and write the number in digits"
        questions={questions}
        goHome={goHome}
        inputType="number"
      />
    );
  if (mode == "maths-to-words" && questions)
    return (
      <SimpleQuiz
        title="Maths to digits"
        questionText="Do the following calculation and write the number in French"
        questions={questions}
        goHome={goHome}
      />
    );

  return <MenuOptions startGame={startGame} />;
}

interface MenuOptionsProps {
  startGame: (mode: string) => void;
}

function MenuOptions({ startGame }: MenuOptionsProps) {
  return (
    <div className="flex items-center justify-center grow text-center">
      <div className="text-center">
        <div className="flex flex-col items-center mb-3 pointer-events-none">
          <img src={icon} alt="Nefo Icon" className="w-40 h-40 mb-2" />
          <h1 className="text-3xl font-extrabold">Nefo</h1>
        </div>
        <div className="my-8 px-2">
          <p>A tool for learning numbers in a foreign language.</p>
          <p>Currently only for English speakers learning French.</p>
        </div>
        <div className="my-8 px-2 gap-4">
          <h2 className="font-bold mb-3">Learn how to count in French</h2>
          <Button asChild>
            <a
              href="https://www.lawlessfrench.com/vocabulary/numbers-and-counting/"
              target="_blank"
              rel="noreferrer"
            >
              Read the counting rules (external site)
            </a>
          </Button>
        </div>
        <div className="flex flex-col gap-4 max-w-48 items-center justify-center m-auto">
          <h2 className="font-bold">Quizzes!</h2>
          <Button onClick={() => startGame("words-to-digits")}>
            Words → Digits
          </Button>
          <Button onClick={() => startGame("digits-to-words")}>
            Digits → Words
          </Button>
          <Button onClick={() => startGame("maths-to-digits")}>
            Maths → Digits
          </Button>
          <Button onClick={() => startGame("maths-to-words")}>
            Maths → Words
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Menu;
