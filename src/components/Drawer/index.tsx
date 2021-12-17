import React, { useContext, useEffect, useState } from "react";
import { useStyles } from "./style";
import { useNavigate, useLocation } from "react-router-dom";

import { BarChart, HomeOutlined } from "@material-ui/icons";
import DesktopDrawer from "./DesktopDrawer";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";

import { DrawerItem } from "../../interfaces/ui";
import { UserContext } from "../../Context/userContext";

interface Props {}

const MainDrawer: React.FC<Props> = ({}) => {
  const classes = useStyles();
  const url = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  //eslint-disable-next-line
  const [selected, setSelected] = useState("");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setDrawerOpen(false);
    } else {
      setDrawerOpen(true);
    }
  }, [user]);

  useEffect(() => {
    const { pathname } = url;
    try {
      if (pathname.includes("Home")) {
        setSelected("/Home");
      } else if (pathname.includes("Analytics")) {
        setSelected("/Analytics");
      } else if (pathname.includes("ReactiveAccess")) {
        setSelected("/ReactiveAccess");
      } else if (pathname.includes("RoleAccess")) {
        setSelected("/RoleAccess");
      } else if (pathname.includes("Profile")) {
        setSelected("/Profile");
      }
    } catch (err) {}
  }, [url]);

  const menuData: DrawerItem[] = [
    {
      title: "Home",
      path: "/Home",
      icon: <HomeOutlined className={classes.icon} />,
      key: 1,
      hidden: true,
    },
    {
      title: "Analytics",
      path: "/Analytics",
      icon: <BarChart className={classes.icon} />,
      key: 2,
      hidden:
        user.rol === "Owner" ||
        user.rol === "Administrator" ||
        user.rol === "User"
          ? true
          : false,
    },
    {
      title: "Reactivación de cuentas",
      path: "/ReactiveAccess",
      icon: <NoAccountsIcon className={classes.icon} />,
      key: 3,
      hidden:
        user.rol === "Owner" || user.rol === "Administrator" ? true : false,
    },
    {
      title: "Control de Roles",
      path: "/RoleAccess",
      icon: <ManageAccountsIcon className={classes.icon} />,
      key: 4,
      hidden: user.rol === "Owner" ? true : false,
    },
  ];

  const handleSelectRoute = (item: DrawerItem) => {
    setSelected(item.path);
    navigate(item.path);
  };

  return (
    <>
      <DesktopDrawer
        drawerOpen={drawerOpen}
        menuData={menuData}
        selected={selected}
        handleSelectRoute={handleSelectRoute}
        isLanding={false}
      />
    </>
  );
};

export default MainDrawer;
