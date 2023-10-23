import { Button, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import Loading from "../../../../../components/Loading/Loading";
import { useQuery } from "../../../../../utils/constants/Constants";
import { createEndpointGroupStore as store } from "./CreateEndpointGroupStore";
type Props = {};

const CreateEndpointGroup = observer(() => {
    const query = useQuery();
    const idEGr = query.get("idegr");

    useEffect(() => {
        store.idEGr = idEGr;
        store.loadDetailEndpointGroup(store.idEGr);
    }, [idEGr]);
    const [form] = Form.useForm();

    return (
        <React.Fragment>
            {store.loading ? (
                <Loading />
            ) : (
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    onFinish={store.onFinish}
                    className="pl-6"
                >
                    <div className="w-full border-0 border-b border-solid border-gray-200 ">
                        <div className="flex items-center justify-between gap-x-6 gap-y-2 flex-wrap">
                            <p className="text-gray-900 text-20 font-bold mb-0">
                                {store.item.name}
                            </p>
                            <Form.Item>
                                <Button
                                    size="small"
                                    type="primary"
                                    htmlType="submit"
                                    disabled={store.disableSave}
                                >
                                    Lưu
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="pt-6">
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập Tên group!",
                                },
                            ]}
                            label="Tên group"
                        >
                            <Input
                                placeholder="Tên group"
                                style={{ width: 524 }}
                                onChange={() => (store.disableSave = false)}
                                defaultValue={store.item.name}
                            />
                        </Form.Item>
                        <Form.Item name="description" label="Mô tả">
                            <TextArea
                                autoSize={{ minRows: 4, maxRows: 6 }}
                                placeholder="Mô tả"
                                style={{ width: 524 }}
                                onChange={() => (store.disableSave = false)}
                                defaultValue={store.item.description}
                            />
                        </Form.Item>
                    </div>
                </Form>
            )}
        </React.Fragment>
    );
});

export default CreateEndpointGroup;
