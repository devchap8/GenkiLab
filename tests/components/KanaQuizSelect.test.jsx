import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { renderWithRouter } from "../utils";
import KanaQuizSelect from "../../src/components/KanaQuizSelect";

const routes = [{ path: "/kanaQuiz/:kanaType", element: <KanaQuizSelect /> }];

describe("KanaQuizSelect", () => {
    it("renders NotFound for an invalid kana type", () => {
        renderWithRouter(routes, { initialEntries: ["/kanaQuiz/bogus"] });
        expect(screen.getByText("Error 404")).toBeInTheDocument();
    });

    it("pre-checks every table and links to a quiz including them all", () => {
        renderWithRouter(routes, { initialEntries: ["/kanaQuiz/hiragana"] });

        expect(screen.getByText("Gojuon (Basic Sounds)")).toBeInTheDocument();
        expect(screen.getByText("Dakuten (Voiced Sounds)")).toBeInTheDocument();
        expect(screen.getByText("Youon (Combo Sounds)")).toBeInTheDocument();

        for (const checkbox of screen.getAllByRole("checkbox")) {
            expect(checkbox).toBeChecked();
        }

        expect(screen.getByRole("link", { name: /start quiz/i })).toHaveAttribute(
            "href",
            "/kanaQuiz/hiragana/write?tables=gojuon,dakuten,youon"
        );
    });

    it("shows a disabled button instead of a start link when no tables are selected", async () => {
        renderWithRouter(routes, { initialEntries: ["/kanaQuiz/hiragana"] });

        for (const checkbox of screen.getAllByRole("checkbox")) {
            await userEvent.click(checkbox);
        }

        expect(screen.queryByRole("link", { name: /start quiz/i })).not.toBeInTheDocument();
        expect(screen.getByRole("button", { name: /select at least one table/i })).toBeDisabled();
    });

    it("updates the start-quiz link when a table is toggled off", async () => {
        renderWithRouter(routes, { initialEntries: ["/kanaQuiz/hiragana"] });

        await userEvent.click(screen.getByRole("checkbox", { name: /dakuten/i }));

        expect(screen.getByRole("link", { name: /start quiz/i })).toHaveAttribute(
            "href",
            "/kanaQuiz/hiragana/write?tables=gojuon,youon"
        );
    });

    it("resets the selection to all tables when navigating to a different kana sheet", async () => {
        renderWithRouter(routes, { initialEntries: ["/kanaQuiz/hiragana"] });

        // deselect one hiragana table before switching sheets
        await userEvent.click(screen.getByRole("checkbox", { name: /dakuten/i }));
        expect(screen.getByRole("link", { name: /start quiz/i })).toHaveAttribute(
            "href",
            "/kanaQuiz/hiragana/write?tables=gojuon,youon"
        );

        await userEvent.click(screen.getByRole("link", { name: /^katakana$/i }));

        expect(screen.getByText("Extended (Loanword Sounds)")).toBeInTheDocument();
        for (const checkbox of screen.getAllByRole("checkbox")) {
            expect(checkbox).toBeChecked();
        }
        expect(screen.getByRole("link", { name: /start quiz/i })).toHaveAttribute(
            "href",
            "/kanaQuiz/katakana/write?tables=gojuon,dakuten,youon,extended"
        );
    });
});
