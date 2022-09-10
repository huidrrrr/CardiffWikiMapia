import { Form, Modal, Input, Button, message } from "antd";
import React, { Dispatch } from "react"
import { addOneRabbitmqQueueById_api } from "../../../requests/apis/RabbitmqQueueApis";
import PointHubSelecter from "../PointHubSelecter";

interface AddQueueModalProps {
    isModalVisible: boolean
    setIsModalVisible: Dispatch<React.SetStateAction<boolean>>
    getQueuesData: () => void;
}

const AddQueueModal: React.FC<AddQueueModalProps> = (props) => {
    const [form] = Form.useForm()
    const { isModalVisible, setIsModalVisible, getQueuesData } = props

    const handleOk = () => {
        form.resetFields();
        setIsModalVisible(false);
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);

        addOneRabbitmqQueueById_api(values).then((res:any) => {
            if (res.status != "200") {
                message.error("FAILED Add Queue: " + res.msg);
                form.resetFields();
                return;
            }
            message.success("SUCCESS Add Queue: " + res.data);
            setIsModalVisible(false);
            getQueuesData();
        }).catch(err => {
            message.error("ERROR add queue!");
            console.log(err);
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal title="Add Queue" visible={isModalVisible} onOk={handleOk} onCancel={handleOk}>
            <Form form={form} autoComplete="off" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item label="QueueName" name="queueName" rules={[{ required: true, message: 'Please input queuename!' }]}>
                    <Input placeholder="input queuename" />
                </Form.Item>
                <Form.Item label="PointHubSelecterName" name="pointHubSelecterName">
                    <PointHubSelecter defaultSelectValue="" getCurrentValue={(value)=>{form.setFieldValue("pointHubSelecterName", value)}} />
                </Form.Item>
                <Form.Item label="Comment" name="comment">
                    <Input placeholder="input comment" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Confirm</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddQueueModal;