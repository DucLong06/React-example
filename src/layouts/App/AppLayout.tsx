import { DownOutlined, LogoutOutlined, PlusCircleOutlined, RightOutlined, SearchOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Empty, Input, Menu, Tabs } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/media/logos/logo.svg';
import { useNavigateSearch } from '../../utils/helpers/Common';
import { appLayoutStore as store } from './AppLayoutStore';
import QuickSearch from '../../components/QuickSearch/QuickSearch';
import { getToken } from '../../utils/helpers/LocalStorage';

const AppLayout = observer(({ children }: any) => {
    const navigateSearch = useNavigateSearch();
    const navigate = useNavigate()

    const currentUrl = window.location.pathname;
    const currentUrlSplit = currentUrl === '/' ? 'marketplace' : currentUrl.split('/')[1];


    window.addEventListener('storage', function (event) {
        if (event.key == 'logout-event') {
            window.open(`${window.location.origin}/marketplace`, "_self")
        }
    });


    const { TabPane } = Tabs;
    const menuTaoMoi = (
        <Menu
            onClick={store.handleMenuClickMenu}
            items={[
                {
                    label: 'Tổ chức',
                    key: 'org',

                },
                {
                    label: 'API',
                    key: 'api',

                },
                {
                    label: 'App',
                    key: 'app',

                },
            ]}
        />
    );


    const menuAccount = (
        <Menu
            onClick={store.handleMenuClickAccount}
            items={[
                {
                    label: (
                        <Link to="/user/detail" title='Chi tiết thông tin người dùng'>
                            Thông tin cá nhân
                        </Link>
                    ),
                    key: 'user-info',
                    icon: <UserOutlined />,
                },
                {
                    label: (
                        <Link to="/organizations" title='Tổ chức'>
                            Quản lí tổ chức
                        </Link>
                    ),
                    key: 'organizations',
                    icon: <SettingOutlined />,
                },
                {
                    label: 'Đăng xuất',
                    key: 'logout',
                    icon: <LogoutOutlined />,
                },
            ]}
        />
    );

    useEffect(() => {
        console.log('getToken()', getToken())
        getToken() && store.getAccount();
    }, [store.updateAccountTime]);



    return (
        <React.Fragment>
            <div className='w-full border-0 border-b border-solid border-gray-200 sticky top-0 bg-white z-50'>
                <div className="container px-6 " >
                    <div className='flex items-center justify-between gap-x-6 gap-y-2  '>
                        <div className='flex items-center justify-between gap-x-4 xl:gap-x-8'>
                            <Link to="/" title='Trang chủ'>
                                <img src={logo} alt='logo' className='w-auto h-7' />
                            </Link>
                            <QuickSearch />
                        </div>

                        <div className='flex items-center justify-between gap-x-4 xl:gap-x-8'>
                            <div className='header-tab text-60 text-gray-900'>
                                <Tabs
                                    onChange={(activeKey: any) => store.changeActiveKey(activeKey, navigateSearch)}
                                    activeKey={currentUrlSplit}
                                >
                                    <TabPane tab="MarketPlace" key="marketplace">
                                    </TabPane>
                                    <TabPane tab="Mua" key="buy">
                                    </TabPane>
                                    <TabPane tab="Bán" key="sell">
                                    </TabPane>
                                    <TabPane tab="Tài liệu" key="docs">
                                    </TabPane>
                                </Tabs>
                            </div>
                            {
                                getToken()
                                ? (
                                    <React.Fragment>
                                        <div >
                                            <Dropdown overlay={menuTaoMoi} placement="bottomRight" arrow trigger={['click']}>

                                                <Button
                                                    type="primary"
                                                    size='small'
                                                    icon={<DownOutlined />}
                                                    className="button-icon-right"
                                                >
                                                    <p className='hidden mb-0 xl:inline-block'>Tạo mới</p>
                                                    <p className='inline-block mb-0 xl:hidden'><PlusCircleOutlined /></p>
                                                </Button>

                                            </Dropdown>

                                        </div>
                                        <div className="header-account">

                                            <Dropdown overlay={menuAccount} placement="bottomRight" arrow trigger={['click']}>
                                                <div className='flex items-center cursor-pointer gap-x-2'>
                                                    <Avatar size='default' style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} icon={<UserOutlined />}>
                                                    </Avatar >
                                                    <DownOutlined />
                                                </div>
                                            </Dropdown>
                                        </div>
                                    </React.Fragment>
                                )
                                :(
                                    <Button
                                        type="primary"
                                        size='small'
                                        onClick={() => {
                                            window.open(`${window.location.origin}/auth/login?path=${window.location.pathname}${window.location.search}`, "_self")
                                        }}
                                    >
                                        <p className='hidden mb-0 xl:inline-block'>Đăng nhập</p>
                                    </Button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div >
            {children}

        </React.Fragment >
    )
})

export default AppLayout