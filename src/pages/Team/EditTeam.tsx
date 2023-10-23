import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import UploadAvatar from "../../components/UploadAvatar/UploadAvatar";
import { teamStore as store } from "./TeamStore";

type Props = {
    item?: any;
    dateTime?: any;
};

const EditTeam = observer(({ item, dateTime }: Props) => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const [itemTeam, setItemTeam] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setItemTeam({ ...item });
        setTimeout(() => {
            setLoading(false);
        }, 100);
    }, [dateTime]);

    return (
        <Modal
            title="Chỉnh sửa thông tin nhóm"
            visible={store.isModalVisible}
            onCancel={store.handleCancel}
            footer={[
                <Button key="back" onClick={store.handleCancel}>
                    Huỷ
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={() => {
                        form.validateFields().then((values) => {
                            store.onUpdate(values, form, itemTeam["id"]);
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
                    initialValues={itemTeam}
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
                                message: "Vui lòng nhập tên nhóm!",
                            },
                        ]}
                        label="Tên nhóm"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả">
                        <TextArea
                            autoSize={{ minRows: 4, maxRows: 6 }}
                            placeholder="Mô tả"
                            maxLength={100}
                        />
                    </Form.Item>
                </Form>
            )}
        </Modal>
    );
});

export default EditTeam;
