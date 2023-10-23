import { message } from "antd";
import _ from "lodash";
import { makeAutoObservable } from "mobx";
import axiosClient from "../../../utils/apis/RequestHelper";
import { _IApiResponse } from "../../../utils/interfaces/IApiResponse";

class InforAccountStore {
    iteamAccount: any = {}
    isModalVisible: boolean = false;
    modalType: string = ""
    countries: any = []
    gender: any = []
    loading: boolean = false
    page = 1
    totalItems: any = []
    alpha2_code: string = ""
    prePostCountry: any = {}


    constructor() {
        makeAutoObservable(this)
    }

    viewInfor = async (): Promise<_IApiResponse> => {
        return axiosClient.get(`/api/accounts/me/`,);
    }

    listConutry = async (page: number): Promise<_IApiResponse> => {
        return axiosClient.get(`/api/countries/?page=${page}`,);
    }

    updateInfor = async (data: any): Promise<_IApiResponse> => {
        return axiosClient.put(`/api/accounts/me/`, data);
    }

    onFinish = (values: any) => {
        console.log('Success:', values);
    }

    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }
    handleOk = () => {
        this.isModalVisible = false;
    };

    showModal = () => {
        this.isModalVisible = true;
    }

    handleCancel = (navigateSearch?: any) => {
        this.isModalVisible = false;
        if (navigateSearch) {
            navigateSearch(`/user/detail`)
        }


    };

    loadPageView = async () => {
        try {
            const response = await this.viewInfor()
            if (response.status === 200) {
                this.iteamAccount = { ...response.body }
            }
        } catch (error) {
            console.log(error)
        }
    }

    loadCountries = async (page: number) => {
        try {
            const response = await this.listConutry(page)
            if (response.status == 200) {
                this.countries = response.body['results']
            }
        } catch (error) {
            console.log(error)
        }
    }

    onUpdate = async (data: any, form: any, layoutStore: any) => {
        this.loading = true;
        try {
            if (data.date_of_birth != null) {
                data.date_of_birth = data.date_of_birth.format("YYYY-MM-DD").toString()
            }
            const cloneData = _.cloneDeep(data);

            if (cloneData.country != undefined) {
                const alpha2_code = cloneData.country
                cloneData.country = {
                    "alpha2_code": alpha2_code,
                }
            }

            const response = await this.updateInfor({
                ...cloneData,
            })
            if (response.status == 200) {
                message.success("Lưu thông tin cá nhân thành công.");
                form.resetFields()
                this.handleCancel()
                layoutStore.updateAccountTime = new Date()
            }
            else {
                message.error("Cập nhật thông tin cá nhân không thành công!");
            }
        } catch (error) {
            console.log(error)
        }

        this.loading = false;
    };

    handleOnPopupScroll = async () => {
        this.loading = true;
        setTimeout(() => {
            this.page = this.page + 1
            this.loadCountries(this.page)
            this.loading = false
        }, 100)
    }
    onChangeSelect = async (value: string) => {
        this.alpha2_code = value
    }

    handleChangeApiCountries = async (value: any) => {
        if (value != undefined) {
            this.prePostCountry = {
                "alpha2_code": value,
            }
        } else {
            this.prePostCountry = undefined
        }

    };

}

export const inforAccountStore = new InforAccountStore()

