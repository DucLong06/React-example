import { DownOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Menu } from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../../components/Loading/Loading";
import { useQuery } from "../../../../utils/constants/Constants";
import { useNavigateSearch } from "../../../../utils/helpers/Common";
import Endpoint from "../Endpoint/Endpoint";
import CreateEndpointGroup from "./CreateEndpointGroup/CreateEndpointGroup";
import { endpointGroupStore as store } from "./EndpointGroupStore";

type Props = {
    idApi: any;
};

//    items={[
//     {
//         label: (
//             <Link to="/user/detail" title='Chi tiết thông tin người dùng'>
//                 Thông tin cá nhân
//             </Link>
//         ),
//         key: 'user-info',
//         icon: <UserOutlined />,
//     },
//     {
//         label: (
//             <Link to="/organizations" title='Tổ chức'>
//                 Quản lí tổ chức
//             </Link>
//         ),
//         key: 'organizations',
//         icon: <SettingOutlined />,
//     },
//     {
//         label: 'Đăng xuất',
//         key: 'logout',
//         icon: <LogoutOutlined />,
//     },
// ]}
const menu = (
    <Menu
        onClick={store.handleMenuClick}
        items={[
            {
                label: "Thêm endpoint",
                key: "add-endpoint",
            },
            {
                label: "Chỉnh sửa",
                key: "edit-endpoint",
            },
            {
                label: "Đổi tên",
                key: "rename-endpoint",
            },
            {
                label: "Xoá group",
                key: "delete-endpoint",
                danger: true,
            },
        ]}
    />
);
const EndpointGroupMain = (item: any) => {
    return (
        <div
            className={`endpoint-group-main px-1.5 py-1 flex items-center cursor-pointer bg-gray-200 gap-1 h-10`}
        >
            <div className="endpoint-group-toggle flex items-center justify-center w-6 h-6 transform transition-all">
                <DownOutlined />
            </div>
            <div className="w-full endpoint-group-content flex items-center gap-1">
                <div className="w-full flex items-center justify-between">
                    {store.renameEndpointGroup ? (
                        <input
                            className="flex whitespace-normal break-words line-clamp-1"
                            defaultValue={item.name}
                            onBlur={(e: any) => {
                                store.onUdateEndpointGroup(e);
                            }}
                            onKeyDown={(e: any) => {
                                store.handleKeyDown(e);
                            }}
                        ></input>
                    ) : (
                        <span className="flex whitespace-normal break-words line-clamp-1">
                            {item.name}
                        </span>
                    )}
                    <Dropdown.Button
                        onClick={store.handleButtonClick}
                        overlay={menu}
                        className="drop-down-create"
                    ></Dropdown.Button>
                </div>
            </div>
        </div>
    );
};

const EndpointGroupItem = (item: any, groupIndex: any, endpointIndex: any) => {
    let methodClass = "";
    switch (item.http_method.name) {
        case "POST":
            methodClass = "text-warning";
            break;

        default:
            methodClass = "text-success";
            break;
    }
    return (
        <div
            className={`endpoint-group-item pl-8 pr-1.5 py-1 flex items-center cursor-pointer ${
                groupIndex === 0 && endpointIndex === 0
                    ? "bg-gray-200"
                    : "bg-gray-200"
            } gap-1 h-10`}
            onClick={(e) => {
                //store.viewEndpoint(item);
            }}
            key={`endpoint-group-item-${groupIndex}-${endpointIndex}`}
            data-group-index={groupIndex}
            data-endpoint-index={endpointIndex}
        >
            <div className="endpoint-group-content flex items-center gap-1">
                <div className="endpoint-group-title flex-1 flex items-center">
                    <div
                        className={`flex items-center justify-end px-1 text-12 w-12 ${methodClass}`}
                    >
                        {item.http_method.name}
                    </div>
                    <span className="flex-1 whitespace-normal break-words line-clamp-1">
                        {item.name}
                    </span>
                </div>
            </div>
        </div>
    );
};

const EndPointGroup = observer(({ idApi }: Props) => {
    const query = useQuery();
    const idEGr = query.get("idegr");
    const navigateSearch = useNavigateSearch();

    useEffect(() => {
        store.idEGr = idEGr;
        store.loadIdApiVersion(idApi);
        store.loadListEndpointGroup();
    }, [idEGr, idApi]);

    return (
        <React.Fragment>
            <div className="bg-gray-100  ">
                <div className="flex flex-col gap-y-3 py-3 px-3">
                    <div className="flex gap-1">
                        <div className="border-0 border-solid border-gray-200 w-100">
                            <Input
                                placeholder="Lọc group, endpoint"
                                size="small"
                                suffix={
                                    <SearchOutlined className="text-gray-400" />
                                }
                            />
                        </div>
                        <div>
                            <Button
                                icon={<PlusOutlined />}
                                size="small"
                                onClick={() => store.onClick(navigateSearch)}
                            />
                        </div>
                    </div>
                </div>
                <div className=" ">{EndpointGroupMain(store.item)}</div>
                {store.loading ? (
                    <Loading />
                ) : (
                    <div>
                        {" "}
                        {store.endpoints.length > 0 ? (
                            <div>
                                Endpoint group có {store.endpoints.length}{" "}
                                endpoint
                            </div>
                        ) : (
                            <div className="mb-0 pl-8 pr-3">
                                <p className="mb-0 pr-3 pt-2">
                                    Group hiện đang trống. bạn có thể{" "}
                                    <Link
                                        to=""
                                        onClick={() =>
                                            (store.onClickCreateEngpoint = true)
                                        }
                                    >
                                        Thêm endpoint{" "}
                                    </Link>
                                    hoặc truy cập các chức năng khác trên menu
                                    của group.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="px-6">
                {store.onClickCreateEngpoint ? (
                    <Endpoint idEGr={idEGr} />
                ) : (
                    <CreateEndpointGroup />
                )}
            </div>
        </React.Fragment>
    );
});

export default EndPointGroup;
