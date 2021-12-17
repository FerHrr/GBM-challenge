import { Grid, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ChartComponent from "../../components/Chart";
import ContainerComponent from "../../components/Container";
import { TabPanelProps } from "./interface";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
interface Props {
  dateChart: string[];
  priceChart: number[];
  volumeChart: number[];
  changeChart: number[];
  selectedTab: number;
  precioMayor: number;
  precioMenor: number;
  volumeMayor: number;
  volumeMenor: number;
  changeMayor: number;
  changeMenor: number;
  handleChangeTab: (event: React.SyntheticEvent, newValue: number) => void;
}
const AnalyticsView: React.FC<Props> = ({
  dateChart,
  volumeChart,
  changeChart,
  priceChart,
  selectedTab,
  precioMayor,
  precioMenor,
  volumeMayor,
  volumeMenor,
  changeMayor,
  changeMenor,
  handleChangeTab,
}) => {
  const PriceView = () => (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="stretch"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Grid
        item
        xs={8}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <ChartComponent
          dateChart={dateChart}
          priceChart={priceChart}
          tooltipText={"Precio"}
        />
      </Grid>
      <Grid
        item
        xs={4}
        style={{
          width: "100%",
          height: "100%",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          style={{
            backgroundColor: "white",
            padding: "20px",
            boxShadow:
              "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px",
            borderRadius: "10px",
          }}
        >
          <Grid item>
            <Typography
              style={{
                color: "green",
                display: "flex",
                justifyItems: "center",
              }}
            >
              <strong>Maximo:</strong> <a>{precioMayor}</a>
              <ArrowUpwardIcon />
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              style={{ color: "red", display: "flex", justifyItems: "center" }}
            >
              <strong>Minimo:</strong> <a>{precioMenor}</a>
              <ArrowDownwardIcon />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
  const VolumeView = () => (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="stretch"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Grid
        item
        xs={8}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <ChartComponent
          dateChart={dateChart}
          priceChart={volumeChart}
          tooltipText={"Volumen"}
        />
      </Grid>
      <Grid
        item
        xs={4}
        style={{
          width: "100%",
          height: "100%",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          style={{
            backgroundColor: "white",
            padding: "20px",
            boxShadow:
              "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px",
            borderRadius: "10px",
          }}
        >
          <Grid item>
            <Typography
              style={{
                color: "green",
                display: "flex",
                justifyItems: "center",
              }}
            >
              <strong>Maximo:</strong> <a>{volumeMayor}</a>
              <ArrowUpwardIcon />
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              style={{ color: "red", display: "flex", justifyItems: "center" }}
            >
              <strong>Minimo:</strong> <a>{volumeMenor}</a>
              <ArrowDownwardIcon />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
  const ChangeView = () => (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="stretch"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Grid
        item
        xs={8}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <ChartComponent
          dateChart={dateChart}
          priceChart={changeChart}
          tooltipText={"Cambio"}
        />
      </Grid>
      <Grid
        item
        xs={4}
        style={{
          width: "100%",
          height: "100%",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          style={{
            backgroundColor: "white",
            padding: "20px",
            boxShadow:
              "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px",
            borderRadius: "10px",
          }}
        >
          <Grid item>
            <Typography
              style={{
                color: "green",
                display: "flex",
                justifyItems: "center",
              }}
            >
              <strong>Maximo:</strong> <a>{changeMayor}</a>
              <ArrowUpwardIcon />
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              style={{ color: "red", display: "flex", justifyItems: "center" }}
            >
              <strong>Minimo:</strong> <a>{changeMenor}</a>
              <ArrowDownwardIcon />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };
  return (
    <ContainerComponent title={"Analiticos IPC"}>
      <Box sx={{ borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={handleChangeTab}
          aria-label="icon label tabs example"
        >
          <Tab icon={<AttachMoneyIcon />} label="Precio" />
          <Tab icon={<TrendingUpIcon />} label="Volumen" />
          <Tab icon={<CurrencyExchangeIcon />} label="Cambio" />
        </Tabs>
      </Box>
      <TabPanel value={selectedTab} index={0}>
        {PriceView()}
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        {VolumeView()}
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        {ChangeView()}
      </TabPanel>
    </ContainerComponent>
  );
};

export default AnalyticsView;
