import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid, Typography } from "@material-ui/core";
interface Props {
  size?: number;
  color?: string;
  label?: string;
}
const LoadingComponent: React.FC<Props> = ({ size, color, label }) => {
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <CircularProgress size={size} style={{ color: color }} />
      </Grid>
      {label !== "" && (
        <Grid item>
          <Typography style={{ color: color, margin: "20px 0px 20px 0px" }}>
            {label}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
export default LoadingComponent;
