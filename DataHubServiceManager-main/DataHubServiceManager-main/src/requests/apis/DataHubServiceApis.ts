import { DatahubConnectConfig } from './../../interface/DataHubService';
import { DELETE, GET, POST, PUT } from "..";
import { BaseResponse } from "../../responses/base";

export const getDataHubConnectConfig_api = (): any => {
    return new Promise((resolve, reject) => {
        GET(`/api/datahub/config`).then((result: any) => {
            resolve(result);
        }), (error: any) => {
            console.log("GetDataHubConnectConfig ERROR: ", error);
            reject(error);
        }
    })
}

export const updateDataHubConnectConfig_api = (data: DatahubConnectConfig): any => {
    return new Promise((resolve, reject) => {
        PUT(`/api/datahub/config`, data).then((result: any) => {
            resolve(result);
        }), (error: any) => {
            console.log("GetDataHubConnectConfig ERROR: ", error);
            reject(error);
        }
    })
}

export const connectDataHub_api = (id: Number) => {
    return new Promise((resolve, reject) => {
        POST(`/api/datahub/connect/${id}`).then((result: any) => {
            resolve(result);
        }), (error: any) => {
            console.log("ConnectDataHub ERROR: ", error);
            reject(error);
        }
    })
}

export const disconnectDataHub_api = () => {
    return new Promise((resolve, reject) => {
        POST(`/api/datahub/disconnect`).then((result: any) => {
            resolve(result);
        }), (error: any) => {
            console.log("DisconnectDataHub ERROR: ", error);
            reject(error);
        }
    })
}

export const getPointsFromRedis_api = (pointName: string): any => {
    return new Promise((resolve, reject) => {
        POST(`api/datahub/cache/?point_name=${pointName}`).then((res: BaseResponse) => {
            resolve(res);
        }), (error: any) => {
            console.log("GetPointsFromRedis ERROR: ", error);
            reject(error);
        }
    })
}

export const getPointDataFromRedis_api = (pointName: string): any => {
    return new Promise((resolve, reject) => {
        POST(`api/datahub/cache/point_data/${pointName}`).then((res: BaseResponse) => {
            resolve(res);
        }), (error: any) => {
            console.log("GetPointDataFromRedis ERROR: ", error);
            reject(error);
        }
    })
}

export const deletePointFromRedis_api = (pointName: string): any => {
    return new Promise((resolve, reject) => {
        DELETE(`api/datahub/cache/point_data/${pointName}`).then((res: BaseResponse) => {
            resolve(res);
        }), (error: any) => {
            console.log("DeletePointFromRedis ERROR: ", error);
            reject(error);
        }
    })
}
