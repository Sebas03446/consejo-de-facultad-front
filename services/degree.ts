import { axiosReq } from "../helpers/fetch";

export const listAllDegrees = async () => {
  try {
    const data = await axiosReq("degree/list_degree");
    return data;
  } catch (error) {
    console.log(error);
  }
};
