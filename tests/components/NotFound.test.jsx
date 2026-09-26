import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { renderWithRouter } from "../utils";
import NotFound from "../../src/components/NotFound";

describe("NotFound", () => {
    it("shows a 404 message with a link back home", () => {
        renderWithRouter([{ path: "/", element: <NotFound /> }]);
        expect(screen.getByText("Error 404")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /return home/i })).toHaveAttribute("href", "/");
    });
});
