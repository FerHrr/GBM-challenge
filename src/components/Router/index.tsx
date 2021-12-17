import { Divider, Grid } from "@mui/material";
import { createBrowserHistory } from "history";
import React, { useContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../../pages/Home";
import AnalyticsPage from "../../pages/Analytics";
import ProfilePage from "../../pages/Profile";
import RoleAccessPage from "../../pages/RoleAccess";
import ReactiveAccountsPage from "../../pages/ReactiveAccounts";
import Dashboard from "../Dashboard";
import useStyles from "./style";
import withAuth from "../../Context/withAuth";
import { UserContext } from "../../Context/userContext";

const RouterComponent: React.FC = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const pageNotFoundComponent = () => <h1>Page not found</h1>;

  return (
    <BrowserRouter>
      <Dashboard>
        <div className={classes.body}>
          <Routes>
            <Route path="/Home" element={<HomePage />} />
            <Route
              path="/Analytics"
              element={
                (user.logged && user.rol === "User") ||
                user.rol === "Administrator" ||
                user.rol === "Owner" ? (
                  <AnalyticsPage />
                ) : (
                  <HomePage />
                )
              }
            />
            <Route
              path="/ReactiveAccess"
              element={
                (user.logged && user.rol === "Administrator") ||
                user.rol === "Owner" ? (
                  <ReactiveAccountsPage />
                ) : (
                  <HomePage />
                )
              }
            />
            <Route
              path="/RoleAccess"
              element={
                user.logged && user.rol === "Owner" ? (
                  <RoleAccessPage />
                ) : (
                  <HomePage />
                )
              }
            />
            <Route
              path="/Perfil"
              element={user.logged ? <ProfilePage /> : <HomePage />}
            />

            <Route path="/" element={<HomePage />}></Route>
            <Route path="*" element={pageNotFoundComponent()}></Route>
          </Routes>
        </div>
        <Divider variant="middle" />
        <Grid container className={classes.footer}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              item
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <a href="https://plus.gbm.com/">
                <img
                  className={classes.footerImg}
                  src={"/GBMLogo.png"}
                  alt="GBM_logo"
                  width={"250px"}
                  height={"60px"}
                />
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Dashboard>
    </BrowserRouter>
  );
};

export default withAuth(RouterComponent);
