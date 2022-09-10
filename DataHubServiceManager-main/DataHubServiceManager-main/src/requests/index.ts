import { message } from 'antd';
import axios from "axios";

axios.defaults.timeout = 100000;
axios.defaults.baseURL = "";

axios.interceptors.request.use(
  (config) => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    if (response.data.errCode === 2) {
      console.log("过期");
      message.warning("过期");
    }
    return response;
  },
  (error) => {
    console.log("请求出错：", error);
    message.error("请求出错");
  }
);


export const GET = (url: any, params?: Object): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params,
    }).then((response) => {
      landing(url, params, response.data);
      resolve(response.data);
    })
      .catch((err) => {
        msag(err);
        reject(err);
      });
  });
}


export const POST = (url: any, data?: Object): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        msag(err);
        reject(err);
      }
    );
  });
}

export const DELETE = (url: any, data?: Object): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.delete(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        msag(err);
        reject(err);
      }
    );
  });
}

export const PATCH = (url: any, data?: Object): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        msag(err);
        reject(err);
      }
    );
  });
}

export const PUT = (url: any, data?: Object): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        msag(err);
        reject(err);
      }
    );
  });
}

//统一接口处理，返回数据
export default function (fecth: any, url: any, param?: Object): Promise<any> {
  let _data = "";
  return new Promise((resolve, reject) => {
    switch (fecth) {
      case "get":
        console.log("begin a get request,and url:", url);
        GET(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            console.log("get request GET failed.", error);
            reject(error);
          });
        break;
      case "post":
        POST(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            console.log("get request POST failed.", error);
            reject(error);
          });
        break;
      default:
        break;
    }
  });
}

//失败提示
const msag = (err: any) => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        message.warning(err.response.data.error.details);
        break;
      case 401:

        message.warning("未授权，请登录");
        break;

      case 403:
        message.warning("拒绝访问");
        break;

      case 404:
        message.warning("请求地址出错");
        break;

      case 408:
        message.warning("请求超时");
        break;

      case 500:
        message.error("服务器内部错误");
        break;

      case 501:
        message.error("服务未实现");
        break;

      case 502:
        message.error("网关错误");
        break;

      case 503:
        message.error("服务不可用");
        break;

      case 504:
        message.error("网关超时");
        break;

      case 505:
        message.error("HTTP版本不受支持");
        break;
      default:
    }
  }
}

const landing = (url: any, params: any, data: any) => {
  if (data.code === -1) {
  }
}