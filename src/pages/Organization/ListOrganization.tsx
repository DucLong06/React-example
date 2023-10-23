import { EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Select, Space, Table, Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';
import { DefaultImg } from '../../utils/constants/Constants';
import CreateOrganization from './CreateOrganization';
import EditOrganization from './EditOrganization';
import { organizationStore as store } from './OrganizationStore';


type Props = {}

const ListOrganization = observer(() => {
    const { Option } = Select;

    const { Column, ColumnGroup } = Table;

    useEffect(() => {
        store.loadPageList(store.page)
    }, [store.loading, store.updateOrgTime]);

    let [searchParams, setSearchParams] = useSearchParams();
    let page: string = searchParams.get("page") || '';
    let owned: string = searchParams.get("owned") || '';

    return (
        <React.Fragment>
            <div className="bg-all">
                <div className='w-full container min-h-screen'>
                    <div className="py-6 px-6" >
                        <div className='w-full border-0 border-b border-solid border-gray-200 pb-3'>
                            <div className='flex items-center justify-between gap-x-6 gap-y-2 flex-wrap'>
                                <p className="text-gray-900 text-20 font-bold mb-0">Danh sách tổ chức</p>
                                <Button
                                    icon={<PlusOutlined />}
                                    size='small'
                                    type="primary"
                                    onClick={() => {
                                        store.showModal()
                                        store.modalType = "add"
                                    }}>
                                    Tạo mới tổ chức
                                </Button>

                            </div>
                        </div>

                        <div className="py-6">
                            <Select
                                defaultValue="in-org"
                                style={{ width: 210 }}
                                onChange={(e: any) => {
                                    store.handleChangeSelectList(e)
                                    setSearchParams({ page: store.page.toString(), owned: store.owned.toString() })
                                }}
                                size='small'
                            >
                                <Option value="my-org">Tổ chức do bạn tạo</Option>
                                <Option value="in-org">Tổ chức bạn là thành viên</Option>
                            </Select>
                        </div>
                        {/* data-json={JSON.stringify(store.data)} */}
                        <div className='' >
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
                                <Column title="Địa chỉ" dataIndex="address" key="address" />
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
                                                        store.modalType = "edit"
                                                        store.showModal()
                                                        store.itemEdit = record
                                                    }}
                                                >
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Xem chi tiết">
                                                <Link to={`/organizations/detail?q=${record.id}`}>
                                                    <Button
                                                        shape="default"
                                                        icon={<EyeOutlined />}
                                                        size='small'
                                                    />
                                                </Link>
                                            </Tooltip>
                                        </Space>
                                    )}
                                />
                            </Table>
                            <Pagination store={store} text="tổ chức" />
                        </div>
                    </div>
                </div>
            </div>
            {
                store.modalType === "add" && store.isModalVisible === true
                ? <CreateOrganization />
                : null
            }

            {
                store.modalType === "edit" && store.isModalVisible === true
                    ? <EditOrganization item={store.itemEdit} dateTime={new Date()} />
                    : null
            }

        </React.Fragment>
    )
})

export default ListOrganization