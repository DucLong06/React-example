import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";

import PrivateOutlet from "./PrivateOutlet";
import PrivateRoute from "./PrivateRoute";
import PrivateOutletStay from "./PrivateOutletStay";
import AppLayout from "../layouts/App/AppLayout";
import ToPage from '../components/ToPage/ToPage';
import { getToken } from '../utils/helpers/LocalStorage';

import ForgotPassword from "../pages/Account/ForgotPassword/ForgotPassword";
import InforAccount from "../pages/Account/InforAccount/InforAccount";
import Login from "../pages/Account/Login/Login";
import Register from "../pages/Account/Register/Register";
import ResetPassword from "../pages/Account/ResetPassword/ResetPassword";
import SetPassword from "../pages/Account/SetPassword/SetPassword";
import ListApi from "../pages/Api/Detail/ListApi";
import ViewApi from "../pages/Api/ViewApi";
import ListApp from "../pages/App/ListApp";
import ViewApp from "../pages/App/ViewApp";
import Detail from "../pages/Marketplace/Detail/Detail";
import Search from "../pages/Marketplace/Search/Search";
import Home from "../pages/Marketplace/Home/Home";
import ListOrganization from "../pages/Organization/ListOrganization";
import ViewOrganization from "../pages/Organization/ViewOrganization";
import ListTeam from "../pages/Team/ListTeam";
import ViewTeam from "../pages/Team/ViewTeam";
import Document from '../pages/Document/Document';
import IndexTeam from "../pages/Team/IndexTeam";


const Routers = () => {

    return (

        <BrowserRouter>
            <Routes>
                <Route path="/auth">
                    <Route path="/auth/login" element={ getToken() ? <ToPage page='/marketplace' noPath={true}/> : <Login />} />
                    <Route path="/auth/register" element={ getToken() ? <ToPage page='/marketplace' noPath={true}/> : <Register />} />
                    <Route path="/auth/forgot-password" element={ getToken() ? <ToPage page='/marketplace' noPath={true}/> : <ForgotPassword />} />
                    <Route path="/auth/reset-password" element={ getToken() ? <ToPage page='/marketplace' noPath={true}/> : <ResetPassword />} />
                    <Route path="/auth/set-password" element={ getToken() ? <ToPage page='/marketplace' noPath={true}/> : <SetPassword />} />
                </Route>


                <Route path="" element={<AppLayout><Outlet /></AppLayout>}>
                    <Route path="/" element={<Navigate to="/marketplace" replace />}></Route>
                    <Route path="/marketplace" element={<Home />} />
                    <Route path="/marketplace/detail/:apiId" element={<Detail />} />
                    <Route path="/marketplace/search/:searchKey" element={<Search />} />
                    <Route path="/docs" element={<Document />} />
                </Route>

                <Route path="" element={<AppLayout><PrivateOutletStay /></AppLayout>}>
                    <Route path="/organizations" element={<ListOrganization />} />
                    <Route path="/organizations/detail" element={<ViewOrganization />} />
                    <Route path="/teams" element={<IndexTeam />} />
                    <Route path="/user/detail" element={<InforAccount />}></Route>
                    <Route path="/sell">
                        <Route path="/sell/apis" element={<ListApi />} />
                        <Route path="/sell/apis/detail/:apiId/" element={<ViewApi />} />
                    </Route>
                    <Route path="/buy">
                        <Route path="/buy/apps" element={<ListApp />} />
                        <Route path="/buy/apps/detail" element={<ViewApp />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;
