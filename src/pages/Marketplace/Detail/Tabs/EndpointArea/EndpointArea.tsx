import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { endpointAreaStore as store } from "./EndpointAreaStore";
import { Select, Button, Tabs, Badge, Input, Empty } from "antd";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Editor from "@monaco-editor/react";
import EndpointGroup from "../../../../../components/Marketplace/Endpoint/EndpointGroup";
import EndpointInput from "../../../../../components/Marketplace/Endpoint/EndpointInput";
import Loading from "../../../../../components/Loading/Loading";

type Props = {
    api: any;
};

const EndpointArea = observer(({ api }: Props) => {
    const { Option } = Select;
    const { TabPane } = Tabs;
    const [code, setCode] = useState("");
    const [requestTab, setRequestTab] = useState("request-header");
    const [responseTab, setResponseTab] = useState("response-header");
    const options = {
        //selectOnLineNumbers: true,
        minimap: {
            enabled: false,
        },
        padding: {
            top: 8,
            bottom: 8,
        },
    };
    const onChange = (newValue: any, e: any) => {
        //console.log('onChange', newValue, e);
        store.bodyData = newValue;
    };
    const editorDidMount = (editor: any, monaco: any) => {
        //'editorDidMount', editor);
        editor.focus();
    };
    const codeStringHeader = `cf-cache-status: DYNAMIC
        cf-ray: 714b9773a8f6b43c-HKG
        content-encoding: gzip
        content-type: text/html; charset=utf-8
        date: Wed, 01 Jun 2022 23:05:01 GMT
        expect-ct: max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"
        server: cloudflare
        set-cookie: i18n_redirected=en-US; Path=/; Expires=Thu, 01 Jun 2023 23:05:00 GMT; SameSite=Lax
        strict-transport-security: max-age=31536000
        vary: Accept-Encoding
        x-content-type-options: nosniff
        x-frame-options: SAMEORIGIN
        x-powered-by: Express`;
    const codeStringBody = `{
            "type": "PT",
            "information": {
                "name": "Trang Do 2",
                "dateOfEstablishment": "10231990",
                "address3": "Jl Anggrek XI/8, Jawa Tengah25",
                "postCode": "1234",
                "phone": "1234432120",
                "email": "trangdt7@fsoft.com.vn"
            }
        }`;

    useEffect(() => {
        api.versions.length !== 0 && store.getData(api.id);
    }, []);

    return api.versions.length === 0 ? (
        <div className="p-6">
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Không có dữ liệu"
            />
        </div>
    ) : store.loading ? (
        <Loading />
    ) : store.endpointGroup.count === 0 ? (
        <div className="p-6">
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Không có dữ liệu"
            />
        </div>
    ) : (
        <div className="endpoint-area w-full">
            <div className="endpoint-sidebar bg-gray-100 border-0 border-r border-solid border-gray-200 flex flex-col">
                <React.Fragment>
                    {store.type === "view" && (
                        <div className="p-3">
                            <Select
                                className="w-full"
                                defaultValue="1.0"
                                onChange={(value: any) => {}}
                                size="small"
                            >
                                <Option value="1.0">
                                    version 1.0 (Current)
                                </Option>
                            </Select>
                        </div>
                    )}
                    <EndpointGroup />
                </React.Fragment>
            </div>
            <div className="endpoint-main p-6 gap-6 flex-col flex">
                <div className="pb-3 border-0 border-b border-solid border-gray-200">
                    <div className="flex items-center gap-1 text-16 font-bold">
                        <span className="text-gray-400">
                            {store?.endpointGroup[0]["name"]} /{" "}
                        </span>
                        <span className="text-gray-900">
                            {store.endpoints.length > 0
                                ? store.endpoints[0]["name"]
                                : "name of endpoint "}
                        </span>
                    </div>
                </div>
                <div>
                    <p className="mb-0">
                        {/* Tổng hợp endpoint cho tài khoản của hệ thống, bao gồm
                        các endpoint get danh sách tài khoản, post thêm tài
                        khoản mới... */}
                        {store.endpoints.length > 0
                            ? store.endpoints[0]["description"]
                            : "description of endpoint "}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="endpoint-path-input rounded-6 border border-solid border-gray-200 flex-1 py-2 px-3">
                        <p className="mb-0 endpoint-path">
                            {/* <span>{`https://cbl.vn/accounts/`}</span>
                            <span className="text-danger">{`{id}`}</span>
                            <span>{`/edit/?host=`}</span> */}
                            <span>
                                {store.baseURL_api ? (
                                    store.baseURL_api
                                ) : (
                                    <span>{`http://axt-demo.v10.t.cyberapis.com/ocr/compareTexts`}</span>
                                )}
                            </span>
                            {/* <span>/{store.endpoints}</span> */}
                        </p>
                    </div>

                    <Button type="primary" onClick={store.onTestAPI}>
                        <span className="font-medium">Send</span>
                    </Button>
                </div>
                <div className="p-4 border border-solid border-gray-200 rounded-6 gap-2">
                    <h4 className="mb-0 text-gray-600 font-bold text-14">
                        Request
                    </h4>
                    <Tabs
                        defaultActiveKey="request-body"
                        onChange={(activeKey: any) => {
                            setRequestTab(activeKey);
                        }}
                        size="small"
                    >
                        <TabPane
                            tab={
                                <div className="flex items-center gap-1">
                                    <span>Header</span>
                                    <Badge
                                        count={2}
                                        className={
                                            requestTab == "request-header"
                                                ? `badge-light-primary`
                                                : `badge-light-gray`
                                        }
                                    />
                                </div>
                            }
                            key="request-header"
                        >
                            <div className="w-1/2 flex flex-col gap-6">
                                <EndpointInput
                                    item={{
                                        label: "Authorization",
                                        type: "AUTHHEADER",
                                        required: true,
                                        placeholder: "Phương thức xác thực",
                                        defaultValue: "Token 1010101011",
                                    }}
                                />
                                <EndpointInput
                                    item={{
                                        label: "Host",
                                        type: "String",
                                        required: true,
                                        placeholder: "Host",
                                        defaultValue:
                                            "https://app.cyberapishub.com",
                                    }}
                                />
                            </div>
                        </TabPane>
                        <TabPane
                            tab={
                                <div className="flex items-center gap-1">
                                    <span>Query parameters</span>
                                    <Badge
                                        count={2}
                                        className={
                                            requestTab ==
                                            "request-query-parameters"
                                                ? `badge-light-primary`
                                                : `badge-light-gray`
                                        }
                                    />
                                </div>
                            }
                            key="request-query-parameters"
                        >
                            <div className="w-1/2 flex flex-col gap-6">
                                <EndpointInput
                                    item={{
                                        label: "username",
                                        type: "String",
                                        required: true,
                                        placeholder: "username tài khoản",
                                        defaultValue: "cyberlabs",
                                    }}
                                />
                                <EndpointInput
                                    item={{
                                        label: "id",
                                        type: "String",
                                        required: true,
                                        placeholder: "Id của tài khoản",
                                        defaultValue: "1",
                                    }}
                                />
                            </div>
                        </TabPane>
                        <TabPane
                            tab={
                                <div className="flex items-center gap-1">
                                    <span>Variables</span>
                                    <Badge
                                        count={1}
                                        className={
                                            requestTab == "request-variables"
                                                ? `badge-light-primary`
                                                : `badge-light-gray`
                                        }
                                    />
                                </div>
                            }
                            key="request-variables"
                        >
                            <div className="w-1/2 flex flex-col gap-6">
                                <EndpointInput
                                    item={{
                                        label: "appId",
                                        type: "String",
                                        required: true,
                                        placeholder: "Id của app",
                                        defaultValue: "001",
                                    }}
                                />
                                <EndpointInput
                                    item={{
                                        label: "appCategory",
                                        type: "String",
                                        required: true,
                                        placeholder: "Danh mục của app",
                                        defaultValue: "all",
                                    }}
                                />
                            </div>
                        </TabPane>
                        <TabPane
                            tab={
                                <div className="flex items-center gap-1">
                                    <span>Body</span>
                                </div>
                            }
                            key="request-body"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <p className="mb-0">Nhập input</p>
                                    <div className="rounded-6 border border-solid border-gray-200 overflow-hidden">
                                        <Editor
                                            options={options}
                                            height="300px"
                                            width="100%"
                                            theme="light"
                                            language="json"
                                            //value={codeStringBody}
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>
                                {/* <div className="flex flex-col gap-2">
                                    <p className="mb-0">Mô tả</p>
                                    <div className="syntax-highlighter-wrapper rounded-6 border border-solid border-gray-200 overflow-auto">
                                        <SyntaxHighlighter
                                                        language="json"
                                                        style={github}
                                                        showLineNumbers={true}
                                                    >
                                                        {codeStringBody}
                                                    </SyntaxHighlighter>
                                    </div>
                                </div> */}
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
                <div className="p-4 border border-solid border-gray-200 rounded-6 gap-2">
                    <h4 className="mb-0 text-gray-600 font-bold text-14">
                        Response
                    </h4>
                    <Tabs
                        defaultActiveKey="response-body"
                        onChange={(activeKey: any) => {
                            setResponseTab(activeKey);
                        }}
                        size="small"
                    >
                        <TabPane
                            tab={
                                <div className="flex items-center gap-1">
                                    <span>Header</span>
                                    <Badge
                                        count={2}
                                        className={
                                            responseTab == "response-header"
                                                ? `badge-light-primary`
                                                : `badge-light-gray`
                                        }
                                    />
                                </div>
                            }
                            key="response-header"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <p className="mb-0">Giá trị trả về</p>
                                    <div className="syntax-highlighter-wrapper rounded-6 border border-solid border-gray-200 overflow-auto">
                                        <SyntaxHighlighter
                                            language="json"
                                            style={github}
                                            showLineNumbers={true}
                                        >
                                            {codeStringHeader}
                                        </SyntaxHighlighter>
                                    </div>
                                </div>
                                {/* <div className="flex flex-col gap-2">
                                    <p className="mb-0">Mô tả</p>
                                    <div className="syntax-highlighter-wrapper rounded-6 border border-solid border-gray-200 overflow-auto">
                                        <SyntaxHighlighter
                                            language="json"
                                            style={github}
                                            showLineNumbers={true}
                                        >
                                            {codeStringHeader}
                                        </SyntaxHighlighter>
                                    </div>
                                </div> */}
                            </div>
                        </TabPane>
                        <TabPane
                            tab={
                                <div className="flex items-center gap-1">
                                    <span>Body</span>
                                </div>
                            }
                            key="response-body"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <p className="mb-0">Giá trị trả về</p>
                                    <div className="syntax-highlighter-wrapper rounded-6 border border-solid border-gray-200 overflow-auto">
                                        <SyntaxHighlighter
                                            language="json"
                                            style={github}
                                            showLineNumbers={true}
                                        >
                                            {codeStringBody}
                                        </SyntaxHighlighter>
                                    </div>
                                </div>
                                {/* <div className="flex flex-col gap-2">
                                    <p className="mb-0">Mô tả</p>
                                    <div className="syntax-highlighter-wrapper rounded-6 border border-solid border-gray-200 overflow-auto">
                                        <SyntaxHighlighter
                                            language="json"
                                            style={github}
                                            showLineNumbers={true}
                                        >
                                            {codeStringBody}
                                        </SyntaxHighlighter>
                                    </div>
                                </div> */}
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    );
});

export default EndpointArea;
