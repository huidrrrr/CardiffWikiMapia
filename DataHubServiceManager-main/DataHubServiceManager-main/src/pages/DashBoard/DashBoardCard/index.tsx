import { Col, Row, Card, Typography } from "antd";
import {
  ThunderboltOutlined,
  ThunderboltFilled,
  SettingOutlined,
} from "@ant-design/icons";
import React from "react";
import "./index.css";
import "../../../components/css/index.css";

const { Title } = Typography;

interface DashBoardProps {
  title: string;
  status: boolean;
  greeninfo: string;
  redinfo: string;
  children: any;
}

const DashBoardCard: React.FC<DashBoardProps> = (props) => {
  const { title, status, greeninfo, redinfo, children } = props;

  return (
    <Card className="yuki-card" bordered={false}>
      <Row gutter={48}>
        <Col>
          <Row>
            <Col>
              <Title level={3}>
                <SettingOutlined /> {title}
              </Title>
            </Col>
          </Row>
          <Row>
            <Col>{children}</Col>
          </Row>
        </Col>

        <Col>
          <Row>
            <Col>
              <div
                className={status ? "statusbar_success" : "statusbar_error"}
              ></div>
            </Col>

            <Col>
              <Row>
                <Col>
                  <Title level={3}>
                    {status ? <ThunderboltFilled /> : <ThunderboltOutlined />}{" "}
                    Status
                  </Title>
                </Col>
              </Row>
              <Row>
                <Col>
                  {status ? (
                    <Title
                      level={5}
                      style={{ color: "rgb(0, 230, 0)", fontWeight: "bolder" }}
                    >
                      {greeninfo}
                    </Title>
                  ) : (
                    <Title
                      level={5}
                      style={{ color: "red", fontWeight: "bolder" }}
                    >
                      {redinfo}
                    </Title>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default DashBoardCard;
