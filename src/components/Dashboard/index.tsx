import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuAppBar from "../AppBar";
import MainDrawer from "../Drawer";
import { UserContext } from "../../Context/userContext";

interface Props {}

const Dashboard: React.FC<Props> = ({ children }) => {
  const { user } = useContext(UserContext);

  return (
    <Box sx={{ display: "flex" }}>
      {user.logged && <MainDrawer />}
      <MenuAppBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Dashboard;
