import { Form, FormInstance, message, Modal, Select, Table } from "antd";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import LayoutComp from "../../components/Layout/Layout";
import {
  cambiarEstadoSolicitud,
  listSolicitudes,
} from "../../services/solicitud";

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const [selectedRecord, setSelectedRecord] = useState<any>({});

  const formRef = useRef<FormInstance>(null);

  const getData = async () => {
    const resp = await listSolicitudes();
    console.log(resp);
    setSolicitudes(resp);
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Tipo",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Justificación",
      dataIndex: "justificacion",
      key: "justificacion",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
    },
    {
      title: "Estudiante",
      dataIndex: "usuario",
      key: "usuario",
      render: (_: any, record: any) => record.usuario.email,
    },
    {
      title: "Fecha de solicitud",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_: any, record: any) =>
        moment(record?.createdAt).format("DD/MM/YYYY, h:mm:ss"),
    },
    {
      title: "Acción",
      key: "action",
      render: (_: any, record: any) => (
        <a
          onClick={() => {
            setSelectedRecord(record);
            setIsVisible(true);
          }}
        >
          Revisar
        </a>
      ),
    },
  ];

  const handleCancel = () => {
    setIsVisible(false);
  };

  const handleOk = async () => {
    //@ts-ignore
    const { estado } = await formRef.current.validateFields();
    const resp = await cambiarEstadoSolicitud(selectedRecord._id, estado);
    if (resp.ok) {
      setIsVisible(false);
      await getData();
      message.success({ content: "Solicitud actualizada con éxito" });
    }
  };

  return (
    <LayoutComp title="Solicitudes">
      <>
        <Modal visible={isVisible} onCancel={handleCancel} onOk={handleOk}>
          <h2>Actualizar solicitud</h2>
          <Form ref={formRef}>
            <p>Cambiar estado:</p>
            <Form.Item
              name={"estado"}
              rules={[
                {
                  required: true,
                  message: "Debe seleccionar un estado",
                },
              ]}
            >
              <Select allowClear>
                <Select.Option value="en_espera">En espera</Select.Option>
                <Select.Option value="pre_aprobada">Pre-aprobada</Select.Option>
                <Select.Option value="aprobada">Aprobada</Select.Option>
                <Select.Option value="rechazada">Rechazada</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
        <div className="flex" style={{ justifyContent: "space-evenly" }}>
          <h2 style={{ fontSize: "2em" }}>Solicitudes</h2>
        </div>
        <Table columns={columns} dataSource={solicitudes} />
      </>
    </LayoutComp>
  );
};

export default Solicitudes;
