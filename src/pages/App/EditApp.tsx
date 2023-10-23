import { Button, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import UploadAvatar from "../../components/UploadAvatar/UploadAvatar";
import { appStore } from "./AppStore";

type Props = {
    item?: any;
    dateTime?: any;
};

const EditApp = observer(({ item, dateTime }: Props) => {
    const [appItem, setAppItem] = useState({});
    const [loading, setLoading] = useState(true);
    const { Option } = Select;
    const [form] = Form.useForm();

    useEffect(() => {
        setAppItem({ ...item });
        setTimeout(() => {
            setLoading(false);
        }, 100);
    }, [dateTime]);

    return (
        <Modal
            title="Chỉnh sửa app"
            visible={
                appStore.modalType == "edit_app" && appStore.isModalVisible
            }
            onCancel={() => {
                form.resetFields();
                appStore.handleCancel();
            }}
            footer={[
                <Button
                    key="back"
                    onClick={() => {
                        form.resetFields();
                        appStore.handleCancel();
                    }}
                >
                    Huỷ
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={() => {
                        form.validateFields().then((values) => {
                            appStore.onUpdate(values, form, appItem["id"]);
                        });
                    }}
                >
                    Lưu
                </Button>,
            ]}
            className="modal-scroll-body modal-md"
        >
            {loading == true ? (
                <Loading />
            ) : (
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={appItem}
                >
                    <Form.Item name="logo_url" label="Ảnh đại diện">
                        <UploadAvatar
                            callback={(e: any) => {
                                {
                                    form.setFieldsValue({
                                        ["logo_url"]: e,
                                    });
                                }
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập Tên app!",
                            },
                        ]}
                        label="Tên app"
                    >
                        <Input placeholder="Tên app" />
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả">
                        <TextArea
                            autoSize={{ minRows: 4, maxRows: 6 }}
                            placeholder="Mô tả"
                            maxLength={2048}
                        />
                    </Form.Item>
                </Form>
            )}
        </Modal>
    );
});

export default EditApp;
