import {
  Button,
  Card,
  Image,
  Tooltip,
  Form,
  Input,
  Upload,
  message,
  DatePicker
} from "antd";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { ReactSession } from "react-client-session";
import ImgCrop from "antd-img-crop";
import { EditOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";
import {
  addOneEventToDraft,
  getOnePlaceEventsByPlaceId,
} from "../helper/apiUtil";
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

const App = (props) => {
  const [activeTabKey1, setActiveTabKey1] = useState("introduction");

  const [formValues, setFormValues] = useState([]);
  const [event, setEvent] = useState(props.event);

  // eventForm state----------------------------------------------
  const eventFormInitialData = {
    name: event.name,
    date:event.date?event.date.toUTCString():null,
    subtitle: event.subtitle,
    content: event.content,
    upperName: event.upperName,
  };
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [inputBorder, setInputBorder] = useState(false);
  const [imgBase64, setImgBase64] = useState();
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: event.img,
    },
  ]);

  const [eventForm] = Form.useForm();

  const onValuesChange = (changedValues, allValues) => {
    setFormValues(allValues);
  };
  //  img upload--------------------------------------------------------
  const onChange = (fileList) => {
    if (fileList.fileList[0]) {
      fileToBase64(fileList.fileList[0].originFileObj, (value) => {
        setImgBase64(value);
        //   const {error, ...imgFileList }=fileList.fileList
        setFileList(fileList.fileList);
      });
    } else {
      setFileList(fileList.fileList);
    }
  };

  function fileToBase64(file, callback) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = function () {
      callback(this.result);
    };
  }
  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const inputStyle = { color: "black" };

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
      <div>
        <Form
          form={eventForm}
          onValuesChange={onValuesChange}
          initialValues={eventFormInitialData}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          disabled={componentDisabled}
        >
          <Form.Item label="Name" name="name">
            <Input bordered={inputBorder} style={inputStyle} />
          </Form.Item>
          <Form.Item label="Date" name="date">
          {!componentDisabled ? (
            <DatePicker
              // defaultValue={moment(placeDetailData.uploadDate)}
              bordered={inputBorder}
            />
          ) : (
            <Input bordered={inputBorder} style={{ color: "black" }} />
          )}
          </Form.Item>
          <Form.Item label="Subtitle" name="subtitle">
            <Input bordered={inputBorder} style={inputStyle} />
          </Form.Item>
          <Form.Item label="Content" name="content">
            <TextArea rows={12} bordered={inputBorder} style={inputStyle} />
          </Form.Item>
          <Form.Item label="Image">
            <ImgCrop rotate>
              <Upload
                beforeUpload={() => false}
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                maxCount={1}
              >
                {fileList.length < 5 && "+ Upload"}
              </Upload>
            </ImgCrop>
          </Form.Item>
          <Form.Item label="Upper" name="upperName">
            <Input bordered={inputBorder} style={inputStyle} />
          </Form.Item>
        </Form>
      </div>
    ),
  };

  const updateEvent = () => {
    const currentTime = new Date().toLocaleString() + "";

    addOneEventToDraft(formValues, props.placeId, ReactSession.get("id"), currentTime).then(
      (res) => {
        if (res.status === 200) {
          setComponentDisabled(true);
          setInputBorder(false);
          eventForm.setFieldsValue(eventFormInitialData);
          message.info("Submit successfully");
        } else {
          message.error("Submit failed");
        }
      }
    );
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
                      eventForm.setFieldValue(
                        "date",
                        moment(event.uploadDate)
                      );
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
                        eventForm.setFieldValue("date", event.date.toUTCString());
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
