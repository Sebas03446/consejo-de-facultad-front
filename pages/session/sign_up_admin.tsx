import { Button, Form, Input, Modal, Select } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useAuth from "../../context/AuthContext";

const SignUp = () => {
  const { signUpAdmin, user } = useAuth();

  const router = useRouter();

  const handleFinish = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    const isValidRegister = await signUpAdmin(email, password, name);
    if (!isValidRegister) {
      Modal.error({
        content: "Ha ocurrido un error, por favor contacte a un administrador",
      });
    } else {
      Modal.success({
        content: "Ha creado un administrador satisfactoriamente",
        onOk: () => router.push("/"),
      });
    }
  };

  useEffect(() => {
    if (user?.privilege === "student") {
      router.replace("/");
    }
  }, [user]);

  return (
    <div className="loginContainer">
      <div className="container">
        <h2>Registro</h2>
        <Form className="formContainer" onFinish={handleFinish}>
          <p>Nombre</p>
          <Form.Item
            name={"name"}
            rules={[
              {
                required: true,
                message: "Por favor ingresa tu nombre",
              },
            ]}
          >
            <Input placeholder="Sergio Sanchez " />
          </Form.Item>
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
            <Input.Password placeholder="Contraseña" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Aceptar</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
