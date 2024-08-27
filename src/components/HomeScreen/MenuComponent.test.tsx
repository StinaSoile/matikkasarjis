import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MenuComponent from "./MenuComponent";
import { describe, test, expect } from "vitest";

describe("<MenuComponent />", () => {
  test("should render About author -button and show more -button", () => {
    // different screen sizes render different buttons,
    // but test does not recognize this
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const setOpenAbout = () => {};
    window.innerWidth = 1024; // Työpöytäkoko

    render(<MenuComponent setOpenAbout={setOpenAbout} />);

    const element = screen.getByRole("button", {
      name: "about-author-big",
    }).parentElement;
    const element3 = screen.getByRole("button", {
      name: "show more",
    }).parentElement;
    expect(element).toBeInTheDocument();
    expect(element3).toBeInTheDocument();
  });
});
