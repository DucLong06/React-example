import { Button, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import _ from "lodash";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import Loading from "../../../components/Loading/Loading";
import UploadAvatar from "../../../components/UploadAvatar/UploadAvatar";
import { ProxyToJson } from "../../../utils/helpers/Common";
import { apiStore as store } from "./ApiStore";

type Props = {
    item?: any;
    dateTime?: any;
};

const EditApi = observer(({ item, dateTime }: Props) => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const [apiItem, setApiItem] = useState({});
    const [loading, setLoading] = useState(true);
    const [originalName, setOriginalName] = useState("");
    useEffect(() => {

        const editAPI = _.cloneDeep(toJS(item));
        const editCategory: any = [];
        if(editAPI.category && editAPI.category.length > 0) {
            editAPI.category.map((item: any)=>{
                editCategory.push(item.id)
            })
            editAPI.category = editCategory;
        }
        setOriginalName(editAPI.name);
        //console.log(editAPI)
        setApiItem(editAPI);
        store.loadListCategory();

        setTimeout(() => {
            setLoading(false);
        }, 100);
    }, [dateTime]);

    return (
        <Modal
            title="Chỉnh sửa thông tin tổng quan API"
            visible={store.modalType == "edit_api" && store.isModalVisible}
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
                            if (values.name === originalName) {
                                delete values.name;
                            }
                            //console.log(values)
                            store.onUpdate(values, apiItem["id"], form);
                        });
                    }}
                >
                    Lưu
                </Button>,
            ]}
            className="modal-scroll-body modal-md"
        >
            {loading != true && store.loadingCategory != true ? (
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={apiItem}
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
                        label="Mô tả"
                    >
                        <TextArea
                            autoSize={{ minRows: 4, maxRows: 6 }}
                            placeholder="Mô tả ngắn"
                        />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        // rules={[
                        //     { required: true, message: 'Vui lòng chọn danh mục!' },
                        // ]}
                        label="Phân loại"
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: "100%" }}
                            placeholder="Chọn danh mục"
                        >
                            {store.listCategory.map((category: any) => {
                                return (
                                    <Option
                                        value={category.id}
                                        key={category.id}
                                    >
                                        {category.name}
                                    </Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                </Form>
            ) : (
                <Loading />
            )}
        </Modal>
    );
});

export default EditApi;
