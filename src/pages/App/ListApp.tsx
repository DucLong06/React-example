import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import PageNavigation from "../../components/PageNavigation/PageNavigation";
import AppManagement from "./AppManagement";
import Dashboard from "./Dashboard/Dashboard";
import { appStore as store } from "./AppStore";
import CreateApp from "./CreateApp";
import EditApp from "./EditApp";
import ViewApp from "./ViewApp";
import { useParams, useSearchParams } from "react-router-dom";

type Props = {};

const ListApp = observer(() => {
    let [searchParams, setSearchParams] = useSearchParams();
    let content: string = searchParams.get("content") || "dashboard";

    useEffect(() => {
        store.loadPageList(store.page);
    }, []);
    const onChangeTab = (activeKey: any) => {
        const currentParams = Object.fromEntries(searchParams);
        setSearchParams({ ...currentParams, content: activeKey });
    };

    const tabMenu = [
        {
            label: "Tổng quan",
            key: "dashboard",
            ui: <Dashboard />,
        },
        {
            label: "API đã mua",
            key: "apis",
            // ui: <ReleasedApiList store={store} />,
        },
        {
            label: "Tra cứu log",
            key: "log",
            ui: (
                <iframe
                    src="https://kibana.cyberapis.com/app/dashboards#/view/0d349250-f692-11ec-990f-afe58786e510?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-1d%2Cto%3Anow))&show-time-filter=true"
                    className="iframe-buy-dashboard  mt-3 rounded-6"
                ></iframe>
            ),
        },
        {
            label: "Quản lý app",
            key: "apps",
            ui:
                store.viewDetail == false ? (
                    <AppManagement store={store} />
                ) : (
                    <ViewApp />
                ),
        },
    ];

    return (
        <React.Fragment>
            <div className="bg-all">
                <div className="w-full container">
                    <div className="py-6 px-6">
                        <div className="flex flex-col gap-6">
                            <PageNavigation
                                type="buy"
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

export default ListApp;
