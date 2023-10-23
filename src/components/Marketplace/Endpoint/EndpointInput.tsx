import { Input } from 'antd'
import React from 'react'

type Props = {
    item: any
}

const EndpointInput = ({item}: Props) => {
    return (
        <div className='flex items-start gap-3'>
            <div className='flex flex-col w-44'>
                <p className='flex items-center gap-1 mb-0'>
                    <span>{item.label}</span>
                    {item.required && <span className='text-danger'>*</span>}
                </p>
                <p className='text-gray-500 text-12 mb-0'>{item.type}</p>
            </div>
            <div className='flex flex-col gap-1 flex-1 min-w-44'>
                <Input placeholder={item.placeholder} size='small' />
                <p className='text-gray-500 text-12 mb-0'>Giá trị mặc định: {item.defaultValue}</p>
            </div>
        </div>
    )
}

export default EndpointInput