import { UpCircleOutlined } from "@ant-design/icons";
import { Avatar, Space, Table } from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import Pagination from "../../../components/Pagination/Pagination";
import { DefaultImg, useQuery } from "../../../utils/constants/Constants";
import { teamMemberOrgStore as store } from "./TeamMemberOrgStore";

type Props = {};

const TeamMemberOrg = observer(() => {
    const { Column, ColumnGroup } = Table;
    let query = useQuery();

    useEffect(() => {
        store.loadPageList(query.get("q"));
    }, []);

    const test = (array: any) => {};

    return (
        <React.Fragment>
            <div className="bg-all">
                <div className="w-full container">
                    <div className="py-6">
                        <div className="w-full border-0 border-b border-solid border-gray-200 pb-3">
                            <div className="flex items-center justify-between gap-x-6 gap-y-2 flex-wrap">
                                <p className="text-gray-900 text-20 font-bold mb-0">
                                    Danh sách thành viên của tổ chức
                                </p>
                            </div>
                        </div>
                        <div className="pt-6">
                            <Table
                                bordered
                                dataSource={store.data}
                                size="middle"
                            >
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

                                    render={(
                                        text: any,
                                        record: any,
                                        index: any
                                    ) => (
                                        <Space size="small">
                                            <Avatar

                                                src={
                                                    record.avatar_url
                                                        ? record.avatar_url
                                                        : DefaultImg.bg
                                                }
                                            />
                                            <div>
                                                <p
                                                    className="font-medium mb-0 text-14 text-gray-900"
                                                >
                                                    {record?.first_name}{" "}
                                                    {record?.last_name}
                                                </p>
                                                <p
                                                    className="font-medium mb-0 text-12 text-gray-500 line-clamp-2 max-w-prose"
                                                >
                                                    {text}
                                                </p>
                                            </div>
                                        </Space>
                                    )}
                                />
                                <Column
                                    title="Số lượng nhóm"
                                    dataIndex="team-member"
                                    key="team-member"
                                    render={(
                                        text: any,
                                        record: any,
                                        index: any
                                    ) => (
                                        <p className="mb-0 line-clamp-2 max-w-prose items-center justify-center text-center">
                                            {record.teams.length}
                                        </p>
                                    )}
                                    align="center"
                                />
                                <Column
                                    title={() => {
                                        return (
                                            <div className="flex gap-x-6 items-center ">
                                                <p className="mb-0">Nhóm</p>
                                                <div className="flex gap-x-1 items-center justify-center ">
                                                    <div className="circle"></div>
                                                    <p className="mb-0 text-12">
                                                        Đang chờ chấp nhận
                                                    </p>
                                                </div>
                                                <div className="flex gap-x-1 items-center justify-center ">
                                                    <div className="circle-black"></div>
                                                    <p className="mb-0 text-12">
                                                        Đã tham gia
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    }}
                                    dataIndex="teams"
                                    key="teams"
                                    render={(
                                        text: any,
                                        record: any,
                                        index: any
                                    ) => (
                                        <div className="flex gap-x-1 items-center flex-wrap">
                                            {text.map((item: any, index: any) => (
                                                <div className="flex gap-x-1">
                                                    <p
                                                        className="mb-0 text-gray-900 text-14"
                                                        style={
                                                            item.status ===
                                                            "waiting_for_accept"
                                                                ? {
                                                                      color: "#FF7A45",
                                                                  }
                                                                : {}
                                                        }
                                                    >
                                                        {item.team_name} -
                                                    </p>
                                                    <p
                                                        className="mb-0 text-gray-500 text-14"
                                                        style={
                                                            item.status ===
                                                            "waiting_for_accept"
                                                                ? {
                                                                      color: "#FF7A45",
                                                                  }
                                                                : {}
                                                        }
                                                    >
                                                        {
                                                            item.role === "admin"
                                                            ? "Admin"
                                                            : "Developer"
                                                        }
                                                        {
                                                            index != (text.length - 1) && ','
                                                        }
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                />
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
});

export default TeamMemberOrg;
