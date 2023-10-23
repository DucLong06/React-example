import { Avatar, Form, Select, Space, Table } from "antd";
import Column from "antd/lib/table/Column";
import { observer } from "mobx-react-lite";
import React from "react";
import Pagination from "../../../components/Pagination/Pagination";
import { DefaultImg } from "../../../utils/constants/Constants";
type Props = {
    store: any;
    label?: string;
};

const AddTeamMember = observer(({ store, label }: Props) => {
    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            layout="vertical"
            name="add_memmber"
            initialValues={{ modifier: "public" }}
        >
            <Form.Item
                name="search"
                label={label ? label : "Thêm thành viên vào nhóm"}
            >
                <Select
                    mode="tags"
                    style={{ width: "100%" }}
                    placeholder="Thêm mới thành viên bằng email"
                    onChange={store.handleChange}
                ></Select>
            </Form.Item>
            <Form.Item>
                <Table bordered dataSource={store.listMembers}>
                    <Column
                        title="Thành viên"
                        dataIndex="id"
                        key="name"
                        render={(text: any, record: any, index: any) => (
                            <Space size="small">
                                <Avatar
                                    src={
                                        record.logo_url
                                            ? record.logo_url
                                            : DefaultImg.bg
                                    }
                                />
                                <p key={text} className="font-medium mb-0">
                                    {record.email}
                                </p>
                            </Space>
                        )}
                    />
                    <Column
                        title="Vai trò"
                        dataIndex="role"
                        key="role"
                        render={(text: any, record: any, index: any) => (
                            <div className="flex-1">
                                {record.role === "admin" ? (
                                    <p className="mb-0 text-gray-700">Admin</p>
                                ) : (
                                    <span className="text-gray-400">
                                        Developer
                                    </span>
                                )}
                            </div>
                        )}
                    />

                    {/* src={store.orgItem["logo_url"] ? store.orgItem["logo_url"] : DefaultImg.bg} */}
                    {/* <Column
                                    title="Trạng thái"
                                    dataIndex="status"
                                    key="status"
                                /> */}
                </Table>
                <Pagination store={store} text="thành viên" />
            </Form.Item>
        </Form>
    );
});

export default AddTeamMember;
