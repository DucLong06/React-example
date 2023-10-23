import { EditOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { DefaultImg, useQuery } from "../../../utils/constants/Constants";
import { LocalDate } from "../../../utils/helpers/Common";
import EditInforAccount from "./EditInforAccount";
import { inforAccountStore as store } from "./InforAccountStore";
import { appLayoutStore as layoutStore } from "../../../layouts/App/AppLayoutStore";
type Props = {};

const InforAccount = observer(() => {
    let query = useQuery();
    if (query.get("modal")) {
        store.modalType = "edit_infor";
        store.showModal();
    }

    useEffect(() => {
        store.loadPageView();
    }, [store.loading]);

    return (
        <div className="w-full container min-h-screen">
            <div className="py-6 px-6">
                <div className="w-full border-0 border-b border-solid border-gray-300 sticky top-0 bg-white z-10">
                    <div className=" flex items-center justify-between gap-x-6 gap-y-2">
                        <div className="pt-6 pb-3">
                            <p className="text-gray-900 text-20 font-bold mb-0">
                                Thông tin cá nhân
                            </p>
                        </div>
                        <Button
                            icon={<EditOutlined />}
                            size="small"
                            onClick={() => {
                                store.modalType = "edit_infor";
                                store.showModal();
                            }}
                        >
                            Chỉnh sửa
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="flex gap-x-6 gap-y-1 py-6 items-start flex-wrap">
                        <p className="mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80">
                            Ảnh đại diện
                        </p>
                        <div className="flex-1">
                            <Avatar
                                size={64}
                                src={
                                    store.iteamAccount["avatar_url"]
                                        ? store.iteamAccount["avatar_url"]
                                        : DefaultImg.bg
                                }
                            />
                        </div>
                    </div>
                    <div className="flex gap-x-6 gap-y-1 py-6 items-start flex-wrap">
                        <p className="mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80">
                            Tên
                        </p>
                        <div className="flex-1">
                            {store.iteamAccount.last_name ? (
                                <p className="mb-0 text-gray-700">
                                    {store.iteamAccount.last_name}
                                </p>
                            ) : (
                                <span className="text-gray-400">
                                    Không có dữ liệu
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-x-6 gap-y-1 py-6 items-start flex-wrap">
                        <p className="mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80">
                            Họ
                        </p>
                        <div className="flex-1">
                            {store.iteamAccount.first_name ? (
                                <p className="mb-0 text-gray-700">
                                    {store.iteamAccount.first_name}
                                </p>
                            ) : (
                                <span className="text-gray-400">
                                    Không có dữ liệu
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-x-6 gap-y-1 py-6 items-start flex-wrap">
                        <p className="mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80">
                            Email
                        </p>
                        <div className="flex-1">
                            {store.iteamAccount.primary_email ? (
                                <p className="mb-0 text-gray-700">
                                    {store.iteamAccount.primary_email}
                                </p>
                            ) : (
                                <span className="text-gray-400">
                                    Không có dữ liệu
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-x-6 gap-y-1 py-6 items-start flex-wrap">
                        <p className="mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80">
                            Ngày sinh
                        </p>
                        <div className="flex-1">
                            {store.iteamAccount.date_of_birth != null ? (
                                <p className="mb-0 text-gray-700">
                                    {store.iteamAccount.date_of_birth != null
                                        ? LocalDate(
                                              store.iteamAccount.date_of_birth
                                          )
                                        : ""}
                                </p>
                            ) : (
                                <span className="text-gray-400">
                                    Không có dữ liệu
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-x-6 gap-y-1 py-6 items-start flex-wrap">
                        <p className="mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80">
                            Giới tính
                        </p>
                        <div className="flex-1">
                            {store.iteamAccount.gender != null ? (
                                <p className="mb-0 text-gray-700">
                                    {store.iteamAccount.gender == null
                                        ? ""
                                        : store.iteamAccount.gender == "male"
                                        ? "Nam"
                                        : "Nữ"}
                                </p>
                            ) : (
                                <span className="text-gray-400">
                                    Không có dữ liệu
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-x-6 gap-y-1 py-6 items-start flex-wrap">
                        <p className="mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80">
                            Địa chỉ
                        </p>
                        <div className="flex-1">
                            {store.iteamAccount.address ? (
                                <p className="mb-0 text-gray-700">
                                    {store.iteamAccount.address}
                                </p>
                            ) : (
                                <span className="text-gray-400">
                                    Không có dữ liệu
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-x-6 gap-y-1 py-6 items-start flex-wrap">
                        <p className="mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80">
                            Quốc gia
                        </p>
                        <div className="flex-1">
                            {store.iteamAccount.country ? (
                                <p className="mb-0 text-gray-700">
                                    {store.iteamAccount.country?.name}
                                </p>
                            ) : (
                                <span className="text-gray-400">
                                    Không có dữ liệu
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {store.modalType == "edit_infor" && store.isModalVisible == true ? (
                <EditInforAccount
                    item={store.iteamAccount}
                    dateTime={new Date()}
                />
            ) : null}
        </div>
    );
});

export default InforAccount;
