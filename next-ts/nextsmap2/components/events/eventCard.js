import { Button, Card, Image, Tooltip, Form, Input } from "antd";
import React, { useState } from "react";
import { EditOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";
const tabList = [
  {
    key: "introduction",
    tab: "Introduction",
  },
  {
    key: "detail",
    tab: "Detail",
  },
];

const App = (props) => {
  const [activeTabKey1, setActiveTabKey1] = useState("introduction");
  const [componentDisabled, setComponentDisabled] = useState(true);
  const { event } = props;

  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };
  const contentList = {
    introduction: (
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        disabled={componentDisabled}
      >
        <Form.Item label="Input">
          <Input />
        </Form.Item>
      </Form>
    ),
    eventImg: <Image src={event.img} alt="" />,
    detail: <p>aaa</p>,
  };

  const updateEvent = () => {};

  return (
    <>
      <Card
        style={{
          width: "100%",
          textAlign: "left",
        }}
        title={event.name}
        extra={
          componentDisabled ? (
            <Tooltip title="Edit">
              <Button
                shape="circle"
                onClick={() => {
                  setComponentDisabled(false);
                }}
                icon={<EditOutlined />}
              ></Button>
            </Tooltip>
          ) : (
            <div style={{display:'flex',gap:'0.5rem'}}>
              <Tooltip title="Update">
                <Button
                  shape="circle"
                  onClick={updateEvent}
                  icon={<CheckOutlined />}
                ></Button>
              </Tooltip>
              <Tooltip title="Close">
                <Button
                  shape="circle"
                  onClick={() => {
                    setComponentDisabled(true);
                  }}
                  icon={<CloseOutlined />}
                ></Button>
              </Tooltip>
            </div>
          )
        }
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={(key) => {
          onTab1Change(key);
        }}
      >
        {contentList[activeTabKey1]}
      </Card>
    </>
  );
};

export default App;
