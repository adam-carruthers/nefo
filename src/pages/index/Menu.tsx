import { useEffect, useState } from "react";
import SimpleQuiz from "./simpleQuiz";
import {
  generateDigitToWordQuestions,
  generateWordToDigitQuestions,
  type SimpleQuestion,
} from "./simpleQuestion";
import { Button } from "@/components/ui/button";

const N_QUESTIONS = 5;

function Menu() {
  const [mode, setMode] = useState("menu");
  const [questions, setQuestions] = useState<SimpleQuestion[] | null>(null);

  const startGame = (mode: string) => {
    if (mode == "words-to-digits")
      setQuestions(generateWordToDigitQuestions(N_QUESTIONS));
    else if (mode == "digits-to-words")
      setQuestions(generateDigitToWordQuestions(N_QUESTIONS));
    setMode(mode);
  };

  const goHome = () => setMode("menu");

  useEffect(() => {
    console.log("hi");
  }, []);

  if (mode == "words-to-digits" && questions)
    return (
      <SimpleQuiz
        title="Words to digits!"
        questions={questions}
        goHome={goHome}
        inputType="number"
      />
    );
  if (mode == "digits-to-words" && questions)
    return (
      <SimpleQuiz
        title="Digits to words!"
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
    <div className="flex items-center justify-center min-h-screen text-center">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold mb-8">Nefo</h1>
        <div className="flex flex-col gap-4">
          <Button onClick={() => startGame("words-to-digits")}>
            Words → Digits
          </Button>
          <Button onClick={() => startGame("digits-to-words")}>
            Digits → Words
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Menu;
