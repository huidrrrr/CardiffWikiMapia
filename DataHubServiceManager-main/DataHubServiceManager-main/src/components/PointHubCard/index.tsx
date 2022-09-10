import { Card, Button, Popconfirm, Table, message, Space } from "antd";
import React, { Dispatch } from "react";
import {
  addOnePointIntoPointHub,
  deletePointFromPointHubById_api,
  getAllPointsFromPointHub,
} from "../../requests/apis/PointHubApis";
import { BaseResponse } from "../../responses/base";
import { pointHub } from "./interface/pointHub";
import "../css/index.css";
import PointSelecter from "./PointSelecter";
import { deleteTableByName_api } from "../../requests/apis/DataBaseTableApis";

interface PointHubCardProps {
  title: string;
  pointList: string[];
  pointHubList: string[];
  setPointHubList: Dispatch<React.SetStateAction<string[] | undefined>>;
}

const PointHubCard: React.FC<PointHubCardProps> = (props) => {
  const { title, pointList, pointHubList, setPointHubList } = props;
  const [pointsList, setPointsList] = React.useState<pointHub[]>();
  const [pointSelecterModalVisible, setPointSelecterModalVisible] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    getPointsFromPointHub(title);
  }, []);

  const getPointsFromPointHub = (pointHubName: string) => {
    getAllPointsFromPointHub(pointHubName).then((res: BaseResponse) => {
      if (res.status == "200") {
        setPointsList(res.data);
        // console.log(res.data);
      }
    });
  };

  const deletePointFromPointHub_handle = (id: Number) => {
    deletePointFromPointHubById_api(title, id).then((res: BaseResponse) => {
      if (res.data == 1) {
        const newData = pointsList?.filter((item) => item.key !== id);
        setPointsList(newData);
        message.success("Delete Success!");
      } else {
        message.error("Delete Failed!");
      }
    });
  };

  const addPointToHub_handle = (pointName: string) => {
    addOnePointIntoPointHub(title, pointName).then((res: BaseResponse) => {
      if (res.status !== "200") {
        message.warning(`WARNING ${res.status} : ${res.msg}`);
      } else {
        message.success(`SUCCESS ${res.status} : ${res.msg}`);
        getPointsFromPointHub(title);
      }
    });
  };

  const deletePointHub_handle = () => {
    deleteTableByName_api(title).then((res: BaseResponse) => {
      if (res.status == "200") {
        const newData = pointHubList?.filter((item) => item !== title);
        setPointHubList(newData);
        message.success(`SUCCESS ${res.status} : ${res.msg}`);
      } else {
        message.warning(`WARNING ${res.status} : ${res.msg}`);
      }
    });
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: `PointName (${pointsList?.length})`,
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
    <>
      <Card
        className="yuki-card"
        style={{ marginBottom: 24 }}
        bordered={false}
        title={title}
        id={title}
        extra={
          <Space>
            <Button
              type="primary"
              onClick={() => {
                setPointSelecterModalVisible(true);
              }}
            >
              Edit
            </Button>
            <Button
              type="primary"
              onClick={() => {
                getPointsFromPointHub(title);
                message.info(`Refresh ${title}`);
              }}
            >
              Refresh
            </Button>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => {
                deletePointHub_handle();
              }}
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        }
      >
        <Table columns={columns} dataSource={pointsList}></Table>
      </Card>

      <PointSelecter
        title={title}
        pointHubList={pointsList ? pointsList : []}
        isModalVisible={pointSelecterModalVisible}
        setIsModalVisible={setPointSelecterModalVisible}
        pointList={pointList}
        addPointToHub={(pointName) => {
          addPointToHub_handle(pointName);
        }}
        deletePointFromPointHub_handle={deletePointFromPointHub_handle}
      ></PointSelecter>
    </>
  );
};

export default PointHubCard;
