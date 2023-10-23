import { PlusOutlined } from "@ant-design/icons";
import { Button, Empty } from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import createEndpoint from "../../../../assets/media/pages/api-endpoints.svg";
import { useNavigateSearch } from "../../../../utils/helpers/Common";
import { endpointGroupStore as store } from "./EndpointGroupStore";
type Props = {
    idApi: any;
};

const EndpointGroupEmpty = observer(({ idApi }: Props) => {
    useEffect(() => {
        store.loadIdApiVersion(idApi);
    }, [idApi]);
    const navigateSearch = useNavigateSearch();

    return (
        <React.Fragment>
            <div className="bg-gray-100 w-80 pt-6">
                <div className="flex flex-col px-12">
                    <img
                        className="pt-12 w-56 pb-4"
                        src={createEndpoint}
                        alt="createEndpoint icon"
                    />
                    <p className="font-medium text-16 text-gray-900 mb-0 text-center">
                        Hãy tạo group để bắt đầu.
                    </p>
                </div>
                <div className="px-20 pt-6">
                    <Button
                        icon={<PlusOutlined />}
                        size="small"
                        type="primary"
                        onClick={() => store.onFristCreate(navigateSearch)}
                        loading={store.loading}
                    >
                        Tạo mới group
                    </Button>
                </div>
            </div>

            <div>
                <Empty
                    description="Không có endpoint, vui lòng thêm endpoint từ group."
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            </div>
        </React.Fragment>
    );
});

export default EndpointGroupEmpty;
