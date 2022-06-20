import axios from "axios";

export const axiosReq = async (
  endpoint: string,
  body?: any,
  method = "GET"
) => {
  try {
    const result = await axios({
      url: `${process.env.NEXT_PUBLIC_URL}/api/${endpoint}`,
      method,
      data: {
        ...body,
      },
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw new Error(`Error al consultar la base de datos ${error}`);
  }
};
