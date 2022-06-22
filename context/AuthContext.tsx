import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import {
  loginFn,
  registerFn,
  registerFnAdmin,
  revalidateToken,
} from "../services/auth";

interface ContextProps {
  isLoggedIn: boolean;
  user?: any;
  login: (email: string, password: string) => Promise<boolean>;
  signUp: (
    email: string,
    password: string,
    name: string,
    academic_degree: string
  ) => Promise<boolean>;
  signUpAdmin: (
    email: string,
    password: string,
    name: string
  ) => Promise<boolean>;
  logOut: () => void;
}

const AuthContext = createContext({} as ContextProps);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({} as any);

  const login = async (email: string, password: string): Promise<boolean> => {
    const data = await loginFn(email, password);
    try {
      const { token } = data;
      Cookies.set("token", token);
      setIsLoggedIn(true);
      setUser(data.usuario);
      console.log(data);
      return true;
    } catch (error) {
      return false;
    }
  };

  const signUp = async (
    email: string,
    password: string,
    name: string,
    academic_degree: string
  ): Promise<boolean> => {
    const data = await registerFn(email, password, name, academic_degree);
    try {
      const { token } = data;
      Cookies.set("token", token);
      setIsLoggedIn(true);
      setUser(data.usuario);
      return true;
    } catch (error) {
      return false;
    }
  };

  const signUpAdmin = async (
    email: string,
    password: string,
    name: string
  ): Promise<boolean> => {
    await registerFnAdmin(email, password, name);
    try {
      return true;
    } catch (error) {
      return false;
    }
  };

  const logOut = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    setUser({});
    router.reload();
  };

  const checkToken = async () => {
    const data = await revalidateToken();
    try {
      const { token } = data;
      Cookies.set("token", token);
      setIsLoggedIn(true);
      setUser(data.usuario);
      if (
        router.asPath === "/session/login" ||
        router.asPath === "/session/sign_up"
      ) {
        router.push("/");
      }
    } catch (error) {
      Cookies.remove("token");
      if (
        router.asPath !== "/session/login" &&
        router.asPath !== "/session/sign_up"
      ) {
        router.push("/session/login");
      }
    }
  };

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, signUp, logOut, signUpAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
