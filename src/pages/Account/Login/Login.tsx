import React from 'react'
import { Form, Input, Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { loginStore as store } from './LoginStore';
import logo from '../../../assets/media/logos/logo.svg';
import { EyeInvisibleTwoTone, EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
type Props = {}

const Login = observer(() => {
    return (
        <div className='bg-account flex justify-center items-center w-full h-full min-h-screen p-8'>
            <div className='w-full max-w-100 bg-white p-8 rounded-6 shadow-md flex flex-col gap-8 items-center'>
                {logo && <img src={logo} alt='logo' className='w-auto h-7' />}
                <div className='flex flex-col gap-5 w-full'>
                    <h1 className='text-gray-900 text-18 font-medium mb-0'>Đăng nhập</h1>
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
                            <Input placeholder='Email'/>
                        </Form.Item>

                        <div className='mb-6'>
                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập mật khẩu!' }

                                ]}
                                className='mb-2'
                            >
                                <Input.Password placeholder='Mật khẩu' iconRender={visible => (visible ? <EyeInvisibleTwoTone style={{ fontSize: 18 }} /> : <EyeOutlined style={{ fontSize: 18 }} />)} />
                            </Form.Item>
                            <Link to="/auth/forgot-password" className='block text-right'>Quên mật khẩu?</Link>
                        </div>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Đăng nhập
                            </Button>
                        </Form.Item>
                        <div className='flex justify-center gap-1.5'>
                            <span>Chưa có tài khoản?</span>
                            <Link to="/auth/register">Tạo tài khoản</Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>

    )
})

export default Login