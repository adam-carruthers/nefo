import { expect, test } from "vitest";
import convert_num_to_fr_fr_text from "./fr-fr";

test("can convert 0 to 19", () => {
  expect(convert_num_to_fr_fr_text(0)).toBe("zéro");
  expect(convert_num_to_fr_fr_text(1)).toBe("un");
  expect(convert_num_to_fr_fr_text(2)).toBe("deux");
  expect(convert_num_to_fr_fr_text(3)).toBe("trois");
  expect(convert_num_to_fr_fr_text(4)).toBe("quatre");
  expect(convert_num_to_fr_fr_text(5)).toBe("cinq");
  expect(convert_num_to_fr_fr_text(6)).toBe("six");
  expect(convert_num_to_fr_fr_text(7)).toBe("sept");
  expect(convert_num_to_fr_fr_text(8)).toBe("huit");
  expect(convert_num_to_fr_fr_text(9)).toBe("neuf");
  expect(convert_num_to_fr_fr_text(10)).toBe("dix");
  expect(convert_num_to_fr_fr_text(11)).toBe("onze");
  expect(convert_num_to_fr_fr_text(12)).toBe("douze");
  expect(convert_num_to_fr_fr_text(13)).toBe("treize");
  expect(convert_num_to_fr_fr_text(14)).toBe("quatorze");
  expect(convert_num_to_fr_fr_text(15)).toBe("quinze");
  expect(convert_num_to_fr_fr_text(16)).toBe("seize");
  expect(convert_num_to_fr_fr_text(17)).toBe("dix-sept");
  expect(convert_num_to_fr_fr_text(18)).toBe("dix-huit");
  expect(convert_num_to_fr_fr_text(19)).toBe("dix-neuf");
});

test("throws error for floating point numbers", () => {
  expect(() => convert_num_to_fr_fr_text(1.5)).toThrow(
    "this function only handles int"
  );
  expect(() => convert_num_to_fr_fr_text(-0.1)).toThrow(
    "this function only handles int"
  );
  expect(() => convert_num_to_fr_fr_text(10.0001)).toThrow(
    "this function only handles int"
  );
});

test("can convert 20 to 59", () => {
  expect(convert_num_to_fr_fr_text(20)).toBe("vingt");
  expect(convert_num_to_fr_fr_text(21)).toBe("vingt-et-un");
  expect(convert_num_to_fr_fr_text(22)).toBe("vingt-deux");
  expect(convert_num_to_fr_fr_text(29)).toBe("vingt-neuf");
  expect(convert_num_to_fr_fr_text(30)).toBe("trente");
  expect(convert_num_to_fr_fr_text(31)).toBe("trente-et-un");
  expect(convert_num_to_fr_fr_text(35)).toBe("trente-cinq");
  expect(convert_num_to_fr_fr_text(40)).toBe("quarante");
  expect(convert_num_to_fr_fr_text(41)).toBe("quarante-et-un");
  expect(convert_num_to_fr_fr_text(44)).toBe("quarante-quatre");
  expect(convert_num_to_fr_fr_text(50)).toBe("cinquante");
  expect(convert_num_to_fr_fr_text(51)).toBe("cinquante-et-un");
  expect(convert_num_to_fr_fr_text(59)).toBe("cinquante-neuf");
});

test("can convert 60 to 99", () => {
  expect(convert_num_to_fr_fr_text(60)).toBe("soixante");
  expect(convert_num_to_fr_fr_text(61)).toBe("soixante-et-un");
  expect(convert_num_to_fr_fr_text(62)).toBe("soixante-deux");
  expect(convert_num_to_fr_fr_text(69)).toBe("soixante-neuf");
  expect(convert_num_to_fr_fr_text(70)).toBe("soixante-dix");
  expect(convert_num_to_fr_fr_text(71)).toBe("soixante-et-onze");
  expect(convert_num_to_fr_fr_text(80)).toBe("quatre-vingts");
  expect(convert_num_to_fr_fr_text(81)).toBe("quatre-vingt-un");
  expect(convert_num_to_fr_fr_text(82)).toBe("quatre-vingt-deux");
  expect(convert_num_to_fr_fr_text(89)).toBe("quatre-vingt-neuf");
  expect(convert_num_to_fr_fr_text(99)).toBe("quatre-vingt-dix-neuf");
});

test("can convert negative numbers in 0 to 19", () => {
  expect(convert_num_to_fr_fr_text(-1)).toBe("moins un");
  expect(convert_num_to_fr_fr_text(-7)).toBe("moins sept");
  expect(convert_num_to_fr_fr_text(-19)).toBe("moins dix-neuf");
});

