import { EditOutlined } from '@ant-design/icons';
import { Avatar, Button, Tag } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import Loading from '../../../components/Loading/Loading';
import { DefaultImg } from '../../../utils/constants/Constants';
import { LocalDate, ProxyToJson } from '../../../utils/helpers/Common';
import EditApi from './EditApi';

type Props = {
    store: any
}

const OverViewApi = observer(({ store }: Props) => {

    const renderOverview = (apiItem: any) => {
        return (
            <React.Fragment>
                <div className='w-full border-0 border-b border-solid border-gray-200 pb-3'>
                    <div className='flex items-center justify-between gap-x-6 gap-y-2 flex-wrap pt-6'>
                        <p className="text-gray-900 text-20 font-bold mb-0">Thông tin tổng quan</p>
                        <Button
                            icon={<EditOutlined />}
                            size='small'
                            onClick={() => {
                                store.showModal()
                                store.modalType = "edit_api"
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
                                src={apiItem["logo_url"] ? apiItem["logo_url"] : DefaultImg.bg}
                            />
                        </div>
                    </div>
                    <div className='flex gap-x-6 gap-y-1 py-6 items-start flex-wrap'>
                        <p className='mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80'>Tên API</p>
                        <div className='flex-1'>
                            <p className='mb-0 text-gray-700'>{apiItem["name"]}</p>
                        </div>
                    </div>
                    <div className='flex gap-x-6 gap-y-1 py-6 items-start flex-wrap'>
                        <p className='mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80'>Mô tả ngắn</p>
                        <div className='flex-1'>
                            {
                                apiItem["short_description"]
                                ? <p className='mb-0 text-gray-700 whitespace-pre-line'>{apiItem["short_description"]}</p>
                                : <span className='text-gray-400'>Không có dữ liệu</span>
                            }
                        </div>
                    </div>
                    <div className='flex gap-x-6 gap-y-1 py-6 items-start flex-wrap'>
                        <p className='mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80'>Phân loại</p>
                        <div className='flex-1' data-category={JSON.stringify(apiItem)}>
                            {
                                ProxyToJson(apiItem).category?.length > 0
                                ? (
                                    ProxyToJson(apiItem).category?.map((cat: any, index: any) => {
                                        return (
                                            <Tag
                                                //icon={<VideoCameraOutlined />}
                                                color="default"
                                                className='api-cat-tag api-cat-tag--entertainment'
                                                key={index}
                                            >
                                                {cat.name}
                                            </Tag>
                                        )
                                    })
                                )
                                : (
                                    <span className='text-gray-400'>Không có dữ liệu</span>
                                )
                            }
                        </div>
                    </div>
                    <div className='flex gap-x-6 gap-y-1 py-6 items-start flex-wrap'>
                        <p className='mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80'>Nhà phát hành</p>
                        <div className='flex-1'>
                            <p className='mb-0 text-gray-700'>
                            {
                                ProxyToJson(apiItem).creator?.first_name && ProxyToJson(apiItem).creator?.last_name
                                ? (
                                    ProxyToJson(apiItem).creator?.first_name + ' ' + ProxyToJson(apiItem).creator?.last_name
                                )
                                : (
                                    !ProxyToJson(apiItem).creator?.first_name && !ProxyToJson(apiItem).creator?.last_name
                                    ? (
                                        ProxyToJson(apiItem).creator?.username
                                    )
                                    : (
                                        ProxyToJson(apiItem).creator?.first_name || store.api.creator?.last_name
                                    )

                                )
                            }
                            </p>
                        </div>
                    </div>
                    <div className='flex gap-x-6 gap-y-1 py-6 items-start flex-wrap'>
                        <p className='mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80'>Ngày phát hành</p>
                        <div className='flex-1'>
                            <p className='mb-0 text-gray-700'>{LocalDate(apiItem["created_time"])}</p>
                        </div>
                    </div>
                    <div className='flex gap-x-6 gap-y-1 py-6 items-start flex-wrap'>
                        <p className='mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80'>Cập nhật</p>
                        <div className='flex-1'>
                            {
                                apiItem["updated_time"]
                                ? <p className='mb-0 text-gray-700'>{LocalDate(apiItem["updated_time"])}</p>
                                : <span className='text-gray-400'>Không có dữ liệu</span>
                            }
                        </div>
                    </div>
                    <div className='flex gap-x-6 gap-y-1 py-6 items-start flex-wrap'>
                        <p className='mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80'>Version</p>
                        <div className='flex-1'>
                            {
                                apiItem["versions"]
                                ? <p className='mb-0 text-gray-700'>{ apiItem["versions"][0]?.name}</p>
                                : <span className='text-gray-400'>Không có dữ liệu</span>
                            }
                        </div>
                    </div>
                </div>
                {
                    store.isModalVisible == true && store.modalType == "edit_api"
                    ? <EditApi item={apiItem} dateTime={new Date()} />
                    : null
                }
            </React.Fragment>
        )
    }

    // useEffect(() => {
    //     //store.loadPageView()
    //     console.log('useEffect')
    // }, [store.apiItem]);


    return (
        store.loading
        ? <Loading />
        : renderOverview(store.apiItem)
    )
})

export default OverViewApi

