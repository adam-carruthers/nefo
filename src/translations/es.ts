type NumberMap = { [key: number]: string };

const LOW_NUMBERS: NumberMap = {
    0: "cero",
    1: "uno",
    2: "dos",
    3: "tres",
    4: "cuatro",
    5: "cinco",
    6: "seis",
    7: "siete",
    8: "ocho",
    9: "nueve",
    10: "diez",
    11: "once",
    12: "doce",
    13: "trece",
    14: "catorce",
    15: "quince",
    16: "dieciseis",
    17: "diecisiete",
    18: "dieciocho",
    19: "diecinueve",
    20: "veinte",
    21: "veintiuno",
    22: "veintidós",
    23: "veintitrés",
    24: "veinticuatro",
    25: "veinticinco",
    26: "veintiséis",
    27: "veintisiete",
    28: "veintiocho",
    29: "veintinueve",
};

const TENS: NumberMap = {
    30: "treinta",
    40: "cuarenta",
    50: "cincuenta",
    60: "sesenta",
    70: "setenta",
    80: "ochenta",
    90: "noventa",
};

const HUNDREDS: NumberMap = {
    100: "ciento",
    200: "doscientos",
    300: "trescientos",
    400: "cuatrocientos",
    500: "quinientos",
    600: "seiscientos",
    700: "setecientos",
    800: "ochocientos",
    900: "novecientos",
};

const processSmallerNumberChunk = (
    n: number,
    stepSize: number,
    chunkMap: NumberMap,
    spaceText: string
) => {
    // With hundreds:
    // Imagine n = 534
    // stepSize = 100
    // Sig figs of n in the chunk of hundreds = 500
    const nButOnlyTheSigFigsInTheChunk = stepSize * Math.floor(n / stepSize);
    const nRemaining = n - nButOnlyTheSigFigsInTheChunk;

    const thereIsNoOtherPartToNumber = nRemaining === 0;
    if (thereIsNoOtherPartToNumber) {
        return chunkMap[n];
    } else {
        return (
            chunkMap[nButOnlyTheSigFigsInTheChunk] +
            spaceText +
            convert_num_to_es_text(nRemaining)
        );
    }
};

const processLargerNumberChunk = (
    n: number,
    stepSize: number,
    singular: string,
    plural: string
) => {
    const nButOnlyTheSigFigsInTheChunk = stepSize * Math.floor(n / stepSize);

    let initialPart: string;
    if (nButOnlyTheSigFigsInTheChunk === stepSize) {
        initialPart = singular;
    } else {
        initialPart =
            convert_num_to_es_text(nButOnlyTheSigFigsInTheChunk / stepSize) + " " + plural;
    }

    const nRemaining = n - nButOnlyTheSigFigsInTheChunk;

    const thereIsNoOtherPartToNumber = nRemaining === 0;

    if (thereIsNoOtherPartToNumber) {
        return initialPart;
    } else {
        return initialPart + " " + convert_num_to_es_text(nRemaining);
    }
};

const convert_num_to_es_text = (n: number): string => {
    if (n < 0) {
        return "menos " + convert_num_to_es_text(-n);
    }
    if (!Number.isInteger(n)) {
        throw new Error("This program only handles integers.");
    }
    if (0 <= n && n < 30) {
        return LOW_NUMBERS[n];
    }
    if (30 <= n && n < 100) {
        return processSmallerNumberChunk(n, 10, TENS, " y ");
    }
    if (n === 100) {
        return "cien";
    }
    if (101 <= n && n < 1000) {
        return processSmallerNumberChunk(n, 100, HUNDREDS, " ");
    }
    if (1000 <= n && n < 10 ** 6) {
        return processLargerNumberChunk(n, 1000, "mil", "mil");
    }
    if (10 ** 6 <= n && n < 10 ** 12) {
        return processLargerNumberChunk(n, 10 ** 6, "un millón", "millones");
    }
    if (10 ** 12 <= n && n < 10 ** 18) {
        return processLargerNumberChunk(n, 10 ** 12, "un billón", "billones");
    }
    throw new Error("That number is not handled yet.");
};

export default convert_num_to_es_text;
