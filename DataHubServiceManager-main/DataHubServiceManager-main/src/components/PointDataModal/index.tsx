import { Modal } from "antd";
import React, { Dispatch } from "react";

interface PointDataCardProps {
  pointName: string;
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<React.SetStateAction<boolean>>;
  pointData: string;
}

const PointDataModal: React.FC<PointDataCardProps> = (props) => {
  const { pointName, pointData, isModalVisible, setIsModalVisible } = props;

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      title={pointName}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleOk}
    >
      <pre>{pointData}</pre>
    </Modal>
  );
};

export default PointDataModal;
