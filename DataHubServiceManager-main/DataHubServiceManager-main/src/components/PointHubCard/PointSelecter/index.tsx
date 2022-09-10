import {
  Modal,
  Input,
  Divider,
  Collapse,
  Button,
  Row,
  Col,
  Table,
  Popconfirm,
  Card,
} from "antd";
import React, { Dispatch } from "react";
import { pointHub } from "../interface/pointHub";
import PointList from "./PointList";

const { Search } = Input;
const { Panel } = Collapse;

interface PointSelecterProps {
  title: string;
  pointHubList: pointHub[];
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<React.SetStateAction<boolean>>;
  pointList: string[];
  addPointToHub: (pointName: string) => void;
  deletePointFromPointHub_handle: (id: Number) => void;
}

const PointSelecter: React.FC<PointSelecterProps> = (props) => {
  const {
    title,
    pointHubList,
    isModalVisible,
    setIsModalVisible,
    pointList,
    addPointToHub,
    deletePointFromPointHub_handle,
  } = props;
  const [searchPointListResult, setSearchPointListResult] =
    React.useState<string[]>();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const pointListFuzzyQuery = (keyWord: string) => {
    if (keyWord !== "") {
      let result = fuzzyQuery(pointList, keyWord);
      setSearchPointListResult(result);
    } else {
      setSearchPointListResult([]);
    }
  };

  const fuzzyQuery = (list: string[], keyWord: string) => {
    let arr = list.filter((item) => {
      return item.toLowerCase().indexOf(keyWord.toLowerCase()) >= 0;
    });
    return arr;
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: `PointName (${pointHubList?.length})`,
      dataIndex: "pointName",
      key: "pointName",
    },
    {
      title: "Operation",
      dataIndex: "operation",
      width: 100,
      render: (_: any, record: pointHub) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => {
            console.log(record);
            deletePointFromPointHub_handle(record.id);
          }}
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Modal
      title="Select Point"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleOk}
      width={1200}
    >
      <Row gutter={12}>
        <Col span={12}>
          <Search
            placeholder="input point name"
            onSearch={() => {}}
            onChange={(e) => {
              pointListFuzzyQuery(e.target.value);
            }}
            allowClear
            enterButton={searchPointListResult?.length}
          />
          <PointList
            dataSource={searchPointListResult ? searchPointListResult : []}
            addPointToHub={addPointToHub}
          />

          <Divider />

          <Collapse>
            <Panel header={`All Point List (${pointList.length})`} key="1">
              <PointList dataSource={pointList} addPointToHub={addPointToHub} />
            </Panel>
          </Collapse>
        </Col>

        <Col span={12}>
          <Card title={title}>
            <Table columns={columns} dataSource={pointHubList}></Table>
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

export default PointSelecter;
