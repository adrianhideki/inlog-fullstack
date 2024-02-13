import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import NavigateButton from ".";
import { List } from "@chakra-ui/react";

const mockedOnClick = jest.fn();
const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
  useLocation: () => jest.fn(),
}));

describe("NavigateButton", () => {
  it("renders", () => {
    render(
      <List>
        <NavigateButton path="/" onClick={mockedOnClick}>
          Teste
        </NavigateButton>
      </List>
    );

    expect(screen.getByText("Teste")).toBeInTheDocument();
  });

  it("navigates on click", () => {
    render(
      <List>
        <NavigateButton path="/" onClick={mockedOnClick}>
          Teste
        </NavigateButton>
      </List>
    );

    fireEvent.click(screen.getByText("Teste"));    
    expect(mockedNavigate).toBeCalled();
  });
});
