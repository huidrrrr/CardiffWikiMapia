import { message } from "antd";
import React from "react";
import QueueCard from "../../components/QueueCard";
import {
  RabbitmqQueueItem,
  RabbitmqQueueResponse,
} from "../../responses/RabbitmqQueueResponse";
import { GetAllRabbitmqQueues_api } from "../../requests/apis/RabbitmqQueueApis";

const QueueManager: React.FC = () => {
  const [queueData, setQueueData] = React.useState<RabbitmqQueueItem[]>();

  React.useEffect(() => {
    getQueuesData();
  }, []);

  const getQueuesData = () => {
    GetAllRabbitmqQueues_api().then((res: any) => {
      if (res.status == "200") {
        let m_res: RabbitmqQueueResponse = res;
        setQueueData(m_res.data);
      } else {
        console.log(res);
        message.warning("Refresh error!");
      }
    });
  };

  return (
    <>
      <QueueCard
        queueData={queueData!}
        getQueuesData={() => {
          message.info("Refresh queue.");
          getQueuesData();
        }}
      />
    </>
  );
};

export default QueueManager;
