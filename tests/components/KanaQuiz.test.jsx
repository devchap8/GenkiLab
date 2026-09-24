import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { renderWithRouter } from "../utils";
import KanaQuiz from "../../src/components/KanaQuiz";

const routes = [{ path: "/kanaQuiz/:kanaType/:quizType", element: <KanaQuiz /> }];

describe("KanaQuiz", () => {
    it("renders NotFound for an invalid kana type", () => {
        renderWithRouter(routes, { initialEntries: ["/kanaQuiz/bogus/write"] });
        expect(screen.getByText("Error 404")).toBeInTheDocument();
    });

    it("renders NotFound for an invalid quiz type", () => {
        renderWithRouter(routes, { initialEntries: ["/kanaQuiz/hiragana/bogus"] });
        expect(screen.getByText("Error 404")).toBeInTheDocument();
    });

    it("sets the document title to Not Found for invalid params", () => {
        renderWithRouter(routes, { initialEntries: ["/kanaQuiz/bogus/write"] });
        expect(document.title).toBe("Not Found | GenkiLab");
    });

    it("renders the quiz for the selected tables and sets the document title", () => {
        renderWithRouter(routes, { initialEntries: ["/kanaQuiz/hiragana/write?tables=gojuon"] });
        expect(screen.getByText("Hiragana Quiz")).toBeInTheDocument();
        expect(document.title).toBe("Hiragana Quiz | GenkiLab");
        // a gojuon kana is present
        expect(screen.getByLabelText("あ")).toBeInTheDocument();
        // a youon-only kana, which wasn't selected, is absent
        expect(screen.queryByLabelText("きゃ")).not.toBeInTheDocument();
    });

    it("shows a message and a way back when no tables are selected", () => {
        renderWithRouter(routes, { initialEntries: ["/kanaQuiz/hiragana/write"] });
        expect(screen.getByText("No tables selected.")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /back to table selection/i })).toHaveAttribute("href", "/kanaQuiz/hiragana");
    });

    it("shows the no-tables-selected message when the tables param has no matching keys", () => {
        renderWithRouter(routes, { initialEntries: ["/kanaQuiz/hiragana/write?tables=bogus"] });
        expect(screen.getByText("No tables selected.")).toBeInTheDocument();
    });
});
