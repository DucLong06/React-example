import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import banner from '../../../assets/media/pages/market-banner.svg'
import { Empty, Select, Tabs } from 'antd';
import { searchStore as store } from './SearchStore'
import Loading from '../../../components/Loading/Loading'
import { ProxyToJson } from '../../../utils/helpers/Common'
import InfiniteScroll from 'react-infinite-scroll-component';
import ApiItem from '../../../components/Marketplace/ApiItem';
import { useParams, useSearchParams } from 'react-router-dom';




const Home = observer(() => {

    let params = useParams();
    let searchKey = params.searchKey || "";

    useEffect(() => {

        store.currentPage = 1;
        store.loading = true
        store.loadEnd = false
        console.log('useEffect')
        // console.log('store.loading', store.loading)
        // console.log('store.loadingMore', store.loadingMore)
        // console.log('store.loadEnd', store.loadEnd)
        // console.log('store.currentPage', store.currentPage)
        store.getData(1, decodeURI(searchKey), false)
    }, [searchKey])

    return (
        <React.Fragment>
            <div className="container p-6 flex flex-col gap-6">
                <div className='flex flex-col gap-6'>
                    <h2 className='mb-0 text-24 font-bold text-gray-900'>Kết quả tìm kiếm</h2>
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
                                            loader={store.loadEnd != true && store.totalPage > 1 ? <Loading /> : null}
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
                                                        return <ApiItem item={item} key={index} />
                                                    })
                                                }
                                            </div>
                                        </InfiniteScroll>
                                    )
                                    : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Không có dữ liệu" />
                            )
                    }
                </div>
            </div>

        </React.Fragment>
    )
})

export default Home