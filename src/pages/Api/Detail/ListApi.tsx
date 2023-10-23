import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import PageNavigation from "../../../components/PageNavigation/PageNavigation";
import { apiStore as store } from "./ApiStore";
import CreateApi from "./CreateApi";
import ReleasedApiList from "./ReleasedApiList";
import { useParams, useSearchParams } from "react-router-dom";

type Props = {};

const ListApi = observer(() => {
    let [searchParams, setSearchParams] = useSearchParams();
    let content: string = searchParams.get("content") || "dashboard";

    useEffect(() => {
        store.loadPageList(store.page);
    }, []);

    const tabMenu = [
        {
            label: "Tổng quan",
            key: "dashboard",
            ui: (
                <iframe
                    src="https://kibana.cyberapis.com/app/dashboards#/view/7adfa750-4c81-11e8-b3d7-01146121b73d?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-7d%2Cto%3Anow))&show-query-input=true&show-time-filter=true"
                    className="iframe-sell-dashboard mt-3 rounded-6"
                ></iframe>
            ),
        },
        {
            label: "API đã phát hành",
            key: "apis",
            ui: <ReleasedApiList store={store} />,
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
                        <div className="flex flex-col gap-6">
                            <PageNavigation
                                type="sell"
                                tab={tabMenu}
                                defaultActiveTabKey={content}
                                onChangeContent={onChangeTab}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <CreateApi />
        </React.Fragment>
    );
});

export default ListApi;
