export interface DatahubServiceStatus {
    datahubConnectStatus: boolean,
    redisSendRabbitmqStatus: boolean,
    datahubMessage: string
}

export interface DatahubConnectConfig {
    id: number,
    host: string,
    port: number,
    domain: string,
}