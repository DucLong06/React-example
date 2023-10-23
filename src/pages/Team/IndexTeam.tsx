import { Select, Tabs } from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useQuery } from "../../utils/constants/Constants";
import ListTeam from "./ListTeam";
import { teamStore as store } from "./TeamStore";
import ViewTeam from "./ViewTeam";

type Props = {
    idOrg: any
};

const IndexTeam = observer(({ idOrg }: any) => {
    const query = useQuery();
    const idTeam = query.get("team");



    useEffect(()=>{
        if (idTeam) {
            store.showListTeam = false;
        }else{
            store.showListTeam = true
        }
    },[])


    return (
        <React.Fragment>
            {store.showListTeam ? (
                <React.Fragment>
                    <ListTeam idOrg={idOrg} />
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {" "}
                    <ViewTeam idTeam={idTeam} idOrg={idOrg} />
                </React.Fragment>
            )}
        </React.Fragment>
    );
});

export default IndexTeam;
