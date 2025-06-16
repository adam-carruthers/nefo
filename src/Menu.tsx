import { useEffect, useState } from "react";
import './Menu.css';
import WordsToDigits from "./WordsToDigits";
import { getRandomList } from "./randomUtils";

const N_QUESTIONS = 5;

function Menu() {
  const [mode, setMode] = useState('menu');
  const [randState, setRandState] = useState<number[] | null>(null);

  const startGame = (mode: string) => {
    const generatedRandState = getRandomList(N_QUESTIONS);
    setRandState(generatedRandState);
    setMode(mode);
  }

  useEffect(() => {
    console.log("hi")
  }, [])

  if (mode == 'words-to-digits' && randState) return <WordsToDigits randState={randState} />

  return <MenuOptions startGame={startGame} />;
}

interface MenuOptionsProps {
  startGame: (mode: string) => void;
}

function MenuOptions({ startGame }: MenuOptionsProps) {
  return (
    <div className="menu-buttons">
      <button onClick={() => startGame('words-to-digits')}>Words → Digits</button>
      <button onClick={() => startGame('digits-to-words')}>Digits → Words</button>
    </div>
  );
}

export default Menu;
