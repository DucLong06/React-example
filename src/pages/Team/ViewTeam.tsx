import {
    ArrowLeftOutlined,
    EditOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Space, Table, Tag } from "antd";
import Column from "antd/lib/table/Column";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import { DefaultImg } from "../../utils/constants/Constants";
import AddTeamMember from "./AddTeamMember/AddTeamMember";
import ModalAddTeamMember from "./AddTeamMember/ModalAddTeamMember";
import EditTeam from "./EditTeam";
import EditTeamMember from "./EditTeamMember/EditTeamMember";
import { teamStore as store } from "./TeamStore";

type Props = {
    idTeam: any;
    idOrg: any;
};

const ViewTeam = observer(({ idTeam, idOrg }: any) => {
    let [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        store.loadPageView(idTeam);
    }, [idTeam, store.loading]);

    return (
        <React.Fragment>
            <div className="pt-2">
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => {
                        store.showListTeam = true;
                        setSearchParams({ q: idOrg, content: "groups" });
                    }}
                    size="small"
                    className="border-0 shadow-none"
                >
                    Danh sách nhóm
                </Button>
            </div>
            <div className="w-full border-0 border-b border-solid border-gray-200 pb-3 ">
                <div className="flex items-center justify-between gap-x-6 gap-y-2 flex-wrap">
                    <p className="text-gray-900 text-20 font-bold mb-0">
                        Thông tin nhóm
                    </p>
                    <Button
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => {
                            store.modalType = "edit_team";
                            store.showModal();
                        }}
                    >
                        Chỉnh sửa
                    </Button>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex gap-x-6 gap-y-1 py-6 items-center flex-wrap">
                    <p className="mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80">
                        Ảnh đại diện
                    </p>
                    <div className="flex-1">
                        <Avatar
                            size={64}
                            src={
                                store.itemTeam["logo_url"]
                                    ? store.itemTeam["logo_url"]
                                    : DefaultImg.bg
                            }
                        />
                    </div>
                </div>
                <div className="flex gap-x-6 gap-y-1 py-6 items-center flex-wrap">
                    <p className="mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80">
                        Tên nhóm
                    </p>
                    <div className="flex-1">
                        <p className="mb-0 text-gray-700">
                            {store.itemTeam["name"]}
                        </p>
                    </div>
                </div>
                <div className="flex gap-x-6 gap-y-1 py-6 items-center flex-wrap">
                    <p className="mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80">
                        Mô tả
                    </p>
                    <div className="flex-1">
                        <p className="mb-0 text-gray-700 whitespace-pre-line">
                            {store.itemTeam["description"]}
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full border-0 border-b border-solid border-gray-200 pb-3 ">
                <div className="flex items-center justify-between gap-x-6 gap-y-2 flex-wrap">
                    <p className="text-gray-900 text-20 font-bold mb-0">
                        Thành viên nhóm
                    </p>
                    <div className="flex gap-x-2">
                        <Button
                            icon={<PlusOutlined />}
                            size="small"
                            onClick={() => {
                                store.modalType = "add_team_member";
                                store.showModal();
                            }}
                            className="text-gray-800"
                        >
                            Thêm thành viên
                        </Button>
                        <Button
                            icon={<EditOutlined />}
                            size="small"
                            onClick={() => {
                                store.modalType = "edit_team_member";
                                store.showModal();
                            }}
                        >
                            Chỉnh sửa
                        </Button>
                    </div>
                </div>
            </div>
            <Table bordered className="pt-6" dataSource={store.itemTeamMember}>
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
                />{" "}
                <Column
                    title="Vai trò"
                    dataIndex="role"
                    key="role"
                    render={(text: any, record: any, index: any) => (
                        <div className="flex-1">
                            {record.role === "admin" ? (
                                <p className="mb-0 text-gray-700">Admin</p>
                            ) : (
                                <span className="text-gray-400">Developer</span>
                            )}
                        </div>
                    )}
                />
                <Column
                    title="Trạng thái"
                    dataIndex="status"
                    key="status"
                    render={(text: any, record: any, index: any) => (
                        <div>
                            {text === "joined" ? (
                                <Tag color="processing">Đã tham gia</Tag>
                            ) : (
                                <Tag color="error">Đang chờ chấp nhận</Tag>
                            )}
                        </div>
                    )}
                />
            </Table>

            <Pagination
                store={store}
                text="Thành viên"
            />

            {store.modalType === "edit_team" &&
            store.isModalVisible === true ? (
                <EditTeam item={store.itemTeam} dateTime={new Date()} />
            ) : null}

            {store.modalType === "add_team_member" &&
            store.isModalVisible === true ? (
                <ModalAddTeamMember
                    item={store.itemTeamMember}
                    store={store}
                    dateTime={new Date()}
                />
            ) : null}

            {store.modalType === "edit_team_member" &&
            store.isModalVisible === true ? (
                <EditTeamMember
                    item={store.itemTeamMember}
                    store={store}
                    dateTime={new Date()}
                />
            ) : null}
        </React.Fragment>
    );
});

export default ViewTeam;
