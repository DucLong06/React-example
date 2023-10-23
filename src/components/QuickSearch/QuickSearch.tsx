import { RightOutlined, SearchOutlined } from '@ant-design/icons'
import { Avatar, Empty, Input } from 'antd'
import React, { useEffect } from 'react'
import empty from '../../assets/media/general/empty.svg';
import $ from 'jquery';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DefaultImg } from '../../utils/constants/Constants';

type Props = {}

const QuickSearch = (props: Props) => {

    const [hasResults, setHasResults] = React.useState(false);
    const [searchItems, setSearchItems] = React.useState([]);
    const [searchKey, setSearchKey] = React.useState('');

    const getDataMethod = async (key: any) => {
        const baseURL = process.env.REACT_APP_URL_BE
        const axiosApi = await axios(`${baseURL}/api/apis/?search=${key}`);
        return axiosApi;
    }
    const getData = async (key: any) => {
        try {
            const response = await getDataMethod(key)
            //console.log('response', response)
            if (response.status == 200) {
                console.log('response', response.data)
                if (response.data.count > 0) {
                    setHasResults(true);
                    setSearchItems(response.data.results);
                } else {
                    setHasResults(false);
                    setSearchItems([]);
                }


            }

        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {


        //On click outside of the search box
        $(document).on('mouseup', function (e: any) {
            let searchResult = $("#quick-search-result");
            let searchInput = $('#quick-search-input');
            if (!searchResult.is(e.target) && searchResult.has(e.target).length === 0 && !searchInput.is(e.target) && searchInput.has(e.target).length === 0) {
                searchResult.hide();
            }
        });

        //On keyup in search box
        var timeout: any;
        var delay: any = 500;
        $(document).on('keyup', '#quick-search-input', function (e: any) {
            //if key != enter, ArrowUp, ArrowDown
            if (e.which !== 38 && e.which !== 40 && e.which !== 13) {
                let text: any = $(this).val();
                text = text.toLowerCase();
                setSearchKey(text);

                if (timeout) {
                    clearTimeout(timeout);
                }
                timeout = setTimeout(function () {
                    if (text != '' && text.length >= 3) {
                        getData(text)
                        $('#quick-search-result').show();
                    } else {
                        $('#quick-search-result').hide();
                    }
                }, delay);


            }
        });

        //On focus in search box
        $(document).on('focus', '#quick-search-input', function (e: any) {
            let text: any = $(this).val();
            if (text != '' && text.length >= 3) {
                $('#quick-search-result').show();
            } else {
                $('#quick-search-result').hide();
            }
        });



    }, [])

    return (
        <div className='border-0 border-solid border-gray-200 w-36 xl:w-52 relative' >
            <Input
                placeholder="Tìm kiếm API, tài liệu"
                id="quick-search-input"
                suffix={
                    <SearchOutlined className='text-gray-400' />
                }
            />
            <div id="quick-search-result" className='quick-search-result' style={{ display: 'none' }}>
                <div className='quick-search-inner py-1 bg-white rounded-6 '>
                    {
                        hasResults
                            ? (
                                <React.Fragment>
                                    <div className='quick-search-block' id="quick-search-block-api">
                                        <div className='p-3 flex items-center gap-1 border-0 border-b border-solid border-gray-200'>
                                            <span className='text-14 text-gray-900 font-medium'>API</span>
                                        </div>
                                        <div className='flex flex-col' id='quick-search-block-api-items'>
                                            {
                                                searchItems.slice(0, 5).map((item: any, index: number) => {
                                                    return (
                                                        <Link
                                                            to={`/marketplace/detail/${item.id}?content=info`}
                                                            key={index}
                                                            className='flex items-center gap-2 p-3 quick-search-block-api-item cursor-pointer'
                                                            onClick={()=>{
                                                                $('#quick-search-result').hide();
                                                            }}
                                                        >
                                                            <Avatar
                                                                size={32}
                                                                src={item.logo_url ? item.logo_url : DefaultImg.bg}
                                                            />
                                                            <div className='flex flex-col flex-1 min-w-0'>
                                                                <span className='truncate text-14 font-medium text-gray-900'>{item.name}</span>
                                                                <span className='truncate text-12 text-gray-500'>{item.short_description || item.long_description || ''}</span>

                                                            </div>
                                                        </Link>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    {
                                        searchItems.length > 5 && (
                                            <Link
                                                to={`/marketplace/search/${encodeURI(searchKey)}`}
                                                className='quick-search-all p-3 flex items-center gap-1 bg-white hover:bg-gray-100 border-0 border-t border-solid border-gray-200'
                                                onClick={()=>{
                                                    $('#quick-search-result').hide();
                                                }}
                                            >
                                                <span className='text-12 text-gray-900 font-medium'>Xem tất cả</span>
                                                <RightOutlined className='text-12 text-gray-900 flex items-center' />
                                            </Link>
                                        )
                                    }
                                </React.Fragment>

                            )
                            : (
                                <div className='p-4'>
                                    <Empty
                                        image={empty}
                                        description={<p>Không tìm thấy kết quả,<br /> lòng thử lại với từ khoá khác.</p>}
                                    />
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default QuickSearch