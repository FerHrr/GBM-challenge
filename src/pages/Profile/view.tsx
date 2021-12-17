import { Alert, Grid, InputBase, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import React from "react";
import ContainerComponent from "../../components/Container";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import MailIcon from "@mui/icons-material/Mail";
interface Props {
  userName: string;
  showMessage: boolean;
  MENSAJE_CONFIRMAR_ENTER: string;
  email: string;
  rol: string;
  handleUpdateName: () => void;
  handleTypingNewName: (val: string) => void;
}
const Profileview: React.FC<Props> = ({
  userName,
  showMessage,
  MENSAJE_CONFIRMAR_ENTER,
  email,
  rol,
  handleUpdateName,
  handleTypingNewName,
}) => {
  return (
    <ContainerComponent title={"Perfil"}>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item style={{ marginBottom: "20px" }}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item style={{ marginRight: "10px" }}>
              <Avatar sx={{ bgcolor: "gray" }} variant="rounded">
                <PersonIcon />
              </Avatar>
            </Grid>
            <Grid item>
              <InputBase
                style={{
                  fontSize: "30px",
                }}
                sx={{ ml: 1, flex: 1 }}
                value={userName}
                onChange={(e) => handleTypingNewName(e.target.value)}
                inputProps={{ "aria-label": "search google maps" }}
                onKeyPress={(e) => {
                  if (e.key == "Enter") {
                    handleUpdateName();
                  }
                }}
              />
            </Grid>
          </Grid>
          <Grid item>
            {!showMessage && (
              <Alert style={{ marginTop: "5px" }} severity="warning">
                {MENSAJE_CONFIRMAR_ENTER}
              </Alert>
            )}
          </Grid>
        </Grid>
        <Grid item>
          <Typography
            style={{
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <AssignmentIndIcon style={{ fontSize: "30px" }} />
            <Typography
              style={{
                marginLeft: "10px",
              }}
            >
              {rol}
            </Typography>
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            style={{
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <MailIcon style={{ fontSize: "30px" }} />
            <Typography
              style={{
                marginLeft: "10px",
              }}
            >
              {email}
            </Typography>
          </Typography>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </ContainerComponent>
  );
};

export default Profileview;
