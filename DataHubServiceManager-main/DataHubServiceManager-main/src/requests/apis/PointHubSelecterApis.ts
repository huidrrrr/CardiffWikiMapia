import { BaseResponse } from './../../responses/base/index';
import { DELETE, GET, POST } from '..';

export const getAllPointHubFromPointHubSelecter_api = (pointHubSelecterName: string): any => {
    return new Promise((resolve, reject) => {
        GET(`api/point_hub_selecter/${pointHubSelecterName}`).then((res: BaseResponse) => {
            resolve(res);
        }), (error: any) => {
            console.log("GetAllPointHubFromPointHubSelecter ERROR: ", error);
            reject(error);
        }
    })
}

export const deletePointHubFromPointHubSelectById_api = (pointHubSelecterName: string, id: Number): any => {
    return new Promise((resolve, reject)=>{
        DELETE(`api/point_hub_selecter/${pointHubSelecterName}/${id}`).then((res: BaseResponse) => {
            resolve(res);
        }), (error: any) => {
            console.log("DeletePointHubFromPointHubSelecter ERROR: ", error);
            reject(error);
        }
    })
}

export const addOnePointHubIntoPointHubSelecter_api = (pointHubSelecterName: string, pointHubName: string): any => {
    return new Promise((resolve, reject) => {
        POST(`api/point_hub_selecter/${pointHubSelecterName}/${pointHubName}`).then((res: BaseResponse) => {
            resolve(res);
        }), (error: any) => {
            console.log("AddOnePointHubIntoPointHubSelecter ERROR: ", error);
            reject(error);
        }
    })
}