import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { renderWithRouter } from "../utils";
import KanaSheet from "../../src/components/KanaSheet";

const routes = [{ path: "/kana/:kanaType", element: <KanaSheet /> }];

function renderSheet(kanaType) {
    return renderWithRouter(routes, { initialEntries: [`/kana/${kanaType}`] });
}

describe("KanaSheet", () => {
    it("renders NotFound for an invalid kana type", () => {
        renderSheet("bogus");
        expect(screen.getByText("Error 404")).toBeInTheDocument();
    });

    it("sets the document title to Not Found for an invalid kana type", () => {
        renderSheet("bogus");
        expect(document.title).toBe("Not Found | GenkiLab");
    });

    it("renders the Hiragana sheet's tables and sets the document title", () => {
        renderSheet("hiragana");
        expect(screen.getByText("Hiragana Sheet")).toBeInTheDocument();
        expect(document.title).toBe("Hiragana Sheet | GenkiLab");
        expect(screen.getByText("あ")).toBeInTheDocument();
        expect(screen.getByText("a", { selector: "span" })).toBeInTheDocument();
    });

    it("renders the Katakana sheet when selected", () => {
        renderSheet("katakana");
        expect(screen.getByText("Katakana Sheet")).toBeInTheDocument();
        expect(screen.getByText("ア")).toBeInTheDocument();
    });

    it("highlights the active kana type and links to the other one", () => {
        renderSheet("hiragana");
        expect(screen.getByRole("link", { name: "Hiragana" })).toHaveClass("bg-genki-orange");
        expect(screen.getByRole("link", { name: "Katakana" })).not.toHaveClass("bg-genki-orange");
        expect(screen.getByRole("link", { name: "Katakana" })).toHaveAttribute("href", "/kana/katakana");
    });

    it("hides the romaji behind spoilers once Hide Romaji is checked, without hiding the kana", async () => {
        renderSheet("hiragana");
        expect(screen.getByText("あ").closest(".spoiler-hidden")).not.toBeInTheDocument();

        await userEvent.click(screen.getByRole("checkbox", { name: /hide romaji/i }));

        expect(screen.getByText("あ").closest(".spoiler-hidden")).not.toBeInTheDocument();
        expect(screen.getAllByText("a", { selector: "div" })[0].closest(".spoiler-hidden")).toBeInTheDocument();
    });
});
