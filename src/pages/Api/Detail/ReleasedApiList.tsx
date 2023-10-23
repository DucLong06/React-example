import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, DatePicker, Space, Table, Tooltip } from 'antd';
import Column from 'antd/lib/table/Column';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../../components/Pagination/Pagination';
import { DefaultImg } from '../../../utils/constants/Constants';
import { LocalDate } from '../../../utils/helpers/Common';

type Props = {
    store: any
}


const ReleasedApiList = observer(({ store }: Props) => {
    const dateFormat = 'DD/MM/YYYY';
    return (
        <React.Fragment>
            <div className='pt-6 pb-3 w-full border-0 border-b border-solid border-gray-200 pb-3'>
                <div className='flex items-center justify-between gap-x-6 gap-y-2 flex-wrap'>
                    <p className="text-gray-900 text-20 font-bold mb-0">Danh sách API đã phát hành</p>
                    <Button
                        icon={<PlusOutlined />}
                        size='small'
                        type="primary"
                        onClick={() => {
                            store.modalType = "add_api"
                            store.showModal()
                        }}
                    >
                        Tạo mới API
                    </Button>

                </div>
            </div>
            {/* <div className="flex gap-4 py-4">
                <DatePicker placeholder="Từ ngày" format={dateFormat} size="small" />
                <DatePicker placeholder="Đến ngày" format={dateFormat} size="small" />
            </div> */}
            <div className="pt-6">

                <Table bordered dataSource={store.data} size='middle'>
                    <Column
                        title="STT"
                        key="index"
                        width={60}
                        align="center"
                        render={(value, item, index) => (store.page - 1) * 10 + index + 1}
                    />
                    <Column title="Tên API" dataIndex="id" key="name"
                        render={(text: any, record: any, index: any) => (
                            <Space size="small">
                                <Avatar src={record.logo_url ? record.logo_url : DefaultImg.bg} />
                                <p key={text} className="font-medium mb-0 line-clamp-2 max-w-prose">{record.name}</p>
                            </Space>
                        )}
                    />
                    <Column
                        title="Mô tả"
                        dataIndex="short_description"
                        key="description"
                        render={(text: any, record: any, index: any) => (
                            <p className='mb-0 line-clamp-2 max-w-prose whitespace-pre-line'>{text}</p>
                        )}
                    />
                    <Column title="Ngày phát hành" dataIndex="created_time" key="created_time"
                        render={(text: any, record: any, index: any) => (
                            <p key={text} className="font-medium mb-0">{LocalDate(record.created_time)}</p>
                        )}
                    />
                    <Column
                        title="Thao tác"
                        key="action"
                        align="right"
                        render={(text: any, record: any, index: any) => (
                            <Space size="small">
                                <Tooltip title="Xem chi tiết">
                                    <Link to={{
                                        pathname: `/sell/apis/detail/${record.id}`,
                                    }}>
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
                <Pagination store={store} text="API đã phát hành" />
            </div>
        </React.Fragment>
    )
})

export default ReleasedApiList

