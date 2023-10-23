import { Button, Form, Input, Modal, Select } from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import Loading from "../../../components/Loading/Loading";
import TextEditor from "../../../components/TextEditor/TextEditor";
import { ProxyToJson } from "../../../utils/helpers/Common";
import { apiStore as store } from "./ApiStore";

type Props = {
    item?: any;
    dateTime?: any;
};

const EditDetailApi = observer(({ item, dateTime }: Props) => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const [apiItem, setApiItem] = useState({});

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 100);
        setApiItem({ ...item });
    }, [dateTime]);

    return (
        <Modal
            title="Chỉnh sửa thông tin chi tiết API"
            visible={
                store.modalType == "edit_detail_api" && store.isModalVisible
            }
            onCancel={() => {
                form.resetFields();
                store.handleCancel();
            }}
            footer={[
                <Button
                    key="back"
                    onClick={() => {
                        form.resetFields();
                        store.handleCancel();
                    }}
                >
                    Huỷ
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={() => {
                        form.validateFields().then((values) => {
                            store.onUpdate(values, apiItem["id"], form);
                        });
                    }}
                >
                    Lưu
                </Button>,
            ]}
            className="modal-scroll-body modal-md"
        >
            {loading ? (
                <Loading />
            ) : (
                <Form
                    data-json={JSON.stringify(apiItem)}
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={apiItem}
                >
                    <Form.Item
                        name="website"
                        label="Website"
                        rules={[
                            {
                                type: "url",
                                message: "Url website không đúng định dạng!",
                            },
                        ]}
                    >
                        <Input placeholder="Website" />
                    </Form.Item>
                    <Form.Item name="long_description" label="Mô tả chi tiết">
                        <TextEditor
                            callback={(e: any) => {
                                {
                                    form.setFieldsValue({
                                        ["long_description"]: e,
                                    });
                                }
                            }}
                        />
                    </Form.Item>
                    <Form.Item name="term_of_use" label="Điều khoản sử dụng">
                        <TextEditor
                            callback={(e: any) => {
                                {
                                    form.setFieldsValue({
                                        ["term_of_use"]: e,
                                    });
                                }
                            }}
                        />
                    </Form.Item>
                </Form>
            )}
        </Modal>
    );
});

export default EditDetailApi;
