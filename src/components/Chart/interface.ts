export interface ChartIntf {
  options: {
    chart: {
      id: string;
      height: number;
      width: string;
      toolbar: {
        show: boolean;
      };
    };
    xaxis: {
      labels: {};
      categories: string[];
    };
    dataLabels: {
      enabled: boolean;
    };
  };
  series: {
    name: string;
    data: number[];
  }[];
}
