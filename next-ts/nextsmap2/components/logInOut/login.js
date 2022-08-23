import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { ReactSession } from "react-client-session";
import React from "react";
import Link from "next/link";
import axios from "axios";
import Router from "next/router";
const LoginForm = () => {
  const onFinish = (values) => {
    const { username, password } = values;

    console.log(username);

    const response = axios.get(`http://localhost:8080/user/${username}`);

    response.then((res) => {
      if (res) {
        if (res.data.password === password) {
          ReactSession.set("username", username);
          let path = `/`;
          Router.push(path);
        } else {
          alert("Wrong username or password");
        }
      }
    });
  };

  return (
    <Form
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
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link href="/logInOut/register">register now!</Link>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
