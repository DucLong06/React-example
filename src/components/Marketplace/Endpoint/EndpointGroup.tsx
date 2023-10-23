import { ConsoleSqlOutlined, DownOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { endpointAreaStore as store } from '../../../pages/Marketplace/Detail/Tabs/EndpointArea/EndpointAreaStore';
import $ from 'jquery';
import Loading from '../../Loading/Loading';
type Props = {}



const EndpointGroupMain = (item: any, groupIndex: any) => {
    return (
        <div
            className={`endpoint-group-main px-1.5 py-1 flex items-center cursor-pointer bg-gray-100 gap-1 h-10`}
            data-group-index={groupIndex}
        >
            <div
                className='endpoint-group-toggle flex items-center justify-center w-6 h-6 transform transition-all'
            >
                <DownOutlined />
            </div>
            <div className='endpoint-group-content flex items-center gap-1'>
                <div className='endpoint-group-title flex-1 flex items-center'>
                    <span className='flex-1 whitespace-normal break-words line-clamp-1'>{item.name}</span>
                </div>
            </div>
        </div>
    )
}
const EndpointGroupItem = (item: any, groupIndex: any, endpointIndex: any) => {
    let methodClass = '';
    switch (item.http_method.name) {
        case "POST":
            methodClass = 'text-warning'
            break;

        default:
            methodClass = 'text-success'
            break;
    }
    return (
        <div
            className={`endpoint-group-item pl-8 pr-1.5 py-1 flex items-center cursor-pointer ${groupIndex === 0 && endpointIndex === 0 ? "bg-gray-200" : "bg-gray-100"} gap-1 h-10`}
            onClick={(e) => {
                //store.viewEndpoint(item);
            }}
            key={`endpoint-group-item-${groupIndex}-${endpointIndex}`}
            data-group-index={groupIndex}
            data-endpoint-index={endpointIndex}
        >
            <div className='endpoint-group-content flex items-center gap-1'>
                <div className='endpoint-group-title flex-1 flex items-center'>
                    <div className={`flex items-center justify-end px-1 text-12 w-12 ${methodClass}`}>
                        {item.http_method.name}
                    </div>
                    <span className='flex-1 whitespace-normal break-words line-clamp-1'>{item.name}</span>
                </div>
            </div>
        </div>
    )
}


const EndpointGroup = observer(() => {
    const [loading, setLoading] =  useState(false);
    useEffect(() => {
        $('.endpoint-group-main').on('click',function () {
            $(this).next().slideToggle();
            $(this).children('.endpoint-group-toggle').toggleClass("-rotate-90");
        });
        $('.endpoint-group-item').on('click',function () {
            $('.endpoint-group-item').removeClass('bg-gray-200').addClass('bg-gray-100');
            $(this).removeClass('bg-gray-100').addClass('bg-gray-200');
        });
    }, [])

    return (

            loading
            ? <Loading />
            : (
                <div className='endpoint-groups'>
                    {
                        store.endpointGroup.map((item: any, groupIndex: number) => {
                            let endpoints: any = []
                            endpoints = store.endpoints?.filter((endpoint: any) => endpoint.endpoint_group === item.id);
                            if (endpoints.length > 0) {
                                if(groupIndex === 0){
                                    store.viewEndpoint(endpoints[0]);
                                }
                                return (
                                    <div className='endpoint-group' key={groupIndex}>
                                        {EndpointGroupMain(item, groupIndex)}
                                        <div className='endpoint-group-items'>
                                        {
                                            endpoints.map((endpoint: any, endpointIndex: number) => {
                                                return EndpointGroupItem(endpoint, groupIndex, endpointIndex)
                                            })
                                        }
                                        </div>
                                    </div>
                                )
                            }else{
                                return null
                            }
                        })
                    }
                </div>
            )


    )
})

export default EndpointGroup