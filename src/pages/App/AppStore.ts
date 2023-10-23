import { message } from "antd";
import { makeAutoObservable } from "mobx";
import axiosClient from "../../utils/apis/RequestHelper";
import { _IApiResponse } from "../../utils/interfaces/IApiResponse";
import { indexStore } from "../../IndexStore";


interface IcreateApp {
    name: string;
    description: string;
    logo_url: string;
    team: string;
    creator: string;
}

class AppStore {
    modalType: string = "";
    isModalVisible: boolean = false;
    loading: boolean = false;
    count: number = 0;
    page: number = 1
    data: any = []
    next: string = ""
    previous: string = ""
    disableNext: boolean = true;
    disablePrevious: boolean = true;
    itemEdit: object = {}
    appItem: object = {}
    items: any = []
    detail: string = ""
    changeSelect: boolean = false
    viewDetail: boolean = false
    id: any = "";
    updateOrgTime: any = ""



    constructor() {
        makeAutoObservable(this)
    }
    showModal = () => {
        this.isModalVisible = true;
    }
    handleCancel = () => {
        this.isModalVisible = false;
    };

    getApp = async (page: any): Promise<_IApiResponse> => {
        //console.log('getApp')
        return axiosClient.get(`/api/apps/?page=${page}`,);
    };

    getOrganization = async (page: any, owned?: any): Promise<_IApiResponse> => {
        //console.log('getOrganization')
        return axiosClient.get(`/api/organizations/?page=${page}&owned${owned}`,);
    }

    createApp = async (data: IcreateApp): Promise<_IApiResponse> => {
        //console.log('createApp')
        return axiosClient.post(`/api/apps/`, data);
    }

    updateApp = async (data: any, id: any): Promise<_IApiResponse> => {
        //console.log('updateApp')
        return axiosClient.patch(`/api/apps/${id}/`, data);
    }

    viewApp = async (id: any): Promise<_IApiResponse> => {
        //console.log('viewApp')
        return axiosClient.get(`/api/apps/${id}/`,);
    }

    loadPageList = async (page: any) => {
        try {
            this.page = page
            const response = await this.getApp(page)
            if (response.status == 200) {
                this.disablePrevious = true
                this.disableNext = true
                this.next = response.body['next']
                this.previous = response.body['previous']
                if (this.next != null) {
                    this.disableNext = false
                }
                if (this.previous != null) {
                    this.disablePrevious = false
                }
                this.count = response.body['count']
                this.data = response.body['results']
            }
        } catch (error) {
            console.log(error);
        }
    };


    loadPageView = async (id: any) => {
        try {
            this.loading = true
            const response = await this.viewApp(id)
            if (response.status === 200) {
                this.appItem = { ...response.body }
                this.loading = false
            }
        } catch (error) {
            console.log(error)
        }
    }


    onCreate = async (data: any, form: any, navigateSearch: any) => {
        this.loading = true;
        const response = await this.createApp({
            ...data,
        })

        if (response.status === 201) {
            message.success('Lưu thông tin app thành công.');
            this.id = response.body['id']
            // navigateSearch(`/marketplace/detail/${item.id}`, { content: 'endpoints' })
            navigateSearch(`/buy/apps/detail`, { q: response.body.id })


            this.handleCancel();
            form.resetFields();

        }
        else {
            message.error('Lưu thông tin app không thành công!');
        }
        this.loading = false;
    };

    onUpdate = async (data: any, form: any, id: any) => {
        //delete data.team

        const response = await this.updateApp({
            ...data,
        }, id)

        if (response.status == 200) {
            message.success('Lưu thông tin app thành công.');
            form.resetFields();
            this.handleCancel();
            this.updateOrgTime = new Date()

        }
        else {
            message.error('Lưu thông tin app không thành công!');
        }
    };

    loadList = async () => {
        const response = await this.getOrganization(1)
        if (response.status === 200) {
            this.items = response.body['results']
        }
        else {

        }
    }
    handleChangeSelect = (value: string) => {
        this.loadPageView(value)
        this.detail = value;
        this.changeSelect = true;
    };

}

export const appStore = new AppStore()
