import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, message, DatePicker } from "antd";
import {
  addOneUser,
  checkUserEmail,
  getOneUserIdByEmail,
  updateUserPasswordById
} from "../../components/helper/userApiUtil";
import moment from "moment";
import  Router  from "next/router";

const { RangePicker } = DatePicker;

export default function ForgetPassword() {
  const [resetPasswordForm] = Form.useForm();


  const resetHandler=(id,values) => { 
    if(values.newPassword===values.ConfirmNewPassword){
        updateUserPasswordById(id,{password:values.newPassword}).then((res) => { 
            if(res.status===200){
                message.info('Reset password succuessfully.')
                Router.push('/')
            }else{
                message.warn('Reset password failed.')
            }
         })
    }else{
        message.warn('Confirm password does not match')
    }
   }
  const finishHandler = () => {
    const formData = forgetPasswordForm.getFieldsValue();
    getOneUserIdByEmail(formData.email).then((res) => {
      if (
        moment(res).format("MMMM Do YYYY") ===
          moment(formData.birthday).format("MMMM Do YYYY") &&
        res.surname === formData.surname
      ) {
        console.log(res);
        const resetPasswordPage = (
          <div style={{ maxWidth: "45rem", margin: "10rem auto" }}>
            <Form
              form={resetPasswordForm}
              labelCol={{
                span: 5,
              }}
              wrapperCol={{
                span: 10,
              }}
              onFinish={(values) => { resetHandler(res.key,values) }}
            >
              <Form.Item label="Old password">
                <Input value={res.password} disabled />
              </Form.Item>
              <Form.Item label="New password" name="newPassword">
                <Input type="password" />
              </Form.Item>
              <Form.Item label="Confirm new password" name="ConfirmNewPassword">
                <Input  type="password"/>
              </Form.Item>
              <Form.Item label="." name="">
                <Button type="primary" htmlType="submit">
                  Reset
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
        setLoadPage(resetPasswordPage);
      } else {
        console.log("Personal detail does not match");
      }
    });
  };
  const [forgetPasswordForm] = Form.useForm();
  const formPage = (
    <div style={{ maxWidth: "45rem", margin: "10rem auto" }}>
      <Form
        form={forgetPasswordForm}
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 10,
        }}
        onFinish={finishHandler}
      >
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Birthday" name="birthday">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Surname" name="surname">
          <Input />
        </Form.Item>
        <Form.Item label="." name="">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  const [loadPage, setLoadPage] = useState();
  useEffect(() => {
    setLoadPage(formPage);
  },[]);

  return <div>{loadPage}</div>;
}
