import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Empty } from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import PageNavigation from "../../components/PageNavigation/PageNavigation";
import { apiStore as store } from "./Detail/ApiStore";
import DetailApi from "./Detail/DetailApi";
import OverViewApi from "./Detail/OverViewApi";

import ViewEndpoint from "./Endpoints/ViewEndpoint";
import Setting from "./Setting/Setting";

type Props = {};

const ViewApi = observer(() => {
    let navigate = useNavigate();
    let params = useParams();
    let id = params.apiId;

    let [searchParams, setSearchParams] = useSearchParams();
    let content: string = searchParams.get("content") || "dashboard";

    useEffect(() => {
        store.loadPageView(id);
    }, [id]);

    const tabMenu = [
        {
            label: "Tổng quan",
            key: "dashboard",
            ui: <OverViewApi store={store} />,
        },
        {
            label: "Chi tiết",
            key: "detail",
            ui: <DetailApi store={store} />,
        },
        {
            label: "Cài đặt",
            key: "setting",
            ui: <Setting />,
        },
        {
            label: "Endpoints",
            key: "endpoints",
            ui: <ViewEndpoint />,
        },
        {
            label: "Gói cước",
            key: "pricing",
            ui: (
                <div className="p-6">
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="Không có dữ liệu"
                    />
                </div>
            ),
        },
    ];
    const onChangeTab = (activeKey: any) => {
        const currentParams = Object.fromEntries(searchParams);
        setSearchParams({ ...currentParams, content: activeKey });
    };
    return (
        <React.Fragment>
            <div className="bg-all">
                <div className="w-full container">
                    <div className="py-6 px-6">
                        <div className="flex flex-col">
                            <div className="">
                                <Button
                                    icon={<ArrowLeftOutlined />}
                                    onClick={() => {
                                        navigate("/sell/apis?content=apis");
                                    }}
                                    size="small"
                                    className="border-0 shadow-none"
                                >
                                    Danh sách api đã phát hành
                                </Button>
                            </div>
                            <PageNavigation
                                type="api"
                                tab={tabMenu}
                                defaultActiveTabKey={content}
                                onChangeContent={onChangeTab}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
});

export default ViewApi;
