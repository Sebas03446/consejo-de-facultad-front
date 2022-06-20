import { Button, Form, Input, Modal, Select } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useAuth from "../../context/AuthContext";
import { listAllDegrees } from "../../services/degree";

const SignUp = () => {
  const { signUp } = useAuth();

  const router = useRouter();

  const [degrees, setDegrees] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const resp = await listAllDegrees();
    if (resp?.ok) {
      setDegrees(resp.pregrados);
    }
  };

  const handleFinish = async ({
    name,
    academic_degree,
    email,
    password,
  }: {
    name: string;
    academic_degree: string;
    email: string;
    password: string;
  }) => {
    const isValidRegister = await signUp(
      email,
      password,
      name,
      academic_degree
    );
    if (!isValidRegister) {
      Modal.error({
        content: "Ha ocurrido un error, por favor contacte a un administrador",
      });
    } else {
      router.replace("/");
    }
  };

  return (
    <div className="loginContainer">
      <h2>Registro</h2>
      <Form className="formContainer">
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
              len: 6,
            },
          ]}
        >
          <Input.Password placeholder="***" />
        </Form.Item>
        <p>Pregrado:</p>
        <Form.Item
          name="academic_degree"
          rules={[
            {
              required: true,
              message: "Por favor selecciona un programa académico",
            },
          ]}
        >
          <Select style={{ width: "100%" }}>
            {degrees.map((degree: any) => (
              <Select.Option key={degree.id} value={degree.id}>
                {degree.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Enviar</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
