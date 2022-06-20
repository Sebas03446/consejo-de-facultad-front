import { axiosReq } from "../helpers/fetch";

export const listSolicitudesById = async (_id: string) => {
  try {
    const resp = await axiosReq(`solicitudes/${_id}`);
    return resp.solicitudes;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSolicitud = async (_id: string) => {
  try {
    const resp = await axiosReq(`solicitudes/${_id}`, {}, "DELETE");
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const crearSolicitud = async (
  name: string,
  justificacion: string,
  usuario: string
) => {
  try {
    const resp = await axiosReq(
      `solicitudes/new_solicitud`,
      { name, justificacion, usuario },
      "POST"
    );
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const listSolicitudes = async () => {
  try {
    const resp = await axiosReq("solicitudes/list_solicitudes");
    return resp.solicitudes;
  } catch (error) {
    console.log(error);
  }
};

export const cambiarEstadoSolicitud = async (_id: string, estado: string) => {
  try {
    const resp = await axiosReq(`solicitudes/${_id}`, { estado }, "PUT");
    return resp;
  } catch (error) {
    console.log(error);
  }
};
