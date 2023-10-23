import { message } from "antd";
import { makeAutoObservable } from "mobx";
import { indexStore } from "../../../IndexStore";
import axiosClient from "../../../utils/apis/RequestHelper";
import { ProxyToJson } from "../../../utils/helpers/Common";
import { _IApiResponse } from "../../../utils/interfaces/IApiResponse";


interface ICreateApi {
    name: string;
    short_description: string;
    long_description: string;
    is_public: boolean;
    website: string;
    logo_url: string;
    term_of_use: string;
    owner: string;
    category: any;
    base_url: string;
}




class ApiStore {
    loading: boolean = false;
    loadingCategory: boolean = false;
    isModalVisible: boolean = false;
    changeSelect: boolean = false
    page: number = 1
    count: number = 0;
    force: boolean = true;
    data: any = []
    next: string = ""
    previous: string = ""
    disableNext: boolean = true;
    disablePrevious: boolean = true;
    detail: string = ""
    modalType: string = ""
    items: any = []
    apiItem: object = {}
    listCategory: any = []
    idApiVersion: any

    getApi = async (page: any): Promise<_IApiResponse> => {
        return axiosClient.get(`/api/apis/?page=${page}`,);
    }

    getApiCategory = async (): Promise<_IApiResponse> => {
        return axiosClient.get(`/api/api-categories/`,);
    }

    getOrganization = async (page: any, owned?: any): Promise<_IApiResponse> => {
        return axiosClient.get(`/api/organizations/?page=${page}&owned${owned}`,);
    }

    updateApi = async (data: any, id: any): Promise<_IApiResponse> => {
        return axiosClient.patch(`/api/apis/${id}/`, data);
    }

    createApi = async (data: ICreateApi): Promise<_IApiResponse> => {
        console.log(ProxyToJson({ ...data }))
        return axiosClient.post(`/api/apis/`, data);
    }

    viewApi = async (id: any): Promise<_IApiResponse> => {
        return axiosClient.get(`/api/apis/${id}/`,);
    }

    constructor() {
        makeAutoObservable(this)
    }

    showModal = () => {
        this.isModalVisible = true;
    }
    handleCancel = () => {
        this.isModalVisible = false;
    };

    loadPageList = async (page: any) => {
        try {
            this.page = page
            const response = await this.getApi(page)
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
            //navigate("/");
        }
    };


    loadPageView = async (id: any) => {
        try {
            const response = await this.viewApi(id)
            if (response.status == 200) {
                this.apiItem = { ...response.body }
                //console.log({...response.body})
            }


        } catch (error) {
            console.log(error)
        }
    }

    loadListCategory = async () => {
        this.loadingCategory = true
        const response = await this.getApiCategory()
        if (response.status == 200) {
            this.listCategory = response.body['results']
            this.loadingCategory = false
        }
        else {

        }
    }

    onCreate = async (data: any, form: any, navigateSearch: any) => {
        this.loading = true;
        try {
            const response = await this.createApi({
                ...data,
            })

            if (response.status === 201) {
                message.success('Lưu thông tin API thành công.');
                form.resetFields();
                this.handleCancel();
                navigateSearch(`/sell/apis/detail/${response.body.id}`)

            }
            else {
                message.error('Lưu thông tin API không thành công!');
            }
        } catch (error) {
            console.log(error)
        }
        this.loading = false;
    };

    onUpdate = async (data: any, id: any, form: any) => {

        this.loading = true;
        //console.log(data)
        const response = await this.updateApi({
            ...data,
        }, id)

        if (response.status === 200) {
            message.success('Lưu thông tin API thành công.');
            form.resetFields();
            this.handleCancel()
            this.apiItem = response.body
            //console.log(response)
        }
        else {
            message.error('Lưu thông tin API không thành công!');
        }
        this.loading = false;
    };

    onChange = async (value: string) => {
        //`selected ${value}`);
    };


    handleChangeSelect = (value: string) => {
        this.loadPageView(value)
        this.detail = value;
        this.changeSelect = true;
    };

    loadList = async () => {
        const response = await this.getOrganization(1)
        if (response.status === 200) {
            this.items = response.body['results']
        }
        else {

        }
    }
}

export const apiStore = new ApiStore()
