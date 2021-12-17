import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {
  Avatar,
  Button,
  CssBaseline,
  Divider,
  Grid,
  Tooltip,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { AppBarProps, ModalLoginSignup } from "./interface";
import ModalComponent from "../Modal";
import LoginComponent from "../Login-Signup/login";
import SignupComponent from "../Login-Signup/signup";
import { UserContext } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/Firebase";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

const MenuAppBar = () => {
  const { user } = useContext(UserContext);
  const [auth, setAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerWidth, setDrawerWidth] = useState<number>(0);
  const settings = ["Perfil", "Salir"];
  const [openMondal, setOpenMondal] = useState<ModalLoginSignup>({
    login: false,
    signup: false,
  });
  const navigate = useNavigate();

  const customStyleModal = {
    position: "absolute" as "absolute",
    top: "42%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "20px",
    // height: "100%",
  };

  useEffect(() => {
    if (user.logged) {
      setAuth(true);
      setDrawerWidth(60);
    } else {
      setDrawerWidth(0);
    }
  }, [user]);

  useEffect(() => {
    console.log(`openMondal:`, openMondal);
  }, [openMondal]);

  const handleCloseModal = () => {
    openMondal.login
      ? setOpenMondal({ ...openMondal, login: false })
      : openMondal.signup && setOpenMondal({ ...openMondal, signup: false });
  };

  const handleLogin = () => {
    setOpenMondal({ ...openMondal, login: true });
  };

  const handleSignup = () => {
    setOpenMondal({ ...openMondal, signup: true });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickMenu = (title: string) => {
    if (title === "Salir") {
      logout();
      navigate("/");
    } else {
      navigate(title);
      setAnchorEl(null);
    }
  };

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open }) => ({
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }));

  const stringToColor = (string: string) => {
    let hash = 0;
    let i;
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */
    return color;
  };

  const stringAvatar = (name: string) => {
    let nm =
      name.split(" ").length > 1
        ? `${name.split(" ")[0][0]} ${name.split(" ")[1][0]}`
        : name.split(" ")[0][0];
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: nm,
    };
  };
  return (
    <>
      <Box>
        <CssBaseline />
        <AppBar
          open={true}
          style={{
            padding: "0px 0px 20px 0px",
          }}
        >
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              style={{ marginTop: auth ? "20px" : "0px" }}
            >
              <Grid item xs={6}>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                  style={{ padding: auth ? "0px 0px 0px 15px" : "0px" }}
                >
                  GBM - Índice de Precios y Cotizaciones
                </Typography>
              </Grid>
              <Grid
                xs={6}
                item
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                {auth && user.displayName && (
                  <Grid
                    item
                    style={{ padding: auth ? "0px 0px 0px 15px" : "0px" }}
                  >
                    <Typography style={{ marginRight: "0px" }}>
                      Hola {user.displayName}!
                    </Typography>
                  </Grid>
                )}
                <Grid
                  item
                  style={{ padding: auth ? "0px 0px 0px 15px" : "0px" }}
                >
                  <Box>
                    {auth && user.displayName ? (
                      <>
                        <Tooltip title="Open settings">
                          <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                            <Avatar {...stringAvatar(`${user.displayName}`)} />
                          </IconButton>
                        </Tooltip>
                        <Menu
                          sx={{ mt: "45px" }}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          {settings.map((setting) => (
                            <div>
                              {setting === `Salir` && <Divider />}
                              <MenuItem
                                key={setting}
                                onClick={() => handleClickMenu(setting)}
                              >
                                <Typography
                                  textAlign="center"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    margin: "5px 10px 5px 0px",
                                  }}
                                >
                                  {setting === "Salir" ? (
                                    <LogoutIcon
                                      style={{
                                        margin: "5px 10px 5px 0px",
                                      }}
                                    />
                                  ) : (
                                    <AccountCircleIcon
                                      style={{
                                        margin: "5px 10px 5px 0px",
                                      }}
                                    />
                                  )}
                                  {setting}
                                </Typography>
                              </MenuItem>
                            </div>
                          ))}
                        </Menu>
                      </>
                    ) : (
                      <Grid
                        container
                        spacing={3}
                        style={{ margin: "0px 0px 0px 0px" }}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Grid item>
                          <Button
                            size="small"
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleLogin()}
                          >
                            INICIAR SESIÓN
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            size="small"
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleSignup()}
                          >
                            REGISTRARSE
                          </Button>
                        </Grid>
                      </Grid>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
      <ModalComponent
        open={openMondal.signup || openMondal.login ? true : false}
        handleClose={handleCloseModal}
        customStyle={customStyleModal}
      >
        {openMondal.login ? (
          <LoginComponent handleCloseModal={handleCloseModal} />
        ) : (
          openMondal.signup && (
            <SignupComponent handleCloseModal={handleCloseModal} />
          )
        )}
      </ModalComponent>
    </>
  );
};
export default MenuAppBar;
