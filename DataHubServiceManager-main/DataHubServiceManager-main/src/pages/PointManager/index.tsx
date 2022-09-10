import { message } from "antd";
import React from "react";
import PointCard from "../../components/PointCard";
import { getPointsFromRedis_api } from "../../requests/apis/DataHubServiceApis";
import { BaseResponse } from "../../responses/base";

const PointManager: React.FC = () => {
  const [pointList, setPointList] = React.useState<string[]>([]);

  React.useEffect(() => {
    getPointList();
  }, []);

  const getPointList = () => {
    getPointsFromRedis_api("").then((res: BaseResponse) => {
      if (res.status == "200") {
        setPointList(res.data);
      } else {
        message.error(`${res.status} ERROR Get point list! \n${res.data}`);
      }
    });
  };

  return (
    <>
      <PointCard
        title="PointManager"
        pointList={pointList}
        setPointList={setPointList}
        getPointList={getPointList}
      ></PointCard>
    </>
  );
};

export default PointManager;
