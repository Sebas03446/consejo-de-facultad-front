import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React from "react";

const Delete = ({ record, service }: { record: any; service: () => void }) => {
  const handleClick = () => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: `Estas seguro que quieres borrar ${record.name}?`,
      async onOk() {
        await service();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return <a onClick={handleClick}>Borrar</a>;
};

export default Delete;
