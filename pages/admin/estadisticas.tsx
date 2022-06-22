import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import LayoutComp from "../../components/Layout/Layout";
import LineChart from "../../components/Statistics/LineChart";
import MyPie, { IData } from "../../components/Statistics/Pie";
import useAuth from "../../context/AuthContext";
import {
  parseByName1,
  parseByName2,
  parseByState,
} from "../../helpers/parseData";
import { listSolicitudes } from "../../services/solicitud";

const Estadisticas = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [dataPie, setDataPie] = useState<IData | null>(null);
  const [dataLine1, setDataLine1] = useState<IData | null>(null);
  const [dataLine2, setDataLine2] = useState<IData | null>(null);

  const getData = async () => {
    const resp: any[] = await listSolicitudes();

    console.log(resp);

    if (resp) {
      const pie = parseByState(resp);
      const line1 = parseByName1(resp);
      const line2 = parseByName2(resp);
      setDataPie(pie);
      setDataLine1(line1);
      setDataLine2(line2);
    }
  };

  useEffect(() => {
    if (user?.privilege === "student") {
      router.replace("/");
    } else {
      getData();
    }
  }, [user]);

  return (
    <LayoutComp title="Estadísticas">
      <>
        <h2 style={{ fontSize: "2em" }}>Estadísticas</h2>
        {dataPie && (
          <>
            <div className="charts">
              <div className="charts--element">
                <MyPie data={dataPie} />
              </div>
              <div className="charts--element">
                <div className="row">
                  <LineChart data={dataLine1 as IData} />
                </div>

                <div className="row">
                  <LineChart data={dataLine2 as IData} />
                </div>
              </div>
            </div>
          </>
        )}
      </>
    </LayoutComp>
  );
};

export default Estadisticas;
