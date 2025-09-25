import type React from "react";
import LanguageContext, { localeToInfo } from "./context";
import { useState } from "react";

function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [numberLocale, setNumberLocale] = useState<string | null>(null);

    const numberLang = numberLocale
        ? { locale: numberLocale, ...localeToInfo[numberLocale as keyof typeof localeToInfo] }
        : null;

    return (
        <LanguageContext.Provider value={{ numberLang, setNumberLocale }}>
            {children}
        </LanguageContext.Provider>
    )
}

export default LanguageProvider;