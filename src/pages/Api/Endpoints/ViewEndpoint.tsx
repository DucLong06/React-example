import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import { useQuery } from "../../../utils/constants/Constants";
import EndpointGroup from "./EndpointGroup/EndpointGroup";
import EndpointGroupEmpty from "./EndpointGroup/EndpointGroupEmpty";
import { viewEndpointStore as store } from "./ViewEndpointStore";

type Props = {};

const ViewEndpoint = observer(() => {
    const query = useQuery();
    const idEGr = query.get("idegr");
    const idEndpoint = query.get("ide");
    let params = useParams();
    let idApi = params.apiId;

    useEffect(() => {
        store.loadEndpointGroup();
    }, [idEGr, idEndpoint, idApi]);

    return (
        <React.Fragment>
            {idApi === null ? (
                <Loading />
            ) : (
                <div className="endpoint-area w-full pt-6 flex">
                    {store.listEndpointGroup.length > 0 ? (
                        <EndpointGroup idApi={idApi} />
                    ) : (
                        <EndpointGroupEmpty idApi={idApi} />
                    )}
                </div>
            )}
        </React.Fragment>
    );
});

export default ViewEndpoint;
