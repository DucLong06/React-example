import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import banner from '../../../assets/media/pages/market-banner.svg'
import { Empty, Select, Tabs } from 'antd';
import { homeStore as store } from './HomeStore'
import Loading from '../../../components/Loading/Loading'
import { ProxyToJson } from '../../../utils/helpers/Common'
import InfiniteScroll from 'react-infinite-scroll-component';
import ApiItem from '../../../components/Marketplace/ApiItem';
import { useSearchParams } from 'react-router-dom';




const Home = observer(() => {
    const { TabPane } = Tabs;
    const { Option } = Select;
    let [searchParams, setSearchParams] = useSearchParams();
    let category: string = searchParams.get("category") || "all-category";
    const onChangeTab = (activeKey: any) => {
        const currentParams = Object.fromEntries(searchParams);
        setSearchParams({ ...currentParams, category: activeKey });
    };
    useEffect(() => {

        store.currentPage = 1;
        store.loading = true
        store.loadEnd = false
        console.log('useEffect')
        // console.log('store.loading', store.loading)
        // console.log('store.loadingMore', store.loadingMore)
        // console.log('store.loadEnd', store.loadEnd)
        // console.log('store.currentPage', store.currentPage)

        store.getData(1, category, false)
    }, [category])
    useEffect(() => {
        store.getCategory(1)
    }, [])
    return (
        <React.Fragment>
            <div className="container p-6 flex flex-col gap-6">
                <div className='flex flex-col gap-0'>
                    <img src={banner} alt="Marketplace Banner" className='select-none'/>
                    {
                        store.loadingCategory
                        ? (
                            null
                        )
                        : (
                            ProxyToJson(store.totalItems).length > 0 && (
                                <Tabs
                                    defaultActiveKey={category}
                                    onChange={onChangeTab}
                                    tabBarExtraContent={
                                        <Select
                                            className='market-sort-select'
                                            defaultValue={store.sortType}
                                            onChange={(value: any) => {
                                                store.sortBy(value)
                                            }}
                                            size='small'
                                        >
                                            <Option value="popular">Phổ biến nhất</Option>
                                            <Option value="newest">Mới nhất</Option>
                                        </Select>
                                    }
                                    className="ant-tabs-mb-0"
                                >
                                    <TabPane tab="Tất cả" key="all-category"></TabPane>
                                    {
                                        store.category.filter((item: any) => item.api_count > 0).map((item: any) => (
                                            <TabPane tab={item.name} key={item.slug}>
                                            </TabPane>
                                        ))
                                    }
                                </Tabs>
                            )
                        )
                    }
                </div>
                <div className='flex flex-col gap-6'>
                {
                    store.loading
                    ? (
                        <Loading />
                    )
                    : (
                        ProxyToJson(store.totalItems).length > 0
                        ? (
                                <InfiniteScroll
                                    dataLength={ProxyToJson(store.totalItems).length}
                                    next={store.fetchMoreData}
                                    hasMore={store.loadEnd ? false : true}
                                    loader={store.loadEnd != true && store.totalPage > 1 ? <Loading/> : null}
                                    endMessage={
                                        <p className='flex justify-center p-6 pt-0 font-semibold text-gray-500 mb-0'>
                                            Bạn đã xem hết tất cả API
                                        </p>
                                    }
                                    className="-mx-6"
                                >
                                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-6 pb-6'>
                                    {
                                        ProxyToJson(store.totalItems).map((item: any, index: any) => {
                                            return <ApiItem item={item} key={index}/>
                                        })
                                    }
                                    </div>
                                </InfiniteScroll>
                        )
                        : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Không có dữ liệu"/>
                    )
                }
                </div>
            </div>

        </React.Fragment>
    )
})

export default Home