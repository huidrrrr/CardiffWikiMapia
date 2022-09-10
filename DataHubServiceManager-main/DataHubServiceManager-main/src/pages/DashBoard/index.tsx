import React from "react";
import { Col, Row, Button, message, Alert } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { service_status_ws_url } from "../../requests/websocket";
import {
  DatahubConnectConfig,
  DatahubServiceStatus,
} from "../../interface/DataHubService";
import {
  connectDataHub_api,
  disconnectDataHub_api,
  getDataHubConnectConfig_api,
} from "../../requests/apis/DataHubServiceApis";
import { startSendingToRabbitmq_api, stopSendingToRabbitmq_api } from "../../requests/apis/RabbitmqQueueApis";
import DashBoardCard from "./DashBoardCard";
import { BaseResponse } from "../../responses/base";
import DataHubConnectConfigModal from "./DataHubConnectConfigModal";

const DashBoard: React.FC = () => {
  const [datahubConnectStatus, setDatahubConnectStatus] =
    React.useState<boolean>(false);
  const [datahubConnectMsg, setDataHubConnectMsg] = React.useState<string>("");
  const [messageQueueStatus, setMessageQueueStatus] =
    React.useState<boolean>(false);
  const [datahubConfigVisible, setDataHubConfigVisible] =
    React.useState<boolean>(false);
  const [currentDataHubConfig, setCurrentDataHubConfig] =
    React.useState<DatahubConnectConfig>({
      host: "",
      domain: "",
      id: 0,
      port: 0,
    });

  React.useEffect(() => {
    let websocket = new WebSocket(service_status_ws_url);

    websocket.onopen = () => {
      console.log("websocket已打开");
    };

    websocket.onmessage = (msg) => {
      let data: DatahubServiceStatus = JSON.parse(msg.data);

      setDatahubConnectStatus(data.datahubConnectStatus);
      setMessageQueueStatus(data.redisSendRabbitmqStatus);
      setDataHubConnectMsg(data.datahubMessage);
    };

    websocket.onclose = () => {
      console.log("websocket已关闭");
    };

    websocket.onerror = () => {
      console.log("websocket发生了错误");
    };

    return () => {
      websocket.close();
    };
  }, []);

  const connectDatahub_handle = () => {
    connectDataHub_api(1)
      .then((res: any) => {
        let m_res: BaseResponse = res;
        message.info(m_res.data);
        console.log(res);
      })
      .catch((err) => {
        message.error("Connect DataHub failed!");
        console.log(err);
      });
  };

  const disconnectDatahub_handle = () => {
    disconnectDataHub_api()
      .then((res: any) => {
        let m_res: BaseResponse = res;
        message.info(m_res.data);
        console.log(res);
      })
      .catch((err) => {
        message.error("DisConnect DataHub failed!");
        console.log(err);
      });
  };

  const startSendingToRabbitmq_handle = () => {
    startSendingToRabbitmq_api().then((res: BaseResponse) => {
      console.log(res);
      message.info(`${res.status} : ${res.msg} - ${res.data}`);
    });
  }

  const stopSendingToRabbitmq_handle = () => {
    stopSendingToRabbitmq_api().then((res: BaseResponse) => {
      console.log(res);
      message.info(`${res.status} : ${res.msg} - ${res.data}`);
    })
  }

  const getDataHubConnectConfig_handle = () => {
    getDataHubConnectConfig_api().then((res: any) => {
      res.data.forEach((cfgItem: DatahubConnectConfig) => {
        if (cfgItem.id == 1) {
          setCurrentDataHubConfig(cfgItem);
        }
      });
    });
  };

  return (
    <>
      <Row gutter={48}>
        <Col span={12}>
          <DashBoardCard
            title="DataHubConnecter"
            status={datahubConnectStatus}
            greeninfo="Connected"
            redinfo="Disconnected"
          >
            <Row gutter={12}>
              <Col>
                <Button
                  disabled={datahubConnectStatus}
                  type="primary"
                  shape="round"
                  onClick={connectDatahub_handle}
                >
                  Connect
                </Button>
              </Col>

              <Col>
                <Button
                  disabled={!datahubConnectStatus}
                  type="primary"
                  shape="round"
                  danger
                  onClick={disconnectDatahub_handle}
                >
                  Disconnect
                </Button>
              </Col>

              <Col>
                <Button
                  shape="circle"
                  icon={<SettingOutlined />}
                  onClick={() => {
                    getDataHubConnectConfig_handle();
                    setDataHubConfigVisible(true);
                  }}
                />
              </Col>
            </Row>
          </DashBoardCard>
        </Col>

        <Col span={12}>
          <DashBoardCard
            title="MessageQueueSender"
            status={messageQueueStatus}
            greeninfo="Sending"
            redinfo="SendStopped"
          >
            <Row gutter={12}>
              <Col>
                <Button
                  disabled={messageQueueStatus}
                  type="primary"
                  shape="round"
                  onClick={startSendingToRabbitmq_handle}
                >
                  Send
                </Button>
              </Col>

              <Col>
                <Button
                  disabled={!messageQueueStatus}
                  type="primary"
                  shape="round"
                  onClick={stopSendingToRabbitmq_handle}
                  danger
                >
                  Stopsend
                </Button>
              </Col>
            </Row>
          </DashBoardCard>
        </Col>
      </Row>

      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          {datahubConnectMsg ? (
            <Alert
              style={{ borderRadius: 12 }}
              message="Informational Message"
              description={datahubConnectMsg}
              type={datahubConnectStatus ? "success" : "warning"}
              showIcon
            />
          ) : (
            ""
          )}
        </Col>
      </Row>

      <DataHubConnectConfigModal
        isModalVisible={datahubConfigVisible}
        setIsModalVisible={setDataHubConfigVisible}
        datahubConnecteConfig={currentDataHubConfig}
      ></DataHubConnectConfigModal>
    </>
  );
};

export default DashBoard;
