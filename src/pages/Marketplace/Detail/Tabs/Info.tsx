import { Collapse, Tabs, Tag } from 'antd'
import React from 'react'

type Props = {
    store: any
}

const Info = ({store}: Props) => {
    const { Panel } = Collapse;
    return (
        <React.Fragment>
            <div className="container p-6 flex flex-col gap-6">
                <div className='flex flex-col gap-2'>
                    <p className='mb-0 font-medium text-gray-900'>Website</p>
                    <div>
                        {
                            store.api.website
                                ? (
                                    <a href={store.api.website} target='_blank' rel='noopener noreferrer'>{store.api.website}</a>
                                )
                                : (
                                    <span className='text-gray-400'>Không có dữ liệu</span>
                                )
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <p className='mb-0 font-medium text-gray-900'>Phân loại</p>
                    <div className='flex items-center gap-x-3 gap-y-2 flex-wrap'>
                        {
                            store.api.category.length > 0
                                ? (
                                    store.api.category.map((cat: any, index: any) => {
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
                <div className='flex flex-col gap-2'>
                    <p className='mb-0 font-medium text-gray-900'>Mô tả ngắn</p>
                    <div>
                        {
                            store.api.short_description
                                ? (
                                    <p className='mb-0 whitespace-pre-line'>{store.api.short_description}</p>
                                )
                                : (
                                    <span className='text-gray-400'>Không có dữ liệu</span>
                                )
                        }
                    </div>
                </div>
                <Collapse
                    defaultActiveKey={['detail-information']}
                    onChange={() => { }}
                    className="api-detail-collapse"
                >
                    <Panel header="Mô tả chi tiết" key="detail-information">
                        {
                            store.api.long_description
                                ? (
                                    <div className='whitespace-normal break-words' dangerouslySetInnerHTML={{ __html: store.api.long_description }}></div>
                                )
                                : (
                                    <span className='text-gray-400'>Không có dữ liệu</span>
                                )
                        }
                    </Panel>
                    <Panel header="Điều khoản sử dụng" key="term-of-use">
                        {
                            store.api.term_of_use
                                ? (
                                    <div className='whitespace-normal break-words' dangerouslySetInnerHTML={{ __html: store.api.term_of_use }}></div>
                                )
                                : (
                                    <span className='text-gray-400'>Không có dữ liệu</span>
                                )
                        }
                    </Panel>
                </Collapse>
            </div>
        </React.Fragment>
    )
}

export default Info