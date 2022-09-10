import { Button, Card, Col, Collapse, List, Modal, Popconfirm, Row, Table } from "antd";
import { Dispatch } from "react";
import { pointHubSelecter } from "../interface/pointHubSelecter";

const { Panel } = Collapse;

interface PointHubSelecterProps {
  title: string;
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<React.SetStateAction<boolean>>;
  pointHubList: string[];
  currentPointHubList: pointHubSelecter[];
  addPointHubToSelecter: (pointHubName: string) => void;
  deletePointHubFromPointHubSelecter_handle: (id: Number) => void;
}

const PointHubSelecter: React.FC<PointHubSelecterProps> = (props) => {
  const {
    title,
    isModalVisible,
    setIsModalVisible,
    pointHubList,
    currentPointHubList,
    addPointHubToSelecter,
    deletePointHubFromPointHubSelecter_handle,
  } = props;

  const handleOk = () => {
    setIsModalVisible(false);
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
    <Modal
      title="Select PointHub"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleOk}
      destroyOnClose={true}
      width={1200}
    >
      <Row gutter={12}>
        <Col span={12}>
          <Collapse defaultActiveKey={['1']}>
            <Panel header={`All Point List (${pointHubList.length})`} key="1">
              <List
                itemLayout="vertical"
                pagination={{}}
                dataSource={pointHubList}
                renderItem={(item: any) => {
                  return (
                    <List.Item>
                      <Row justify="space-between">
                        <Col>
                          <Button
                            type="text"
                            onClick={() => {
                              console.log(item);
                              addPointHubToSelecter(item);
                            }}
                          >
                            {item}
                          </Button>
                        </Col>
                      </Row>
                    </List.Item>
                  );
                }}
              ></List>
            </Panel>
          </Collapse>
        </Col>

        <Col span={12}>
          <Card title={title}>
            <Table columns={columns} dataSource={currentPointHubList}></Table>
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

export default PointHubSelecter;
