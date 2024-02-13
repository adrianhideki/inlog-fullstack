import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Header from ".";

const mockedToggleColorMode = jest.fn();

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useColorMode() {
    return {
      colorMode: "light",
      toggleColorMode: mockedToggleColorMode,
    };
  },
}));

describe("Header", () => {
  it("renders header", () => {
    render(<Header />);

    expect(screen.getByAltText("Inlog Logo")).toBeInTheDocument();
    expect(screen.getByLabelText("Trocar tema")).toBeInTheDocument();
    expect(screen.getByLabelText("Menu")).toBeInTheDocument();
  });

  it("change color mode", () => {
    render(<Header />);

    fireEvent.click(screen.getByLabelText("Trocar tema"));
    expect(mockedToggleColorMode).toBeCalled();
  });
});
