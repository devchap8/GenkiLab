import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import KanaCell from "../../src/components/KanaCell";

describe("KanaCell", () => {
    it("renders an empty cell for a gap (null) entry", () => {
        const { container } = render(
            <table><tbody><tr><KanaCell cell={null} romajiHidden={false} /></tr></tbody></table>
        );
        expect(container.querySelector("td")).toBeEmptyDOMElement();
    });

    it("shows the kana and romaji plainly by default", () => {
        render(<table><tbody><tr><KanaCell cell={["あ", "a"]} romajiHidden={false} /></tr></tbody></table>);
        expect(screen.getByText("あ")).toBeInTheDocument();
        expect(screen.getByText("a")).toBeInTheDocument();
    });

    it("wraps the romaji in a spoiler when romajiHidden is true, without hiding the kana", () => {
        render(<table><tbody><tr><KanaCell cell={["あ", "a"]} romajiHidden={true} /></tr></tbody></table>);
        expect(screen.getByText("あ").closest(".spoiler-hidden")).not.toBeInTheDocument();
        expect(screen.getByText("a").closest(".spoiler-hidden")).toBeInTheDocument();
    });
});
