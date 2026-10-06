import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { renderWithRouter } from "../utils";
import VocabWriteInQuiz from "../../src/components/VocabWriteInQuiz";

vi.mock("../../src/data/dataIndex", () => ({
    default: {
        vocab: {
            L5: [
                { id: "L5-1", kanji: "大学", reading: "だいがく", def: "college", subsect: "Test" },
                { id: "L5-2", kanji: "先生", reading: "せんせい", def: "teacher", subsect: "Test", alt: "先せい" },
                { id: "L5-3", reading: "わたし", def: "I; me", subsect: "Test" },
                { id: "L5-4", kanji: "本", reading: "ほん", def: "book", subsect: "Other" },
            ],
        },
    },
}));

const routes = [{ path: "/:chapter/:subsect/:quizType", element: <VocabWriteInQuiz /> }];

function renderQuiz(quizType, subsect = "Test") {
    return renderWithRouter(routes, { initialEntries: [`/L5/${subsect}/${quizType}`] });
}

async function typeAndSubmit(entries) {
    for (const [label, value] of Object.entries(entries)) {
        await userEvent.type(screen.getByLabelText(label), value);
    }
    await userEvent.click(screen.getByRole("button", { name: /submit answers/i }));
}

describe("VocabWriteInQuiz", () => {
    it("renders one row per word for a kana quiz, including a Kanji column", () => {
        renderQuiz("kana");
        expect(screen.getAllByRole("textbox")).toHaveLength(3);
        expect(screen.getByRole("columnheader", { name: "Kanji" })).toBeInTheDocument();
        expect(screen.getByText("大学")).toBeInTheDocument();
        expect(screen.getByText("college")).toBeInTheDocument();
    });

    it("hides words without kanji entirely for a kanji quiz, and drops the Kanji column", () => {
        renderQuiz("kanji");
        expect(screen.getAllByRole("textbox")).toHaveLength(2);
        expect(screen.queryByText("I; me")).not.toBeInTheDocument();
        expect(screen.queryByRole("columnheader", { name: "Kanji" })).not.toBeInTheDocument();
    });

    it("includes vocab from every subsection when the subsect param is All", () => {
        renderQuiz("kana", "All");
        expect(screen.getByText("college")).toBeInTheDocument();
        expect(screen.getByText("teacher")).toBeInTheDocument();
        expect(screen.getByText("I; me")).toBeInTheDocument();
        expect(screen.getByText("book")).toBeInTheDocument();
    });

    it("grades kana answers, accepting whitespace-trimmed correct readings and flagging wrong ones", async () => {
        renderQuiz("kana");
        await typeAndSubmit({ "だいがく": "だいがく", "せんせい": "wrong", "わたし": " わたし " });

        expect(screen.getAllByText("✓")).toHaveLength(2);
        expect(screen.getByText("✗ せんせい")).toBeInTheDocument();
    });

    it("grades kanji answers, accepting an alternate kanji spelling", async () => {
        renderQuiz("kanji");
        await typeAndSubmit({ "大学": "wrong-kanji", "先生": "先せい" });

        expect(screen.getAllByText("✓")).toHaveLength(1);
        expect(screen.getByText("✗ 大学")).toBeInTheDocument();
    });

    it("shows the reading on both wrong and correct rows after submitting a kanji quiz", async () => {
        renderQuiz("kanji");
        expect(screen.queryByText("だいがく")).not.toBeInTheDocument();
        await typeAndSubmit({ "大学": "wrong-kanji", "先生": "先生" });

        expect(screen.getByText("だいがく")).toBeInTheDocument();
        expect(screen.getByText("せんせい")).toBeInTheDocument();
    });

    it("does not add a separate reading after submitting a kana quiz", async () => {
        renderQuiz("kana");
        await typeAndSubmit({ "だいがく": "だいがく" });

        // only the input's label, no extra reading next to the checkmark
        expect(screen.getAllByText("だいがく")).toHaveLength(1);
    });

    it("re-enables but does not clear inputs on Try Again", async () => {
        renderQuiz("kana");
        await typeAndSubmit({ "だいがく": "だいがく" });
        expect(screen.getByLabelText("だいがく")).toBeDisabled();

        await userEvent.click(screen.getByRole("button", { name: /try again/i }));

        expect(screen.getByLabelText("だいがく")).toBeEnabled();
        expect(screen.getByLabelText("だいがく")).toHaveValue("だいがく");
    });

    it("prevents the Enter key from submitting the form early", async () => {
        renderQuiz("kana");
        const input = screen.getByLabelText("だいがく");
        await userEvent.type(input, "だいがく{Enter}");

        expect(screen.getByRole("button", { name: /submit answers/i })).toBeInTheDocument();
        expect(input).toBeEnabled();
    });
});
