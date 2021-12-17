import React, { useState, useEffect } from "react";
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
import { MessagesError } from "./interface";
import useStyles from "./style";
import { doSignUp } from "./service";
interface Props {
  handleCloseModal: () => void;
}
const SignupComponent: React.FC<Props> = ({ handleCloseModal }) => {
  const EMAIL_REGEX: RegExp =
    /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);
  const [mail, setMail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [messageError, setMessageError] = useState<MessagesError>({
    message: "",
    display: false,
  });

  useEffect(() => {
    mail !== ""
      ? !EMAIL_REGEX.test(mail)
        ? setMessageError({ message: "El correo es incorrecto", display: true })
        : setMessageError({ message: "", display: false })
      : mail === "" && setMessageError({ message: "", display: false });
  }, [mail]);

  useEffect(() => {
    if (
      messageError.display &&
      messageError.message.includes(
        "Se ha enviado un correo electrónico de verificación, verifique su correo electrónico"
      )
    ) {
      setTimeout(() => {
        setMessageError({ message: "", display: false });
        handleCloseModal();
      }, 3000);
    }
  }, [messageError]);

  const signup = async () => {
    let res = await doSignUp(mail, pass);
    console.log(`res signup:`, res);
    if (res.message === "Password should be at least 6 characters") {
      setMessageError({
        message: "La contraseña debe contener mas de 6 caracteres",
        display: true,
      });
    } else if (
      res.message ===
      "Se ha enviado un correo electrónico de verificación, verifique su correo electrónico"
    ) {
      setMessageError({
        message:
          "Se ha enviado un correo electrónico de verificación, verifique su correo electrónico",
        display: true,
      });
    }
  };

  const classes = useStyles();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseDownPasswordConfirm = (
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
        messageError.message.includes(
          "Se ha enviado un correo electrónico de verificación, verifique su correo electrónico"
        ) && (
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
          Registrarse
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
        {(messageError.display &&
          messageError.message.includes("Usuario o contraseña incorrecto")) ||
          (messageError.message.includes("El correo es incorrecto") && (
            <Typography variant="body2" className={classes.messageErrorEmail}>
              {messageError.message}
            </Typography>
          ))}
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
      <Grid item style={{ marginBottom: "20px" }}>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Confirmar Contraseña
          </InputLabel>
          <OutlinedInput
            className={classes.textField}
            id="outlined-adornment-password"
            type={showPasswordConfirm ? "text" : "password"}
            label="Confirmar Contraseña"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordConfirm}
                  onMouseDown={handleMouseDownPasswordConfirm}
                  edge="end"
                >
                  {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>

      {(messageError.display &&
        messageError.message.includes("Usuario o contraseña incorrecto")) ||
        (messageError.message.includes(
          "La contraseña debe contener mas de 6 caracteres"
        ) && (
          <Grid item className={classes.messageErrorLogin}>
            <Typography variant="body2" className={classes.messageErrorEmail}>
              {messageError.message}
            </Typography>
          </Grid>
        ))}

      <Grid
        item
        container
        justifyContent="space-between"
        // className={classes.containerButtons}
      >
        <Grid item style={{ width: "100%" }}>
          <Button
            variant="contained"
            className={classes.btnIniciar}
            onClick={() => signup()}
            disabled={
              pass !== "" &&
              confirmPass !== "" &&
              pass === confirmPass &&
              messageError.message !== "El correo es incorrecto" &&
              mail !== ""
                ? false
                : true
            }
          >
            Enviar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignupComponent;
