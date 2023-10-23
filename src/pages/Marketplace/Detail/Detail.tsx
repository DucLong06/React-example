import { CodeOutlined, DollarCircleOutlined, FileTextOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Avatar, Empty, Tabs } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams, useSearchParams } from "react-router-dom";
import Loading from '../../../components/Loading/Loading';
import { DefaultImg } from '../../../utils/constants/Constants';
import { LocalDate } from '../../../utils/helpers/Common';
import { detailStore as store } from './DetailStore';
import EndpointArea from './Tabs/EndpointArea/EndpointArea';
import Info from './Tabs/Info';
import process from '../../../assets/media/general/process.svg'


const Detail = observer(() => {
    let params = useParams();
    let id = params.apiId;

    let [searchParams, setSearchParams] = useSearchParams();

    let content: string = searchParams.get("content") || 'info';

    const { TabPane } = Tabs;


    const renderTab = (key: string) => {
        switch (key) {
            case 'endpoints':
                return <EndpointArea api={store.api}/>
            case 'document':
                return <div className='px-6 py-12'><Empty image={process} imageStyle={{ height: 180, marginBottom: 8 }} description={<span className='text-gray-500'>Sắp ra mắt!</span>}/></div>
            case 'pricing':
                return <div className='px-6 py-12'><Empty image={process} imageStyle={{ height: 180, marginBottom: 8 }} description={<span className='text-gray-500'>Sắp ra mắt!</span>}/></div>
            default:
                return <Info store={store} />
        }
    }

    useEffect(() => {
        store.getData(id)
    }, [id])

    return (
        <React.Fragment>
            {
                store.loading
                    ? (
                        <Loading />
                    )
                    : (
                        <React.Fragment>
                            <div className="marketplace-detail">
                                <div className="container p-6 pb-4">
                                    <div className='flex items-center gap-3'>
                                        <Avatar size='large' src={store.api.logo_url ? store.api.logo_url : DefaultImg.bg} />
                                        <div className='flex flex-col gap-0 min-w-1 flex-1'>
                                            <p className='font-medium text-16 text-gray-900 mb-0'>{store.api.name}</p>
                                            <div className='flex items-center gap-3 flex-wrap'>
                                                <p className='mb-0 flex items-center gap-1'>
                                                    <span className='text-gray-400'>Bởi</span>
                                                    <span className='text-gray-700'>
                                                        {
                                                            store.api.creator.first_name && store.api.creator.last_name
                                                            ? (
                                                                store.api.creator.first_name + ' ' + store.api.creator.last_name
                                                            )
                                                            : (
                                                                !store.api.creator.first_name && !store.api.creator.last_name
                                                                ? (
                                                                    store.api.creator.username
                                                                )
                                                                : (
                                                                    store.api.creator.first_name || store.api.creator.last_name
                                                                )

                                                            )
                                                        }
                                                    </span>
                                                </p>
                                                {
                                                    store.api.updated_time && (
                                                        <p className='mb-0 flex items-center gap-1'>
                                                            <span className='text-gray-400'>Cập nhật</span>
                                                            <span className='text-gray-700'>{LocalDate(store.api.updated_time)}</span>
                                                        </p>
                                                    )
                                                }
                                                {
                                                    store.api.versions && (<p className='mb-0 flex items-center gap-1'>
                                                        <span className='text-gray-400'>Version</span>
                                                        <span className='text-gray-700'>{store.api.versions[0]?.name}</span>
                                                    </p>)

                                                }
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className='border-0 border-b border-solid border-gray-200'>
                                    <div className="container px-6">
                                        <Tabs
                                            defaultActiveKey={content}
                                            onChange={(activeKey: any) => {
                                                setSearchParams({ content: activeKey })
                                            }}
                                            centered
                                            className="ant-tabs-mb-0 ant-tabs-border-bottom-0 ant-tab-fill"
                                        >
                                            <TabPane
                                                tab={
                                                    <div className="flex items-center">
                                                        <InfoCircleOutlined />
                                                        <span>Thông tin</span>
                                                    </div>
                                                }
                                                key="info"
                                            ></TabPane>
                                            <TabPane
                                                tab={
                                                    <div className="flex items-center">
                                                        <CodeOutlined />
                                                        <span>Endpoints</span>
                                                    </div>
                                                }
                                                key="endpoints"
                                            ></TabPane>
                                            <TabPane
                                                tab={
                                                    <div className="flex items-center">
                                                        <FileTextOutlined />
                                                        <span>Tài liệu</span>
                                                    </div>
                                                }
                                                key="document"
                                            ></TabPane>
                                            <TabPane
                                                tab={
                                                    <div className="flex items-center">
                                                        <DollarCircleOutlined />
                                                        <span>Chi phí</span>
                                                    </div>
                                                }
                                                key="pricing"
                                            ></TabPane>

                                        </Tabs>
                                    </div>
                                </div>
                                {
                                    renderTab(content)
                                }

                            </div>
                        </React.Fragment>
                    )
            }

        </React.Fragment>
    )
})

export default Detail