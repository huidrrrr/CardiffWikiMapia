import React from "react";
import { Button, Input, Card, Form, Select, Space } from "antd";
import {
  LockOutlined,
  UserOutlined,
  DesktopOutlined,
  ApartmentOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { connectFormInterface } from "./interface/mqttConnecterForm";
import { mqttOption } from "./interface/mqttOption";
import * as mqtt from "mqtt/dist/mqtt.min";
import { subscription } from "./interface/mqttSub";

const { Option } = Select;

const MqttConnecter: React.FC = () => {
  const [client, setClient] = React.useState<mqtt.Client | null>(null);
  const [connectStatus, setConnectStatus] = React.useState("");
  const [payload, setPayload] = React.useState<any>(null);
  const [isSub, setIsSub] = React.useState<boolean>();

  const mqttConnect = (
    values: connectFormInterface,
    mqttOption: mqttOption
  ) => {
    setConnectStatus("Connecting");

    let m_host =
      values.select_type +
      values.host +
      ":" +
      values.port +
      "/" +
      values.select_type.split(":")[0];
    setClient(mqtt.connect(m_host, mqttOption));
  };

  React.useEffect(() => {
    if (client) {
      console.log(client);
      client.on("connect", () => {
        setConnectStatus("Connected");
      });
      client.on("error", (err) => {
        console.error("Connection error: ", err);
        client.end();
      });
      client.on("reconnect", () => {
        setConnectStatus("Reconnecting");
      });
      client.on("message", (topic, message) => {
        console.log(message);
        let payload = { topic, message: message.toString() };
        setPayload(payload);
      });
    }
  }, [client]);

  const mqttDisconnect = () => {
    if (client) {
      client.end();
      setConnectStatus("Disconnectd");
    }
  };

  const mqttSub = (subscription: any) => {
    if (client) {
      const { topic, qos } = subscription;
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
        setIsSub(true);
      });
    }
  };

  const mqttUnSub = (subscription: any) => {
    if (client) {
      const { topic } = subscription;
      client.unsubscribe(topic, (error: any) => {
        if (error) {
          console.log("Unsubscribe error", error);
          return;
        }
        setIsSub(false);
      });
    }
  };

  const onFinish = (values: connectFormInterface) => {
    console.log("Success:", values);

    let m_mqttOption: mqttOption = {
      username: values.username,
      password: values.password,
      rejectUnauthorized: false,
      defaultProtocol: "mqtt",
    };
    mqttConnect(values, m_mqttOption);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onSubFinish = (values: any) => {
    console.log("SubSuccess:", values.topic);
    mqttSub({ topic: values.topic, qos: 0 });
  };

  const onSubFinishFailed = (errorInfo: any) => {
    console.log("SubFailed:", errorInfo);
  };

  return (
    <Card>
      <Space direction="vertical">
        <Form
          name="mqttconnecter"
          layout="inline"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="select_type"
            rules={[{ required: true }]}
            initialValue="ws://"
          >
            <Select placeholder="Please select a type!">
              <Option value="mqtt://">mqtt://</Option>
              <Option value="mqtts://">mqtts://</Option>
              <Option value="ws://">ws://</Option>
              <Option value="wss://">wss://</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="host"
            rules={[{ required: true, message: "Please input your host!" }]}
          >
            <Input
              prefix={<DesktopOutlined className="site-form-item-icon" />}
              placeholder="Host"
            />
          </Form.Item>
          <Form.Item
            name="port"
            rules={[{ required: true, message: "Please input your port!" }]}
          >
            <Input
              prefix={<ApartmentOutlined className="site-form-item-icon" />}
              placeholder="Port"
            />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Connect
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={mqttDisconnect}>
              Disconnect
            </Button>
          </Form.Item>
        </Form>

        <Form
          name="subconnect"
          layout="inline"
          initialValues={{ remember: true }}
          onFinish={onSubFinish}
          onFinishFailed={onSubFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="topic"
            rules={[{ required: true, message: "Please input your topic!" }]}
          >
            <Input
              prefix={<TagOutlined className="site-form-item-icon" />}
              placeholder="Topic"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sub
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={mqttUnSub}>
              UnSub
            </Button>
          </Form.Item>
        </Form>
      </Space>
      <div>{payload}</div>
    </Card>
  );
};

export default MqttConnecter;
