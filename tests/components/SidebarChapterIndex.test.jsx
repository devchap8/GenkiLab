import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { renderWithRouter } from "../utils";
import SidebarChapterIndex from "../../src/components/SidebarChapterIndex";

vi.mock("../../src/data/dataIndex", () => ({
    default: {
        subsects: { L1: ["Group A"] },
    },
}));

function renderIndex(closeNav = vi.fn(), extras) {
    const routes = [{ path: "/", element: <SidebarChapterIndex lessonNum={1} extras={extras} closeNav={closeNav} /> }];
    return renderWithRouter(routes);
}

describe("SidebarChapterIndex", () => {
    it("shows only the lesson label while collapsed", () => {
        renderIndex();
        expect(screen.getByText("Lesson 1")).toBeInTheDocument();
        expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });

    it("expands to show vocab links when clicked", async () => {
        renderIndex();
        await userEvent.click(screen.getByRole("button", { name: /Lesson 1/ }));

        expect(screen.getByRole("link", { name: "Vocab List" })).toHaveAttribute("href", "/vocab/L1");
        expect(screen.getByRole("link", { name: "All Vocab" })).toHaveAttribute("href", "/vocabQuiz/L1/All/kana");
        expect(screen.getByRole("link", { name: "Group A" })).toHaveAttribute("href", "/vocabQuiz/L1/Group A/match");
    });

    it("calls closeNav when a subsect vocab quiz link is clicked", async () => {
        const closeNav = vi.fn();
        renderIndex(closeNav);
        await userEvent.click(screen.getByRole("button", { name: /Lesson 1/ }));

        await userEvent.click(screen.getByRole("link", { name: "Group A" }));
        expect(closeNav).toHaveBeenCalled();
    });

    it("calls closeNav when the All Vocab link is clicked", async () => {
        const closeNav = vi.fn();
        renderIndex(closeNav);
        await userEvent.click(screen.getByRole("button", { name: /Lesson 1/ }));

        await userEvent.click(screen.getByRole("link", { name: "All Vocab" }));
        expect(closeNav).toHaveBeenCalled();
    });

    it("renders extra nav links from the extras prop, closing the nav when one is clicked", async () => {
        const closeNav = vi.fn();
        renderIndex(closeNav, { "Kana Sheets": [{ text: "Hiragana", link: "/kana/hiragana" }] });
        await userEvent.click(screen.getByRole("button", { name: /Lesson 1/ }));

        await userEvent.click(screen.getByRole("link", { name: "Hiragana" }));
        expect(closeNav).toHaveBeenCalled();
    });
});
