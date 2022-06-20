import { Button, Form, Input, Modal } from "antd";
import { useRouter } from "next/router";
import React from "react";
import useAuth from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();

  const router = useRouter();

  const handleFinish = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const isValidLogin = await login(email, password);
    if (!isValidLogin) {
      Modal.error({ content: "Usuario o contraseña incorrectos" });
    } else {
      router.replace("/");
    }
  };

  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <Form className="formContainer" onFinish={handleFinish}>
        <p>Email</p>
        <Form.Item
          name={"email"}
          rules={[
            {
              required: true,
              type: "email",
              message: "Por favor ingresa tu correo",
            },
          ]}
        >
          <Input placeholder="sesanchezo@unal.edu.co" />
        </Form.Item>
        <p>Contraseña</p>
        <Form.Item
          name={"password"}
          rules={[
            {
              required: true,
              message: "Por favor ingresa una contraseña",
            },
          ]}
        >
          <Input.Password placeholder="*****" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Enviar</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
