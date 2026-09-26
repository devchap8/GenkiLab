import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { renderWithRouter } from "../utils";
import VocabQuiz from "../../src/components/VocabQuiz";

vi.mock("../../src/data/dataIndex", () => ({
    default: {
        vocab: {
            L5: [
                { id: "L5-1", kanji: "大学", reading: "だいがく", def: "college", subsect: "Test" },
                { id: "L5-2", kanji: "先生", reading: "せんせい", def: "teacher", subsect: "Test" },
            ],
        },
        subsects: { L5: ["Test"] },
    },
}));

const routes = [{ path: "/vocabQuiz/:chapter/:subsect/:quizType", element: <VocabQuiz /> }];

function renderQuiz(entry) {
    return renderWithRouter(routes, { initialEntries: [entry] });
}

describe("VocabQuiz", () => {
    it("renders NotFound for an invalid chapter", () => {
        renderQuiz("/vocabQuiz/bogus/Test/kana");
        expect(screen.getByText("Error 404")).toBeInTheDocument();
    });

    it("renders NotFound for a subsect that doesn't exist on that chapter", () => {
        renderQuiz("/vocabQuiz/L5/Bogus/kana");
        expect(screen.getByText("Error 404")).toBeInTheDocument();
    });

    it("renders NotFound for an invalid quiz type", () => {
        renderQuiz("/vocabQuiz/L5/Test/bogus");
        expect(screen.getByText("Error 404")).toBeInTheDocument();
    });

    it("accepts a subsect of All even though it isn't in that chapter's subsect list", () => {
        renderQuiz("/vocabQuiz/L5/All/kana");
        expect(screen.queryByText("Error 404")).not.toBeInTheDocument();
    });

    it("sets the document title from the chapter and subsect", () => {
        renderQuiz("/vocabQuiz/L5/Test/kana");
        expect(document.title).toBe("L5 Vocab Quiz: Test | GenkiLab");
    });

    it("shows the Kana Write-In explanation and mounts the write-in quiz for quizType=kana", () => {
        renderQuiz("/vocabQuiz/L5/Test/kana");
        expect(screen.getByText("Kana Write-In")).toBeInTheDocument();
        expect(screen.getByLabelText("だいがく")).toBeInTheDocument();
    });

    it("shows the Kanji Write-In explanation and mounts the write-in quiz for quizType=kanji", () => {
        renderQuiz("/vocabQuiz/L5/Test/kanji");
        expect(screen.getByText("Kanji Write-In")).toBeInTheDocument();
        expect(screen.getByLabelText("大学")).toBeInTheDocument();
    });

    it("shows the Match explanation and mounts the match quiz for quizType=match", () => {
        renderQuiz("/vocabQuiz/L5/Test/match");
        expect(screen.getByText("Match Definition to Reading")).toBeInTheDocument();
        expect(screen.getByText("college")).toBeInTheDocument();
        expect(screen.getByText("teacher")).toBeInTheDocument();
    });

    it("shows the Match Definition nav link for a specific subsect", () => {
        renderQuiz("/vocabQuiz/L5/Test/kana");
        expect(screen.getByRole("link", { name: "Match Definition" })).toBeInTheDocument();
    });

    it("hides the Match Definition nav link when subsect is All", () => {
        renderQuiz("/vocabQuiz/L5/All/kana");
        expect(screen.queryByRole("link", { name: "Match Definition" })).not.toBeInTheDocument();
    });

    it("links to the other quiz types for the same chapter and subsect", () => {
        renderQuiz("/vocabQuiz/L5/Test/kana");
        expect(screen.getByRole("link", { name: "Match Definition" })).toHaveAttribute("href", "/vocabQuiz/L5/Test/match");
        expect(screen.getByRole("link", { name: "Write Kanji" })).toHaveAttribute("href", "/vocabQuiz/L5/Test/kanji");
        expect(screen.getByRole("link", { name: "Write Kana" })).toHaveAttribute("href", "/vocabQuiz/L5/Test/kana");
    });
});
