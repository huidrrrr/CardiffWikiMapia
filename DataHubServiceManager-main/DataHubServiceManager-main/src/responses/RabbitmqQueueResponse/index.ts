import { BaseResponse } from "../base"

export interface RabbitmqQueueResponse extends BaseResponse{
    data: Array<RabbitmqQueueItem>
}

export interface RabbitmqQueueItem {
    id: number,
    key: number,
    queueName: string,
    pointHubSelecterName: string | null,
    comment: string
}
