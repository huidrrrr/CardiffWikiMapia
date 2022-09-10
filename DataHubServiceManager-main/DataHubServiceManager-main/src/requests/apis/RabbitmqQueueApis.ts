import { RabbitmqQueueItem } from './../../responses/RabbitmqQueueResponse/index';
import { DELETE, PUT, POST, GET } from './../index';
import { BaseResponse } from "../../responses/base"

export const GetAllRabbitmqQueues_api = () => {
    return new Promise((resolve, reject) => {
        GET('/api/mq/queue').then((res: BaseResponse) => {
            resolve(res);
        }), (error: any) => {
            console.log("GetAllQueues ERROR: ", error);
            reject(error)
        }
    })
}

export const deleteOneRabbitmqQueuesById_api = (id: number) => {
    return new Promise((resolve, reject) => {
        DELETE(`/api/mq/queue/${id}`).then(res => {
            resolve(res);
        }), (error: any) => {
            console.log("DeleteOneQueue ERROR: ", error)
            reject(error)
        }
    })
}

export const updateOneRabbitmqQueueById_api = (data: RabbitmqQueueItem) => {
    return new Promise((resolve, reject) => {
        PUT('/api/mq/queue ', data).then(res => {
            resolve(res);
        }), (error: any) => {
            console.log("UpdateOneQueue ERROR: ", error);
            reject(error);
        }
    })
}

export const addOneRabbitmqQueueById_api = (data: RabbitmqQueueItem) => {
    return new Promise((resolve, reject) => {
        POST('/api/mq/queue', data).then(res => {
            resolve(res);
        }), (error: any) => {
            console.log("AddOneQueue ERROR: ", error);
            reject(error);
        }

    })
}

export const startSendingToRabbitmq_api = (): any => {
  return new Promise((resolve, reject) => {
    POST('/api/mq/manager/start').then(res => {
      resolve(res);
    }), (error: any) => {
      console.log("StartSendingToRabbbitmq ERROR: ", error);
      reject(error);
    }
  })
}

export const stopSendingToRabbitmq_api = (): any => {
  return new Promise((resolve, reject) => {
    POST('/api/mq/manager/stop').then(res => {
      resolve(res);
    }), (error: any) => {
      console.log("StopSendingToRabbbitmq ERROR: ", error);
      reject(error);
    }
  })
}
