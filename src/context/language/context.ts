import { createContext } from 'react';
import convert_num_to_es_text from "@/translations/es";
import convert_num_to_fr_fr_text from "@/translations/fr-fr";

interface NumberLang {
    locale: string;
    name: string;
    nameWithDialect: string;
    countingRulesUrl: string;
    convertNumberToText: (n: number) => string;
}

interface LanguageContext {
    numberLang: NumberLang | null;
    setNumberLocale: (locale: string) => void;
}

const LanguageContext = createContext<LanguageContext>({ numberLang: null, setNumberLocale: (_) => null });

export default LanguageContext;

export const localeToInfo = {
    "fr-fr": { name: "French", nameWithDialect: "French (France)", convertNumberToText: convert_num_to_fr_fr_text, countingRulesUrl: "https://www.lawlessfrench.com/vocabulary/numbers-and-counting/" },
    "es-es": { name: "Spanish", nameWithDialect: "Spanish (Spain)", convertNumberToText: convert_num_to_es_text, countingRulesUrl: "https://example.com" },
}
