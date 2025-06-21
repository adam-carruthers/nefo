import { useEffect, useState } from "react";
import "./Menu.css";
import WordsToDigits from "./WordsToDigits";
import { generateQuestions, type Question } from "./wordsToDigits";

function Menu() {
  const [mode, setMode] = useState("menu");
  const [questions, setQuestions] = useState<Question[] | null>(null);

  const startGame = (mode: string) => {
    setQuestions(generateQuestions());
    setMode(mode);
  };

  const goHome = () => setMode("menu");

  useEffect(() => {
    console.log("hi");
  }, []);

  if (mode == "words-to-digits" && questions)
    return <WordsToDigits questions={questions} goHome={goHome} />;

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
