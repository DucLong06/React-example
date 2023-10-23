import { DeleteOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, Select, Space, Table, Tooltip } from "antd";
import { observer } from "mobx-react-lite";

import React from "react";

type Props = {
    store: any;
    type: string;
    dataSource: any;
};

const TableKeyValue = ({ store, type, dataSource }: Props) => {
    const { Column, ColumnGroup } = Table;
    const { Option } = Select;
    return (
        <React.Fragment>
            <div className="w-full border-0 border-b border-solid border-gray-200 ">
                <p className="text-gray-900 text-14 font-bold mb-0 pt-4 pb-2">
                    {type}
                </p>
            </div>
            <div className="pt-4">
                <Table size="small" bordered dataSource={dataSource}>
                    <Column
                        title="Name"
                        dataIndex="name"
                        key="name"
                        render={(text, record, index) => (
                            <Input
                                type="text"
                                placeholder="Name"
                                onChange={(e: any) => {
                                    store.handleAdd(
                                        e,
                                        record,
                                        type,
                                        index,
                                        "name"
                                    );
                                }}
                            />
                        )}
                        width={144}
                    />
                    <Column
                        title="Kiểu dữ liệu"
                        dataIndex="data_type"
                        key="data_type"
                        render={(text, record, index) => (
                            <Select
                                showSearch
                                placeholder="Kiểu dữ liệu"
                                filterOption={(input, option) =>
                                    (option!.children as unknown as string)
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                                onChange={(e: any) => {
                                    store.handleAdd(
                                        e,
                                        record,
                                        type,
                                        index,
                                        "data_type"
                                    );
                                }}
                                defaultValue="string"
                            >
                                <Option value="int">Số nguyên</Option>
                                <Option value="float">Số thực</Option>
                                <Option value="char">Kí tự</Option>
                                <Option value="string">Chuỗi</Option>
                                <Option value="boolean">Logic</Option>
                            </Select>
                        )}
                        width={144}
                    />
                    <Column
                        title="Giá trị mặc định"
                        dataIndex="default_value"
                        key="default_value"
                        render={(text, record, index) => (
                            <Input
                                type="text"
                                placeholder="Giá trị mặc định"
                                onChange={(e: any) => {
                                    store.handleAdd(
                                        e,
                                        record,
                                        type,
                                        index,
                                        "default_value"
                                    );
                                }}
                            />
                        )}
                    />
                    <Column
                        title="Mô tả"
                        dataIndex="description"
                        key="description"
                        render={(text, record, index) => (
                            <Input
                                type="text"
                                placeholder="Mô tả"
                                onChange={(e: any) => {
                                    store.handleAdd(
                                        e,
                                        record,
                                        type,
                                        index,
                                        "description"
                                    );
                                }}
                            />
                        )}
                    />
                    <Column
                        title="Bắt buộc"
                        dataIndex="required"
                        key="required"
                        render={(text, record,index) => (
                            <Checkbox
                                onChange={(e: any) => {
                                    store.handleAdd(
                                        e,
                                        record,
                                        type,
                                        index,
                                        "required"
                                    );
                                }}
                            />
                        )}
                        width={94}
                    />
                    <Column
                        key="action"
                        render={(text: any, record: any, index: any) => (
                            <Space size="small">
                                <Tooltip title="Xóa">
                                    <Button
                                        shape="default"
                                        icon={<DeleteOutlined />}
                                        size="small"
                                        onClick={() =>
                                            store.handleDelete(record, type)
                                        }
                                    />
                                </Tooltip>
                            </Space>
                        )}
                    />
                </Table>
            </div>
        </React.Fragment>
    );
};

export default TableKeyValue;
