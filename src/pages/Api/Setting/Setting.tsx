import { Button, Form, Input, Select, Table } from "antd";
import Column from "antd/lib/table/Column";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import { settingStore as store } from "./SettingStore";

type Props = {};

const SettingApi = observer(() => {
    const { Option } = Select;
    const [form] = Form.useForm();
    let params = useParams();
    let id = params.apiId;
    useEffect(() => {
        store.baseURL = "";
        store.idBaseURL = "";
        store.loadPageView(id);
    }, [id]);

    return (
        <React.Fragment>
            {store.loading ? (
                <Loading />
            ) : (
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{ modifier: "public" }}
                    onFinish={store.onFinish}
                >
                    <div className="w-full border-0 border-b border-solid border-gray-200 pb-3">
                        <div className="flex items-center justify-between gap-x-6 gap-y-2 flex-wrap pt-6">
                            <p className="text-gray-900 text-20 font-bold mb-0">
                                Cài đặt
                            </p>
                            <Button
                                size="small"
                                type="primary"
                                htmlType="submit"
                                disabled={store.disableSave}
                            >
                                Lưu
                            </Button>
                        </div>
                    </div>
                    <div className="w-full border-0 border-b border-solid border-gray-200 pb-3 pt-6">
                        <p className="text-gray-900 text-20 font-bold mb-0">
                            Base URL
                        </p>
                    </div>
                    <div className="pt-6">
                        <Table size="middle" dataSource={store.tableData}>
                            <Column
                                className="w-1/2"
                                title="Tên"
                                render={(text, record) => (
                                    <p className="mb-0">Mặc định</p>
                                )}
                            />
                            <Column
                                title="Đường dẫn"
                                dataIndex="url"
                                key="url"
                                render={(text, record) => (
                                    <Input
                                        maxLength={256}
                                        placeholder="Đường dẫn"
                                        onChange={store.onChange}
                                        type="text"
                                        defaultValue={store.baseURL}
                                        onBlur={store.onTrimInput}
                                    />
                                )}
                            />
                        </Table>
                    </div>
                    <div className="w-full border-0 border-b border-solid border-gray-200 pb-3 pt-4">
                        <p className="text-gray-900 text-20 font-bold mb-0">
                            Xác thực
                        </p>
                    </div>
                    <div className="py-6">
                        <Select
                            defaultValue="basic-auth"
                            style={{ width: 200 }}
                            onChange={store.onChangeAuth}
                        >
                            <Option value="basic-auth">Basic Auth</Option>
                            <Option value="bearer-token">Bearer Token</Option>
                        </Select>
                    </div>
                    <div>
                        <Form
                            name="basic"
                            autoComplete="off"
                            layout="horizontal"
                        >
                            <Form.Item className={store.auth ? "" : "hidden"}>
                                <div className="flex gap-y-1 py-6 items-start">
                                    <p className="mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80">
                                        Username
                                    </p>
                                    <div className="flex-1">
                                        <Input
                                            placeholder="Username"
                                            style={{ width: 320 }}
                                        />
                                    </div>
                                </div>
                            </Form.Item>

                            <Form.Item className={store.auth ? "" : "hidden"}>
                                <div className="flex gap-y-1 py-6 items-start">
                                    <p className="mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80">
                                        Password
                                    </p>
                                    <div className="flex-1">
                                        <Input
                                            placeholder="Password"
                                            style={{ width: 320 }}
                                        />
                                    </div>
                                </div>
                            </Form.Item>
                            <Form.Item className={store.auth ? "hidden" : ""}>
                                <div className="flex gap-y-1 py-6 items-start">
                                    <p className="mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80">
                                        Token
                                    </p>
                                    <div className="flex-1">
                                        <Input
                                            placeholder="Token"
                                            style={{ width: 320 }}
                                        />
                                    </div>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </Form>
            )}
        </React.Fragment>
    );
});

export default SettingApi;
