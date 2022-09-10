import React, { useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";
import { Form, Input, Upload } from "antd";

const { TextArea } = Input;
const EventForm = (props) => {
  const { event, initComponentDisabled, initInputBorder } = props;
  const [componentDisabled, setComponentDisabled] = useState();
  const [inputBorder, setInputBorder] = useState();
  const [imgBase64, setImgBase64] = useState();
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: event.img,
    },
  ]);

  //   check status change-----------------------------------
  useEffect(() => {
    setComponentDisabled(initComponentDisabled);
    setInputBorder(initInputBorder);
  }, [initComponentDisabled, initInputBorder]);
  // call function when values change---------------------------
  const onValuesChange = (changedValues, allValues) => {
    props.changeValues(allValues);
  };
  //  img upload--------------------------------------------------------
  const onChange = (fileList) => {
    if(fileList.fileList[0]){
      fileToBase64(fileList.fileList[0].originFileObj, (value) => {
        setImgBase64(value);
        //   const {error, ...imgFileList }=fileList.fileList
        setFileList(fileList.fileList);
      });
    }else{
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

  return (
    <div>
      <Form
        onValuesChange={onValuesChange}
        initialValues={{
          name: event.name,
          subtitle: event.subtitle,
          content: event.content,
          upperId: event.upperId,
        }}
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
        <Form.Item label="Upper" name="upperId">
          <Input bordered={inputBorder} style={inputStyle} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default EventForm;
