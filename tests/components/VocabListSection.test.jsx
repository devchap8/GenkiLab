import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import VocabListSection from "../../src/components/VocabListSection";

function renderSection(words, props = {}) {
    return render(
        <table>
            <tbody>
                <VocabListSection vocabPair={["Test Section", words]} readingsHidden={false} defsHidden={false} {...props} />
            </tbody>
        </table>
    );
}

describe("VocabListSection", () => {
    it("renders a section header row and one row per word", () => {
        renderSection([
            { id: "1", reading: "みず", kanji: "水", def: "water" },
            { id: "2", reading: "ほん", kanji: "本", def: "book" },
        ]);
        expect(screen.getByText("Test Section")).toBeInTheDocument();
        expect(screen.getByText("water")).toBeInTheDocument();
        expect(screen.getByText("book")).toBeInTheDocument();
    });

    it("links the reading to a jisho.org search using the raw reading by default", () => {
        renderSection([{ id: "1", reading: "みず", kanji: "水", def: "water" }]);
        expect(screen.getByRole("link", { name: "みず" })).toHaveAttribute("href", "https://jisho.org/search/みず");
    });

    describe("jisho.org search link cleanup", () => {
        it.each([
            ["いい/よい", "いい"],
            ["いい／よい", "いい"],
            ["ねこ (どうぶつ)", "ねこ"],
            ["ねこ（猫）", "ねこ"],
            ["これ～", "これ"],
            ["たべる + negative", "たべる"],
        ])("cleans %s to %s", (reading, expectedHref) => {
            renderSection([{ id: "1", reading, kanji: "何か", def: "something" }]);
            expect(screen.getByRole("link", { name: reading })).toHaveAttribute("href", `https://jisho.org/search/${expectedHref}`);
        });
    });

    it("replaces the reading link with a spoiler when readingsHidden is true and the word has kanji", () => {
        renderSection([{ id: "1", reading: "みず", kanji: "水", def: "water" }], { readingsHidden: true });
        expect(screen.queryByRole("link", { name: "みず" })).not.toBeInTheDocument();
        expect(screen.getByText("みず").closest(".spoiler-hidden")).toBeInTheDocument();
    });

    it("still shows the reading as a link when readingsHidden is true but the word has no kanji", () => {
        renderSection([{ id: "1", reading: "みず", def: "water" }], { readingsHidden: true });
        expect(screen.getByRole("link", { name: "みず" })).toBeInTheDocument();
    });

    it("replaces the definition with a spoiler when defsHidden is true", () => {
        renderSection([{ id: "1", reading: "みず", kanji: "水", def: "water" }], { defsHidden: true });
        expect(screen.getByText("water").closest(".spoiler-hidden")).toBeInTheDocument();
    });
});
