import "chart.js/auto";
import { Bar } from "react-chartjs-2";

export interface dataType {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
}

export interface IData {
  labels: string[];
  datasets: dataType[];
}

const LineChart = ({ data }: { data: IData }) => {
  return <Bar data={data} />;
};

export default LineChart;
