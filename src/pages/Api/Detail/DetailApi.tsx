import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import Loading from "../../../components/Loading/Loading";
import { useQuery } from "../../../utils/constants/Constants";
import { apiStore as store } from "./ApiStore";
import EditDetailApi from "./EditDetailApi";
import ToggleContent from "../../../components/ToggleContent/ToggleContent";
import { useParams } from "react-router-dom";

type Props = {
    store?: any;
};

const DetailApi = observer(({ store }: Props) => {
    let params = useParams();
    let id = params.apiId;

    useEffect(() => {
        store.loadPageView(id);
    }, []);

    return store.loading ? (
        <Loading />
    ) : (
        <React.Fragment>
            <div className="w-full border-0 border-b border-solid border-gray-200 pb-3 ">
                <div className="flex items-center justify-between gap-x-6 gap-y-2 flex-wrap pt-6">
                    <p className="text-gray-900 text-20 font-bold mb-0">
                        Thông tin chi tiết
                    </p>
                    <Button
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => {
                            store.showModal();
                            store.modalType = "edit_detail_api";
                        }}
                    >
                        Chỉnh sửa
                    </Button>
                </div>
            </div>
            <div className="bg-all">
                <div className="w-full container">
                    <div className="flex flex-col">
                        <div className="flex gap-x-6 gap-y-1 py-6 items-start flex-wrap">
                            <p className="mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80">
                                Website
                            </p>
                            <div className="flex-1">
                                <div className="mb-0 text-gray-700">
                                    {store.apiItem["website"] ? (
                                        <a
                                            href={store.apiItem["website"]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {store.apiItem["website"]}
                                        </a>
                                    ) : (
                                        <span className="text-gray-400">
                                            Không có dữ liệu
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-x-6 gap-y-1 py-6 items-start flex-wrap">
                            <p className="mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80">
                                Mô tả chi tiết
                            </p>
                            <div className="flex-1 min-w-0">
                                {store.apiItem["long_description"] ? (
                                    <ToggleContent>
                                        <div
                                            className="mb-0 text-gray-700"
                                            dangerouslySetInnerHTML={{
                                                __html: store.apiItem[
                                                    "long_description"
                                                ],
                                            }}
                                        ></div>
                                    </ToggleContent>
                                ) : (
                                    <span className="text-gray-400">
                                        Không có dữ liệu
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-x-6 gap-y-1 py-6 items-start flex-wrap">
                            <p className="mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80">
                                Điều khoản sử dụng
                            </p>
                            <div className="flex-1 min-w-0">
                                {store.apiItem["term_of_use"] ? (
                                    <ToggleContent>
                                        <div
                                            className="mb-0 text-gray-700"
                                            dangerouslySetInnerHTML={{
                                                __html: store.apiItem[
                                                    "term_of_use"
                                                ],
                                            }}
                                        ></div>
                                    </ToggleContent>
                                ) : (
                                    <span className="text-gray-400">
                                        Không có dữ liệu
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <EditDetailApi item={store.apiItem} dateTime={new Date()} />
        </React.Fragment>
    );
});

export default DetailApi;
