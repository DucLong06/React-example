import { message } from "antd";
import { makeAutoObservable } from "mobx";
import axiosClient from "../../../utils/apis/RequestHelper";
import { _IApiResponse } from "../../../utils/interfaces/IApiResponse";

interface IcreateBaseURL {
    url: string;
    version: string;
}


class SettingStore {
    isModalVisible: boolean = false
    modalType: string = ""
    page: number = 1
    loading: boolean = false
    auth: boolean = true
    idApiVersion: string = ""
    idBaseURL: string = ""
    baseURL: string = ""
    tableData = [
        {
            name: "",
            url: "",
        },
    ]
    disableSave = true
    constructor() {
        makeAutoObservable(this)
    }

    showModal = () => {
        this.isModalVisible = true;
    }


    viewApi = async (id: any): Promise<_IApiResponse> => {
        return axiosClient.get(`/api/apis/${id}/`,);
    }

    viewBaseURL = async (id: any): Promise<_IApiResponse> => {
        return axiosClient.get(`/api/api-settings/api/${id}/`,);
    }

    createBaseURL = async (data: IcreateBaseURL): Promise<_IApiResponse> => {
        return axiosClient.post(`/api/api-settings/`, data);
    }

    updateBaseURL = async (data: IcreateBaseURL, id: any): Promise<_IApiResponse> => {
        return axiosClient.patch(`/api/api-settings/${id}/`, data);
    }

    onChangeAuth = (e: any) => {
        if (e === "basic-auth") {
            this.auth = true
        } else {
            this.auth = false
        }
    }

    loadPageView = async (id: any) => {
        this.loading = true;
        this.baseURL = ""
        try {
            let response = await this.viewBaseURL(id)
            if (response.status === 200) {
                if (response.body.length > 0) {
                    this.baseURL = response.body[0].url
                    this.tableData[0].url = this.baseURL
                    this.idApiVersion = response.body[0].version
                    this.idBaseURL = response.body[0].id
                }
            }
            if (this.idApiVersion !== null) {
                response = await this.viewApi(id)
                if (response.status === 200) {
                    this.idApiVersion = response.body["versions"][0].id
                }
            }
        } catch (error) {
            console.log(error)
        }
        this.loading = false
    }

    onFinish = async () => {
        this.loading = true
        try {
            const data = {
                url: this.baseURL,
                version: this.idApiVersion
            }
            if (this.idBaseURL.length > 0) {
                const response = await this.updateBaseURL({ ...data }, this.idBaseURL)
                if (response.status === 200) {
                    message.success("Cập nhật thông tin API thành công.")
                } else {
                    message.error("Cập nhật thông tin API không thành công.")
                }
            } else {
                const response = await this.createBaseURL({ ...data })
                if (response.status === 201) {
                    message.success("Lưu thông tin API thành công.")
                } else {
                    message.error("Lưu thông tin API không thành công.")
                }
            }
        } catch (error) {
            console.log(error);
        }

        this.loading = false
    }

    onChange = async (data: any) => {
        this.baseURL = data.target.value
        if (this.tableData[0].url !== this.baseURL) {
            this.disableSave = false
        } else {
            this.disableSave = true
        }
    }

    onTrimInput = (e: any) => {
        // console.log(e.target.value.trim())
        // console.log(e.target.value.trim())
        return e.target.value.trim()
    }
}

export const settingStore = new SettingStore()
