import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import DataGrid from ".";
import { DataGridColumnProps } from "./Types";
import { Button } from "@chakra-ui/react";

const mockedHandleClick = jest.fn();

const columns: Array<DataGridColumnProps> = [
  {
    id: "id",
    name: "Identificador",
  },
  {
    id: "name",
    name: "Nome",
  },
  {
    id: "internalId",
    name: "Internal Id",
    hide: true,
  },
  {
    id: "action",
    name: "",
    handleRender: () => {
      return <Button onClick={mockedHandleClick}>Click Me</Button>;
    },
  },
];

const data = [
  {
    id: "092813910832",
    name: "Adrian",
    internalId: "x98x9a898x89",
  },
];

describe("DataGrid", () => {
  it("renders", () => {
    render(<DataGrid columns={columns} data={data} keyColumn="id" />);

    expect(screen.getByText("Click Me")).toBeInTheDocument();
    expect(screen.getByText("Adrian")).toBeInTheDocument();
    expect(screen.getByText("092813910832")).toBeInTheDocument();
    expect(screen.queryAllByAltText("Internal Id")).toHaveLength(0);
    expect(screen.queryAllByAltText("x98x9a898x89")).toHaveLength(0);
  });
});
