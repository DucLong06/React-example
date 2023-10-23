import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, Tag } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import PageNavigation from '../../components/PageNavigation/PageNavigation';
import { DefaultImg, useQuery } from '../../utils/constants/Constants';
import { appStore as store } from './AppStore';
import EditApp from './EditApp';

type Props = {}

const ViewApp = observer(() => {
    let [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()
    const query = useQuery();


    useEffect(() => {
        query.get("q") && store.loadPageView(query.get("q"))
    }, [store.updateOrgTime]);

    return (
        store.loading ? <Loading /> :
        <React.Fragment>
            <div className="bg-all">
                <div className='w-full container'>
                    <div className='pt-4'>
                        <Button
                            icon={<ArrowLeftOutlined />}
                            onClick={() => {
                                store.viewDetail=false
                                navigate('/buy/apps?content=apps')
                            }}
                            size='small'
                            className='border-0 shadow-none'
                        >Danh sách app</Button>
                    </div>
                    <div className="pt-2">
                        <div className='flex flex-col gap-6'>

                            <div className='w-full border-0 border-b border-solid border-gray-200 pb-3'>
                                <div className='flex items-center justify-between gap-x-6 gap-y-2 flex-wrap'>
                                    <p className="text-gray-900 text-20 font-bold mb-0">Thông tin app</p>
                                    <Button
                                        icon={<EditOutlined />}
                                        size='small'
                                        onClick={() => {
                                            store.showModal()
                                            store.modalType = "edit_app"
                                        }}>
                                        Chỉnh sửa
                                    </Button>

                                </div>
                            </div>

                            <div className='flex flex-col'>
                                <div className='flex gap-x-6 gap-y-1 py-6 items-start flex-wrap'>
                                    <p className='mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80'>Ảnh đại diện</p>
                                    <div className='flex-1'>
                                        <Avatar
                                            size={64}
                                            src={store.appItem["logo_url"] ? store.appItem["logo_url"] : DefaultImg.bg}
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-x-6 gap-y-1 py-6 items-start flex-wrap'>
                                    <p className='mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80'>Tên app</p>
                                    <div className='flex-1'>
                                        <p className='mb-0 text-gray-700'>{store.appItem["name"]}</p>
                                    </div>
                                </div>
                                <div className='flex gap-x-6 gap-y-1 py-6 items-start flex-wrap'>
                                    <p className='mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80'>Mô tả</p>
                                    <div className='flex-1'>
                                        {
                                            store.appItem["description"]
                                            ? <p className='mb-0 text-gray-700 whitespace-pre-line'>{store.appItem["description"]}</p>
                                            : <span className='text-gray-400'>Không có dữ liệu</span>
                                        }
                                    </div>
                                </div>
                                <div className='flex gap-x-6 gap-y-1 py-6 items-start flex-wrap'>
                                    <p className='mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80'>Nhóm</p>
                                    <div className='flex-1'>
                                        {
                                            store.appItem["id_team"]
                                            ? <Link to={`/team/detail?q=${store.appItem["id_team"]}`} title='Chi tiết thông tin nhóm'>
                                                {/* {store.appItem["name_team"]} */}
                                                Đây là link nhóm
                                            </Link>
                                            : <span className='text-gray-400'>Không có dữ liệu</span>
                                        }
                                    </div>
                                </div>
                                <div className='flex gap-x-6 gap-y-1 py-6 items-start flex-wrap'>
                                    <p className='mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80'>App key</p>
                                    <div className='flex-1'>
                                        {
                                            store.appItem["app_key"]
                                            ? <Tag className='mb-0 text-gray-700'>{store.appItem["app_key"]}</Tag>
                                            : <span className='text-gray-400'>Không có dữ liệu</span>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <EditApp item={store.appItem} dateTime={new Date()} />
        </React.Fragment>
    )
})

export default ViewApp