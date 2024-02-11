import { Td, Tr } from "@chakra-ui/react";
import { DataGridColumnProps, DataGridData } from "../DataGrid/Types";
import { useCallback } from "react";

type DataGridRowProps = {
  columns: Array<DataGridColumnProps>;
  data: DataGridData;
};

const DataGridRow = ({ columns, data }: DataGridRowProps) => {
  const renderComponent = useCallback(
    (row: DataGridData, column: DataGridColumnProps) => {
      if (!!column.handleRender) {
        return column.handleRender(row);
      }

      return <>{String(row[column.id])}</>;
    },
    []
  );

  return (
    <Tr>
      {columns.map((c) => (
        <Td key={c.id}>{renderComponent(data, c)}</Td>
      ))}
    </Tr>
  );
};

export default DataGridRow;
