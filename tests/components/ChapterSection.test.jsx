import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ChapterSection from "../../src/components/ChapterSection";

describe("ChapterSection", () => {
    it("renders its title and children when given children", () => {
        render(<ChapterSection title="Vocab" navType="main"><span>a link</span></ChapterSection>);
        expect(screen.getByText("Vocab")).toBeInTheDocument();
        expect(screen.getByText("a link")).toBeInTheDocument();
    });

    it("renders nothing when there are no children", () => {
        const { container } = render(<ChapterSection title="Vocab" navType="main">{null}</ChapterSection>);
        expect(container).toBeEmptyDOMElement();
    });

    it("renders nothing when every child is falsy", () => {
        const { container } = render(<ChapterSection title="Vocab" navType="main">{[null, false, undefined]}</ChapterSection>);
        expect(container).toBeEmptyDOMElement();
    });
});
