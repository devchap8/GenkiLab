import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { renderWithRouter } from "../utils";
import ChapterNavLink from "../../src/components/ChapterNavLink";

function renderLink(props) {
    const routes = [{ path: "/", element: <ul><ChapterNavLink {...props} /></ul> }];
    return renderWithRouter(routes);
}

describe("ChapterNavLink", () => {
    it("renders a link with the given text and destination", () => {
        renderLink({ text: "Vocab List", link: "/vocab/L1", type: "main" });
        expect(screen.getByRole("link", { name: "Vocab List" })).toHaveAttribute("href", "/vocab/L1");
    });

    it("calls onNavigate when clicked", async () => {
        const onNavigate = vi.fn();
        renderLink({ text: "Vocab List", link: "/vocab/L1", type: "sidebar", onNavigate });
        await userEvent.click(screen.getByRole("link", { name: "Vocab List" }));
        expect(onNavigate).toHaveBeenCalled();
    });

    it("uses a smaller text size for sidebar links than main links", () => {
        renderLink({ text: "Vocab List", link: "/vocab/L1", type: "sidebar" });
        expect(screen.getByRole("link", { name: "Vocab List" }).className).toMatch(/text-sm/);
    });
});
