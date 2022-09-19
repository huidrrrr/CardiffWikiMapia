import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import React from "react";
import Router from "next/router";
import { getUserById } from "../helper/userApiUtil";
import { ReactSession } from "react-client-session";

const App = () => {
  const onFinish = (values) => {
    getUserById(values.username).then((res) => {
      if (res.status === 200) {
        if (res.data) {
          if (res.data.password = values.password) {
            ReactSession.set("username", res.data.username);
            ReactSession.set("id", values.username);
            ReactSession.set("permission", res.data.permission);
            if (res.data.permission === "user") {
              Router.push("/user/user");
            } else if (res.data.permission === "admin") {
              Router.push("/user/admin");
            }
          } else {
            message.warn("Wrong password!");
          }
        } else {
          message.warn("Username does not exist!");
        }
      } else {
        message.error("Server error");
      }
    });
  };

  return (
    <Form
      style={{ width: "300px" }}
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Log in
        </Button>
      </Form.Item>
      <Form.Item>
        {/* <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}
        <a style={{ float: "left", color: "#1890ff" }} href="">
          Forgot password
        </a>
        <a href="" style={{ float: "right", color: "#1890ff" }}>
          register now!
        </a>
      </Form.Item>
    </Form>
  );
};

export default App;
