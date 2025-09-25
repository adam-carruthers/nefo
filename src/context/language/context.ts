import { createContext } from "react";
import convert_num_to_es_text, { OPERATOR_MAP_ES } from "@/translations/es";
import convert_num_to_fr_fr_text, {
  OPERATOR_MAP_FR,
} from "@/translations/fr-fr";

export type ConvertNumberToText = (n: number) => string;

export interface OperatorMap {
  "+": string;
  "-": string;
  "*": string;
  "/": string;
}

export interface NumberLang {
  locale: string;
  name: string;
  nameWithDialect: string;
  countingRulesUrl: string;
  convertNumberToText: ConvertNumberToText;
  operatorMap: OperatorMap;
}

interface LanguageContext {
  numberLang: NumberLang | null;
  setNumberLocale: (locale: string) => void;
}

const LanguageContext = createContext<LanguageContext>({
  numberLang: null,
  setNumberLocale: () => undefined,
});

export default LanguageContext;

export const localeToInfo = {
  "fr-fr": {
    name: "French",
    nameWithDialect: "French (France)",
    convertNumberToText: convert_num_to_fr_fr_text,
    countingRulesUrl:
      "https://www.lawlessfrench.com/vocabulary/numbers-and-counting/",
    operatorMap: OPERATOR_MAP_FR,
  },
  "es-es": {
    name: "Spanish",
    nameWithDialect: "Spanish (Spain)",
    convertNumberToText: convert_num_to_es_text,
    countingRulesUrl: "https://www.donquijote.org/spanish-language/numbers/",
    operatorMap: OPERATOR_MAP_ES,
  },
} satisfies Record<string, Omit<NumberLang, "locale">>;
