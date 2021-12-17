import { makeStyles } from "@material-ui/core";
import { lightBlue, pink } from "@material-ui/core/colors";
const drawerWidth = 200;

const useStyles = makeStyles(
  (theme) => ({
    drawer: {
      width: drawerWidth,
      color: theme.palette.common.white,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerClose: {
      backgroundColor: "#000000",
      color: theme.palette.common.white,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    listItem: {},
    itemIcon: {
      color: theme.palette.common.white,
    },

    icon: {
      fontSize: "20px",
      color: theme.palette.common.white,
      marginLeft: "8px",
    },
  }),
  { index: 1 }
);

const useStylesTooltip = makeStyles(
  (theme) => ({
    arrow: {
      color: theme.palette.common.black,
    },
    tooltip: {
      backgroundColor: theme.palette.common.black,
      fontSize: "14px",
    },
  }),
  { index: 1 }
);

export { useStyles, useStylesTooltip };
