import { Button, Form, Input } from "antd";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/media/logos/logo.svg";
import { registerStore, registerStore as store } from "./RegisterStore";
type Props = {};

const Register = observer(() => {
    const [form] = Form.useForm();

    //listen to onpopstate event
    window.addEventListener("popstate", (e: any) => {
        store.registerSuccess = false;
        store.emailRegister = "";
    });

    return (
        <div className="bg-account flex justify-center items-center w-full h-full min-h-screen p-8">
            <div className="w-full max-w-100 bg-white p-8 rounded-6 shadow-md flex flex-col gap-8 items-center">
                {logo && <img src={logo} alt="logo" className="w-auto h-7" />}
                <div className="flex flex-col gap-5 w-full">
                    <h1 className="text-gray-900 text-18 font-medium mb-0">
                        Tạo tài khoản
                    </h1>
                    {store.registerSuccess ? (
                        <p className="mb-0">
                            Chúng tôi đã gửi một email đến địa chỉ{" "}
                            <b>{store.emailRegister}</b>, vui lòng xác nhận
                            email trong vòng <b>24 giờ</b>. Cảm ơn bạn.
                        </p>
                    ) : (
                        <Form
                            name="basic"
                            form={form}
                            onFinish={store.onFinish}
                            onFinishFailed={store.onFinishFailed}
                            autoComplete="off"
                            layout="vertical"
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập email!",
                                    },
                                    {
                                        type: "email",
                                        message: "Email không đúng định dạng!",
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Email"
                                    value={store.email}
                                    onBlur={(e: any) => {
                                        {
                                            form.setFieldsValue({
                                                ["email"]: store.onEmailBlur(e),
                                            });
                                        }
                                    }}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={registerStore.loading}
                                    block
                                >
                                    Tạo tài khoản
                                </Button>
                            </Form.Item>

                            <div className="flex justify-center gap-1.5">
                                <span>Đã có tài khoản?</span>
                                <Link to="/auth/login">Đăng nhập</Link>
                            </div>
                        </Form>
                    )}
                </div>
            </div>
        </div>
    );
});

export default Register;
