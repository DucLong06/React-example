import Editor from "@monaco-editor/react";
import { Button, Form, Input, Select, Tabs } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { endpointStore as store } from "./EndpointStore";
import Request from "./Request/Request";
import Response from "./Response/Response";

type Props = {
    idEGr: any;
};

const EndPoint = observer(({ idEGr }: Props) => {
    const { Option } = Select;
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 100 }} defaultValue="get">
                <Option value="get">GET</Option>
                <Option value="post">POST</Option>
                <Option value="patch">PATCH</Option>
                <Option value="delete">DELETE</Option>
            </Select>
        </Form.Item>
    );
    const { TabPane } = Tabs;
    const [form] = Form.useForm();
    store.idEGr = idEGr;
    let params = useParams();
    let idApi = params.apiId;
    useEffect(() => {
        store.loadBaseURL(idApi);
    }, []);
    const options = {
        selectOnLineNumbers: true,
        minimap: {
            enabled: false,
        },
        padding: {
            top: 8,
            bottom: 8,
        },
    };
    return (
        <React.Fragment>
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ modifier: "public" }}
                onFinish={store.onCreateEndpoint}
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
                                loading={store.loading}
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
                                message: "Vui lòng nhập Tên Endpoint!",
                            },
                        ]}
                        label="Tên Endpoint"
                    >
                        <Input
                            placeholder="Tên Endpoint"
                            style={{ width: 524 }}
                            defaultValue={store.nameNewEndpoint}
                            onChange={() => (store.disableSave = false)}
                        />
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả">
                        <TextArea
                            autoSize={{ minRows: 4, maxRows: 6 }}
                            placeholder="Mô tả"
                            style={{ width: 524 }}
                            onChange={() => (store.disableSave = false)}
                        />
                    </Form.Item>

                    <Form.Item name="path">
                        <Input
                            addonBefore={prefixSelector}
                            style={{ width: "100%" }}
                            placeholder="path"
                            value={store.baseURL}
                            // disabled={true}
                        />
                    </Form.Item>
                    <Form.Item>
                        <div>
                            <Tabs defaultActiveKey="request">
                                <TabPane tab="Request" key="request">
                                    <Request store={store} />
                                </TabPane>
                                <TabPane tab="Response" key="response">
                                    <Response store={store} />
                                </TabPane>
                            </Tabs>
                            <div className="w-full border-0 border-b border-solid border-gray-200 ">
                                <p className="text-gray-900 text-14 font-bold mb-0 pt-4 pb-2">
                                    Body
                                </p>
                            </div>
                            <div className="pt-2">
                                <Form.Item
                                    name="content-type"
                                    label="Content-Type"
                                >
                                    <Select
                                        showSearch
                                        placeholder="Content-Type"
                                        filterOption={(input, option) =>
                                            (
                                                option!
                                                    .children as unknown as string
                                            )
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                        defaultValue="json"
                                        style={{ width: 524 }}
                                        onChange={store.onChangeSelect}
                                    >
                                        <Option value="json">Json</Option>
                                        <Option value="xml">XML</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="description_body"
                                    label="Mô tả"
                                >
                                    <Editor
                                        options={options}
                                        height="300px"
                                        width="524px"
                                        theme="light"
                                        language={
                                            store.bodyType
                                                ? store.bodyType
                                                : "json"
                                        }
                                        onChange={() =>
                                            (store.disableSave = false)
                                        }
                                    />
                                </Form.Item>
                            </div>
                        </div>
                    </Form.Item>
                </div>
            </Form>
        </React.Fragment>
    );
});

export default EndPoint;
