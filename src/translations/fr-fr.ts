const ZERO_À_DIX_NEUF = [
  "zéro",
  "un",
  "deux",
  "trois",
  "quatre",
  "cinq",
  "six",
  "sept",
  "huit",
  "neuf",
  "dix",
  "onze",
  "douze",
  "treize",
  "quatorze",
  "quinze",
  "seize",
  "dix sept",
  "dix huit",
  "dix neuf",
];

const SMALL_TENS = ["vingt", "trente", "quarante", "cinquante"];
const LARGE_TENS = ["soixante", "quatre-vingt"];

export const OPERATOR_MAP = {
  "+": "plus",
  "-": "moins",
  "*": "fois",
  "/": "divisé par",
};

function convert_num_0_to_19(n: number): string {
  if (n < 0 || n > 19) throw Error(`Number ${n} out-of-bounds 0-19`);
  return ZERO_À_DIX_NEUF[n];
}

function suffix_0_to_19(n: number): string {
  if (n == 0) return "";
  if (n == 1) return " et un";
  return " " + convert_num_0_to_19(n);
}

function convert_num_0_to_99(n: number): string {
  if (n <= 19) return convert_num_0_to_19(n);

  if (n == 71) return "soixante et onze";
  if (n == 80) return "quatre-vingts";
  if (n == 81) return "quatre-vingt un";

  const tens_component = Math.floor(n / 10);
  if (2 <= tens_component && tens_component <= 5)
    return SMALL_TENS[tens_component - 2] + suffix_0_to_19(n % 10);

  const twentys_component = Math.floor(n / 20);
  if (twentys_component == 3 || twentys_component == 4)
    return LARGE_TENS[twentys_component - 3] + suffix_0_to_19(n % 20);

  throw new Error(`Number ${n} out-of-bounds 0-99`);
}

function convert_num_0_to_999(n: number): string {
  if (n < 0 || n > 999) throw new Error(`Number ${n} out-of-bounds 0-999`);

  if (n <= 99) return convert_num_0_to_99(n);

  if (n == 100) return "cent";
  if (n % 100 == 0) return convert_num_0_to_19(n / 100) + " cents";
  if (n < 200) return "cent " + convert_num_0_to_99(n % 100);

  return (
    convert_num_0_to_19(Math.floor(n / 100)) +
    " cent " +
    convert_num_0_to_99(n % 100)
  );
}

function convert_num_0_to_999_999(n: number): string {
  if (n < 0 || n > 999_999)
    throw new Error(`Number ${n} out-of-bounds 0-999 999`);

  if (n <= 999) return convert_num_0_to_999(n);
  if (n == 1000) return "mille";
  if (n <= 1999) return "mille " + convert_num_0_to_999(n % 1000);
  if (n % 1000 == 0) return convert_num_0_to_999(n / 1000) + " mille";

  return (
    convert_num_0_to_999(Math.floor(n / 1000)) +
    " mille " +
    convert_num_0_to_999(n % 1000)
  );
}

function convert_num_to_fr_fr_text(n: number): string {
  if (!Number.isInteger(n)) throw Error("this function only handles int");

  return (n < 0 ? "moins " : "") + convert_num_0_to_999_999(Math.abs(n));
}

export default convert_num_to_fr_fr_text;
