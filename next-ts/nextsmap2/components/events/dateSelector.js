import { Select } from "antd";
import React from "react";
const { Option } = Select;

const dateSelector = (props) => {
  const { datelst } = props;
  

  return (
    <div >
        <div>
        <p>Year :</p>
      <Select
        defaultValue={datelst?datelst.yearlst[0]:'No data'}
        style={{
          width: 120,
        }}
        bordered={false}
      >
        {datelst &&
          datelst.yearlst.map((year) => (
            <Option key={year} value={year}>
              {year}
            </Option>
          ))}
      </Select>
      </div>
      <div>
      <p>Month :</p>
      <Select
        defaultValue={datelst?datelst.monthlst[0]:'No data'}
        style={{
          width: 120,
        }}
        bordered={false}
      >
        {datelst &&
          datelst.monthlst.map((month) => (
            <Option key={month} value={month}>
              {month}
            </Option>
          ))}
      </Select>
      </div>
    </div>
  );
};

export default dateSelector;
