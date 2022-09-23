import {
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Table,
  Typography,
  Avatar
} from "antd";
import React, { useState } from "react";
import {
  updateUserById,
  deleteUserById,
  getAllUsers,
} from "../helper/userApiUtil";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
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

const convertor=(userLst) => { 
   const convertedUserLst=userLst.map((user) => { 
    const convertedUser = {
      ...user,
      img:<Avatar
      size={"large"}
      src={user.avatar}
    />
     }
     return convertedUser

    })

    return convertedUserLst
 }
const AdminPanel = (props) => {
  // get data---------------------
  const { usersLst } = props;
  
  
  const [form] = Form.useForm();
  const [data, setData] = useState(convertor(usersLst));
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });

        delete newData.key;
        updateUserById(editingKey, newData[index]).then((res) => {
          if (res.status === 200) {
            message.info("update successfully");
            setData(newData);
          } else {
            message.warn("update failed");
          }
        });
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const deleteHandler = (key) => {
    deleteUserById(key).then((res) => {
      if(res.status===200){
        message.info('delete successfully')
        getAllUsers().then((res) => { 
          setData(res)
         })
      }else{
        message.warn('delete failed')
      }
    });
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "img",
      width: "5%",
    },
    {
      title: "id",
      dataIndex: "key",
      width: "5%",
      editable: true,
    },
    {
      title: "username",
      dataIndex: "username",
      width: "17%",
      editable: true,
    },
    {
      title: "password",
      dataIndex: "password",
      width: "17%",
      editable: true,
    },
    {
      title: "firstname",
      dataIndex: "firstname",
      width: "17%",
      editable: true,
    },
    {
      title: "surname",
      dataIndex: "surname",
      width: "17%",
      editable: true,
    },
    {
      title: "permission",
      dataIndex: "permission",
      width: "17%",
      editable: true,
    },
    {
      title: "Action",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
              style={{
                marginRight: 15,
              }}
            >
              Edit
            </Typography.Link>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => {
                deleteHandler(record.key);
              }}
            >
              <a style={{ color: "red" }}>Delete</a>
            </Popconfirm>
          </span>
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
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "password" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default AdminPanel;
