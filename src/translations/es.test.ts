import { expect, test, describe } from "vitest";
import convert_num_to_es_text from "./es";

describe("num2wordsEs", () => {
    test("it can handle low numbers (1-29)", () => {
        expect(convert_num_to_es_text(0)).toEqual("cero");
        expect(convert_num_to_es_text(14)).toEqual("catorce");
        expect(convert_num_to_es_text(17)).toEqual("diecisiete");
        expect(convert_num_to_es_text(22)).toEqual("veintidós");
    });

    test("it can handle numbers below 100", () => {
        expect(convert_num_to_es_text(30)).toEqual("treinta");
        expect(convert_num_to_es_text(38)).toEqual("treinta y ocho");
        expect(convert_num_to_es_text(91)).toEqual("noventa y uno");
        expect(convert_num_to_es_text(53)).toEqual("cincuenta y tres");
        expect(convert_num_to_es_text(99)).toEqual("noventa y nueve");
    });

    test("it can handle all the necessary numbers without crashing", () => {
        for (let n = 0; n < 1000; n++) {
            convert_num_to_es_text(n);
        }
    });

    test("it can handle numbers below 1000", () => {
        expect(convert_num_to_es_text(100)).toEqual("cien");
        expect(convert_num_to_es_text(101)).toEqual("ciento uno");
        expect(convert_num_to_es_text(300)).toEqual("trescientos");
        expect(convert_num_to_es_text(345)).toEqual("trescientos cuarenta y cinco");
        expect(convert_num_to_es_text(876)).toEqual("ochocientos setenta y seis");
        expect(convert_num_to_es_text(999)).toEqual("novecientos noventa y nueve");
    });

    test("it can handle thousands", () => {
        expect(convert_num_to_es_text(1000)).toEqual("mil");
        expect(convert_num_to_es_text(1001)).toEqual("mil uno");
        expect(convert_num_to_es_text(1002)).toEqual("mil dos");
        expect(convert_num_to_es_text(2000)).toEqual("dos mil");
        expect(convert_num_to_es_text(4567)).toEqual("cuatro mil quinientos sesenta y siete");
        expect(convert_num_to_es_text(890123)).toEqual(
            "ochocientos noventa mil ciento veintitrés"
        );
        expect(convert_num_to_es_text(999999)).toEqual(
            "novecientos noventa y nueve mil novecientos noventa y nueve"
        );
    });

    test("it can handle millions", () => {
        expect(convert_num_to_es_text(1000000)).toEqual("un millón");
        expect(convert_num_to_es_text(1000001)).toEqual("un millón uno");
        expect(convert_num_to_es_text(2345678)).toEqual(
            "dos millones trescientos cuarenta y cinco mil seiscientos setenta y ocho"
        );
        expect(convert_num_to_es_text(801234567890)).toEqual(
            "ochocientos uno mil doscientos treinta y cuatro millones quinientos sesenta y siete mil ochocientos noventa"
        );
        expect(convert_num_to_es_text(999999999999)).toEqual(
            "novecientos noventa y nueve mil novecientos noventa y nueve millones novecientos noventa y nueve mil novecientos noventa y nueve"
        );
    });

    test("it can handle billions", () => {
        expect(convert_num_to_es_text(1000000000000)).toEqual("un billón");
        expect(convert_num_to_es_text(1000000000001)).toEqual("un billón uno");
        expect(convert_num_to_es_text(7654321098765432)).toEqual(
            "siete mil seiscientos cincuenta y cuatro billones trescientos veintiuno mil noventa y ocho millones setecientos sesenta y cinco mil cuatrocientos treinta y dos"
        );
    });

    test("it can handle negative numbers", () => {
        expect(convert_num_to_es_text(-5)).toEqual("menos cinco");
        expect(convert_num_to_es_text(-32985)).toEqual(
            "menos treinta y dos mil novecientos ochenta y cinco"
        );
    });

    test.todo("it can handle decimal numbers gracefully");

    test.todo("it handles numbers that are too big gracefully");
});