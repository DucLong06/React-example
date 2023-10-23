import { EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Space, Table, Tooltip } from "antd";
import Column from "antd/lib/table/Column";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import { DefaultImg } from "../../utils/constants/Constants";
import CreateTeam from "./CreateTeam";
import EditTeam from "./EditTeam";
import { teamStore as store } from "./TeamStore";

type Props = {
    idOrg: any;
};

const ListTeam = observer(({ idOrg }: any) => {
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        store.loadPageList(store.page, idOrg);
        store.idOrg = idOrg;
    }, [idOrg, store.loading]);

    return (
        <React.Fragment>
            <div className="w-full border-0 border-b border-solid border-gray-200 pb-3 pt-4">
                <div className="flex items-center justify-between gap-x-6 gap-y-2 flex-wrap">
                    <p className="text-gray-900 text-20 font-bold mb-0">
                        Danh sách nhóm
                    </p>
                    <Button
                        icon={<PlusOutlined />}
                        size="small"
                        type="primary"
                        onClick={() => {
                            store.modalType = "add_team";
                            store.showModal();
                        }}
                    >
                        Tạo mới nhóm
                    </Button>
                </div>
            </div>

            <div className="pt-6">
                <Table bordered dataSource={store.data} size="middle">
                    <Column
                        title="STT"
                        key="index"
                        width={60}
                        align="center"
                        render={(value, item, index) =>
                            (store.page - 1) * 10 + index + 1
                        }
                    />
                    <Column
                        title="Tên"
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
                                <p
                                    key={text}
                                    className="font-medium mb-0 line-clamp-2 max-w-prose"
                                >
                                    {record.name}
                                </p>
                            </Space>
                        )}
                    />
                    <Column
                        title="Mô tả"
                        dataIndex="description"
                        key="description"
                        render={(text: any, record: any, index: any) => (
                            <p className="mb-0 line-clamp-2 max-w-prose whitespace-pre-line">
                                {text}
                            </p>
                        )}
                    />
                    <Column
                        title="Số thành viên"
                        dataIndex="member"
                        key="member"
                        render={(text: any, record: any, index: any) => (
                            <p className="mb-0 line-clamp-2 max-w-prose">
                                {record.member_count}
                            </p>
                        )}
                    />
                    <Column
                        title="Thao tác"
                        key="action"
                        align="right"
                        render={(text: any, record: any, index: any) => (
                            <Space size="small">
                                <Tooltip title="Chỉnh sửa">
                                    <Button
                                        shape="default"
                                        icon={<EditOutlined />}
                                        size="small"
                                        onClick={() => {
                                            store.modalType = "edit_team";
                                            store.showModal();
                                            store.itemTeam = record;
                                        }}
                                    ></Button>
                                </Tooltip>
                                <Tooltip title="Xem chi tiết">
                                    <Button
                                        shape="default"
                                        icon={<EyeOutlined />}
                                        size="small"
                                        onClick={() =>
                                            store.showDetailTeam(
                                                setSearchParams,
                                                record.id,
                                                idOrg
                                            )
                                        }
                                    />
                                </Tooltip>
                            </Space>
                        )}
                    />
                </Table>
                <Pagination store={store} text="nhóm" />
            </div>
            {store.modalType === "edit_team" &&
            store.isModalVisible === true ? (
                <EditTeam item={store.itemTeam} dateTime={new Date()} />
            ) : null}

            <CreateTeam idOrg={idOrg} />
        </React.Fragment>
    );
});

export default ListTeam;
