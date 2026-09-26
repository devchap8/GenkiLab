import { describe, it, expect } from "vitest";
import validateVocab from "../../src/scripts/validateVocab";

describe("validateVocab", () => {
    it("matches an exact answer", () => {
        expect(validateVocab("ねこ", "ねこ")).toBe(true);
    });

    it("trims whitespace from both response and answer", () => {
        expect(validateVocab(" ねこ ", "ねこ")).toBe(true);
        expect(validateVocab("ねこ", " ねこ ")).toBe(true);
    });

    it("rejects a falsy answer regardless of response", () => {
        expect(validateVocab("ねこ", "")).toBe(false);
        expect(validateVocab("ねこ", null)).toBe(false);
        expect(validateVocab("ねこ", undefined)).toBe(false);
        expect(validateVocab("", "")).toBe(false);
    });

    it("rejects a non-matching response", () => {
        expect(validateVocab("", "ねこ")).toBe(false);
        expect(validateVocab("いぬ", "ねこ")).toBe(false);
    });

    describe("slash-separated alternative readings", () => {
        it("accepts any alternative, half-width slash", () => {
            expect(validateVocab("ねこ", "ねこ/いぬ")).toBe(true);
            expect(validateVocab("さかな", "ねこ/いぬ")).toBe(false);
        });

        it("accepts any alternative, full-width slash", () => {
            expect(validateVocab("いぬ", "ねこ／いぬ")).toBe(true);
        });

        it("accepts any alternative when separators are mixed", () => {
            expect(validateVocab("とり", "ねこ/いぬ／とり")).toBe(true);
        });
    });

    describe("parenthetical content", () => {
        it("accepts the answer with an English parenthetical removed", () => {
            expect(validateVocab("ねこ", "ねこ (どうぶつ)")).toBe(true);
        });

        it("accepts the answer with a Japanese parenthetical removed", () => {
            expect(validateVocab("ねこ", "ねこ（猫）")).toBe(true);
        });

        it("does not accept the parenthetical content alone", () => {
            expect(validateVocab("どうぶつ", "ねこ (どうぶつ)")).toBe(false);
        });
    });

    describe("+ suffix", () => {
        it("strips a trailing + qualifier, half-width", () => {
            expect(validateVocab("たべもの", "たべもの + のみもの")).toBe(true);
        });

        it("strips a trailing + qualifier, full-width", () => {
            expect(validateVocab("たべもの", "たべもの ＋ のみもの")).toBe(true);
        });
    });

    describe("special characters", () => {
        it.each(["～", "。", "~", "."])("strips trailing %s", (char) => {
            expect(validateVocab("これ", `これ${char}`)).toBe(true);
        });
    });

    describe("combinations", () => {
        it("resolves a slash-separated answer where one alternative has a parenthetical", () => {
            expect(validateVocab("ねこ", "ねこ (どうぶつ)/いぬ")).toBe(true);
            expect(validateVocab("いぬ", "ねこ (どうぶつ)/いぬ")).toBe(true);
            expect(validateVocab("とり", "ねこ (どうぶつ)/いぬ")).toBe(false);
            expect(validateVocab("どうぶつ", "ねこ (どうぶつ)/いぬ")).toBe(false);
        });
    });
});
