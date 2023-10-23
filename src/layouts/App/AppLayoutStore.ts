import type { MenuProps } from 'antd';
import { makeAutoObservable } from "mobx";
import axiosClient from '../../utils/apis/RequestHelper';
import { _IApiResponse } from '../../utils/interfaces/IApiResponse';

class AppLayoutStore {
    toOrg: boolean = false;
    toInfo: boolean = false;
    activateKey: string = 'marketplace'
    isModalVisible: boolean = false;
    accountItem: any = null
    updateAccountTime: any = ""

    showModal = () => {
        this.isModalVisible = true;
    }

    constructor() {
        makeAutoObservable(this)
    }


    changeActiveKey = (key: any, navigateSearch: any) => {
        if (key === "marketplace") {
            navigateSearch(`/marketplace`)
        }
        else if (key === "buy") {
            navigateSearch(`/buy/apps`)
        }
        else if (key === "sell") {
            navigateSearch(`/sell/apis`)
        }
        else if (key === "docs") {
            navigateSearch(`/docs`)
        }
        //this.activateKey = key
    }

    logOut = async (): Promise<_IApiResponse> => {
        return axiosClient.post(`/api/accounts/logout/`);
    }

    handleMenuClickAccount: MenuProps['onClick'] = async e => {
        if (e.key == "logout") {
            try {
                const response = await this.logOut();
                if (response.status === 200) {
                    localStorage.removeItem("token")
                    localStorage.setItem('logout-event', 'logout' + Math.random());
                    window.open(`${window.location.origin}/marketplace`, "_self")
                }
                else {
                    localStorage.removeItem("token")
                    localStorage.setItem('logout-event', 'logout' + Math.random());
                    window.open(`${window.location.origin}/marketplace`, "_self")
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    handleMenuClickMenu: MenuProps['onClick'] = async e => {

    }

    getAccountMethod = async (): Promise<_IApiResponse> => {
        return axiosClient.get(`/api/accounts/me/`,);
    }
    getAccount = async () => {
        console.log('loadSwitchItems')
        try {
            const accountRes = await this.getAccountMethod();
            if (accountRes.status === 200) {
                this.accountItem = accountRes.body;
            }
        } catch (error) {
            console.log(error);
        }
    }

}

export const appLayoutStore = new AppLayoutStore()
