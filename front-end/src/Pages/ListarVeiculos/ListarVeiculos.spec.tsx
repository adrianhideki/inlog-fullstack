import React from "react";
import { act, render, screen } from "@testing-library/react";
import { Marker, Map, initialize, mockInstances } from "@googlemaps/jest-mocks";
import ListarVeiculos from ".";

const mockedData = [
  {
    chassi: "123123123123123",
    tipoVeiculo: 1,
    cor: "Preto",
    placa: "ABC1234",
    coordenada: { latitude: 10.24, longitude: 15.25 },
    id: "5c3df43c-49ce-4082-a5ac-5b3b529d81a0",
  },
  {
    chassi: "323123123123123",
    tipoVeiculo: 1,
    cor: "Prata",
    placa: "EDC1234",
    coordenada: { latitude: 26.28702, longitude: -80.69293 },
    id: "cfdb36e6-b357-4b8b-9380-c32a120d00be",
  },
  {
    chassi: "90129039120390129302",
    tipoVeiculo: 1,
    cor: "Azul",
    placa: "ATR5432",
    coordenada: { latitude: -17.844926137755532, longitude: -51.15234375 },
    id: "1fb90da3-c665-4ebf-aca3-92cd024cb90f",
  },
];

const mockedGeolocation = {
  getCurrentPosition: jest.fn((success, _error, _options) => {
    success({
      coords: {
        latitude: 26.28702,
        longitude: -80.69293,
        accuracy: 0,
      },
    });
  }),
  watchPosition: jest.fn(),
};

jest.mock("axios");
jest.mock("react-query", () => ({
  ...jest.requireActual("react-query"),
  useQuery() {
    return {
      data: { data: mockedData },
      isLoading: false,
    };
  },
}));

Object.defineProperty(global.navigator, "geolocation", {
  writable: true,
  value: mockedGeolocation,
});

beforeEach(async () => {
  await initialize();
});

describe("ListarVeiculos", () => {
  it("renders", async () => {
    await act(async () => {
      await render(<ListarVeiculos />);
    });

    const mapMocks = mockInstances.get(Map);
    const markerMocks = mockInstances.get(Marker);

    mockedData.forEach((row) => {
      expect(screen.getByText(row.chassi)).toBeInTheDocument();
      expect(screen.getByText(row.placa)).toBeInTheDocument();
      expect(screen.getByText(row.cor)).toBeInTheDocument();
    });

    expect(mapMocks).toHaveLength(1);
    expect(markerMocks).toHaveLength(mockedData.length + 1);
  });
});
