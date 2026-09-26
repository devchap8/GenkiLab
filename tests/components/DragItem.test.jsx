import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import DragItem from "../../src/components/DragItem";

const word = { id: "w1", reading: "あ", kanji: "亜", def: "asia" };

describe("DragItem", () => {
    it("renders nothing when there is no word", () => {
        const { container } = render(<DragItem v={null} />);
        expect(container).toBeEmptyDOMElement();
    });

    it("is draggable and clickable when unmatched (matched === null)", async () => {
        const onSelect = vi.fn();
        render(<DragItem v={word} matched={null} onSelect={onSelect} isSelected={false} />);

        const item = screen.getByText("asia");
        expect(item).toHaveAttribute("draggable", "true");
        // reading/kanji hint only appears once a match verdict exists
        expect(screen.queryByText("亜")).not.toBeInTheDocument();

        await userEvent.click(item);
        expect(onSelect).toHaveBeenCalledWith(word);
    });

    it("stops the click from propagating to an ancestor handler", async () => {
        const outerClick = vi.fn();
        render(
            <div onClick={outerClick}>
                <DragItem v={word} matched={null} onSelect={vi.fn()} isSelected={false} />
            </div>
        );

        await userEvent.click(screen.getByText("asia"));
        expect(outerClick).not.toHaveBeenCalled();
    });

    it("is not draggable or clickable once a match verdict is set, and reveals the kanji", async () => {
        const onSelect = vi.fn();
        render(<DragItem v={word} matched={true} onSelect={onSelect} isSelected={false} />);

        const item = screen.getByText("asia");
        expect(item).toHaveAttribute("draggable", "false");
        expect(screen.getByText("亜")).toBeInTheDocument();

        await userEvent.click(item);
        expect(onSelect).not.toHaveBeenCalled();
    });

    it("shows a distinct outline for a correct vs. incorrect match", () => {
        const { rerender, container } = render(<DragItem v={word} matched={true} onSelect={vi.fn()} isSelected={false} />);
        expect(container.firstChild.className).toMatch(/outline-lime-400/);

        rerender(<DragItem v={word} matched={false} onSelect={vi.fn()} isSelected={false} />);
        expect(container.firstChild.className).toMatch(/outline-red-500/);
    });

    it("highlights the item when selected and unmatched", () => {
        const { container } = render(<DragItem v={word} matched={null} onSelect={vi.fn()} isSelected={true} />);
        expect(container.firstChild.className).toMatch(/outline-genki-orange/);
    });
});
