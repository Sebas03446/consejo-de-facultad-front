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
  const [isLoading, setIsLoading] = useState(false);

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
      title: "Observación",
      dataIndex: "observacion",
      key: "observacion",
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
    setIsLoading(true);
    const resp = await listSolicitudesById(user?._id as string);
    setSolicitudes(resp);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCancel = () => {
    setIsVisible(false);
  };

  const handleOk = async () => {
    const { name, justificacion, observacion } =
      //@ts-ignore
      await formRef.current.validateFields();
    const resp = await crearSolicitud(
      name,
      justificacion,
      observacion,
      user._id
    );
    if (resp.ok) {
      setIsVisible(false);
      await getData();
      message.success({ content: "Solicitud creada con éxito" });
    }
  };

  return (
    <LayoutComp title="Solicitudes">
      <>
        <Modal
          visible={isVisible}
          onCancel={handleCancel}
          onOk={handleOk}
          centered
        >
          <h2>Crear solicitud</h2>
          <Form ref={formRef}>
            <p>Tipo de solicitud: *</p>
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
                <Select.Option value="Inscripción de asignaturas">
                  Inscripción de asignaturas
                </Select.Option>
                <Select.Option value="Registro trabajo de grado">
                  Registro trabajo de grado
                </Select.Option>
                <Select.Option value="Cancelación de periodo académico">
                  Cancelación de periodo académico
                </Select.Option>
                <Select.Option value="Retiro definitivo del programa">
                  Retiro definitivo del programa
                </Select.Option>
                <Select.Option value="Inscripción de la Práctica Académica Especial - PAE">
                  Inscripción de la Práctica Académica Especial - PAE
                </Select.Option>
                <Select.Option value="Inscripción Práctica estudiantil">
                  Inscripción Práctica estudiantil
                </Select.Option>
                <Select.Option value="Máximo número de créditos en Inscripción">
                  Máximo número de créditos en Inscripción
                </Select.Option>
                <Select.Option value="Cursar menos de la carga mínima">
                  Cursar menos de la carga mínima
                </Select.Option>
                <Select.Option value="Cancelación de asignaturas">
                  Cancelación de asignaturas
                </Select.Option>
                <Select.Option value="Reserva de cupo adicional">
                  Reserva de cupo adicional
                </Select.Option>
                <Select.Option value="Homologación/Convalidación/Equivalencia">
                  Homologación/Convalidación/Equivalencia
                </Select.Option>
                <Select.Option value="Traslado">Traslado</Select.Option>
                <Select.Option value="Reingreso">Reingreso</Select.Option>
                <Select.Option value="Cambio de grupo">
                  Cambio de grupo
                </Select.Option>
                <Select.Option value="Cambio de tipología">
                  Cambio de tipología
                </Select.Option>
                <Select.Option value="Traslado créditos excedentes BAPI">
                  Traslado créditos excedentes BAPI
                </Select.Option>
                <Select.Option value="Doble titulación">
                  Doble titulación
                </Select.Option>
                <Select.Option value="Estímulos">Estímulos</Select.Option>
                <Select.Option value="Recurso de reposición">
                  Recurso de reposición
                </Select.Option>
                <Select.Option value="Recurso de reposición en subsidio apelación">
                  Recurso de reposición en subsidio apelación
                </Select.Option>
                <Select.Option value="Movilidad Saliente">
                  Movilidad Saliente
                </Select.Option>
                <Select.Option value="Movilidad Entrante - Doble Titulación">
                  Movilidad Entrante - Doble Titulación
                </Select.Option>
                <Select.Option value="Desistir de la movilidad">
                  Desistir de la movilidad
                </Select.Option>
              </Select>
            </Form.Item>
            <p>Justificación: *</p>
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
            <p>Observaciones: </p>
            <Form.Item name={"observacion"}>
              <TextArea rows={4} />
            </Form.Item>
          </Form>
          <p>
            <i>
              Nota: Al hacer click en enviar manifiesta que la información
              registrada en este formulario es veraz.
            </i>
          </p>
        </Modal>
        <div className="flex" style={{ justifyContent: "space-evenly" }}>
          <h2 style={{ fontSize: "2em" }}>Mis solicitudes</h2>
        </div>
        <Table columns={columns} dataSource={solicitudes} loading={isLoading} />
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
