import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import SpoilerText from "../../src/components/SpoilerText";

function renderSpoiler() {
    render(<SpoilerText><span>secret</span></SpoilerText>);
    return screen.getByText("secret").parentElement;
}

describe("SpoilerText", () => {
    it("starts hidden", () => {
        const wrapper = renderSpoiler();
        expect(wrapper).toHaveClass("spoiler-hidden");
    });

    it("peeks on hover and re-hides on mouse out", () => {
        const wrapper = renderSpoiler();

        fireEvent.mouseOver(wrapper);
        expect(wrapper).toHaveClass("spoiler-not-hidden");

        fireEvent.mouseOut(wrapper);
        expect(wrapper).toHaveClass("spoiler-hidden");
    });

    it("reveals permanently on click, ignoring further hover", async () => {
        const wrapper = renderSpoiler();

        await userEvent.click(wrapper);
        expect(wrapper).toHaveClass("spoiler-not-hidden");

        fireEvent.mouseOut(wrapper);
        expect(wrapper).toHaveClass("spoiler-not-hidden");
    });

    it("re-hides on a second click, restoring hover-to-peek", async () => {
        const wrapper = renderSpoiler();

        await userEvent.click(wrapper);
        await userEvent.click(wrapper);
        expect(wrapper).toHaveClass("spoiler-hidden");

        fireEvent.mouseOver(wrapper);
        expect(wrapper).toHaveClass("spoiler-not-hidden");
    });
});
