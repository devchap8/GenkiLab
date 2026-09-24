import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import KanaQuizCell from "../../src/components/KanaQuizCell";

describe("KanaQuizCell", () => {
    it("renders the kana character and an accessibly-labeled input", () => {
        render(<KanaQuizCell kana="あ" romaji="a" name="k0" submitted={false} isCorrect={false} />);
        expect(screen.getAllByText("あ").length).toBeGreaterThan(0);
        const input = screen.getByLabelText("あ");
        expect(input).toHaveAttribute("name", "k0");
        expect(input).toHaveAttribute("id", "k0");
    });

    it("enables the input before submitting", () => {
        render(<KanaQuizCell kana="あ" romaji="a" name="k0" submitted={false} isCorrect={false} />);
        expect(screen.getByLabelText("あ")).toBeEnabled();
    });

    it("disables the input once submitted", () => {
        render(<KanaQuizCell kana="あ" romaji="a" name="k0" submitted={true} isCorrect={true} />);
        expect(screen.getByLabelText("あ")).toBeDisabled();
    });

    it("does not show a romaji hint before submitting", () => {
        render(<KanaQuizCell kana="あ" romaji="a" name="k0" submitted={false} isCorrect={false} />);
        expect(screen.queryByText("a")).not.toBeInTheDocument();
    });

    it("does not show a romaji hint when the answer was correct", () => {
        render(<KanaQuizCell kana="あ" romaji="a" name="k0" submitted={true} isCorrect={true} />);
        expect(screen.queryByText("a")).not.toBeInTheDocument();
    });

    it("shows the romaji hint when the answer was incorrect", () => {
        render(<KanaQuizCell kana="あ" romaji="a" name="k0" submitted={true} isCorrect={false} />);
        expect(screen.getByText("a")).toBeInTheDocument();
    });
});
