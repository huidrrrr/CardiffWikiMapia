import { DELETE, POST } from './../index';
import { BaseResponse } from './../../responses/base/index';
import { GET } from ".."

export const getAllPointsFromPointHub = (pointHubName: string): any => {
    return new Promise((resolve, reject) => {
        GET(`/api/point_hub/${pointHubName}`).then((res: BaseResponse) => {
            resolve(res);
        }), (error: any) => {
            console.log("GetAllPointsFromPointHub ERROR: ", error);
            reject(error);
        }
    })
}

export const deletePointFromPointHubById_api = (pointHubName: string, id: Number): any => {
    return new Promise((resolve, reject) => {
        DELETE(`api/point_hub/${pointHubName}/${id}`).then((res: BaseResponse) => {
            resolve(res);
        }), (error: any) => {
            console.log("DeletePointFromPointHub ERROR: ", error);
            reject(error);
        }
    })
}

export const addOnePointIntoPointHub = (pointHubName:string, pointName: string): any => {
    return new Promise((resolve, reject) => {
        POST(`api/point_hub/${pointHubName}/${pointName}`).then((res: BaseResponse) => {
            resolve(res);
        }), (error: any) => {
            console.log("AddOnePointIntoPointHub ERROR: ", error);
            reject(error);
        }
    })
}
