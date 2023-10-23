import React from 'react';
import ToPage from '../components/ToPage/ToPage';
import { getToken } from '../utils/helpers/LocalStorage';


const PrivateRoute = ({ children }: any) => {
    const auth = getToken();
    return auth ? children : <ToPage page='/auth/login'/>;
}

export default PrivateRoute