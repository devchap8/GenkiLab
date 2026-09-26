import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { renderWithRouter } from "../utils";
import ChapterIndex from "../../src/components/ChapterIndex";

vi.mock("../../src/data/dataIndex", () => ({
    default: {
        lessonNames: { L1: "Test Lesson" },
        inThisLesson: { L1: ["Learn things", "Learn other things"] },
        subsects: { L1: ["Group A", "Group B"] },
    },
}));

function renderIndex(extras) {
    const routesWithIndex = [{ path: "/", element: <ChapterIndex lessonNum={1} extras={extras} /> }];
    return renderWithRouter(routesWithIndex);
}

describe("ChapterIndex", () => {
    it("shows only the lesson heading while collapsed", () => {
        renderIndex();
        expect(screen.getByText("L1: Test Lesson")).toBeInTheDocument();
        expect(screen.queryByText("Learn things")).not.toBeInTheDocument();
    });

    it("expands to show lesson objectives and vocab links when clicked", async () => {
        renderIndex();
        await userEvent.click(screen.getByRole("button", { name: /L1: Test Lesson/ }));

        expect(screen.getByText("Learn things")).toBeInTheDocument();
        expect(screen.getByText("Learn other things")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Vocab List" })).toHaveAttribute("href", "/vocab/L1");
        expect(screen.getByRole("link", { name: "All Vocab" })).toHaveAttribute("href", "/vocabQuiz/L1/All/kana");
        expect(screen.getByRole("link", { name: "Group A" })).toHaveAttribute("href", "/vocabQuiz/L1/Group A/match");
        expect(screen.getByRole("link", { name: "Group B" })).toHaveAttribute("href", "/vocabQuiz/L1/Group B/match");
    });

    it("collapses again on a second click", async () => {
        renderIndex();
        const button = screen.getByRole("button", { name: /L1: Test Lesson/ });
        await userEvent.click(button);
        await userEvent.click(button);

        expect(screen.queryByText("Learn things")).not.toBeInTheDocument();
    });

    it("renders extra nav sections from the extras prop when expanded", async () => {
        renderIndex({ "Kana Sheets": [{ text: "Hiragana", link: "/kana/hiragana" }] });
        await userEvent.click(screen.getByRole("button", { name: /L1: Test Lesson/ }));

        expect(screen.getByText("Kana Sheets")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Hiragana" })).toHaveAttribute("href", "/kana/hiragana");
    });

    it("omits extra nav sections when no extras are given", async () => {
        renderIndex(undefined);
        await userEvent.click(screen.getByRole("button", { name: /L1: Test Lesson/ }));

        expect(screen.queryByText("Kana Sheets")).not.toBeInTheDocument();
    });
});
