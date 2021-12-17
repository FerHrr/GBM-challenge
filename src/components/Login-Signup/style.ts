import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    margin: "40px 0px 40px 0px",
  },
  tituloSesion: {
    color: "#888888",
    fontWeight: "400",
  },
  textField: {
    [`& fieldset`]: {
      borderRadius: 15,
    },
  },
  containerButtons: {
    display: "flex",
    justifyContent: "space-between",
  },
  btnIniciar: {
    backgroundColor: theme.palette.common.black,
    color: "white",
    borderRadius: "12px",
    width: "100%",
    "&:hover": {
      backgroundColor: theme.palette.getContrastText(
        theme.palette.common.black
      ),
    },
  },
  messageErrorEmail: {
    color: "#EB2A2A",
    margin: "3px 0px 0px 7px",
  },
  messageErrorLogin: {
    color: "#EB2A2A",
    margin: "3px 0px 110px 7px",
  },
}));

export default useStyles;
