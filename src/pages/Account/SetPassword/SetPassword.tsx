import { EyeInvisibleTwoTone, EyeOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/media/logos/logo.svg";
import { setPasswordStore as store } from "./SetPasswordStore";

type Props = {};

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const SetPassword = observer(() => {
    let navigate = useNavigate();
    let query = useQuery();
    if (!query.get("code")) {
        navigate("/");
    }

    const paramData = {
        idEmail: query.get("email") || "",
        code: query.get("code") || "",
        type: query.get("type") || "",
    };

    useEffect(() => {
        store.checkKey(paramData.idEmail, paramData.code, paramData.type);
    }, []);

    return (
        <div className="bg-account flex justify-center items-center w-full h-full min-h-screen p-8">
            <div className="w-full max-w-100 bg-white p-8 rounded-6 shadow-md flex flex-col gap-8 items-center">
                {logo && <img src={logo} alt="logo" className="w-auto h-7" />}
                <div className="flex flex-col gap-5 w-full">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-gray-900 text-18 font-medium mb-0">
                            {store.tileName}
                        </h1>
                        {store.expiredLink != true && (
                            <p className="mb-0">
                                {" "}
                                Hãy điền mật khẩu vào ô dưới đây.
                            </p>
                        )}
                    </div>
                    {store.expiredLink ? (
                        <p className="mb-0 flex flex-col">
                            <span>
                                Link xác nhận không tồn tại hoặc đã quá hạn. Vui
                                lòng chọn đăng ký lại tài khoản tại đây.
                            </span>
                            <Link to="/auth/register">Đăng ký tài khoản.</Link>
                        </p>
                    ) : (
                        <Form
                            name="basic"
                            onFinish={store.onFinish}
                            onFinishFailed={store.onFinishFailed}
                            autoComplete="off"
                            layout="vertical"
                        >
                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập mật khẩu!",
                                    },
                                ]}
                            >
                                <Input.Password
                                    placeholder="Mật khẩu"
                                    iconRender={(visible) =>
                                        visible ? (
                                            <EyeInvisibleTwoTone
                                                style={{ fontSize: 18 }}
                                            />
                                        ) : (
                                            <EyeOutlined
                                                style={{ fontSize: 18 }}
                                            />
                                        )
                                    }
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    loading={store.loading}
                                >
                                    Lưu mật khẩu
                                </Button>
                            </Form.Item>
                        </Form>
                    )}
                </div>
            </div>
        </div>
    );
});

export default SetPassword;
