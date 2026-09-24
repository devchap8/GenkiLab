import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import KanaWriteInQuiz from "../../src/components/KanaWriteInQuiz";

// A small, deterministic fixture: two kana, one with an alternate reading,
// plus a null gap cell (as real kana tables have for missing combinations).
const tables = [
    {
        key: "t1",
        rows: [
            { label: "", cells: [["あ", "a"], null, ["い", "i", ["yi"]]] },
        ],
    },
];

async function gradeWith(answers) {
    render(<KanaWriteInQuiz tables={tables} />);
    for (const [kana, answer] of Object.entries(answers)) {
        await userEvent.type(screen.getByLabelText(kana), answer);
    }
    await userEvent.click(screen.getByRole("button", { name: /grade/i }));
}

describe("KanaWriteInQuiz", () => {
    it("renders one input per non-null flattened kana cell", () => {
        render(<KanaWriteInQuiz tables={tables} />);
        expect(screen.getAllByRole("textbox")).toHaveLength(2);
    });

    it("shows a perfect score when every answer is correct", async () => {
        await gradeWith({ "あ": "a", "い": "i" });
        expect(screen.getByText("2 / 2 correct")).toBeInTheDocument();
    });

    it("accepts an alternate reading", async () => {
        await gradeWith({ "あ": "a", "い": "yi" });
        expect(screen.getByText("2 / 2 correct")).toBeInTheDocument();
    });

    it("marks wrong or blank answers incorrect and shows the correct romaji", async () => {
        await gradeWith({ "あ": "wrong" });
        expect(screen.getByText("0 / 2 correct")).toBeInTheDocument();
        expect(screen.getByText("a")).toBeInTheDocument();
        expect(screen.getByText("i")).toBeInTheDocument();
    });

    it("accepts answers regardless of case or surrounding whitespace", async () => {
        await gradeWith({ "あ": " A ", "い": " I " });
        expect(screen.getByText("2 / 2 correct")).toBeInTheDocument();
    });

    it("disables inputs once submitted", async () => {
        await gradeWith({ "あ": "a", "い": "i" });
        expect(screen.getByLabelText("あ")).toBeDisabled();
        expect(screen.getByLabelText("い")).toBeDisabled();
    });

    it("resets to a fresh, empty quiz on Try Again", async () => {
        await gradeWith({ "あ": "a", "い": "i" });
        expect(screen.getByText("2 / 2 correct")).toBeInTheDocument();

        await userEvent.click(screen.getByRole("button", { name: /try again/i }));

        expect(screen.queryByText("2 / 2 correct")).not.toBeInTheDocument();
        expect(screen.getByLabelText("あ")).toBeEnabled();
        expect(screen.getByLabelText("あ")).toHaveValue("");
        expect(screen.getByLabelText("い")).toHaveValue("");
        expect(screen.getByRole("button", { name: /grade/i })).toBeInTheDocument();
    });

    it("prevents the Enter key from submitting the form early", () => {
        render(<KanaWriteInQuiz tables={tables} />);
        const input = screen.getByLabelText("あ");
        const notPrevented = fireEvent.keyDown(input, { key: "Enter" });
        expect(notPrevented).toBe(false);
        expect(screen.queryByText(/\d+ \/ \d+ correct/)).not.toBeInTheDocument();
        expect(input).toBeEnabled();
    });
});
