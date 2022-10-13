import React, { useEffect, useState } from "react";
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
  Image,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import ImgCrop from "antd-img-crop";
import {
  addOneUser,
  checkUserEmail,
  getOneUserIdByEmail
} from "../../components/helper/userApiUtil";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

export default function RegisterForm() {
  const [imgBase64, setImgBase64] = useState();
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "/images/noAvatar.png",
    },
  ]);
  const [registerForm] = Form.useForm();
  const registerFormHandler = () => {
    const formData = registerForm.getFieldsValue();
    checkUserEmail(formData.email).then((res) => {
      if (res) {
        if (formData.password === formData.confirmPassword) {
          const newUser = {
            username: formData.username,
            password: formData.password,
            surname: formData.surname,
            firstname: formData.firstname,
            sex: formData.sex,
            email: formData.email,
            birthday: formData.birthday,
            avatar: imgBase64,
            permission:'user'
          };
          addOneUser(newUser).then((res) => {
            if (res.status === 200) {
              getOneUserIdByEmail(newUser.email).then((res) => { 
                console.log(res);
               })
              message.info("Register successfully!");
            }else{
              message.info('Register failed')
            }
          });
        }else{
          message.warn('Confirm password and password do not match')
        }
      } else {
        message.warn("This email has already been registered.");
      }
    });
  };

  // upload file
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
    <div style={{ maxWidth: "50rem", margin: "15rem auto" }}>
      <Form
        form={registerForm}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        onFinish={registerFormHandler}
        // onValuesChange={onFormLayoutChange}
        // disabled={componentDisabled}
      >
        <Form.Item label="Username" name="username">
          <Input required />
        </Form.Item>

        <Form.Item label="First name" name="firstname">
          <Input required />
        </Form.Item>
        <Form.Item label="Surname" name="surname">
          <Input required />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>

        <Form.Item label="Confirm Password" name="confirmPassword">
          <Input type="password" required />
        </Form.Item>
        <Form.Item label="Sex" name="sex">
          <Radio.Group required>
            <Radio value="Male"> Male </Radio>
            <Radio value="Female"> Female </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Birthday" name="birthday">
          <DatePicker required />
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
        <Form.Item label=".">
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
