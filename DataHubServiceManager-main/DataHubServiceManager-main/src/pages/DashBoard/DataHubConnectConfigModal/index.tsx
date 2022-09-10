import React from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { DatahubConnectConfig } from "../../../interface/DataHubService";
import { updateDataHubConnectConfig_api } from "../../../requests/apis/DataHubServiceApis";
import { BaseResponse } from "../../../responses/base";

interface DataHubConnectConfigModalProps {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  datahubConnecteConfig: DatahubConnectConfig;
}

const DataHubConnectConfigModal: React.FC<DataHubConnectConfigModalProps> = (
  props
) => {
  const [form] = Form.useForm();
  const { isModalVisible, setIsModalVisible, datahubConnecteConfig } = props;

  React.useEffect(() => {
    form.resetFields();
  }, [datahubConnecteConfig]);

  const handleOK = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: DatahubConnectConfig) => {
	  console.log("Success:", values);
    applyDataHubConnectConfig(values);
  }
	
  const onFinishFailed = (errorInfo: any) => {
	  console.log('Failed:', errorInfo);
  }

  const applyDataHubConnectConfig = (data: DatahubConnectConfig) => {
    updateDataHubConnectConfig_api(data).then((res: BaseResponse)=>{
      if (res.data == 1) {
        message.success("Update datahubconnect config.");
      } else {
        message.warning("Seem not update datahubconnect config.");
      }
    })
  }

  return (
    <>
      <Modal
        forceRender
        title="ConnectConfig"
        visible={isModalVisible}
        onOk={handleOK}
        onCancel={handleOK}
      >
        <Form layout="vertical"
		  form={form} 
		  onFinish={onFinish}
		  onFinishFailed={onFinishFailed}
		>
          <Form.Item
            label="Id"
            name="id"
            initialValue={datahubConnecteConfig.id}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Host"
            name="host"
            rules={[
              {
                required: true,
                message: "Please input host!",
              },
            ]}
            initialValue={datahubConnecteConfig.host}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Port"
            name="port"
            rules={[
              {
                required: true,
                message: "Please input port!",
              },
            ]}
            initialValue={datahubConnecteConfig.port}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Domain"
            name="domain"
            rules={[
              {
                required: true,
                message: "Please input domain!",
              },
            ]}
            initialValue={datahubConnecteConfig.domain}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Apply
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default DataHubConnectConfigModal;
