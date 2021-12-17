import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
  Alert,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { MessagesError } from "./interface";
import { blockedUser, login } from "./service";
import useStyles from "./style";
import { UserContext } from "../../Context/userContext";
interface Props {
  handleCloseModal: () => void;
}
const LoginComponent: React.FC<Props> = ({ handleCloseModal }) => {
  const EMAIL_REGEX: RegExp =
    /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [mail, setMail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [isUserBlocked, setIsUserBlocked] = useState<boolean>(false);
  const [opportunities, setOpportunities] = useState<number>(0);
  const [messageError, setMessageError] = useState<MessagesError>({
    message: "",
    display: false,
  });
  const { user } = useContext(UserContext);

  useEffect(() => {
    mail !== ""
      ? !EMAIL_REGEX.test(mail)
        ? setMessageError({ message: "El correo es incorrecto", display: true })
        : setMessageError({ message: "", display: false })
      : mail === "" && setMessageError({ message: "", display: false });
  }, [mail]);

  useEffect(() => {
    setOpportunities(0);
    setIsUserBlocked(false);
  }, [mail]);

  useEffect(() => {
    console.log(`opportunities:`, opportunities);

    if (opportunities === 3) {
      setMessageError({
        message:
          "Tu cuenta ha sido bloqueada, espera a que un Administrador la active nuevamente.",
        display: true,
      });
      blockedUser(mail);
    }
  }, [opportunities]);

  useEffect(() => {
    if (isUserBlocked) {
      setMessageError({
        message:
          "Tu cuenta se encuentra bloqueada, espera a que un Administrador la active nuevamente.",
        display: true,
      });
    }
  }, [isUserBlocked]);

  useEffect(() => {
    console.log(`messageError:`, messageError);
  }, [messageError]);

  const handleLogin = async () => {
    let res: MessagesError = (await login(
      mail,
      pass,
      opportunities
    )) as MessagesError;
    if (res.message === "") {
    } else {
      setMessageError({
        message: res.message,
        display: res.display,
      });
    }

    res?.count && setOpportunities(res?.count);
  };

  const classes = useStyles();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      className={classes.container}
    >
      {messageError.display &&
        messageError.message !== "" &&
        messageError.message !== "El correo es incorrecto" && (
          <Alert variant="filled" severity="info">
            {messageError.message}
          </Alert>
        )}

      <Grid item style={{ marginBottom: "20px" }}>
        <Typography
          variant="h4"
          component={"h1"}
          className={classes.tituloSesion}
        >
          Iniciar Sesión
        </Typography>
      </Grid>
      <Grid item style={{ marginBottom: "20px" }}>
        <TextField
          id="outlined-size-small"
          label="Correo electronico"
          className={classes.textField}
          value={mail}
          onChange={(e) => {
            setMail(e.target.value);
          }}
        />
        {messageError.display &&
          messageError.message === "El correo es incorrecto" && (
            <Typography variant="body2" className={classes.messageErrorEmail}>
              {messageError.message}
            </Typography>
          )}
      </Grid>
      <Grid item style={{ marginBottom: "20px" }}>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Contraseña
          </InputLabel>
          <OutlinedInput
            className={classes.textField}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            label="Contraseña"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>

      <Grid item container justifyContent="space-between">
        <Grid item style={{ width: "100%" }}>
          {isUserBlocked ? (
            <>
              {messageError.message !==
                "Tu cuenta se encuentra bloqueada, espera a que un Administrador la active nuevamente." && (
                <Grid item className={classes.messageErrorLogin}>
                  <Typography
                    variant="body2"
                    className={classes.messageErrorEmail}
                    style={{ marginBottom: "10px" }}
                  >
                    {messageError.message}
                  </Typography>
                </Grid>
              )}
              <Button
                variant="contained"
                className={classes.btnIniciar}
                onClick={() => handleCloseModal()}
                disabled={mail !== "" && pass !== "" ? false : true}
              >
                Cerrar
              </Button>
            </>
          ) : (
            !isUserBlocked && (
              <Button
                variant="contained"
                className={classes.btnIniciar}
                onClick={() => handleLogin()}
                disabled={mail !== "" && pass !== "" ? false : true}
              >
                Iniciar
              </Button>
            )
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoginComponent;
