import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Logo from ".";

describe("Logo", () => {
  it("renders", () => {
    render(<Logo />);

    expect(screen.getByAltText("Inlog Logo")).toBeInTheDocument();
  });
});
