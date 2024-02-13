import React from "react";
import { render, screen } from "@testing-library/react";
import Page from ".";

describe("Page", () => {
  it("renders", () => {
    render(<Page title="Home">test</Page>);

    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
