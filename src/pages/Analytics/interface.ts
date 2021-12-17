export interface DataApi {
  date: string;
  price: number;
  percentageChange: number;
  volume: number;
  change: number;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
