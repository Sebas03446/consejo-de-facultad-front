import { axiosReq } from "../helpers/fetch";

export const loginFn = async (email: string, password: string) => {
  try {
    const resp = await axiosReq("auth", { email, password }, "POST");
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const registerFn = async (
  email: string,
  password: string,
  name: string,
  academic_degree: string
) => {
  try {
    const resp = await axiosReq(
      "auth/new",
      { email, password, name, academic_degree },
      "POST"
    );
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const registerFnAdmin = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const resp = await axiosReq(
      "auth/new_admin",
      { email, password, name },
      "POST"
    );
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const revalidateToken = async () => {
  try {
    const resp = await axiosReq("auth/renew");
    return resp;
  } catch (error) {
    console.log(error);
  }
};
