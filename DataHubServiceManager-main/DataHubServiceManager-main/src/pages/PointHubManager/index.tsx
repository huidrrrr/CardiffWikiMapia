import {
  message,
  Row,
  Col,
  Anchor,
  Form,
  Input,
  Button,
  Card,
  Affix,
  BackTop,
} from "antd";
import React from "react";
import PointHubCard from "../../components/PointHubCard";
import {
  GetDataBaseTableList_api,
  addOnePointHub_api,
} from "../../requests/apis/DataBaseTableApis";
import { getPointsFromRedis_api } from "../../requests/apis/DataHubServiceApis";
import { BaseResponse } from "../../responses/base";
import "../../components/css/index.css";

const { Link } = Anchor;

interface AddPointHub {
  pointHubName: string;
}

const PointHubManager: React.FC = () => {
  const [pointHubTablesList, setPointHubTablesList] =
    React.useState<string[]>();
  const [pointList, setPointList] = React.useState<string[]>();
  const [addHub_btn_status, setAddHub_btn_status] =
    React.useState<boolean>(true);

  React.useEffect(() => {
    getPointHubTables_handle();
    getPointList();
  }, []);

  const getPointHubTables_handle = () => {
    GetDataBaseTableList_api("%_point_hub").then((res: BaseResponse) => {
      if (res.status == "200") {
        setPointHubTablesList(res.data);
        // message.success("SUCCESS Get PointHub Tables.");
      }
    });
  };

  const getPointList = () => {
    getPointsFromRedis_api("").then((res: BaseResponse) => {
      if (res.status == "200") {
        // console.log(res.data);
        setPointList(res.data);
      } else {
        message.error(`${res.status} ERROR Get point list! \n${res.data}`);
      }
    });
  };

  const addPointHub_handle = (pointHubName: string) => {
    setAddHub_btn_status(false);
    addOnePointHub_api(pointHubName).then((res: BaseResponse) => {
      if (res.status == "200") {
        message.success(`SUCCESS ${res.status} : ${res.msg}`);
        getPointHubTables_handle();
        setAddHub_btn_status(true);
      } else {
        message.warning(`WARNING ${res.status} : ${res.msg}`);
        setAddHub_btn_status(true);
      }
    });
  };

  return (
    <>
      <Row gutter={24}>
        <Col span={6}>
          <Affix offsetTop={12}>
            <Card
              className="yuki-card"
              title="PointHubManager"
              extra={
                <Button
                  type="primary"
                  onClick={() => {
                    message.info("Refresh pointhub tables.");
                    getPointHubTables_handle();
                  }}
                >
                  Refresh
                </Button>
              }
            >
              <Form
                layout="vertical"
                onFinish={(value: AddPointHub) => {
                  addPointHub_handle(value.pointHubName);
                }}
              >
                <Form.Item
                  label="PointHubName"
                  name="pointHubName"
                  rules={[
                    {
                      required: true,
                      message: "Please input pointhub name!",
                    },
                  ]}
                >
                  <Input placeholder="input pointhub name" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={!addHub_btn_status}
                  >
                    Add Hub
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Affix>
        </Col>

        <Col span={14}>
          {pointHubTablesList?.map((_, index) => {
            return (
              <PointHubCard
                title={pointHubTablesList[index]}
                key={pointHubTablesList[index]}
                pointList={pointList ? pointList : []}
                pointHubList={pointHubTablesList}
                setPointHubList={setPointHubTablesList}
              ></PointHubCard>
            );
          })}
        </Col>

        <Col span={4}>
          <Anchor
            style={{ marginTop: 24 }}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {pointHubTablesList?.map((_, index) => {
              return (
                <Link
                  key={index}
                  href={`/#${pointHubTablesList[index]}`}
                  title={pointHubTablesList[index]}
                />
              );
            })}
          </Anchor>
        </Col>
      </Row>

      <BackTop />
    </>
  );
};

export default PointHubManager;
