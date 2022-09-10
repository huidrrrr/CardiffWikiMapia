import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

const YukiNotification = (
  type: NotificationType,
  title: string,
  message: string
) => {
  notification[type]({
    message: title,
    description: message,
  });
};

export default YukiNotification;