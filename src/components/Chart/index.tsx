import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ChartIntf } from "./interface";
interface Props {
  dateChart: string[];
  priceChart: number[];
  tooltipText: string;
}
const ChartComponent: React.FC<Props> = ({
  dateChart,
  priceChart,
  tooltipText,
}) => {
  const [stateChart, setStateChart] = useState<ChartIntf>({
    options: {
      chart: {
        id: "apexchart-example",
        height: 320,
        width: "100%",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        labels: {},
        categories: dateChart,
      },
      dataLabels: {
        enabled: false,
      },
    },
    series: [
      {
        name: tooltipText,
        data: priceChart,
      },
    ],
  });

  useEffect(() => {
    if (dateChart && priceChart) {
      let tmpstateChart = { ...stateChart };
      tmpstateChart.options.xaxis.categories = dateChart;
      tmpstateChart.series[0].data = priceChart;
      setStateChart(tmpstateChart);
    }
  }, [dateChart, priceChart]);
  return (
    <div id="chart">
      <Chart
        options={stateChart.options}
        series={stateChart.series}
        type="area"
        height={"380px"}
      />
    </div>
  );
};

export default ChartComponent;
