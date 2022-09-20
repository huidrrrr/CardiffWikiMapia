import { Button, Card, Form, Input, Tooltip, Upload,DatePicker, message } from "antd";
import React, { useState } from "react";
import ImgCrop from "antd-img-crop";
import {
  EditOutlined,
  CloseOutlined,
  PlusOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { addOneEvent,getOnePlaceEventsByPlaceId } from "../helper/apiUtil";
import { ReactSession } from "react-client-session";
const { TextArea } = Input;
const App = (props) => {
  const {placeId}= props;
  const [contentVisibility, setContentVisibility] = useState(false);
  const [addEventForm] = Form.useForm();
  const [fileList, setFileList] = useState([
    
  ]);
  const [imgBase64, setImgBase64] = useState();
  

  const addNewEvent = () => {
    const newEvent ={
      ...addEventForm.getFieldsValue(),
      img:imgBase64,
      upperId:ReactSession.get('id'),
      upperName:ReactSession.get('username')
    }
    addOneEvent(placeId,newEvent).then((res) => { 
      if(res.status===200){
        setContentVisibility(false)
        message.info('Add event successfully')
        getOnePlaceEventsByPlaceId(placeId).then((res) => { 
          if (res.status===200) {
            const eventsData = [];
            for (const key in res.data) {
              eventsData.push({
                id: key,
                ...res.data[key],
              });
            }
            props.updateEventLst(eventsData)
          }else{
            message.warn('Update failed')
          }
         })
      }else{
        message.warn('Add event failed')
      }

     })
  
  
  };

  const inputStyle = {
    color: "black",
  };

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

  return (
    <Card
      title="Add new event"
      extra={
        contentVisibility ? (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Tooltip title="Submit">
              <Button
                shape="circle"
                onClick={addNewEvent}
                icon={<CheckOutlined />}
              ></Button>
            </Tooltip>
            <Tooltip title="Close">
              <Button
                shape="circle"
                onClick={() => {
                  setContentVisibility(false);
                }}
                icon={<CloseOutlined />}
              ></Button>
            </Tooltip>
          </div>
        ) : (
          <Tooltip title="Add">
            <Button
              shape="circle"
              onClick={() => {
                setContentVisibility(true);
              }}
              icon={<PlusOutlined />}
            />
          </Tooltip>
        )
      }
    >
      {contentVisibility && (
        <Form
          form={addEventForm}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
        >
          <Form.Item label="Name" name="name">
            <Input style={inputStyle} />
          </Form.Item>
          <Form.Item label="Date" name="date">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Subtitle" name="subtitle">
            <Input style={inputStyle} />
          </Form.Item>
          <Form.Item label="Content" name="content">
            <TextArea rows={12} style={inputStyle} />
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
        </Form>
      )}
    </Card>
  );
};

export default App;
