import { IData } from "../components/Statistics/Pie";

export const parseByState = (data: any[]) => {
  let waiting = data?.filter((e) => e.estado === "esperando_respuesta").length;
  let pre_accepted = data?.filter((e) => e.estado === "pre_aprobada").length;
  let rejected = data?.filter((e) => e.estado === "rechazada").length;
  let accepted = data?.filter((e) => e.estado === "aprobada").length;

  const toResolve: IData = {
    labels: ["En espera", "Pre-aprobadas", "Rechazadas", "Aprobadas"],
    datasets: [
      {
        label: "Cantidad",
        data: [waiting, pre_accepted, rejected, accepted],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(81, 255,116, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(81, 255,116, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return toResolve;
};

export const parseByName1 = (data: any[]) => {
  let a = data?.filter((e) => e.name === "Inscripción de asignaturas").length;
  let b = data?.filter((e) => e.name === "Registro trabajo de grado").length;
  let c = data?.filter(
    (e) => e.name === "Cancelación de periodo académico"
  ).length;
  let d = data?.filter(
    (e) => e.name === "Retiro definitivo del programa"
  ).length;
  let e = data?.filter(
    (e) => e.name === "Inscripción de la Práctica Académica Especial - PAE"
  ).length;
  let f = data?.filter(
    (e) => e.name === "Inscripción Práctica estudiantil"
  ).length;
  let g = data?.filter(
    (e) => e.name === "Máximo número de créditos en Inscripción"
  ).length;
  let h = data?.filter(
    (e) => e.name === "Cursar menos de la carga mínima"
  ).length;
  let i = data?.filter((e) => e.name === "Cancelación de asignaturas").length;
  let j = data?.filter((e) => e.name === "Reserva de cupo adicional").length;
  let k = data?.filter(
    (e) => e.name === "Homologación/Convalidación/Equivalencia"
  ).length;

  const toResolve: IData = {
    labels: [
      "Ins. Asignaturas",
      "Tr. Grado",
      "Can Periodo Académico",
      "Retiro Def Programa",
      "Ins. PAE",
      "Ins. PE",
      "Máx Créditos",
      "Carga mínima",
      "Cancelación Asig",
      "Reserva cupo",
      "Homologación",
    ],
    datasets: [
      {
        label: "Cantidad",
        data: [a, b, c, d, e, f, g, h, i, j, k],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(81, 255,116, 0.2)",
          "rgba(215, 106, 86, 0.2)",
          "rgba(100, 99, 132, 0.2)",
          "rgba(81, 205,106, 0.2)",
          "rgba(155, 206, 86, 0.2)",
          "rgba(255, 30, 112, 0.2)",
          "rgba(31, 225,116, 0.2)",
          "rgba(225, 216, 26, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(81, 255,116, 1)",
          "rgba(215, 106, 86, 1)",
          "rgba(100, 99, 132, 1)",
          "rgba(81, 205,106, 1)",
          "rgba(155, 206, 86, 1)",
          "rgba(255, 30, 112, 1)",
          "rgba(31, 225,116, 1)",
          "rgba(225, 216, 26, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return toResolve;
};

export const parseByName2 = (data: any[]) => {
  let a = data?.filter((e) => e.name === "Traslado").length;
  let b = data?.filter((e) => e.name === "Reingreso").length;
  let c = data?.filter((e) => e.name === "Cambio de grupo").length;
  let d = data?.filter((e) => e.name === "Cambio de tipología").length;
  let e = data?.filter(
    (e) => e.name === "Traslado créditos excedentes BAPI"
  ).length;
  let f = data?.filter((e) => e.name === "Doble titulación").length;
  let g = data?.filter((e) => e.name === "Estímulos").length;
  let h = data?.filter((e) => e.name === "Recurso de reposición").length;
  let i = data?.filter(
    (e) => e.name === "Recurso de reposición en subsidio apelación"
  ).length;
  let j = data?.filter((e) => e.name === "Movilidad Saliente").length;
  let k = data?.filter(
    (e) => e.name === "Movilidad Entrante - Doble Titulación"
  ).length;
  let l = data?.filter((e) => e.name === "Desistir de la movilidad").length;

  const toResolve: IData = {
    labels: [
      "Traslado",
      "Reingreso",
      "Cambio grupo",
      "Cambio tipología",
      "Traslado cred BAPI",
      "Doble titulación",
      "Estímulos",
      "Rec. Reposición",
      "Rec. Reposición en subs",
      "Mov. Saliente",
      "Mov. Entrante/Doble Titulación",
      "Desistir Mov",
    ],
    datasets: [
      {
        label: "Cantidad",
        data: [a, b, c, d, e, f, g, h, i, j, k, l],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(81, 255,116, 0.2)",
          "rgba(215, 106, 86, 0.2)",
          "rgba(200, 99, 132, 0.2)",
          "rgba(81, 205,106, 0.2)",
          "rgba(155, 206, 86, 0.2)",
          "rgba(255, 30, 112, 0.2)",
          "rgba(31, 225,116, 0.2)",
          "rgba(225, 216, 26, 0.2)",
          "rgba(255, 56, 16, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(81, 255,116, 1)",
          "rgba(215, 106, 86, 1)",
          "rgba(200, 99, 132, 1)",
          "rgba(81, 205,106, 1)",
          "rgba(155, 206, 86, 1)",
          "rgba(255, 30, 112, 1)",
          "rgba(31, 225,116, 1)",
          "rgba(225, 216, 26, 1)",
          "rgba(255, 56, 16, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return toResolve;
};
