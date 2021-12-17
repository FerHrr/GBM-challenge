import { Button, Divider, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import TableComponent from "../../components/Table/indext";
import { UserContext } from "../../Context/userContext";
import { GridColDef } from "@mui/x-data-grid";
import { User } from "../../interfaces";
import { Rowss } from "./interfaces";
import ModalComponent from "../../components/Modal";
import { ModalInt } from "../../components/Modal/interface";
import ContainerComponent from "../../components/Container";
interface Props {
  userSelected: User | null;
  columns: GridColDef[];
  rows: Rowss[];
  openModal: boolean;
  handleCloseModal: () => void;
  handleReactiveAccount: () => void;
}
const ReactiveAccountsView: React.FC<Props> = ({
  userSelected,
  columns,
  rows,
  openModal,
  handleCloseModal,
  handleReactiveAccount,
}) => {
  const { user } = useContext(UserContext);
  const style: ModalInt = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    bgcolor: "background.paper",
    border: "0px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "20px",
    backgroundColor: "#FFFDFB",
  };
  return (
    <ContainerComponent title={"Reactivación de cuentas"}>
      <>
        <ModalComponent
          open={openModal}
          handleClose={handleCloseModal}
          customStyle={style}
        >
          <div>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item>
                <Typography variant="h5">
                  {String(`Activar cuenta`).toUpperCase()}
                </Typography>
              </Grid>
              <Grid
                item
                width={"100%"}
                style={{
                  margin: "2px 0px 20px 0px",
                }}
              >
                <Divider
                  variant="middle"
                  style={{
                    backgroundColor: "#00CE7A",
                    border: "none",
                    height: 3,
                    margin: 0,
                  }}
                />
              </Grid>
              <Grid
                item
                style={{
                  margin: "2px 0px 20px 0px",
                }}
              >
                <Typography>
                  ¿Estás seguro de volver activar la cuenta de{" "}
                  <strong>{userSelected?.displayName}</strong>?
                </Typography>
              </Grid>
              <Grid
                item
                style={{
                  margin: "2px 0px 20px 0px",
                }}
              >
                <Typography variant="body2">
                  <strong>Nota:</strong>{" "}
                  <i>
                    Al activar la cuenta se mandará un correo electronico para
                    que el usuario active su cuenta con una nueva contraseña.
                  </i>
                </Typography>
              </Grid>
              <Grid item container justifyContent="flex-end">
                <Grid item>
                  <Button variant="outlined" onClick={() => handleCloseModal()}>
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    style={{ marginLeft: "20px" }}
                    onClick={() => {
                      handleReactiveAccount();
                      handleCloseModal();
                    }}
                  >
                    Activa
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </ModalComponent>
        ReactiveAccountsView
        <TableComponent columns={columns} rows={rows} />
      </>
    </ContainerComponent>
  );
};

export default ReactiveAccountsView;
