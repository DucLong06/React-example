import { Button, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { observer } from "mobx-react-lite";
import React from "react";
import UploadAvatar from "../../components/UploadAvatar/UploadAvatar";
import { useNavigateSearch } from "../../utils/helpers/Common";
import { appStore } from "./AppStore";

type Props = {};

const CreateApp = observer(() => {
    const { Option } = Select;
    const [form] = Form.useForm();

    const navigateSearch = useNavigateSearch();

    return (
        <Modal
            title="Tạo mới app"
            visible={appStore.modalType == "add_app" && appStore.isModalVisible}
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
                            appStore.onCreate(values, form, navigateSearch);
                        });
                    }}
                >
                    Lưu
                </Button>,
            ]}
            className="modal-scroll-body modal-md"
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ modifier: "public" }}
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
                        { required: true, message: "Vui lòng nhập Tên app!" },
                    ]}
                    label="Tên app"
                >
                    <Input placeholder="Tên app" />
                </Form.Item>
                <Form.Item name="description" label="Mô tả">
                    <TextArea
                        autoSize={{ minRows: 4, maxRows: 6 }}
                        placeholder="Mô tả"
                    />
                </Form.Item>

                <Form.Item name="team" label="Nhóm">
                    <Select placeholder="Nhóm">
                        {/* <Option value="VN">Việt Nam</Option>
                        <Option value="lao">Lào</Option> */}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
});

export default CreateApp;
