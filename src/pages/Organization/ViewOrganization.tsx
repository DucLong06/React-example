import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageNavigation from "../../components/PageNavigation/PageNavigation";
import { useQuery } from "../../utils/constants/Constants";
import IndexTeam from "../Team/IndexTeam";
import InfoOrganization from "./InfoOrganization";
import { organizationStore as store } from "./OrganizationStore";
import TeamMemberOrg from "./TeamMemberOrg/TeamMemberOrg";

type Props = {};

const ViewOrganization = observer(() => {
    let navigate = useNavigate();

    const query = useQuery();
    const idOrg = query.get("q");

    let [searchParams, setSearchParams] = useSearchParams();
    let content: string = searchParams.get("content") || "info";
    const onChangeTab = (activeKey: any) => {
        const currentParams = Object.fromEntries(searchParams);
        setSearchParams({ ...currentParams, content: activeKey });
        //console.log('useEffect ViewOrganization onChangeTab')
    };

    useEffect(() => {
        store.loadDetailView(idOrg);
        //console.log('useEffect ViewOrganization idOrg: ', idOrg)
    }, [idOrg, store.updateOrgTime]);

    const tabMenu = [
        {
            label: "Thông tin tổ chức",
            key: "info",
            ui: <InfoOrganization />,
        },
        {
            label: "Nhóm",
            key: "groups",
            ui: <IndexTeam idOrg={idOrg} />,
        },
        {
            label: "Thành viên",
            key: "members",
            ui: <TeamMemberOrg />,
        },
    ];

    return (
        <div className="bg-all">
            <div className="w-full container">
                <div className="py-6 px-6">
                    <div className="flex flex-col">
                        <div className="">
                            <Button
                                icon={<ArrowLeftOutlined />}
                                onClick={() => {
                                    navigate("/organizations");
                                }}
                                size="small"
                                className="border-0 shadow-none"
                            >
                                Danh sách tổ chức
                            </Button>
                        </div>
                        <div className="pt-2">
                            <PageNavigation
                                type="org"
                                tab={tabMenu}
                                defaultActiveTabKey={content}
                                onChangeContent={onChangeTab}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default ViewOrganization;
