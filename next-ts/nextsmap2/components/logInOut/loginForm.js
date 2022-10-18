import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import React from "react";
import Router from "next/router";
import { getUserById, getAllUsers } from "../helper/userApiUtil";
import { ReactSession } from "react-client-session";
import Link from "next/link";

const App = () => {
  const onFinish = (values) => {
    getAllUsers().then((res) => {
      if (res) {
        if (res.find((ele) => ele.email === values.email)) {
          const userData = res.find((ele) => ele.email === values.email);
          if (userData.passsword = values.password) {
            ReactSession.set("username", userData.username);
            ReactSession.set("id", userData.key);
            ReactSession.set("permission", userData.permission);
            console.log(userData);
            if (userData.permission === "user") {
              Router.push("/user/user");
            } else if (userData.permission === "admin") {
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
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
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
        <Link
          style={{ float: "left", color: "#1890ff" }}
          href="/logInOut/forgetPassword"
        >
          Forgot password
        </Link>
        <div className="registerLink">
          <Link href="/logInOut/register">register now!</Link>
        </div>
      </Form.Item>
    </Form>
  );
};

export default App;
