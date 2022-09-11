import { Button, Card, Image, Tooltip, Form, Input, Upload, message } from "antd";
import React, { useState } from "react";
import ImgCrop from "antd-img-crop";
import { EditOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";
import EventForm from "./eventForm";
import {addOneEventToDraft,getOnePlaceEventsByPlaceId} from '../helper/apiUtil'
const { TextArea } = Input;
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

const  App = (props) => {
  const [activeTabKey1, setActiveTabKey1] = useState("introduction");
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [inputBorder, setInputBorder] = useState(false);
  const [formValues,setFormValues]=useState([])
  const [event,setEvent]=useState(props.event)
  const eventSonForm = Form.useFormInstance();

  const valuesChangeHandler = (allValues) => {
    setFormValues(allValues);
  };

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
      >
        <Form.Item label="Name">
          <Input
            bordered={false}
            value={event.name}
            style={{ color: "black" }}
          />
        </Form.Item>
        <Form.Item label="Subtitle">
          <Input
            bordered={false}
            value={event.subtitle}
            style={{ color: "black" }}
          />
        </Form.Item>
      </Form>
    ),
    detail: (
      <EventForm
        event={event}
        initComponentDisabled={componentDisabled}
        initInputBorder={inputBorder}
        changeValues={valuesChangeHandler}
      />
    ),
  };


  const updateEvent = () => {
    const currentTime = new Date().toLocaleString() + "";

    addOneEventToDraft(formValues,props.placeId,1,currentTime).then((res) => { 
      if(res.status===200){
        setComponentDisabled(true);
        setInputBorder(false);
        message.info('Submit successfully')
        
      }else{
        message.error('Submit failed')
      }

     })


  };

  return (
    <>
      <Card
        hoverable
        style={{
          width: "100%",
          textAlign: "left",
        }}
        title={event.name}
        extra={
          componentDisabled
            ? activeTabKey1 === "detail" && (
                <Tooltip title="Edit">
                  <Button
                    shape="circle"
                    onClick={() => {
                      setComponentDisabled(false);
                      setInputBorder(true);
                    }}
                    icon={<EditOutlined />}
                  ></Button>
                </Tooltip>
              )
            : activeTabKey1 === "detail" && (
                <div style={{ display: "flex", gap: "0.5rem" }}>
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
                        setInputBorder(false);
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
