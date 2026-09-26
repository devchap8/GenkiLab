import { screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { renderWithRouter } from "../utils";
import VocabMatchQuiz from "../../src/components/VocabMatchQuiz";

vi.mock("../../src/data/dataIndex", () => ({
    default: {
        vocab: {
            L1: [
                { id: "L1-1", kanji: "一", reading: "いち", def: "one", subsect: "Test" },
                { id: "L1-2", kanji: "二", reading: "に", def: "very-long-definition", subsect: "Test" },
                { id: "L1-3", reading: "さん", def: "three", subsect: "Test" },
            ],
            L2: [
                { id: "L2-1", kanji: "橋", reading: "はし", def: "bridge", subsect: "Dup" },
                { id: "L2-2", kanji: "箸", reading: "はし", def: "chopsticks", subsect: "Dup" },
            ],
        },
    },
}));

const routes = [{ path: "/:chapter/:subsect", element: <VocabMatchQuiz /> }];

function renderQuiz(entry = "/L1/Test") {
    return renderWithRouter(routes, { initialEntries: [entry] });
}

async function place(container, defText, reading) {
    await userEvent.click(screen.getByText(defText));
    await userEvent.click(container.querySelector(`[data-reading="${reading}"]`));
}

describe("VocabMatchQuiz", () => {
    it("renders one slot per vocab word (labeled by kanji, or reading when there is no kanji) and one word-bank item per definition", () => {
        const { container } = renderQuiz();
        expect(screen.getByText("一")).toBeInTheDocument();
        expect(screen.getByText("二")).toBeInTheDocument();
        expect(screen.getByText("さん")).toBeInTheDocument();
        expect(screen.getByText("one")).toBeInTheDocument();
        expect(screen.getByText("very-long-definition")).toBeInTheDocument();
        expect(screen.getByText("three")).toBeInTheDocument();
        expect(container.querySelectorAll("[data-droppable]")).toHaveLength(3);
    });

    it("moves a word-bank item into an empty slot once selected and the slot is clicked", async () => {
        const { container } = renderQuiz();
        await place(container, "one", "いち");

        const slot = container.querySelector('[data-reading="いち"]');
        expect(slot).toContainElement(screen.getByText("one"));
    });

    it("swaps two already-placed words when one is selected and then the other is clicked", async () => {
        const { container } = renderQuiz();
        await place(container, "one", "いち");
        await place(container, "very-long-definition", "に");

        await userEvent.click(screen.getByText("one"));
        await userEvent.click(screen.getByText("very-long-definition"));

        expect(container.querySelector('[data-reading="いち"]')).toContainElement(screen.getByText("very-long-definition"));
        expect(container.querySelector('[data-reading="に"]')).toContainElement(screen.getByText("one"));
    });

    it("deselects a word-bank item when it is clicked a second time", async () => {
        const { container } = renderQuiz();
        await userEvent.click(screen.getByText("one"));
        await userEvent.click(screen.getByText("one"));

        // with nothing selected, clicking an empty slot should not place anything
        await userEvent.click(container.querySelector('[data-reading="いち"]'));
        expect(container.querySelector('[data-reading="いち"]')).not.toContainElement(screen.getByText("one"));
    });

    it("marks a correct match and an incorrect/unmatched one with distinct outlines once graded", async () => {
        const { container } = renderQuiz();
        await place(container, "one", "いち");
        // "very-long-definition" and "three" are left unplaced in the word bank

        await userEvent.click(screen.getByRole("button", { name: /submit answers/i }));

        const correctItem = container.querySelector('[data-reading="いち"] > div');
        expect(correctItem).toHaveTextContent("one");
        expect(correctItem.className).toMatch(/outline-lime-400/);

        const unmatchedItem = screen.getByText("very-long-definition", { exact: false }).closest("[id]");
        expect(unmatchedItem.className).toMatch(/outline-red-500/);
    });

    it("toggles the reading hint next to the kanji label via Show Reading, without affecting reading-only rows", async () => {
        renderQuiz();
        expect(screen.queryByText("いち")).not.toBeInTheDocument();

        await userEvent.click(screen.getByRole("button", { name: /show reading/i }));
        expect(screen.getByText("いち")).toBeInTheDocument();
        // "three" has no kanji, so its label already *is* the reading — no duplicate should appear
        expect(screen.getAllByText("さん")).toHaveLength(1);

        await userEvent.click(screen.getByRole("button", { name: /hide reading/i }));
        expect(screen.queryByText("いち")).not.toBeInTheDocument();
    });

    it("fully resets placements and grading state on Start Over", async () => {
        const { container } = renderQuiz();
        await place(container, "one", "いち");
        await userEvent.click(screen.getByRole("button", { name: /submit answers/i }));

        await userEvent.click(screen.getByRole("button", { name: /start over/i }));

        expect(container.querySelector('[data-reading="いち"]')).not.toContainElement(screen.getByText("one"));
        expect(screen.getByRole("button", { name: /submit answers/i })).toBeInTheDocument();
        expect(screen.queryByText(/^いち$/)).not.toBeInTheDocument();
    });

    it("keeps duplicate-reading words independently matchable by disambiguating their reading internally", async () => {
        const { container } = renderQuiz("/L2/Dup");
        expect(container.querySelectorAll("[data-droppable]")).toHaveLength(2);

        await userEvent.click(screen.getByText("bridge"));
        const slots = container.querySelectorAll("[data-droppable]");
        await userEvent.click(slots[0]);

        // only the slot actually clicked should have received the word
        const filledSlots = [...slots].filter(slot => slot.textContent.includes("bridge"));
        expect(filledSlots).toHaveLength(1);
        expect(screen.getByText("chopsticks")).toBeInTheDocument();
    });

    it("caps the column width to a smaller character count on narrow screens", () => {
        const originalWidth = window.innerWidth;
        const { container } = renderQuiz();
        try {
            expect(container.querySelector('[style*="20ch"]')).toBeTruthy();

            window.innerWidth = 300;
            fireEvent(window, new Event("resize"));

            expect(container.querySelector('[style*="12ch"]')).toBeTruthy();
        } finally {
            window.innerWidth = originalWidth;
        }
    });
});
