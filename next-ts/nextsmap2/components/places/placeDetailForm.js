import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
  Tooltip,
} from "antd";
import ImgCrop from "antd-img-crop";
import { EditOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const App = (props) => {
  const { placeDetailData } = props;
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [inputBorder, setInputBorder] = useState(false);
  const [placeForm] = Form.useForm();
  const [imgBase64, setImgBase64] = useState();
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: placeDetailData ? placeDetailData.img : "",
    },
  ]);
  //  upload img------------------
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
  const eventFormInitialData = {
    name: placeDetailData.name,
    category: placeDetailData.category,
    date: placeDetailData.uploadDate,
    description: placeDetailData.description,
    content: placeDetailData.content,
    upperName: placeDetailData.upperName,
  };
  const inputStyle = { color: "black" };

  const updateEvent = () => {};

  return (
    <div style={{ width: "24rem", minWidth: "20rem", marginLeft: "12rem" }}>
      {componentDisabled ? (
        <div style={{ marginLeft: "20rem" }}>
          <Tooltip title="Edit">
            <Button
              shape="circle"
              onClick={() => {
                placeForm.setFieldValue(
                  "date",
                  moment(placeDetailData.uploadDate)
                );
                setComponentDisabled(false);
                setInputBorder(true);
              }}
              icon={<EditOutlined />}
            ></Button>
          </Tooltip>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "0.5rem", marginLeft: "20rem" }}>
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
                placeForm.setFieldValue("date", placeDetailData.uploadDate);
                setComponentDisabled(true);
                setInputBorder(false);
              }}
              icon={<CloseOutlined />}
            ></Button>
          </Tooltip>
        </div>
      )}
      <Form
        initialValues={eventFormInitialData}
        form={placeForm}
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
          <Input bordered={inputBorder} style={{ color: "black" }} />
        </Form.Item>

        <Form.Item label="Category" name="category">
          {!componentDisabled ? (
            <Select
              bordered={inputBorder}
              defaultValue={placeDetailData.category}
              style={{ color: "black" }}
            >
              <Select.Option value="shop">shop</Select.Option>
              <Select.Option value="restaurant">restaurant</Select.Option>
              <Select.Option value="railwayStation">
                railway station
              </Select.Option>
              <Select.Option value="hotel">hotel</Select.Option>
              <Select.Option value="other">other</Select.Option>
            </Select>
          ) : (
            <Input bordered={inputBorder} style={{ color: "black" }} />
          )}
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
        <Form.Item label="Description" name="description">
          <TextArea
            rows={4}
            bordered={inputBorder}
            style={{ color: "black" }}
          />
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList">
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
      </Form>
    </div>
  );
};

export default App;
