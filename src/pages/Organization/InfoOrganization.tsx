
import { AntDesignOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, Image, Select, Tabs } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DefaultImg, useQuery } from '../../utils/constants/Constants';
import { ProxyToJson } from '../../utils/helpers/Common';
import EditOrganization from './EditOrganization';
import { organizationStore as store } from './OrganizationStore';



const InfoOrganization = observer(() => {
    const query = useQuery();

    useEffect(() => {
        if(store.updateOrgTime != ""){
            //store.loadDetailView(query.get("q"))
        }
    }, [store.updateOrgTime]);

    return (
        <div>
            <div className='w-full border-0 border-b border-solid border-gray-200 pb-3 pt-4'>
                <div className='flex items-center justify-between gap-x-6 gap-y-2 flex-wrap'>
                    <p className="text-gray-900 text-20 font-bold mb-0">Thông tin chung</p>
                    <Button
                        icon={<EditOutlined />}
                        size='small'
                        onClick={() => {
                            store.showModal()
                            store.modalType = "edit"
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
                            src={store.orgItem["logo_url"] ? store.orgItem["logo_url"] : DefaultImg.bg}
                        />
                    </div>
                </div>
                <div className='flex gap-x-6 gap-y-1 py-6 items-start flex-wrap'>
                    <p className='mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80'>Tên tổ chức</p>
                    <div className='flex-1'>
                        <p className='mb-0 text-gray-700'>{store.orgItem["name"]}</p>
                    </div>
                </div>
                <div className='flex gap-x-6 gap-y-1 py-6 items-start flex-wrap'>
                    <p className='mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80'>Mô tả</p>
                    <div className='flex-1'>
                        {
                            store.orgItem["description"]
                            ? <p className='mb-0 text-gray-700 whitespace-pre-line'>{store.orgItem["description"]}</p>
                            : <span className='text-gray-400'>Không có dữ liệu</span>
                        }
                    </div>
                </div>
                <div className='flex gap-x-6 gap-y-1 py-6 items-start flex-wrap'>
                    <p className='mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80'>Địa chỉ</p>
                    <div className='flex-1'>
                        {
                            store.orgItem["address"]
                            ? <p className='mb-0 text-gray-700'>{store.orgItem["address"]}</p>
                            : <span className='text-gray-400'>Không có dữ liệu</span>
                        }
                    </div>
                </div>
                <div className='flex gap-x-6 gap-y-1 py-6 items-start flex-wrap'>
                    <p className='mb-0 text-gray-900 font-medium w-full xs:w-40 sm:w-52 lg:w-60 xl:w-80'>Quốc gia</p>
                    <div className='flex-1'>
                        {
                            store.orgItem.country
                            ? <p className='mb-0 text-gray-700'>{store.orgItem.country.name}</p>
                            : <span className='text-gray-400'>Không có dữ liệu</span>
                        }
                    </div>
                </div>
            </div>

            {
                store.modalType === "edit" && store.isModalVisible === true
                    ? <EditOrganization item={store.orgItem} dateTime={new Date()} />
                    : null
            }
        </div>
    )

})
export default InfoOrganization
