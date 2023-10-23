import React, { useEffect, useMemo, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { pageNavigationStore as store } from './PageNavigationStore';
import { appLayoutStore as layoutStore } from '../../layouts/App/AppLayoutStore';
import { Avatar, Button, Select, Tabs } from 'antd'
import { DefaultImg, useQuery } from '../../utils/constants/Constants'
import { useNavigateSearch } from '../../utils/helpers/Common'
import Loading from '../Loading/Loading'
import { useSearchParams } from 'react-router-dom';
import { toJS } from 'mobx';


type Props = {
    tab: any,
    type: string,
    defaultActiveTabKey?: any
    onChangeContent?: any
}

const PageNavigation = observer(({ tab, type, defaultActiveTabKey, onChangeContent }: Props) => {
    const { Option } = Select;
    const { TabPane } = Tabs;
    const navigateSearch = useNavigateSearch();

    let [searchParams, setSearchParams] = useSearchParams();

    const pageNavigationTabRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        //Sticky navigation when scroll
        const top = pageNavigationTabRef.current
            ? (
                pageNavigationTabRef.current.offsetTop > 0
                    ? pageNavigationTabRef.current.offsetTop
                    : 0
            )
            : 0;
        const stickyNavigation = () => {
            if (pageNavigationTabRef.current) {
                const scrollTop = document.documentElement.scrollTop;
                let targetElement: any = pageNavigationTabRef.current.children[0].children[0];
                if (scrollTop > 0 && scrollTop > top - 55) {
                    targetElement.style.transform = `translateY(${(scrollTop + 55 - top) > 0 ? scrollTop + 55 - top : 0}px)`;
                } else {
                    targetElement.style.transform = `translateY(0px)`;
                }
            }
        }
        stickyNavigation()
        window.addEventListener('scroll', () => {
            stickyNavigation()
        }, false);

        store.currentSwitchItem = ""
        store.switchItems = []
        store.loadSwitchItems(type);

        console.log('useEffect PageNavigation type: ', type)
    }, [type]);


    //console.log('type', type)
    //console.log('selectDefaultValue', selectDefaultValue)
    //console.log('layoutStore.accountItem', toJS(layoutStore.accountItem))




    const selectLeft = (store: any, layoutStore: any) => {
        const idSwitch: any = type === "org"
            ? searchParams.get("q")
            : (
                type === "sell"
                    ? searchParams.get("q")
                    : searchParams.get("q")
            )

        const selectDefaultValue = store.currentSwitchItem !== ""
            ? store.currentSwitchItem
            : (
                layoutStore.accountItem != null && type !== "org"
                    ? layoutStore.accountItem?.id
                    : idSwitch
            )
        return (
            layoutStore.accountItem != null && store.loadingSwitchItems === false
                ? <Select
                    className='mr-3 switch-select'
                    onChange={(value: any) => {
                        store.currentSwitchItem = value;
                        store.handleChangeSwitch(value, type, navigateSearch)
                    }}
                    size='small'
                    data-default-value={selectDefaultValue}
                    defaultValue={selectDefaultValue}
                >
                    {
                        layoutStore.accountItem != null && type !== "org"
                            ? (
                                <Option
                                    value={layoutStore.accountItem.id}
                                    key={layoutStore.accountItem.id}
                                    data-id={layoutStore.accountItem.id}
                                    className="border-0 border-b border-solid border-gray-200"
                                >
                                    <div className="flex items-center gap-x-2 switch-select-option">
                                        <Avatar
                                            size={24}
                                            src={layoutStore.accountItem.avatar_url ? layoutStore.accountItem.avatar_url : DefaultImg.bg}
                                        />
                                        <div className='flex flex-col flex-1 min-w-0'>
                                            <span className='truncate text-12 font-medium text-gray-900'>
                                                {
                                                    layoutStore.accountItem.first_name && layoutStore.accountItem.last_name
                                                        ? (
                                                            layoutStore.accountItem.first_name + ' ' + layoutStore.accountItem.last_name
                                                        )
                                                        : (
                                                            !layoutStore.accountItem.first_name && !layoutStore.accountItem.last_name
                                                                ? (
                                                                    layoutStore.accountItem.username
                                                                )
                                                                : (
                                                                    layoutStore.accountItem.first_name || layoutStore.accountItem.last_name
                                                                )

                                                        )
                                                }
                                            </span>
                                            <span className='truncate text-10 text-gray-500'>Tài khoản cá nhân</span>

                                        </div>
                                    </div>

                                </Option>
                            )
                            : null
                    }
                    {
                        store.switchItems?.map((item: any) => {
                            return (
                                <Option
                                    value={item.id}
                                    key={item.id}
                                    data-id={item.id}
                                    title={item.name ? item.name : ''}
                                >
                                    <div className="flex items-center gap-x-2 switch-select-option">
                                        <Avatar
                                            size={24}
                                            src={item.logo_url ? item.logo_url : DefaultImg.bg}
                                        />
                                        <div className='flex flex-col flex-1 min-w-0'>
                                            <span className='truncate text-12 font-medium text-gray-900'>{item.name}</span>
                                            {type !== "org" && <span className='truncate text-10 text-gray-500'>{item.organization?.name}</span>}

                                        </div>
                                    </div>

                                </Option>);
                        })}
                </Select>
                : <div className='switch-select-placeholder mr-3'></div>
        )
    }



    return (
        <div className="page-navigation-tab" ref={pageNavigationTabRef}>
            <Tabs
                defaultActiveKey={defaultActiveTabKey ? defaultActiveTabKey : 'dashboard'}
                onChange={(activeKey: any) => {
                    onChangeContent && onChangeContent(activeKey)
                }}
                tabBarExtraContent={{
                    left: selectLeft(store, layoutStore),
                }}
                className="ant-tabs-mb-0 ant-tab-bg-header"
            >
                {tab.map((item: any) => (
                    <TabPane tab={`${item.label}`} key={item.key} >
                        {item.ui}
                    </TabPane>
                ))}
            </Tabs>
        </div>
    )
})

export default PageNavigation