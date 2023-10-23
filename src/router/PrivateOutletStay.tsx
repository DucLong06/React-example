import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import ToPage from '../components/ToPage/ToPage';
import { getToken } from '../utils/helpers/LocalStorage';
import login from '../assets/media/general/login.svg'
import { Empty } from 'antd';

const PrivateOutletStay = () => {
    const auth = getToken();
    return auth
    ? <Outlet />
    : <div className='px-6 py-12'>
        <Empty
            image={login}
            imageStyle={{ height: 180, marginBottom: 8 }}
            description={<p className='text-gray-500'>Vui lòng <span className='text-primary cursor-pointer hover:text-primary-600' onClick={() => {
                window.open(`${window.location.origin}/auth/login?path=${window.location.pathname}${window.location.search}`, "_self")
            }}>đăng nhập</span> để sử dụng chức năng!</p>}
        >
            <div className='flex items-center justify-center py-3'>
                <span
                    className="cursor-pointer bg-primary-100 text-primary hover:text-white hover:bg-primary px-5 py-2 rounded-8 text-center transition-all"
                    onClick={() => {
                        window.open(`${window.location.origin}/auth/login?path=${window.location.pathname}${window.location.search}`, "_self")
                    }}
                >
                        <span className="font-bold">Đăng nhập</span>
                </span>
            </div>
        </Empty>
    </div>;
}

export default PrivateOutletStay