import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import KanaTable from "../../src/components/KanaTable";

const table = {
    columns: ["a", "i"],
    rows: [
        { label: "", cells: [["あ", "a"], null] },
        { label: "k", cells: [["か", "ka"], ["き", "ki"]] },
    ],
    footnote: "A note about this table.",
};

describe("KanaTable", () => {
    it("renders column headers, row labels, and cells", () => {
        render(<KanaTable table={table} romajiHidden={false} />);
        expect(screen.getByText("a", { selector: "th" })).toBeInTheDocument();
        expect(screen.getByText("i", { selector: "th" })).toBeInTheDocument();
        expect(screen.getByText("k")).toBeInTheDocument();
        expect(screen.getByText("あ")).toBeInTheDocument();
        expect(screen.getByText("か")).toBeInTheDocument();
        expect(screen.getByText("き")).toBeInTheDocument();
    });

    it("renders the footnote when present", () => {
        render(<KanaTable table={table} romajiHidden={false} />);
        expect(screen.getByText("A note about this table.")).toBeInTheDocument();
    });

    it("omits the footnote paragraph when there is none", () => {
        render(<KanaTable table={{ ...table, footnote: undefined }} romajiHidden={false} />);
        expect(screen.queryByText("A note about this table.")).not.toBeInTheDocument();
    });

    it("hides column headers and row labels behind spoilers when romajiHidden is true", () => {
        render(<KanaTable table={table} romajiHidden={true} />);
        expect(screen.getByText("a", { selector: "th div" }).closest(".spoiler-hidden")).toBeInTheDocument();
        expect(screen.getByText("k").closest(".spoiler-hidden")).toBeInTheDocument();
        // the kana itself is never hidden by romajiHidden
        expect(screen.getByText("あ").closest(".spoiler-hidden")).not.toBeInTheDocument();
    });

    it("does not wrap an empty row label in a spoiler even when romajiHidden is true", () => {
        const { container } = render(<KanaTable table={table} romajiHidden={true} />);
        const firstRowLabelCell = container.querySelectorAll("tbody tr")[0].querySelector("td");
        expect(firstRowLabelCell.querySelector(".spoiler-hidden")).not.toBeInTheDocument();
    });
});
