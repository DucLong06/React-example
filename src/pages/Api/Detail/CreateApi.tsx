import { Button, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import Loading from "../../../components/Loading/Loading";
import UploadAvatar from "../../../components/UploadAvatar/UploadAvatar";
import { ProxyToJson, useNavigateSearch } from "../../../utils/helpers/Common";
import { apiStore as store } from "./ApiStore";

type Props = {};

const CreateApi = observer(() => {
    const navigateSearch = useNavigateSearch();

    const { Option } = Select;
    const [form] = Form.useForm();

    useEffect(() => {
        store.loadListCategory();
    }, []);

    return (
        <Modal
            title="Tạo mới API"
            visible={store.modalType == "add_api" && store.isModalVisible}
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
                            //console.log(values)
                            store.onCreate(values, form, navigateSearch);
                        });
                    }}
                >
                    Lưu
                </Button>,
            ]}
            className="modal-scroll-body modal-md"
        >
            {store.loadingCategory ? (
                <Loading />
            ) : (
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{ modifier: "public" }}
                >
                    <Form.Item name="avatar_url" label="Ảnh đại diện">
                        <UploadAvatar
                            callback={(e: any) => {
                                {
                                    form.setFieldsValue({
                                        ["avatar_url"]: e,
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
                                message: "Vui lòng nhập tên API!",
                            },
                        ]}
                        label="Tên API"
                    >
                        <Input placeholder="Tên API" />
                    </Form.Item>
                    <Form.Item
                        name="short_description"
                        rules={[
                            { required: true, message: "Vui lòng nhập mô tả!" },
                        ]}
                        label="Mô tả ngắn"
                    >
                        <TextArea
                            autoSize={{ minRows: 4, maxRows: 6 }}
                            placeholder="Mô tả ngắn"
                            maxLength={100}
                        />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn danh mục!",
                            },
                        ]}
                        label="Phân loại"
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: "100%" }}
                            placeholder="Chọn danh mục"
                            //onChange={store.handleChangeApiCategory}
                        >
                            {ProxyToJson([...store.listCategory]).map(
                                (category: any) => {
                                    return (
                                        <Option
                                            value={category.id}
                                            key={category.id}
                                        >
                                            {category.name}
                                        </Option>
                                    );
                                }
                            )}
                        </Select>
                    </Form.Item>
                </Form>
            )}
        </Modal>
    );
});

export default CreateApi;
