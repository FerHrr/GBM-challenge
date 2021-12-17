/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useMemo, useState } from "react";
import LoadingComponent from "../../components/Loading/Loading";
import { DataApi } from "./interface";
import AnalyticsView from "./view";
interface Props {}
interface dataAp {
  [key: string]: DataApi;
}
const AnalyticsPage: React.FC<Props> = ({}) => {
  const [dataAPI, setDataAPI] = useState<DataApi>();
  const [dateChart, setDateChart] = useState<string[]>([]);
  const [priceChart, setPriceChart] = useState<number[]>([]);
  const [volumeChart, setVolumeChart] = useState<number[]>([]);
  const [changeChart, setChangeChart] = useState<number[]>([]);
  const [selectedTab, setSelectedTab] = useState<number>(0);

  useEffect(() => {
    fetch("https://run.mocky.io/v3/cc4c350b-1f11-42a0-a1aa-f8593eafeb1e")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDataAPI(data);
      })
      .catch((e) => {
        console.log(`error al consultar la api:`, e);
      });
  }, []);

  useEffect(() => {
    if (dataAPI && Object.keys(dataAPI).length > 0) {
      let newDataAPI: dataAp = {};
      let tmpDateChart: string[] = [];
      let tmpPriceChart: number[] = [];
      let tmpVolumeChart: number[] = [];
      let tmpChangeChart: number[] = [];
      Object.values(dataAPI).reduce((acc, d: DataApi, indx) => {
        if (acc && !acc.includes(d.date)) {
          let tmpDate = formatDate(new Date(d.date));
          acc.push(d.date);
          newDataAPI[tmpDate] = d;
          tmpDateChart.push(tmpDate);
          tmpPriceChart.push(d.price);
          tmpVolumeChart.push(d.volume);
          tmpChangeChart.push(d.change);
        }
        return acc;
      }, []);
      setDateChart(tmpDateChart);
      setPriceChart(tmpPriceChart);
      setVolumeChart(tmpVolumeChart);
      setChangeChart(tmpChangeChart);
    }
  }, [dataAPI]);

  const precioMayor = useMemo(() => {
    if (dataAPI && Object.keys(dataAPI).length > 0) {
      return Object.values(dataAPI).reduce(
        (acc, el: DataApi) => (acc > el.price ? acc : el.price),
        0
      );
    }
  }, [dataAPI]);

  const precioMenor = useMemo(() => {
    if (precioMayor && dataAPI && Object.keys(dataAPI).length > 0) {
      return Object.values(dataAPI).reduce(
        (acc, el: DataApi) => Math.min(acc, el.price),
        Number.POSITIVE_INFINITY
      );
    }
  }, [dataAPI, precioMayor]);

  const volumeMayor = useMemo(() => {
    if (dataAPI && Object.keys(dataAPI).length > 0) {
      return Object.values(dataAPI).reduce(
        (acc, el: DataApi) => (acc > el.volume ? acc : el.volume),
        0
      );
    }
  }, [dataAPI]);

  const volumeMenor = useMemo(() => {
    if (volumeMayor && dataAPI && Object.keys(dataAPI).length > 0) {
      return Object.values(dataAPI).reduce(
        (acc, el: DataApi) => Math.min(acc, el.volume),
        Number.POSITIVE_INFINITY
      );
    }
  }, [dataAPI, volumeMayor]);

  const changeMayor = useMemo(() => {
    if (dataAPI && Object.keys(dataAPI).length > 0) {
      return Object.values(dataAPI).reduce(
        (acc, el: DataApi) => (acc > el.change ? acc : el.change),
        0
      );
    }
  }, [dataAPI]);

  const changeMenor = useMemo(() => {
    if (changeMayor && dataAPI && Object.keys(dataAPI).length > 0) {
      return Object.values(dataAPI).reduce(
        (acc, el: DataApi) => Math.min(acc, el.change),
        Number.POSITIVE_INFINITY
      );
    }
  }, [dataAPI, changeMayor]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  const formatDate = (date: Date): string => {
    return `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
  };

  return (
    <div>
      {dataAPI && priceChart && volumeChart && changeChart && dateChart ? (
        <AnalyticsView
          dateChart={dateChart}
          priceChart={priceChart}
          volumeChart={volumeChart}
          changeChart={changeChart}
          selectedTab={selectedTab}
          precioMayor={precioMayor}
          precioMenor={precioMenor}
          volumeMayor={volumeMayor}
          volumeMenor={volumeMenor}
          changeMayor={changeMayor}
          changeMenor={changeMenor}
          handleChangeTab={handleChangeTab}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingComponent
            color={"success"}
            size={100}
            label={"Cargando..."}
          />
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;
