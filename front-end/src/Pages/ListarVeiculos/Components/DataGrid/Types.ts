import { ReactNode } from "react";

type DataGridColumnProps = {
  id: string;
  name: string;
  isNumeric?: boolean;
  hide?: boolean;
  onClick?: (data: DataGridData) => void;
  handleRender?: (data: DataGridData) => ReactNode;
};

type DataGridData = Record<string, string | number | ReactNode | undefined>;

export type { DataGridColumnProps, DataGridData };
