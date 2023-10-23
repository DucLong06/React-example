import { EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, Button, Input, Select, Space, Table, Tooltip } from 'antd';
import Column from 'antd/lib/table/Column';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { render } from 'sass';
import Pagination from '../../components/Pagination/Pagination';
import { DefaultImg, useQuery } from '../../utils/constants/Constants';
import { ProxyToJson } from '../../utils/helpers/Common';
import CreateApp from './CreateApp';
import EditApp from './EditApp';


type Props = {
    store: any
}


const AppManagement = observer(({ store }: Props) => {
    const { Option } = Select;
    const navigate = useNavigate()
    let [searchParams, setSearchParams] = useSearchParams();
    const query = useQuery();

    const checkView = () => {
        //console.log('checkView')
        store.viewDetail = false
        const stateParams: any = new URLSearchParams(window.location.search)
        if (stateParams.has('q')) {
            store.viewDetail = true
        }else{
            store.viewDetail = false
        }
    }

    useEffect(() => {
        window.onpopstate = (e: any) => {
            if (window.location.pathname == '/buy/apps') {
                checkView()
            }
        };
    });

    const render = (store: any) => {
        return (
            <React.Fragment>
                <div className='w-full border-0 border-b border-solid border-gray-200 pb-3 pt-6'>
                    <div className='flex items-center justify-between gap-x-6 gap-y-2 flex-wrap'>
                        <p className="text-gray-900 text-20 font-bold mb-0">Danh sách app</p>
                        <Button
                            icon={<PlusOutlined />}
                            size='small'
                            type="primary"
                            onClick={() => {
                                store.showModal()
                                store.modalType = "add_app"
                            }}
                        >
                            Tạo mới app
                        </Button>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className='border-0 border-solid border-gray-300 w-64 py-6' >
                        <Input
                            placeholder="Tìm kiếm theo tên, mô tả app"
                            suffix={
                                <SearchOutlined className='text-gray-400' />
                            }
                            size="small"
                        />
                    </div>
                </div>
                <div className='gap-x-6' >
                    <Table bordered dataSource={store.data} size='middle'>
                        <Column
                            title="STT"
                            key="index"
                            width={60}
                            align="center"
                            render={(value, item, index) => (store.page - 1) * 10 + index + 1}
                        />
                        <Column title="Tên" dataIndex="id" key="name"
                            render={(text: any, record: any, index: any) => (
                                <Space size="small">
                                    <Avatar src={record.logo_url ? record.logo_url : DefaultImg.bg} />
                                    <p key={text} className="font-medium mb-0 line-clamp-2 max-w-prose">{record.name}</p>
                                </Space>
                            )}
                        />
                        <Column
                            title="Mô tả"
                            dataIndex="description"
                            key="description"
                            render={(text: any, record: any, index: any) => (
                                <p className='mb-0 line-clamp-2 max-w-prose whitespace-pre-line'>{text}</p>
                            )}
                        />
                        <Column title="Nhóm" dataIndex="team" key="team" />
                        <Column
                            title="Thao tác"
                            key="action"
                            align="right"
                            render={(text: any, record: any, index: any) => (
                                <Space size="small">
                                    <Tooltip title="Chỉnh sửa">
                                        <Button
                                            shape="default"
                                            icon={<EditOutlined />}
                                            size='small'
                                            onClick={() => {
                                                store.modalType = "edit_app"
                                                store.showModal()
                                                store.itemEdit = record
                                            }}
                                        >
                                        </Button>

                                    </Tooltip>

                                    <Tooltip title="Xem chi tiết">
                                        {/* <Link to={{
                                        pathname: `/buy/apps/detail?q=${record.id}`,
                                    }}> */}
                                        <Button
                                            shape="default"
                                            icon={<EyeOutlined />}
                                            size='small'
                                            onClick={() => {
                                                store.viewDetail = true
                                                setSearchParams({ q: record.id, content: 'apps' })

                                            }}
                                        />
                                        {/* </Link> */}
                                    </Tooltip>

                                </Space>
                            )}
                        />
                    </Table>
                    <Pagination store={store} text="app" />
                </div>
                <CreateApp />
                {
                    store.modalType === "edit_app"
                        && store.isModalVisible === true
                        ? <EditApp item={store.itemEdit} dateTime={new Date()} />
                        : null
                }
            </React.Fragment>
        )
    }
    useEffect(() => {
        //console.log('new')
        checkView()
        store.loadPageList(store.page)
    }, [store.updateOrgTime]);



    return render(store)
})

export default AppManagement

