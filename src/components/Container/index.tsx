import { Grid, Typography } from "@mui/material";
import React from "react";
interface Props {
  title?: string;
}
const ContainerComponent: React.FC<Props> = ({ title, children }) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      style={{
        width: "92vw",
        height: "75vh",
        //   backgroundColor: "red",
        padding: "20px",
      }}
    >
      <Grid
        item
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid
          item
          style={{
            marginRight: "25px",
            marginBottom: "27px",
          }}
        >
          <Typography variant="h3">{title}</Typography>
        </Grid>
      </Grid>
      <Grid
        item
        style={{
          width: "100%",
          height: "91%",
          //  backgroundColor: "red",
          padding: "20px",
          borderRadius: "20px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default ContainerComponent;
