import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import ToPage from '../components/ToPage/ToPage';
import { getToken } from '../utils/helpers/LocalStorage';

const PrivateOutlet = () => {
    const auth = getToken();
    return auth ? <Outlet /> : <ToPage page='/auth/login'/>;
}

export default PrivateOutlet