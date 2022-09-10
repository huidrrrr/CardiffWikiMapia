import { List, Row, Col, Button, message } from "antd";
import { DatabaseOutlined } from "@ant-design/icons";

import React from "react";
import { getPointDataFromRedis_api } from "../../../../requests/apis/DataHubServiceApis";
import { BaseResponse } from "../../../../responses/base";
import PointDataModal from "../../../PointDataModal";

interface PointListProps {
  dataSource: string[];
  addPointToHub: (pointName: string) => void;
}

const PointList: React.FC<PointListProps> = (props) => {
  const { dataSource, addPointToHub } = props;

  const [showPointData_btn_status, setShowPointData_btn_status] =
    React.useState<boolean>(true);
  const [currentPointName, setCurrentPointName] = React.useState<string>("");
  const [currentPointData, setCurrentPointData] = React.useState<string>("");
  const [pointDataModalVisible, setPointDataModalVisible] =
    React.useState<boolean>(false);

  const getPointData_handle = (pointName: string) => {
    setShowPointData_btn_status(false);
    setCurrentPointName(pointName);
    getPointDataFromRedis_api(pointName).then((res: BaseResponse) => {
      if (res.status == "200") {
        setPointDataModalVisible(true);
        let formatData = JSON.stringify(res.data, null, 4);
        setCurrentPointData(formatData);
      } else {
        message.warning(`WARNING ${res.status} : ${res.msg}`);
      }
      setShowPointData_btn_status(true);
    });
  };

  return (
    <>
      <List
        itemLayout="vertical"
        pagination={{}}
        dataSource={dataSource}
        renderItem={(item: any) => {
          return (
            <List.Item>
              <Row justify="space-between">
                <Col>
                  <Button
                    type="text"
                    onClick={() => {
                      addPointToHub(item);
                    }}
                  >
                    {item}
                  </Button>
                </Col>

                <Col>
                  <Button
                    icon={<DatabaseOutlined />}
                    onClick={() => {
                      getPointData_handle(item);
                    }}
                    loading={!showPointData_btn_status}
                  />
                </Col>
              </Row>
            </List.Item>
          );
        }}
      />

      <PointDataModal
        pointName={currentPointName}
        pointData={currentPointData}
        isModalVisible={pointDataModalVisible}
        setIsModalVisible={setPointDataModalVisible}
      ></PointDataModal>
    </>
  );
};

export default PointList;
