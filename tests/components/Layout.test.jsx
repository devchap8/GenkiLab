import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { renderWithRouter } from "../utils";
import Layout from "../../src/components/Layout";

const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [{ index: true, element: <div>Page Content</div> }],
    },
];

describe("Layout", () => {
    it("renders the header bar and the routed page content", () => {
        renderWithRouter(routes);
        expect(screen.getByRole("button", { name: /navigation icon/i })).toBeInTheDocument();
        expect(screen.getByText("Page Content")).toBeInTheDocument();
    });
});
