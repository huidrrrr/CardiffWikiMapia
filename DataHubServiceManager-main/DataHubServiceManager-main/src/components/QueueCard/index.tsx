import {
  Table,
  Input,
  InputNumber,
  Button,
  Card,
  message,
  Popconfirm,
  Form,
  Space,
} from "antd";
import React from "react";
import { deleteOneRabbitmqQueuesById_api, updateOneRabbitmqQueueById_api } from "../../requests/apis/RabbitmqQueueApis";
import { BaseResponse } from "../../responses/base";
import { RabbitmqQueueItem } from "../../responses/RabbitmqQueueResponse";
import AddQueueModal from "./AddPointHubSelecter";
import PointHubSelecter from "./PointHubSelecter";
import "../css/index.css"

interface QueueCardProps {
  queueData: RabbitmqQueueItem[];
  getQueuesData: () => void;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text" | "pointHubSelecterName";
  record: RabbitmqQueueItem;
  index: number;
  children: React.ReactNode;
}

const QueueCard: React.FC<QueueCardProps> = (props) => {
  const { queueData, getQueuesData } = props;
  const [form] = Form.useForm();
  const [editingKey, setEditingKey]: any = React.useState("");
  const [rabbitmqQueueData, setRabbitMqQueueData] =
    React.useState<RabbitmqQueueItem[]>();
  const [addQueueModalVisible, setAddQueueModalVisible] = React.useState<boolean>(false);
  let currentSelectPointHubSelecter: string = "";

  React.useEffect(() => {
    setRabbitMqQueueData(queueData);
  }, [queueData]);

  const isEditing = (record: RabbitmqQueueItem) => record.key === editingKey;

  const edit = (record: Partial<RabbitmqQueueItem> & { key: React.Key }) => {
    form.setFieldsValue({
      id: record.id,
      queueName: "",
      pointHubSelecterName: "",
      comment: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel_edit = () => {
    setEditingKey("");
  };

  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    let inputNode;
    switch (inputType) {
      case "number":
        inputNode = <InputNumber />;
        break;
      case "pointHubSelecterName":
        inputNode = (
          <PointHubSelecter
            defaultSelectValue={(record.pointHubSelecterName == null) ? "" : record.pointHubSelecterName}
            getCurrentValue={(value) => {
              // console.log("select", value);
              currentSelectPointHubSelecter = value;
            }}
          />
        );
        break;
      default:
        inputNode = <Input />;
        break;
    }

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const save_edit = async (items: React.Key) => {
    setEditingKey("");
    try {
      let row = (await form.validateFields()) as RabbitmqQueueItem;
      if (
        row.pointHubSelecterName !== currentSelectPointHubSelecter &&
        currentSelectPointHubSelecter !== ""
      ) {
        row.pointHubSelecterName = currentSelectPointHubSelecter;
      }

      let m_queueItem = row;
      m_queueItem.id = Number(items);
      (m_queueItem.pointHubSelecterName == " ") ? m_queueItem.pointHubSelecterName = null : m_queueItem.pointHubSelecterName;
      /* 修改当且列 START */
      await updateOneRabbitmqQueueById_api(m_queueItem).then((res: any) => {
        let m_res: BaseResponse = res;
        if (m_res.data == 0) {
          message.warning(`Save Failed ${m_res.data}`);
          return;
        }
        message.success(`Save Success id = ${items}, Count: ${m_res.data}`);
      }).catch((err) => {
        message.error("Save Failed");
        console.log(err);
        return;
      })
      /* 修改当且列 END */

      const newData = [...(rabbitmqQueueData || [])];
      const index = newData.findIndex((item) => items === item.key);
      if (index > -1) {
        const item = newData[index];
        item.pointHubSelecterName = currentSelectPointHubSelecter;
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setRabbitMqQueueData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setRabbitMqQueueData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const confirm_delete = (key: React.Key) => {
    let currentItem: RabbitmqQueueItem =
      rabbitmqQueueData![
        !undefined
          ? rabbitmqQueueData!.findIndex((item) => item.key === key)
          : 0
      ];

    deleteOneRabbitmqQueuesById_api(currentItem.id)
      .then((res: any) => {
        if (res.data == 1) {
          const newData = rabbitmqQueueData?.filter((item) => item.key !== key);
          setRabbitMqQueueData(newData);
          message.success("Delete Success!");
        } else {
          message.error("Delete Failed!");
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Delete Failed!");
      });
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "QueueName",
      dataIndex: "queueName",
      key: "queueName",
      editable: true,
    },
    {
      title: "PointHubSelecter",
      dataIndex: "pointHubSelecterName",
      key: "pointHubSelecterName",
      editable: true,
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      editable: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_: any, record: RabbitmqQueueItem) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button
              type="primary"
              onClick={() => {
                cancel_edit();
              }}
            >
              Cancel
            </Button>
            <Button onClick={() => save_edit(record.key)} type="primary">
              Save
            </Button>
          </Space>
        ) : (
          <Space>
            <Button
              type="primary"
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Button>

            <Popconfirm
              title="Are you sure to delete this item?"
              onConfirm={() => confirm_delete(record.key)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: RabbitmqQueueItem) => ({
        record,
        inputType: col.dataIndex,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <Form form={form}>
        <Card
          title="QueueOverView"
          className="yuki-card"
          extra={
            <Space>
              <Button type="primary" onClick={() => {setAddQueueModalVisible(true)}}>Add</Button>
              <Button type="primary" onClick={getQueuesData}>
                Refresh
              </Button>
            </Space>
          }
        >
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={rabbitmqQueueData}
            columns={mergedColumns}
            pagination={{
              onChange: cancel_edit,
            }}
          />
        </Card>
      </Form>

      <AddQueueModal isModalVisible={addQueueModalVisible} setIsModalVisible={setAddQueueModalVisible} getQueuesData={getQueuesData}></AddQueueModal>
    </>
  );
};

export default QueueCard;
