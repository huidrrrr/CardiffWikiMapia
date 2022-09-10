import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  List,
  message,
  Popconfirm,
  Row,
} from "antd";
import React, { Dispatch } from "react";
import "../css/index.css";
import { BaseResponse } from "../../responses/base";
import {
  deletePointFromRedis_api,
  getPointDataFromRedis_api,
} from "../../requests/apis/DataHubServiceApis";

const { Search } = Input;

interface PointCardProps {
  title: string;
  pointList: string[];
  setPointList: Dispatch<React.SetStateAction<string[]>>;
  getPointList: () => void;
}

const PointCard: React.FC<PointCardProps> = (props) => {
  const { title, pointList, setPointList, getPointList } = props;

  const [showPointData_btn_status, setShowPointData_btn_status] =
    React.useState<boolean>(true);
  const [searhResult, setSearchResult] = React.useState<string[]>(pointList);
  const [currentPointName, setCurrentPointName] = React.useState<string>("");
  const [currentPointData, setCurrentPointData] = React.useState<string>("");
  const [currentSearch, setCurrentSearch] = React.useState<string>("");

  const deletePoint_handle = (pointName: string) => {
    deletePointFromRedis_api(pointName).then((res: BaseResponse) => {
      if (res.data == true) {
        const newData = searhResult?.filter((item) => item !== pointName);
        setSearchResult(newData);

        const newData2 = pointList?.filter((item) => item !== pointName);
        setPointList(newData2);

        getPointList();
        message.success(`SUCCESS Delete point ${pointName}.`);
      } else {
        message.warning(`WARNING Delete point ${pointName} failed!`);
      }
    });
  };

  const getPointData_handle = (pointName: string) => {
    setShowPointData_btn_status(false);
    setCurrentPointName(pointName);
    getPointDataFromRedis_api(pointName).then((res: BaseResponse) => {
      if (res.status == "200") {
        let formatData = JSON.stringify(res.data, null, 4);
        setCurrentPointData(formatData);
      } else {
        message.warning(`WARNING ${res.status} : ${res.msg}`);
      }
      setShowPointData_btn_status(true);
    });
  };

  const pointListFuzzyQuery = (keyWord: string) => {
    setCurrentSearch(keyWord);
    if (keyWord !== "") {
      let result = fuzzyQuery(pointList, keyWord);
      setSearchResult(result);
    } else {
      setSearchResult(pointList);
    }
  };

  const fuzzyQuery = (list: string[], keyWord: string) => {
    let arr = list.filter((item) => {
      return item.toLowerCase().indexOf(keyWord.toLowerCase()) >= 0;
    });
    return arr;
  };

  return (
    <Card title={title + " (" + pointList.length + ")"} className="yuki-card">
      <Row>
        <Search
          placeholder="input point name"
          onSearch={() => {}}
          onChange={(e) => {
            pointListFuzzyQuery(e.target.value);
          }}
          allowClear
          enterButton={searhResult?.length}
        />
      </Row>

      <Row>
        <Divider />
      </Row>

      <Row gutter={24}>
        <Col span={currentPointData == "" ? 24 : 16}>
          <List
            itemLayout="vertical"
            dataSource={currentSearch != "" ? searhResult : pointList}
            renderItem={(item: any) => (
              <List.Item>
                <Row justify="space-between">
                  <Col>
                    <Button
                      type="text"
                      onClick={() => {
                        getPointData_handle(item);
                      }}
                      loading={!showPointData_btn_status}
                    >
                      {item}
                    </Button>
                  </Col>

                  <Col>
                    <Popconfirm
                      title="Sure to delete?"
                      onConfirm={() => {
                        deletePoint_handle(item);
                      }}
                    >
                      <Button type="primary" danger>
                        Delete
                      </Button>
                    </Popconfirm>
                  </Col>
                </Row>
              </List.Item>
            )}
            pagination={{}}
          />
        </Col>

        <Col span={8}>
          <Card bordered title={currentPointName}>
            <pre>{currentPointData}</pre>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default PointCard;
