import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import CadastrarVeiculos from ".";

const mockedMutate = jest.fn(() => {});

jest.mock("axios");
jest.mock("react-query", () => ({
  ...jest.requireActual("react-query"),
  useMutation() {
    return {
      mutate: mockedMutate,
    };
  },
}));

describe("ListarVeiculos", () => {
  it("insert data correctly", async () => {
    render(<CadastrarVeiculos />);

    fireEvent.change(screen.getByPlaceholderText("Chassi"), {
      target: { value: "088237182371" },
    });
    fireEvent.change(screen.getByPlaceholderText("Placa"), {
      target: { value: "ETR8127" },
    });
    fireEvent.change(screen.getByTestId("tipo-veiculo"), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByPlaceholderText("Cor"), {
      target: { value: "Roxo" },
    });
    fireEvent.change(screen.getByPlaceholderText("Longitude"), {
      target: { value: "12" },
    });
    fireEvent.change(screen.getByPlaceholderText("Latitude"), {
      target: { value: "-21" },
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Confirmar"));
    });

    expect(mockedMutate.mock.calls[0]).toEqual([
      {
        chassi: "088237182371",
        cor: "Roxo",
        placa: "ETR8127",
        tipoVeiculo: 1,
        coordenada: {
          latitude: -21,
          longitude: 12,
        },
      },
    ]);
  });
});
