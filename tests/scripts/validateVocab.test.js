import { describe, it, expect } from "vitest";
import validateVocab from "../../src/scripts/validateVocab";

describe("validateVocab", () => {
    it("matches an exact answer", () => {
        expect(validateVocab("cat", "cat")).toBe(true);
    });

    it("trims whitespace from both response and answer", () => {
        expect(validateVocab(" cat ", "cat")).toBe(true);
        expect(validateVocab("cat", " cat ")).toBe(true);
    });

    it("is case sensitive", () => {
        expect(validateVocab("Cat", "cat")).toBe(false);
    });

    it("rejects a falsy answer regardless of response", () => {
        expect(validateVocab("cat", "")).toBe(false);
        expect(validateVocab("cat", null)).toBe(false);
        expect(validateVocab("cat", undefined)).toBe(false);
        // the falsy-answer guard fires before response is ever compared,
        // so even a blank response against a blank answer is rejected
        expect(validateVocab("", "")).toBe(false);
    });

    it("rejects a non-matching response", () => {
        expect(validateVocab("", "cat")).toBe(false);
        expect(validateVocab("xyz", "cat")).toBe(false);
    });

    describe("slash-separated alternative readings", () => {
        it("accepts any alternative, half-width slash", () => {
            expect(validateVocab("dog", "cat/dog")).toBe(true);
            expect(validateVocab("fish", "cat/dog")).toBe(false);
        });

        it("accepts any alternative, full-width slash", () => {
            expect(validateVocab("dog", "cat／dog")).toBe(true);
        });

        it("accepts any alternative when separators are mixed", () => {
            expect(validateVocab("bird", "cat/dog／bird")).toBe(true);
        });
    });

    describe("parenthetical content", () => {
        it("accepts the answer with an English parenthetical removed", () => {
            expect(validateVocab("cat", "cat (animal)")).toBe(true);
        });

        it("accepts the answer with a Japanese parenthetical removed", () => {
            expect(validateVocab("ねこ", "ねこ（猫）")).toBe(true);
        });

        it("does not accept the parenthetical content alone", () => {
            expect(validateVocab("animal", "cat (animal)")).toBe(false);
        });
    });

    describe("+ suffix", () => {
        it("strips a trailing + qualifier, half-width", () => {
            expect(validateVocab("food", "food + drink")).toBe(true);
        });

        it("strips a trailing + qualifier, full-width", () => {
            expect(validateVocab("food", "food ＋ drink")).toBe(true);
        });
    });

    describe("special characters", () => {
        it.each(["～", "。", "~", "."])("strips trailing %s", (char) => {
            expect(validateVocab("kore", `kore${char}`)).toBe(true);
        });
    });

    describe("combinations", () => {
        it("resolves a slash-separated answer where one alternative has a parenthetical", () => {
            expect(validateVocab("cat", "cat (animal)/dog")).toBe(true);
            expect(validateVocab("dog", "cat (animal)/dog")).toBe(true);
            expect(validateVocab("bird", "cat (animal)/dog")).toBe(false);
        });
    });
});
