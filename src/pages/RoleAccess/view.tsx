import React from "react";
import { Rowss } from "../ReactiveAccounts/interfaces";
import { GridColDef } from "@mui/x-data-grid";
import TableComponent from "../../components/Table/indext";
import { Button } from "@mui/material";
import ContainerComponent from "../../components/Container";
interface Props {
  rows: Rowss[];
  columns: GridColDef[];
  existDiference: boolean;
  handleSaveChanges: () => void;
}
const AccountAccessView: React.FC<Props> = ({
  rows,
  columns,
  existDiference,
  handleSaveChanges,
}) => {
  return (
    <ContainerComponent title={"Control de Roles"}>
      <TableComponent columns={columns} rows={rows} />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
        }}
      >
        {existDiference && (
          <>
            <Button
              onClick={() => handleSaveChanges()}
              style={{
                backgroundColor: "#00CE7A",
              }}
              variant="contained"
            >
              Guardar
            </Button>
          </>
        )}
      </div>
    </ContainerComponent>
  );
};

export default AccountAccessView;
