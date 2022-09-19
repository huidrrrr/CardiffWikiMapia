import { Select } from "antd";
import React from "react";
const { Option } = Select;

const SelectPanel = (props) => {
  const onSelectHandler = (value) => {
    props.onSelect(value);
  };
  return (
    <Select
      showSearch
      style={{
        width: 200,
      }}
      placeholder="Select mode"
      defaultValue="descent"
      onSelect={onSelectHandler}
      // optionFilterProp="children"
      // filterOption={(input, option) => option.children.includes(input)}
      // filterSort={(optionA, optionB) =>
      //   optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
      // }
    >
      <Option value="descent">Descent</Option>
      <Option value="ascent">Ascent</Option>
      <Option value="rangeSearch">Range Search</Option>
    </Select>
  );
};

export default SelectPanel;
