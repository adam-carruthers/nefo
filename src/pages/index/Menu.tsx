import { useContext, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LanguageContext, { localeToInfo } from "@/context/language/context";

const N_QUESTIONS = 5;

function Menu() {
  const [mode, setMode] = useState("menu");
  const [questions, setQuestions] = useState<SimpleQuestion[] | null>(null);

  const lang = useContext(LanguageContext);

  const startGame = (mode: string) => {
    if (!lang.numberLang)
      throw new Error("Somehow startGame was called without a number lang");

    if (mode == "words-to-digits")
      setQuestions(
        generateWordToDigitQuestions(
          N_QUESTIONS,
          lang.numberLang.convertNumberToText,
        ),
      );
    else if (mode == "digits-to-words")
      setQuestions(
        generateDigitToWordQuestions(
          N_QUESTIONS,
          lang.numberLang.convertNumberToText,
        ),
      );
    else if (mode == "maths-to-digits")
      setQuestions(
        generateMathsToDigitQuestions(
          N_QUESTIONS,
          lang.numberLang.convertNumberToText,
          lang.numberLang.operatorMap,
        ),
      );
    else if (mode == "maths-to-words")
      setQuestions(
        generateMathsToWordQuestions(
          N_QUESTIONS,
          lang.numberLang.convertNumberToText,
          lang.numberLang.operatorMap,
        ),
      );
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
  const lang = useContext(LanguageContext);

  return (
    <div className="flex items-start justify-center grow text-center pt-8 pb-10">
      <div className="text-center">
        <div className="flex flex-col items-center mb-3 pointer-events-none">
          <img src={icon} alt="Nefo Icon" className="w-40 h-40 mb-2" />
          <h1 className="text-3xl font-extrabold">Nefo</h1>
        </div>
        <div className="my-5 px-2">
          <p>A tool for learning numbers in a foreign language.</p>
        </div>
        <div className="px-2 flex flex-col gap-4 max-w-48 items-center justify-center m-auto">
          <h2 className="font-bold">Choose the language of the numbers</h2>
          <Select
            onValueChange={lang.setNumberLocale}
            value={lang.numberLang?.locale}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.entries(localeToInfo).map(([locale, localeInfo]) => (
                  <SelectItem value={locale} key={locale}>
                    {localeInfo.nameWithDialect} -{" "}
                    {localeInfo.convertNumberToText(1)},{" "}
                    {localeInfo.convertNumberToText(2)},{" "}
                    {localeInfo.convertNumberToText(3)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {lang.numberLang && (
          <>
            <div className="my-8 px-2 gap-4">
              <h2 className="font-bold mb-3">
                Learn how to count in {lang.numberLang.name}
              </h2>
              <Button asChild>
                <a
                  href={lang.numberLang.countingRulesUrl}
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
          </>
        )}
      </div>
    </div>
  );
}

export default Menu;
