import React, { useMemo } from "react";
import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";

import DataGridRow from "../DataGridRow";
import { DataGridColumnProps, DataGridData } from "./Types";

type DataGridProps = {
  columns: Array<DataGridColumnProps>;
  keyColumn: string;
  data?: Array<DataGridData>;
  isLoading?: boolean;
};

const DataGrid = ({
  columns,
  data,
  keyColumn,
  isLoading = false,
}: DataGridProps) => {
  const displayColumns = useMemo(
    () => columns.filter((c) => !c.hide),
    [columns]
  );

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            {displayColumns.map((c) => (
              <Th key={c.name} isNumeric={c.isNumeric}>
                {c.name}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            <React.Fragment />
          ) : (
            data
              ?.filter((r) => !!r)
              .map((row) => {
                return (
                  <DataGridRow
                    key={String(row[keyColumn])}
                    columns={columns}
                    data={row}
                  />
                );
              })
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DataGrid;
