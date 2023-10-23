import { CheckOutlined } from '@ant-design/icons';
import { Avatar, Button, Tag } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';
import { DefaultImg } from '../../utils/constants/Constants';
import { useNavigateSearch } from '../../utils/helpers/Common';
type Props = {
    item: any,
}

const ApiItem = ({item}: Props) => {
    const navigateSearch = useNavigateSearch();

    return (
        <div
            className='flex flex-col gap-3 p-4 bg-white border border-solid border-gray-200 hover:border-primary-300 hover:shadow-md rounded-8 relative'
            key={item.id + '-' + Math.random()}
        >
            <div className='flex flex-col gap-3 items-center'>
                <Avatar size='large' src={item.logo_url ? item.logo_url : DefaultImg.bg} />
                <div>
                    <p className='mb-0 text-center line-clamp-1 text-16 text-gray-900 font-medium break-word' title={item.name}>{item.name}</p>
                    <p className='mb-0 text-center line-clamp-1 text-gray-700 break-word' title={item.owner}>{item.owner}</p>
                </div>
            </div>
            <div className="h-11">
                <p className='mb-0 text-center line-clamp-2 text-gray-900 break-word' title={item.short_description}>{item.short_description}</p>
            </div>
            <div className='flex items-center justify-center relative z-20'>
                {/* <Tag icon={<CheckOutlined />} color="processing" className='m-0 py-1'>Đã đăng ký</Tag> */}
                <Button
                    size='small'
                    onClick={(e: any) => {
                        e.stopPropagation();
                        navigateSearch(`/marketplace/detail/${item.id}`, { content: 'endpoints' })
                    }}
                >
                    Trải nghiệm ngay
                </Button>
            </div>
            <Link
                to={`/marketplace/detail/${item.id}?content=info`}
                className='absolute bottom-0 right-0 h-full w-full z-10 block'
                title={item.name}
            >
            </Link>
        </div>
    )
}

export default ApiItem