import { useEffect, useState } from "react";
import "./Menu.css";
import SimpleQuiz from "./simpleQuiz";
import {
  generateDigitToWordQuestions,
  generateWordToDigitQuestions,
  type SimpleQuestion,
} from "./simpleQuestion";

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
      <SimpleQuiz questions={questions} goHome={goHome} inputType="number" />
    );
  if (mode == "digits-to-words" && questions)
    return <SimpleQuiz questions={questions} goHome={goHome} />;

  return <MenuOptions startGame={startGame} />;
}

interface MenuOptionsProps {
  startGame: (mode: string) => void;
}

function MenuOptions({ startGame }: MenuOptionsProps) {
  return (
    <div className="menu-buttons">
      <button onClick={() => startGame("words-to-digits")}>
        Words → Digits
      </button>
      <button onClick={() => startGame("digits-to-words")}>
        Digits → Words
      </button>
    </div>
  );
}

export default Menu;
