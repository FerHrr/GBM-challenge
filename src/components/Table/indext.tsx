import React from "react";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef, GridApi, GridCellValue } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import { Rowss } from "../../pages/ReactiveAccounts/interfaces";

interface Props {
  columns: GridColDef[];
  rows: Rowss[];
}

const TableComponent: React.FC<Props> = ({ columns, rows }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log(`columns:`, columns);
  console.log(`rows:`, rows);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
    </Paper>
  );
};

export default TableComponent;
