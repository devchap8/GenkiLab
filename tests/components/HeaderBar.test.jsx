import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { renderWithRouter } from "../utils";
import HeaderBar from "../../src/components/HeaderBar";

const routes = [{ path: "/", element: <HeaderBar /> }];

describe("HeaderBar", () => {
    it("links the logo to the homepage", () => {
        renderWithRouter(routes);
        expect(screen.getByText("GenkiLab", { selector: "span" }).closest("a")).toHaveAttribute("href", "/");
    });

    it("keeps the sidebar nav hidden until the nav icon is clicked", async () => {
        const { container } = renderWithRouter(routes);
        expect(container.querySelector("nav")).toHaveClass("-translate-x-full");

        await userEvent.click(screen.getByRole("button", { name: /navigation icon/i }));
        expect(container.querySelector("nav")).toHaveClass("translate-x-0");
    });

    it("closes the sidebar nav when its own close button is clicked", async () => {
        const { container } = renderWithRouter(routes);
        await userEvent.click(screen.getByRole("button", { name: /navigation icon/i }));
        await userEvent.click(screen.getByRole("button", { name: /close navbar icon/i }));

        expect(container.querySelector("nav")).toHaveClass("-translate-x-full");
    });
});
