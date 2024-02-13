import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Drawer from ".";

const mockedOnClose = jest.fn();
const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
  useLocation: () => jest.fn(),
}));

describe("Drawer", () => {
  it("renders drawer", () => {
    render(<Drawer isOpen={true} onClose={mockedOnClose} />);

    expect(screen.getByAltText("Inlog Logo")).toBeInTheDocument();
    expect(screen.getByText("Início")).toBeInTheDocument();
    expect(screen.getByText("Cadastro de Veículos")).toBeInTheDocument();
  });

  it("closes drawer", () => {
    render(<Drawer isOpen={true} onClose={mockedOnClose} />);

    fireEvent.click(screen.getByLabelText("Close"));
    expect(mockedOnClose).toBeCalled();
  });

  it("navigates", () => {
    render(<Drawer isOpen={true} onClose={mockedOnClose} />);

    fireEvent.click(screen.getByText("Início"));
    expect(mockedNavigate.mock.calls[0]).toEqual(["/"]);

    fireEvent.click(screen.getByText("Cadastro de Veículos"));
    expect(mockedNavigate.mock.calls[1]).toEqual(["/cadastrar"]);
  });
});
