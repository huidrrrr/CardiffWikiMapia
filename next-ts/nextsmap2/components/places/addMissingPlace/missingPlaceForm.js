import React, { useState } from "react";
import { Form, Input, Button, Select, message, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { addOneMissingPlace, getAllPlaces, getPlusCode } from "../../helper/apiUtil";
import { ReactSession } from "react-client-session";
import moment from "moment";
const { TextArea } = Input;
export default function MissingPlaceForm(props) {
  // image base64-------------------------------
  const [imgBase64, setImgBase64] = useState();
  const [fileList, setFileList] = useState([]);
  // pluscode--------------------------------------
  const [plusCode, setPlusCode] = useState();
  const { position } = props;
  const currentTime = moment().format();
  getPlusCode(position).then((res) => {
    setPlusCode(res);
  });

  // upload image-------------------------------------------------
  const onChange = (fileList) => {
    fileToBase64(fileList.fileList[0].originFileObj, (value) => {
      setImgBase64(value);
      setFileList(fileList.fileList);
    });
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
  // upload a missing place--------------------------------
  const onFinish = (values) => {
    if(!ReactSession.get("id")){
      message.warn('Please log in!')
    }else{
      const { name, description, category } = values;
      const newPlace = {
        name: name,
        category: category,
        description: description,
        position: {
          lat: position.lat,
          lng: position.lng,
        },
        plusCode: plusCode,
        img: imgBase64,
        events: {},
        comments: {},
        date:currentTime,
        upperId:ReactSession.get("id")
        
      };
      addOneMissingPlace(newPlace).then((res) => {
        if (res.status === 200) {
          message.info("Add place successfully!");
          getAllPlaces().then((res) => {
            
          props.refreshPage(res.data)
           })
        }else{
          message.warn("Add place failed")
        }
      });
    }


  };

  return (
    <div>
      <Form
        style={{ display: "flex", flexDirection: "column" }}
        labelCol={{
          span: 7,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input place name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Category" name="category">
          <Select>
            <Select.Option value="shop">shop</Select.Option>
            <Select.Option value="restaurant">restaurant</Select.Option>
            <Select.Option value="railwayStation">
              railway station
            </Select.Option>
            <Select.Option value="hotel">hotel</Select.Option>
            <Select.Option value="other">other</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Pluscode" name="plusCode">
          <label>{plusCode}</label>
        </Form.Item>

        <Form.Item label="Lat" name="lat">
          <label>{position.lat}</label>
        </Form.Item>

        <Form.Item label="Lng" name="lng">
          <label>{position.lng}</label>
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input place description!",
            },
          ]}
        >
          <TextArea rows={4} />
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

        <Form.Item
          style={{
            justifyContent: "right",
            marginLeft: "auto",
            marginRight: "2.5rem",
          }}
        >
          <Button htmlType="submit">Upload</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
