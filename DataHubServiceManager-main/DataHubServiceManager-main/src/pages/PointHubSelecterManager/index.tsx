import {
  Anchor,
  Col,
  message,
  Row,
  Form,
  Button,
  Input,
  Card,
  Affix,
  BackTop,
} from "antd";
import React from "react";
import {
  addOnePointHubSelecter_api,
  GetDataBaseTableList_api,
} from "../../requests/apis/DataBaseTableApis";
import { BaseResponse } from "../../responses/base";
import PointHubSelecterCard from "../../components/PointHubSelecterCard";

const { Link } = Anchor;

interface AddPointHubSelecter {
  pointHubSelecterName: string;
}

const PointHubSelecterManager: React.FC = () => {
  const [pointHubSelecterTablesList, setPointHubSelecterTablesList] =
    React.useState<string[]>();
  const [addHubSelecter_btn_status, setAddHubSelecter_btn_status] =
    React.useState<boolean>(true);
  const [allPointHubList, setAllPointHubList] = React.useState<string[]>([]);

  React.useEffect(() => {
    getPointHubSelecterTables_handle();
    getAllPointHubTables_handle();
  }, []);

  const getPointHubSelecterTables_handle = () => {
    GetDataBaseTableList_api("%_point_hub_selecter").then(
      (res: BaseResponse) => {
        if (res.status == "200") {
          setPointHubSelecterTablesList(res.data);
          // message.success("SUCCESS Get PointHub Tables.");
        } else {
          message.warning("ERROR Get PointHubSelecter Tables.");
        }
      }
    );
  };

  const getAllPointHubTables_handle = () => {
    GetDataBaseTableList_api("%_point_hub").then((res: BaseResponse) => {
      if (res.status == "200") {
        setAllPointHubList(res.data);
        // message.success("SUCCESS Get PointHub Tables.");
      } else {
        message.warning("ERROR Get PointHubSelecter Tables.");
      }
    });
  };

  const addPointHubSelecter_handle = (pointHubSelecterName: string) => {
    setAddHubSelecter_btn_status(false);
    addOnePointHubSelecter_api(pointHubSelecterName).then(
      (res: BaseResponse) => {
        if (res.status == "200") {
          message.success(`SUCCESS ${res.status} : ${res.msg}`);
          getPointHubSelecterTables_handle();
          setAddHubSelecter_btn_status(true);
        } else {
          message.warning(`WARNING ${res.status} : ${res.msg}`);
          setAddHubSelecter_btn_status(true);
        }
      }
    );
  };

  return (
    <>
      <Row gutter={24}>
        <Col span={6}>
          <Affix offsetTop={12}>
            <Card
              className="yuki-card"
              title="PointHubSelecterManager"
              extra={
                <Button
                  type="primary"
                  onClick={() => {
                    message.info("Refresh pointhub tables.");
                  }}
                >
                  Refresh
                </Button>
              }
            >
              <Form
                layout="vertical"
                onFinish={(value: AddPointHubSelecter) => {
                  addPointHubSelecter_handle(value.pointHubSelecterName);
                }}
              >
                <Form.Item
                  label="PointHubSelecterName"
                  name="pointHubSelecterName"
                  rules={[
                    {
                      required: true,
                      message: "Please input pointhubselecter name!",
                    },
                  ]}
                >
                  <Input placeholder="input pointhubselecter name" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={!addHubSelecter_btn_status}
                  >
                    Add Selecter
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Affix>
        </Col>

        <Col span={14}>
          {pointHubSelecterTablesList?.map((_, index) => {
            return (
              <PointHubSelecterCard
                title={pointHubSelecterTablesList[index]}
                key={pointHubSelecterTablesList[index]}
                pointHubSelecterList={pointHubSelecterTablesList}
                setPointHubSelecterList={setPointHubSelecterTablesList}
                allPointHubList={allPointHubList}
              ></PointHubSelecterCard>
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
            {pointHubSelecterTablesList?.map((_, index) => {
              return (
                <Link
                  key={index}
                  href={`/#${pointHubSelecterTablesList[index]}`}
                  title={pointHubSelecterTablesList[index]}
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

export default PointHubSelecterManager;
