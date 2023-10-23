import { makeAutoObservable, toJS } from "mobx";
import axiosClient from "../../utils/apis/RequestHelper";
import { _IApiResponse } from "../../utils/interfaces/IApiResponse";
import _ from "lodash";

class PageNavigationStore {
    switchItems: any = []
    loadingSwitchItems: boolean = false;
    showSubLine: boolean = false;
    currentSwitchItem: any = ""
    triggerRefresh: any = ""


    constructor() {
        makeAutoObservable(this)
    }


    getTeams = async (page: any): Promise<_IApiResponse> => {
        return axiosClient.get(`/api/teams/?page=${page}`,);
    }

    getOrganizations = async (page: any): Promise<_IApiResponse> => {
        return axiosClient.get(`/api/organizations/?page=${page}`,);
    }

    loadSwitchItems = async (type: any) => {
        //console.log('loadSwitchItems')
        try {
            //console.log('type', type)
            this.switchItems = [];
            this.loadingSwitchItems = true;

            const res = type === "org" ? await this.getOrganizations(1) : await this.getTeams(1)
            //console.log('res', res)
            if (res.status === 200) {
                //console.log('200000')
                let totalItems = res.body.count
                let totalPages = Math.ceil(totalItems / 10)
                //console.log('totalPages', totalPages)
                for (let i = 0; i < totalPages; i++) {
                    const response = type === "org" ? await this.getOrganizations(i+1) : await this.getTeams(i+1)
                    if (response.status === 200) {
                        this.switchItems = [...this.switchItems, ...response.body.results]
                        this.loadingSwitchItems = false;
                    }
                }
                //console.log('switchItems', toJS(this.switchItems))
            }

        } catch (error) {
            console.log(error);
        }
    }
    handleChangeSwitch = (value: string, type: string, navigateSearch?: any) => {
        if (type === "org") {
            navigateSearch(`/organizations/detail`, { q: value })
        }
    };



}

export const pageNavigationStore = new PageNavigationStore()
