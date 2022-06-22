import "chart.js/auto";
import { Pie } from "react-chartjs-2";

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

const MyPie = ({ data }: { data: IData }) => {
  return <Pie data={data} />;
};

export default MyPie;
