import { BaseResponse } from '../../responses/base';
import { GET, POST, DELETE } from '..';

export const GetDataBaseTableList_api = (tableName: string): any => {
    return new Promise((resolve, reject) => {
        GET(encodeURI(`/api/db/table/${tableName}`)).then((result: BaseResponse) => {
            resolve(result);
        }), (error: any) => {
            console.log("GetDataBaseTableList ERROR: ", error);
            reject(error)
        }
    })
}

export const addOnePointHub_api = (pointHubName: string): any => {
    return new Promise((resolve, reject) => {
        POST(`/api/db/table/point_hub/${pointHubName}`).then((res: BaseResponse) => {
            resolve(res);
        }), (error: any) => {
            console.log("AddPointHub ERROR: ", error);
            reject(error);
        }
    })
}

export const addOnePointHubSelecter_api = (pointHubSelecterName: string): any => {
    return new Promise((resolve, reject) => {
        POST(`/api/db/table/point_hub_selecter/${pointHubSelecterName}`).then((res: BaseResponse) => {
            resolve(res);
        }), (error: any) => {
            console.log("AddPointHubSelecter ERROR: ", error);
            reject(error);
        }
    })
}

export const deleteTableByName_api = (tableName: string): any => {
    return new Promise((resolve, reject) => {
        DELETE(`/api/db/table/drop/${tableName}`).then((res: BaseResponse) => {
            resolve(res);
        }), (error: any) => {
            console.log("DeleteTable ERROR: ", error);
            reject(error)
        }
    })
}