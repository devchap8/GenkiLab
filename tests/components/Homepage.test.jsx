import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { renderWithRouter } from "../utils";
import Homepage from "../../src/components/Homepage";

const routes = [{ path: "/", element: <Homepage /> }];

describe("Homepage", () => {
    it("sets the document title to Home", () => {
        renderWithRouter(routes);
        expect(document.title).toBe("Home | GenkiLab");
    });

    it("renders a chapter index for every lesson, L0 through L23", () => {
        renderWithRouter(routes);
        expect(screen.getByRole("button", { name: /^L0:/ })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /^L23:/ })).toBeInTheDocument();
        expect(screen.getAllByRole("button", { name: /^L\d+:/ })).toHaveLength(24);
    });
});
