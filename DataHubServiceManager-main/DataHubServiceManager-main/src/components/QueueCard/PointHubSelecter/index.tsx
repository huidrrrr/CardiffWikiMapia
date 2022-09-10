import React from "react";
import { Select } from "antd";
import { GetDataBaseTableList_api } from "../../../requests/apis/DataBaseTableApis";
import { BaseResponse } from "../../../responses/base";

const { Option } = Select;

interface PointHubSelecterProps {
  defaultSelectValue: string;
  getCurrentValue: (value: string) => void
}

const PointHubSelecter: React.FC<PointHubSelecterProps> = (props) => {
  let { defaultSelectValue, getCurrentValue } = props;

  const [pointHubSelecterList, setPointHubSelecterList] =
    React.useState<string[]>();

  React.useEffect(() => {
    getPointHubSeleterList();
  }, []);



  const getPointHubSeleterList = () => {
    GetDataBaseTableList_api("%_point_hub_selecter").then(
      (res: BaseResponse) => {
        if (res.status == "200") {
          setPointHubSelecterList([" ", ...res.data]);
        }
      }
    );
  };

  return (
    <Select
      defaultValue={defaultSelectValue}
      onChange={(value: string) => {
        getCurrentValue(value)
      }}
    >
      {pointHubSelecterList?.map((value, index) => {
        return (
          <Option key={index} value={value}>
            {value}
          </Option>
        );
      })}
    </Select>
  );
};

export default PointHubSelecter;
