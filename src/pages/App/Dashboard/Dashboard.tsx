import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { CaretDownOutlined, CaretUpOutlined, FieldNumberOutlined, NumberOutlined, RiseOutlined } from '@ant-design/icons';
import { Select, Skeleton } from 'antd';
import { Line, Bar, Column } from '@ant-design/charts';
import antCharTheme from '../../../assets/json/antd-chart-theme.json'
import dataDemo from '../../../@data/dashboard.json'
import { dashboardStore as store } from './DashboardStore'
import Loading from '../../../components/Loading/Loading';



const Dashboard = observer(() => {

    const { Option } = Select;
    useEffect(() => {
        //store.accountInfo()
        //store.groupAndMember(store.currentAccount.id, 'no_filter', 'default', 0)
    }, [])

    return (

        // store.accountInfoLoading != true
        // ? (
            <div className='flex flex-col'>
                <div className='flex flex-col'>
                    <div className='flex flex-wrap p-6 justify-between items-center gap-6'>
                        <div className='flex items-start gap-x-14 gap-y-2'>
                            <div className='flex items-start gap-1'>
                                <div className='h-10 w-10 flex items-center justify-between rounded-6 text-24 text-primary'>
                                    <FieldNumberOutlined />
                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-16 text-gray-700'>Tổng số API</span>
                                    <span className='text-20 font-medium text-gray-900'>1.098</span>
                                </div>
                            </div>
                            <div className='flex items-start gap-1'>
                                <div className='h-10 w-10 flex items-center justify-between rounded-6 text-24 text-warning'>
                                    <RiseOutlined />
                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-16 text-gray-700'>Tổng số lần gọi API</span>
                                    <span className='text-20 font-medium text-gray-900'>12.000</span>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center gap-x-6 gap-y-2'>
                            <Select
                                className='call-api-method-select'
                                defaultValue='post'
                                onChange={() => { }}
                                size='small'
                            >
                                <Option value="post">POST</Option>
                                <Option value="get">GET</Option>
                            </Select>
                            <Select
                                className='call-api-time-select'
                                defaultValue='7days'
                                onChange={() => { }}
                                size='small'
                            >
                                <Option value="24hours">24 giờ trước</Option>
                                <Option value="7days">7 ngày gần nhất</Option>
                                <Option value="4weeks">4 tuần trước</Option>
                            </Select>

                        </div>
                    </div>
                    <div className='bg-dashboard-grid rounded-6 p-6 grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
                        <div className='flex flex-col gap-6 p-6 pt-5 bg-white rounded-12 border border-solid border-gray-200'>
                            <h3 className='mb-0 text-16 font-medium text-gray-900'>Tổng số API mua mới theo ngày</h3>
                            <div className='flex flex-col gap-2 justify-center flex-1'>
                                <Line {...store.buyPerDayConfig} />
                            </div>

                        </div>
                        <div className='flex flex-col gap-6 p-6 pt-5 bg-white rounded-12 border border-solid border-gray-200'>
                            <h3 className='mb-0 text-16 font-medium text-gray-900'>Số lần gọi tới mỗi API</h3>
                            <div className='flex flex-col gap-2 justify-center flex-1'>
                                <Bar {...store.callAPICountConfig} />
                            </div>

                        </div>
                        <div className='flex flex-col gap-6 p-6 pt-5 bg-white rounded-12 border border-solid border-gray-200'>
                            <h3 className='mb-0 text-16 font-medium text-gray-900'>Top 10 endpoint được gọi nhiều nhất</h3>
                            <div className='flex flex-col gap-2 justify-center flex-1'>
                                <Bar {...store.topEndpointConfig} />
                            </div>

                        </div>
                        <div className='flex flex-col gap-6 p-6 pt-5 bg-white rounded-12 border border-solid border-gray-200'>
                            <h3 className='mb-0 text-16 font-medium text-gray-900'>Độ trễ</h3>
                            <div className='flex flex-col gap-2 justify-center flex-1'>
                                <div className='flex h-5 items-center'>
                                    <span className='text-12 text-gray-500 pl-4'>ms</span>
                                </div>
                                <Line {...store.delayConfig} />
                            </div>

                        </div>
                        <div className='flex flex-col gap-6 p-6 pt-5 bg-white rounded-12 border border-solid border-gray-200'>
                            <h3 className='mb-0 text-16 font-medium text-gray-900'>Tổng số lần gọi API theo app</h3>
                            <div className='flex flex-col gap-2 justify-center flex-1'>
                                <Column {...store.callAPIByAppConfig}/>
                            </div>

                        </div>
                        <div className='flex flex-col gap-6 p-6 pt-5 bg-white rounded-12 border border-solid border-gray-200'>
                            <h3 className='mb-0 text-16 font-medium text-gray-900'>Tổng số lần gọi API theo trạng thái</h3>
                            <div className='flex flex-col gap-2 justify-center flex-1'>
                                <Column {...store.callAPIByStatusConfig}/>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='flex flex-wrap p-6 justify-between items-center gap-6'>
                        <div className='flex items-start gap-x-14 gap-y-2'>
                            <div className='flex items-start gap-1'>
                                <div className='h-10 w-10 flex items-center justify-between rounded-6 text-24 text-primary'>
                                    <NumberOutlined />
                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-16 text-gray-700'>Tổng số tổ chức của bạn</span>
                                    <span className='text-20 font-medium text-gray-900'>8</span>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center gap-x-6 gap-y-2'>
                            <Select
                                className='type-org-select'
                                defaultValue='allOrg'
                                onChange={() => { }}
                                size='small'
                            >
                                <Option value="allOrg">Tất cả tổ chức</Option>
                                <Option value="createdOrg">Bạn tạo</Option>
                                <Option value="memberOrg">Bạn là thành viên</Option>
                            </Select>
                            <Select
                                className='call-api-time-select'
                                defaultValue='7days'
                                onChange={() => { }}
                                size='small'
                            >
                                <Option value="24hours">24 giờ trước</Option>
                                <Option value="7days">7 ngày gần nhất</Option>
                                <Option value="4weeks">4 tuần trước</Option>
                            </Select>

                        </div>
                    </div>
                    <div className='bg-dashboard-grid rounded-6 p-6 grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
                        <div className='flex flex-col gap-6 p-6 pt-5 bg-white rounded-12 border border-solid border-gray-200'>
                            <h3 className='mb-0 text-16 font-medium text-gray-900'>Nhóm và thành viên trong các tổ chức của bạn</h3>
                            <div className='flex flex-col gap-2 justify-center flex-1'>
                                {
                                    // store.groupAndMemberLoading
                                    // ? <Loading />
                                    // : (
                                        <Column {...store.groupAndMemberConfig}/>
                                    //)
                                }
                            </div>

                        </div>
                        <div className='flex flex-col gap-6 p-6 pt-5 bg-white rounded-12 border border-solid border-gray-200'>
                            <h3 className='mb-0 text-16 font-medium text-gray-900'>Số API tổ chức đã mua</h3>
                            <div className='flex flex-col gap-2 justify-center flex-1'>
                                <Column {...store.orgBuyAPIConfig}/>
                            </div>

                        </div>
                        <div className='flex flex-col gap-6 p-6 pt-5 bg-white rounded-12 border border-solid border-gray-200'>
                            <h3 className='mb-0 text-16 font-medium text-gray-900'>Số lần gọi API của tổ chức</h3>
                            <div className='flex flex-col gap-2 justify-center flex-1'>
                                <div className='orgCallAPI-grid'>
                                    <div className='flex flex-col'>
                                        <div className='h-10 flex items-center' title="FTP">
                                            <div className='text-right w-full max-w-24 truncate'>
                                                FTP
                                            </div>
                                        </div>
                                        <div className='h-10 flex items-center' title="CE">
                                            <div className='text-right w-full max-w-24 truncate'>
                                                CE
                                            </div>
                                        </div>
                                        <div className='h-10 flex items-center' title="FLC">
                                            <div className='text-right w-full max-w-24 truncate'>
                                                FLC
                                            </div>
                                        </div>
                                        <div className='h-10 flex items-center' title="VNG">
                                            <div className='text-right w-full max-w-24 truncate'>
                                                VNG
                                            </div>
                                        </div>
                                        <div className='h-10 flex items-center' title="Viettel">
                                            <div className='text-right w-full max-w-24 truncate'>
                                                Viettel
                                            </div>
                                        </div>
                                        <div className='h-10 flex items-center' title="MB">
                                            <div className='text-right w-full max-w-24 truncate'>
                                                MB
                                            </div>
                                        </div>
                                        <div className='h-10 flex items-center' title="VCB">
                                            <div className='text-right w-full max-w-24 truncate'>
                                                VCB
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='chart-item-hover transition-all h-10 flex items-center gap-6 border-0 border-t border-b border-dashed border-gray-200'>
                                            <div className='flex-1 flex items-center'>
                                                <div className='h-1 bg-primary rounded-4 block' style={{ width: '100%'}}></div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className='w-16 text-right'>
                                                    <span className='text-12 text-gray-900'>1.000.000</span>
                                                </div>
                                                <div className='w-16 flex justify-end items-center gap-1'>
                                                    <CaretUpOutlined className="text-16 text-success" />
                                                    <span className='text-12 text-success'>99,98%</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='chart-item-hover transition-all h-10 flex items-center gap-6 border-0 border-b border-dashed border-gray-200'>
                                            <div className='flex-1 flex items-center'>
                                                <div className='h-1 bg-primary rounded-4 block' style={{ width: '70%'}}></div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className='w-16 text-right'>
                                                    <span className='text-12 text-gray-900'>10.000</span>
                                                </div>
                                                <div className='w-16 flex justify-end items-center gap-1'>
                                                    <CaretUpOutlined className="text-16 text-success" />
                                                    <span className='text-12 text-success'>50%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='chart-item-hover transition-all h-10 flex items-center gap-6 border-0 border-b border-dashed border-gray-200'>
                                            <div className='flex-1 flex items-center'>
                                                <div className='h-1 bg-primary rounded-4 block' style={{ width: '60%'}}></div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className='w-16 text-right'>
                                                    <span className='text-12 text-gray-900'>9.000</span>
                                                </div>
                                                <div className='w-16 flex justify-end items-center gap-1'>
                                                    <CaretDownOutlined className="text-16 text-danger" />
                                                    <span className='text-12 text-danger'>2%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='chart-item-hover transition-all h-10 flex items-center gap-6 border-0 border-b border-dashed border-gray-200'>
                                            <div className='flex-1 flex items-center'>
                                                <div className='h-1 bg-primary rounded-4 block' style={{ width: '50%'}}></div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className='w-16 text-right'>
                                                    <span className='text-12 text-gray-900'>8.000</span>
                                                </div>
                                                <div className='w-16 flex justify-end items-center gap-1'>
                                                    <CaretDownOutlined className="text-16 text-danger" />
                                                    <span className='text-12 text-danger'>10%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='chart-item-hover transition-all h-10 flex items-center gap-6 border-0 border-b border-dashed border-gray-200'>
                                            <div className='flex-1 flex items-center'>
                                                <div className='h-1 bg-primary rounded-4 block' style={{ width: '40%'}}></div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className='w-16 text-right'>
                                                    <span className='text-12 text-gray-900'>7.000</span>
                                                </div>
                                                <div className='w-16 flex justify-end items-center gap-1'>
                                                    <CaretDownOutlined className="text-16 text-danger" />
                                                    <span className='text-12 text-danger'>1%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='chart-item-hover transition-all h-10 flex items-center gap-6 border-0 border-b border-dashed border-gray-200'>
                                            <div className='flex-1 flex items-center'>
                                                <div className='h-1 bg-primary rounded-4 block' style={{ width: '30%'}}></div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className='w-16 text-right'>
                                                    <span className='text-12 text-gray-900'>6.000</span>
                                                </div>
                                                <div className='w-16 flex justify-end items-center gap-1'>
                                                    <CaretUpOutlined className="text-16 text-success" />
                                                    <span className='text-12 text-success'>11,22%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='chart-item-hover transition-all h-10 flex items-center gap-6 border-0 border-b border-dashed border-gray-200'>
                                            <div className='flex-1 flex items-center'>
                                                <div className='h-1 bg-primary rounded-4 block' style={{ width: '20%'}}></div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className='w-16 text-right'>
                                                    <span className='text-12 text-gray-900'>5.000</span>
                                                </div>
                                                <div className='w-16 flex justify-end items-center gap-1'>
                                                    <CaretDownOutlined className="text-16 text-danger" />
                                                    <span className='text-12 text-danger'>4,5%</span>
                                                </div>
                                            </div>
                                        </div>



                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        // )
        // : <Loading />


    )
})

export default Dashboard

function userEffect(arg0: () => void, arg1: never[]) {
    throw new Error('Function not implemented.');
}
