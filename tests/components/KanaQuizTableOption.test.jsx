import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import KanaQuizTableOption from "../../src/components/KanaQuizTableOption";

const table = {
    key: "test",
    name: "Test Table",
    examples: [["あ", "a"], ["い", "i"]],
};

describe("KanaQuizTableOption", () => {
    it("renders the table name and example kana/romaji pairs", () => {
        render(<KanaQuizTableOption table={table} checked={false} onToggle={() => {}} />);
        expect(screen.getByText("Test Table")).toBeInTheDocument();
        expect(screen.getByText("あ")).toBeInTheDocument();
        expect(screen.getByText("a")).toBeInTheDocument();
        expect(screen.getByText("い")).toBeInTheDocument();
        expect(screen.getByText("i")).toBeInTheDocument();
    });

    it("reflects a checked prop of true", () => {
        render(<KanaQuizTableOption table={table} checked={true} onToggle={() => {}} />);
        expect(screen.getByRole("checkbox")).toBeChecked();
    });

    it("reflects a checked prop of false", () => {
        render(<KanaQuizTableOption table={table} checked={false} onToggle={() => {}} />);
        expect(screen.getByRole("checkbox")).not.toBeChecked();
    });

    it("calls onToggle when the checkbox is clicked", async () => {
        const onToggle = vi.fn();
        render(<KanaQuizTableOption table={table} checked={false} onToggle={onToggle} />);
        await userEvent.click(screen.getByRole("checkbox"));
        expect(onToggle).toHaveBeenCalledTimes(1);
    });

    it("calls onToggle when clicking the label text, not just the checkbox", async () => {
        const onToggle = vi.fn();
        render(<KanaQuizTableOption table={table} checked={false} onToggle={onToggle} />);
        await userEvent.click(screen.getByText("Test Table"));
        expect(onToggle).toHaveBeenCalledTimes(1);
    });
});
