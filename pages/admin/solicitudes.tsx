import { RedoOutlined, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  FormInstance,
  Input,
  message,
  Modal,
  Select,
  Space,
  Table,
  Tooltip,
} from "antd";
import { ColumnsType, FilterConfirmProps } from "antd/lib/table/interface";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import LayoutComp from "../../components/Layout/Layout";
import { sendEmailFn } from "../../services/email";
import Highlighter from "react-highlight-words";
import {
  cambiarEstadoSolicitud,
  listSolicitudes,
} from "../../services/solicitud";
import useAuth from "../../context/AuthContext";
import { useRouter } from "next/router";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

type DataIndex = keyof DataType;

const Solicitudes = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [solicitudes, setSolicitudes] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const [selectedRecord, setSelectedRecord] = useState<any>({});

  const formRef = useRef<FormInstance>(null);
  const searchInput = useRef(null);

  const getData = async () => {
    setIsLoading(true);
    const resp = await listSolicitudes();
    setSolicitudes(resp);
    setIsLoading(false);
  };

  useEffect(() => {
    if (user.privilege === "student") {
      router.replace("/");
    } else {
      getData();
    }
  }, [user]);

  const getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: {
      setSelectedKeys: any;
      selectedKeys: any;
      confirm: any;
      clearFilters: any;
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Resetear
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtrar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        //@ts-ignore
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text: any) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Tipo",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
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
      ...getColumnSearchProps("estado"),
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

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleOk = async () => {
    //@ts-ignore
    const { estado } = await formRef.current.validateFields();
    const resp = await cambiarEstadoSolicitud(selectedRecord._id, estado);
    if (resp.ok) {
      setIsVisible(false);
      await getData();
      await sendEmailFn(
        selectedRecord.usuario.email,
        `<p>El estado de tu solicitud: <i>${selectedRecord.name}</i> ha sido actualizado a <strong>SOLICITUD ${estado}</strong></p>`
      );
      message.success({ content: "Solicitud actualizada con éxito" });
    }
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
    setSearchText("");
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
        <div
          className="flex"
          style={{ justifyContent: "space-evenly", marginBottom: "20px" }}
        >
          <h2 style={{ fontSize: "2em" }}>Solicitudes</h2>
          <Tooltip title="Refrescar" placement="bottom">
            <Button
              shape="circle"
              icon={<RedoOutlined />}
              size={"large"}
              onClick={() => getData()}
            />
          </Tooltip>
        </div>

        <Table
          //@ts-ignore
          columns={columns as ColumnsType}
          dataSource={solicitudes}
          loading={isLoading}
        />
      </>
    </LayoutComp>
  );
};

export default Solicitudes;
