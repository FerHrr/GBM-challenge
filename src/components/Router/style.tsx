import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles(
  (theme) => ({
    body: {
      minHeight: "calc(100vh-200px)",
      fallbacks: [
        { minHeight: "-moz-calc(100vh - 188px)" },
        { minHeight: "-webkit-calc(100vh - 188px)" },
        { minHeight: "-o-calc(100vh - 188px)" },
      ],
      padding: "30px 30px 20px 30px",
    },
    footer: {
      height: "100px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "30px 30px 20px 30px",
    },
    footerImg: {
      [theme.breakpoints.down("md")]: {
        width: "80%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "80%",
      },
    },
  }),
  { index: 1 }
);

export default useStyles;
