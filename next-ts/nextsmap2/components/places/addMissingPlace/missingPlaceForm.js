import React, { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { addOneMissingPlace, getPlusCode } from "../../helper/apiUtil";
const { TextArea } = Input;
export default function MissingPlaceForm(props) {
  const [plusCode, setPlusCode] = useState();
  const { position } = props;
  getPlusCode(position).then((res) => {
    setPlusCode(res);
  });

  const onFinish = (values) => {
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
      img: "",
      events: {},
      comments: {},
    };
    addOneMissingPlace(newPlace).then((res) => {
      if (res.status === "200") {
        message.info("Add place successfully!");
      }
    });
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
