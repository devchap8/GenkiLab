import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { renderWithRouter } from "../utils";
import SidebarNav from "../../src/components/SidebarNav";

function renderNav(navShown, toggleNav = vi.fn()) {
    const routes = [{ path: "/", element: <SidebarNav navShown={navShown} toggleNav={toggleNav} /> }];
    return renderWithRouter(routes);
}

describe("SidebarNav", () => {
    it("is translated off-screen when navShown is false", () => {
        const { container } = renderNav(false);
        expect(container.querySelector("nav")).toHaveClass("-translate-x-full");
    });

    it("is translated on-screen when navShown is true", () => {
        const { container } = renderNav(true);
        expect(container.querySelector("nav")).toHaveClass("translate-x-0");
    });

    it("renders a collapsible section for every lesson, L0 through L23", () => {
        renderNav(true);
        expect(screen.getByText("Lesson 0")).toBeInTheDocument();
        expect(screen.getByText("Lesson 23")).toBeInTheDocument();
        expect(screen.getAllByText(/^Lesson \d+$/)).toHaveLength(24);
    });

    it("calls toggleNav when the logo or close button is clicked", async () => {
        const toggleNav = vi.fn();
        renderNav(true, toggleNav);

        await userEvent.click(screen.getByRole("link", { name: /genkilab logo/i }));
        expect(toggleNav).toHaveBeenCalledTimes(1);

        await userEvent.click(screen.getByRole("button", { name: /close navbar icon/i }));
        expect(toggleNav).toHaveBeenCalledTimes(2);
    });
});
