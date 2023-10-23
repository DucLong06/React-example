import React from 'react'
import { Form, Input, Button, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { forgotPasswordStore as store } from './ForgotPasswordStore';
import logo from '../../../assets/media/logos/logo.svg';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

type Props = {}

const ForgotPassword = observer(() => {
    //listen to onpopstate event
    window.addEventListener('popstate', (e: any) => {
        store.forgotSuccess = false;
        store.emailForgot = "";
    });
    return (
        <div className='bg-account flex justify-center items-center w-full h-full min-h-screen p-8'>
            <div className='w-full max-w-100 bg-white p-8 rounded-6 shadow-md flex flex-col gap-8 items-center'>
                {logo && <img src={logo} alt='logo' className='w-auto h-7' />}
                <div className='flex flex-col gap-5 w-full'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-gray-900 text-18 font-medium mb-0'>Quên mật khẩu?</h1>

                    </div>
                    {
                        store.forgotSuccess
                            ? (
                                <div className='flex flex-col'>
                                    <p className='mb-0'>
                                        Chúng tôi đã gửi một email đến địa chỉ <b>{store.emailForgot}</b>, vui lòng làm theo hướng dẫn để đặt lại mật khẩu.
                                    </p>
                                    <p className='mb-0 pt-4'>
                                        Nếu bạn không nhận được email từ chúng tôi, vui lòng kiểm tra thư mục <b>Spam</b>.
                                    </p>
                                </div>
                            )
                            : (
                                <div>
                                    <p className='mb-0 pb-4'>Vui lòng điền địa chỉ email vào ô dưới đây. Chúng tôi sẽ gửi mail xác nhận để bạn tạo lại mật khẩu.</p>
                                    <Form
                                        name="basic"
                                        onFinish={store.onFinish}
                                        onFinishFailed={store.onFinishFailed}
                                        autoComplete="off"
                                        layout="vertical"
                                    >
                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            rules={[
                                                { required: true, message: 'Vui lòng nhập email!' },
                                                { type: 'email', message: 'Email không đúng định dạng!' }
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" loading={store.loading} block>
                                                Gửi email xác nhận
                                            </Button>
                                        </Form.Item>
                                        <Link to="/auth/login" className='flex justify-center gap-1.5 items-center'>
                                            <LeftOutlined />
                                            <span>Quay lại đăng nhập</span>
                                        </Link>
                                    </Form>
                                </div>
                            )
                    }

                </div>
            </div>
        </div>
    )
})

export default ForgotPassword