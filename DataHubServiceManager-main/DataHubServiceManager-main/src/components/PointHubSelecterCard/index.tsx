import { Card, Space, Button, Popconfirm, Table, message } from "antd";
import React, { Dispatch } from "react";
import { deleteTableByName_api } from "../../requests/apis/DataBaseTableApis";
import {
  addOnePointHubIntoPointHubSelecter_api,
  deletePointHubFromPointHubSelectById_api,
  getAllPointHubFromPointHubSelecter_api,
} from "../../requests/apis/PointHubSelecterApis";
import { BaseResponse } from "../../responses/base";
import "../css/index.css";
import { pointHubSelecter } from "./interface/pointHubSelecter";
import PointHubSelecter from "./PointHubSelecter";

interface PointHubSelecterCardProps {
  title: string;
  pointHubSelecterList: string[];
  allPointHubList: string[];
  setPointHubSelecterList: Dispatch<React.SetStateAction<string[] | undefined>>;
}

const PointHubSelecterCard: React.FC<PointHubSelecterCardProps> = (props) => {
  const {
    title,
    pointHubSelecterList,
    allPointHubList,
    setPointHubSelecterList,
  } = props;
  const [pointHubList, setPointHubList] = React.useState<pointHubSelecter[]>([]);
  const [pointHubSelecterModalVisible, setPointHubSelecterModalVisible] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    getPointHubFromPointHubSelecter_handle(title);
  }, []);

  const getPointHubFromPointHubSelecter_handle = (
    pointHubSelecterName: string
  ) => {
    getAllPointHubFromPointHubSelecter_api(pointHubSelecterName).then(
      (res: BaseResponse) => {
        if (res.status == "200") {
          setPointHubList(res.data);
        }
      }
    );
  };

  const addPointHubToSelecter_handle = (pointHubName: string) => {
    addOnePointHubIntoPointHubSelecter_api(title, pointHubName).then(
      (res: BaseResponse) => {
        if (res.status !== "200") {
          message.warning(`WARNING ${res.status} : ${res.msg}`);
        } else {
          message.success(`SUCCESS ${res.status} : ${res.msg}`);
          getPointHubFromPointHubSelecter_handle(title);
        }
      }
    );
  };

  const deletePointHubSelecter_handle = () => {
    deleteTableByName_api(title).then((res: BaseResponse) => {
      if (res.status == "200") {
        const newData = pointHubSelecterList?.filter((item) => item !== title);
        setPointHubSelecterList(newData);
        message.success(`SUCCESS ${res.status} : ${res.msg}`);
      } else {
        message.warning(`WARNING ${res.status} : ${res.msg}`);
      }
    });
  };

  const deletePointHubFromPointHubSelecter_handle = (id: Number) => {
    deletePointHubFromPointHubSelectById_api(title, id).then(
      (res: BaseResponse) => {
        if (res.data == 1) {
          const newData = pointHubList?.filter((item) => item.key !== id);
          setPointHubList(newData);
          message.success("Delete Success!");
        } else {
          message.error("Delete Failed!");
        }
      }
    );
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: `PointHubName (${pointHubList?.length})`,
      dataIndex: "pointHubName",
      key: "pointHubName",
    },
    {
      title: "Operation",
      dataIndex: "operation",
      width: 100,
      render: (_: any, record: pointHubSelecter) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => {
            console.log(record);
            deletePointHubFromPointHubSelecter_handle(record.id);
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
                setPointHubSelecterModalVisible(true);
              }}
            >
              Add
            </Button>
            <Button
              type="primary"
              onClick={() => {
                getPointHubFromPointHubSelecter_handle(title);
                message.info(`Refresh ${title}`);
              }}
            >
              Refresh
            </Button>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => {
                deletePointHubSelecter_handle();
              }}
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        }
      >
        <Table columns={columns} dataSource={pointHubList}></Table>
      </Card>

      <PointHubSelecter
        title={title}
        isModalVisible={pointHubSelecterModalVisible}
        setIsModalVisible={setPointHubSelecterModalVisible}
        pointHubList={allPointHubList}
        currentPointHubList={pointHubList}
        addPointHubToSelecter={(pointHubName) => {
          addPointHubToSelecter_handle(pointHubName);
        }}
        deletePointHubFromPointHubSelecter_handle={(id) => {
          deletePointHubFromPointHubSelecter_handle(id);
        }}
      ></PointHubSelecter>
    </>
  );
};

export default PointHubSelecterCard;
