import { makeStyles } from "@material-ui/core";
import { lightBlue, pink } from "@material-ui/core/colors";

const drawerWidth = 150;

const useStyles = makeStyles(
  (theme) => ({
    appBar2: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  }),
  { index: 1 }
);

export { useStyles };
