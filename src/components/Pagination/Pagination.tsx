import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

type Props = {
    store: any;
    text: string;
};

const Pagination = ({ store, text }: Props) => {
    return (
        <div className="rounded-t-none rounded-6 border-t-0 border border-solid border-gray-200 flex items-center justify-between py-2 px-3">
            <div>
                <p className="mb-0 py-1">
                    {store.itemTeamMember?.length
                        ? store.itemTeamMember?.length
                        : store.count}{" "}
                    {text}
                </p>
            </div>
            {store.count > 10 && (
                <div className="flex gap-x-2">
                    <Button
                        icon={<ArrowLeftOutlined />}
                        onClick={() => store.loadPageList(store.page - 1)}
                        disabled={store.disablePrevious}
                        size="small"
                        className="w-20 justify-center"
                    >
                        Trước
                    </Button>
                    <Button
                        className="w-20 justify-center button-icon-right"
                        icon={<ArrowRightOutlined />}
                        onClick={() => store.loadPageList(store.page + 1)}
                        disabled={store.disableNext}
                        size="small"
                    >
                        Sau
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Pagination;
