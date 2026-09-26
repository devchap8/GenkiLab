import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { renderWithRouter } from "../utils";
import VocabList from "../../src/components/VocabList";

vi.mock("../../src/data/dataIndex", () => ({
    default: {
        vocab: {
            L2: [
                { id: "L2-1", reading: "みず", kanji: "水", def: "water", sect: "Drinks" },
                { id: "L2-2", reading: "おちゃ", kanji: "お茶", def: "tea", sect: "Drinks" },
                { id: "L2-3", reading: "ほん", kanji: "本", def: "book", sect: "Objects" },
            ],
        },
    },
}));

const routes = [{ path: "/vocab/:chapter", element: <VocabList /> }];

function renderList(entry = "/vocab/L2") {
    return renderWithRouter(routes, { initialEntries: [entry] });
}

describe("VocabList", () => {
    it("renders NotFound for an invalid chapter", () => {
        renderList("/vocab/bogus");
        expect(screen.getByText("Error 404")).toBeInTheDocument();
    });

    it("sets the document title from the chapter", () => {
        renderList();
        expect(document.title).toBe("L2 Vocab List | GenkiLab");
    });

    it("shows the chapter heading and groups vocab by section", () => {
        renderList();
        expect(screen.getByText("第2課 Vocab List")).toBeInTheDocument();
        expect(screen.getByText("Drinks")).toBeInTheDocument();
        expect(screen.getByText("Objects")).toBeInTheDocument();
        expect(screen.getByText("water")).toBeInTheDocument();
        expect(screen.getByText("tea")).toBeInTheDocument();
        expect(screen.getByText("book")).toBeInTheDocument();
    });

    it("shows readings as jisho.org links until Hide Readings is checked", async () => {
        renderList();
        expect(screen.getByRole("link", { name: "みず" })).toBeInTheDocument();

        await userEvent.click(screen.getByRole("checkbox", { name: /hide readings/i }));

        expect(screen.queryByRole("link", { name: "みず" })).not.toBeInTheDocument();
        expect(screen.getByText("みず").closest(".spoiler-hidden")).toBeInTheDocument();
    });

    it("shows definitions plainly until Hide Definitions is checked", async () => {
        renderList();
        expect(screen.getByText("water").closest(".spoiler-hidden")).not.toBeInTheDocument();

        await userEvent.click(screen.getByRole("checkbox", { name: /hide definitions/i }));

        expect(screen.getByText("water").closest(".spoiler-hidden")).toBeInTheDocument();
    });
});
