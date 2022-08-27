import React from "react";
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
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

export default function RegisterForm() {
  const registerFormHandler = (values) => {
    const { username, password, email, sex, confirmPassword, birthdate } =
      values;
    if (confirmPassword === password) {
      const newUserData = {
        username: username,
        password: password,
        email: email,
        sex: sex,
        birthdate: birthdate,
      };
      axios({
        method: "post",
        url: "http://localhost:8080/user/addOneUser",
        data: JSON.stringify(newUserData),
        headers:{
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res);
      });
    } else {
      alert("Confirm assword does not match");
    }
  };

  return (
    <Form
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
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password">
        <Input type="password" />
      </Form.Item>
      <Form.Item label="Confirm Password" name="confirmPassword">
        <Input type="password" />
      </Form.Item>
      <Form.Item label="Sex" name="sex">
        <Radio.Group>
          <Radio value="Male"> Male </Radio>
          <Radio value="Female"> Female </Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Birthdate" name="birthdate">
        <DatePicker />
      </Form.Item>

      <Form.Item
        label="Upload"
        valuePropName="fileList"
        // picture upload soon...--------------------------------------------
      >
        <Upload action="/upload.do" listType="picture-card">
          <div>
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              Upload
            </div>
          </div>
        </Upload>
      </Form.Item>
      <Form.Item label="Confirm">
        <Button htmlType="submit">Register</Button>
      </Form.Item>
    </Form>
  );
}
