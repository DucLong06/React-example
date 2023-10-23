import { Avatar, Button, Form, Modal, Select, Space, Table, Tag } from "antd";
import Column from "antd/lib/table/Column";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../../components/Pagination/Pagination";
import { DefaultImg } from "../../../utils/constants/Constants";
type Props = {
    store: any;
    item: any;
    dateTime: any;
};

const EditTeamMember = observer(({ store, item, dateTime }: Props) => {
    const [form] = Form.useForm();
    let [searchParams, setSearchParams] = useSearchParams();

    return (
        <Modal
            title="Chỉnh sửa thành viên nhóm"
            visible={store.isModalVisible}
            onCancel={store.handleCancel}
            footer={[
                <div className="steps-action">
                    <Button key="back" onClick={store.handleCancel}>
                        Huỷ
                    </Button>

                    <Button
                        key="submit"
                        type="primary"
                        onClick={() => {
                            form.validateFields().then((values) => {
                                store.onAddMember(form, setSearchParams);
                            });
                        }}
                    >
                        Lưu
                    </Button>
                </div>,
            ]}
            className="modal-scroll-body modal-md"
        >
            <Form form={form} layout="vertical" name="add_memmber">
                <Table bordered dataSource={item}>
                    <Form.Item>
                        <Column
                            title="Thành viên"
                            dataIndex="email"
                            key="email"
                            render={(text: any, record: any, index: any) => (
                                <Space size="small">
                                    <Avatar
                                        src={
                                            text.account?.avatar_url
                                                ? text.account?.avatar_url
                                                : DefaultImg.bg
                                        }
                                    />
                                    <div>
                                        <p
                                            key={index}
                                            className="font-medium mb-0 text-14 text-gray-900"
                                        >
                                            {text.account?.first_name}{" "}
                                            {text.account?.last_name}
                                        </p>
                                        <p
                                            key={index}
                                            className="font-medium mb-0 text-12 text-gray-500"
                                        >
                                            {text.email}
                                        </p>
                                    </div>
                                </Space>
                            )}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Column
                            title="Vai trò"
                            dataIndex="role"
                            key="role"
                            render={(text: any, record: any, index: any) => (
                                <div className="flex-1">
                                    {record.role === "admin" ? (
                                        <p className="mb-0 text-gray-700">
                                            Admin
                                        </p>
                                    ) : (
                                        <span className="text-gray-400">
                                            Developer
                                        </span>
                                    )}
                                </div>
                            )}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Column
                            title="Trạng thái"
                            dataIndex="status"
                            key="status"
                            render={(text: any, record: any, index: any) => (
                                <div>
                                    {text === "joined" ? (
                                        <Tag color="processing">
                                            Đã tham gia
                                        </Tag>
                                    ) : (
                                        <Tag color="error">
                                            Đang chờ chấp nhận
                                        </Tag>
                                    )}
                                </div>
                            )}
                        />
                    </Form.Item>
                </Table>
                <Pagination
                    store={store}
                    text="thành viên"
                />
            </Form>
        </Modal>
    );
});

export default EditTeamMember;