test("can convert negative numbers in 20 to 59", () => {
  expect(convert_num_to_fr_fr_text(-20)).toBe("moins vingt");
  expect(convert_num_to_fr_fr_text(-21)).toBe("moins vingt-et-un");
  expect(convert_num_to_fr_fr_text(-35)).toBe("moins trente-cinq");
  expect(convert_num_to_fr_fr_text(-59)).toBe("moins cinquante-neuf");
});

test("can convert negative numbers in 60 to 99", () => {
  expect(convert_num_to_fr_fr_text(-60)).toBe("moins soixante");
  expect(convert_num_to_fr_fr_text(-71)).toBe("moins soixante-et-onze");
  expect(convert_num_to_fr_fr_text(-80)).toBe("moins quatre-vingts");
  expect(convert_num_to_fr_fr_text(-99)).toBe("moins quatre-vingt-dix-neuf");
});

test("can convert round hundreds", () => {
  expect(convert_num_to_fr_fr_text(100)).toBe("cent");
  expect(convert_num_to_fr_fr_text(200)).toBe("deux-cents");
  expect(convert_num_to_fr_fr_text(300)).toBe("trois-cents");
  expect(convert_num_to_fr_fr_text(500)).toBe("cinq-cents");
  expect(convert_num_to_fr_fr_text(800)).toBe("huit-cents");
  expect(convert_num_to_fr_fr_text(900)).toBe("neuf-cents");
});

test("can convert numbers in the range 100-999", () => {
  expect(convert_num_to_fr_fr_text(101)).toBe("cent-un");
  expect(convert_num_to_fr_fr_text(115)).toBe("cent-quinze");
  expect(convert_num_to_fr_fr_text(123)).toBe("cent-vingt-trois");
  expect(convert_num_to_fr_fr_text(199)).toBe("cent-quatre-vingt-dix-neuf");
  expect(convert_num_to_fr_fr_text(201)).toBe("deux-cent-un");
  expect(convert_num_to_fr_fr_text(250)).toBe("deux-cent-cinquante");
  expect(convert_num_to_fr_fr_text(321)).toBe("trois-cent-vingt-et-un");
  expect(convert_num_to_fr_fr_text(404)).toBe("quatre-cent-quatre");
  expect(convert_num_to_fr_fr_text(512)).toBe("cinq-cent-douze");
  expect(convert_num_to_fr_fr_text(666)).toBe("six-cent-soixante-six");
  expect(convert_num_to_fr_fr_text(777)).toBe("sept-cent-soixante-dix-sept");
  expect(convert_num_to_fr_fr_text(888)).toBe("huit-cent-quatre-vingt-huit");
  expect(convert_num_to_fr_fr_text(999)).toBe(
    "neuf-cent-quatre-vingt-dix-neuf"
  );
  expect(convert_num_to_fr_fr_text(-321)).toBe("moins trois-cent-vingt-et-un");
});

test("can convert round thousands", () => {
  expect(convert_num_to_fr_fr_text(1000)).toBe("mille");
  expect(convert_num_to_fr_fr_text(2000)).toBe("deux-mille");
  expect(convert_num_to_fr_fr_text(5000)).toBe("cinq-mille");
  expect(convert_num_to_fr_fr_text(10000)).toBe("dix-mille");
  expect(convert_num_to_fr_fr_text(100000)).toBe("cent-mille");
  expect(convert_num_to_fr_fr_text(999000)).toBe(
    "neuf-cent-quatre-vingt-dix-neuf-mille"
  );
});

test("can convert numbers in the range 1000-999999", () => {
  expect(convert_num_to_fr_fr_text(1001)).toBe("mille-un");
  expect(convert_num_to_fr_fr_text(1015)).toBe("mille-quinze");
  expect(convert_num_to_fr_fr_text(1100)).toBe("mille-cent");
  expect(convert_num_to_fr_fr_text(1234)).toBe("mille-deux-cent-trente-quatre");
  expect(convert_num_to_fr_fr_text(2001)).toBe("deux-mille-un");
  expect(convert_num_to_fr_fr_text(2020)).toBe("deux-mille-vingt");
  expect(convert_num_to_fr_fr_text(9999)).toBe(
    "neuf-mille-neuf-cent-quatre-vingt-dix-neuf"
  );
  expect(convert_num_to_fr_fr_text(100000)).toBe("cent-mille");
  expect(convert_num_to_fr_fr_text(101001)).toBe("cent-un-mille-un");
  expect(convert_num_to_fr_fr_text(123456)).toBe(
    "cent-vingt-trois-mille-quatre-cent-cinquante-six"
  );
  expect(convert_num_to_fr_fr_text(999999)).toBe(
    "neuf-cent-quatre-vingt-dix-neuf-mille-neuf-cent-quatre-vingt-dix-neuf"
  );
  expect(convert_num_to_fr_fr_text(-123456)).toBe(
    "moins cent-vingt-trois-mille-quatre-cent-cinquante-six"
  );
});
