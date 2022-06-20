import {
  Button,
  Form,
  FormInstance,
  message,
  Modal,
  Select,
  Table,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useRef, useState } from "react";
import Delete from "../../components/Forms/Delete";
import LayoutComp from "../../components/Layout/Layout";
import useAuth from "../../context/AuthContext";
import {
  crearSolicitud,
  deleteSolicitud,
  listSolicitudesById,
} from "../../services/solicitud";

const Solicitudes = () => {
  const { user } = useAuth();
  const [solicitudes, setSolicitudes] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const formRef = useRef<FormInstance>(null);

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
      title: "Acción",
      key: "action",
      render: (_: any, record: any) => (
        <Delete
          record={record}
          service={async () => {
            await deleteSolicitud(record._id);
            await getData();
          }}
        />
      ),
    },
  ];

  const getData = async () => {
    const resp = await listSolicitudesById(user?._id as string);
    setSolicitudes(resp);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCancel = () => {
    setIsVisible(false);
  };

  const handleOk = async () => {
    //@ts-ignore
    const { name, justificacion } = await formRef.current.validateFields();
    const resp = await crearSolicitud(name, justificacion, user._id);
    if (resp.ok) {
      setIsVisible(false);
      await getData();
      message.success({ content: "Solicitud creada con éxito" });
    }
  };

  return (
    <LayoutComp title="Solicitudes">
      <>
        <Modal visible={isVisible} onCancel={handleCancel} onOk={handleOk}>
          <h2>Crear solicitud</h2>
          <Form ref={formRef}>
            <p>Tipo de solicitud:</p>
            <Form.Item
              name={"name"}
              rules={[
                {
                  required: true,
                  message: "Debe seleccionar un tipo de solicitud",
                },
              ]}
            >
              <Select allowClear>
                <Select.Option value="1">1</Select.Option>
              </Select>
            </Form.Item>
            <p>Justificación: </p>
            <Form.Item
              name={"justificacion"}
              rules={[
                {
                  required: true,
                  message: "Por favor añada una justificación",
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </Form>
        </Modal>
        <div className="flex" style={{ justifyContent: "space-evenly" }}>
          <h2 style={{ fontSize: "2em" }}>Mis solicitudes</h2>
        </div>
        <Table columns={columns} dataSource={solicitudes} />
        <Button
          type="primary"
          style={{ marginTop: "10px" }}
          onClick={() => setIsVisible(true)}
        >
          Nueva solicitud
        </Button>
      </>
    </LayoutComp>
  );
};

export default Solicitudes;
