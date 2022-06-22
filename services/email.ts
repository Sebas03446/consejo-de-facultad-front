import { axiosReq } from "../helpers/fetch";

export const sendEmailFn = async (to: string, message: string) => {
  try {
    const resp = await axiosReq(
      `email/send_email`,
      {
        to,
        message,
        subject: "Estado solicitud",
      },
      "POST"
    );
    return resp.solicitudes;
  } catch (error) {
    console.log(error);
  }
};
