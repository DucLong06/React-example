import { makeAutoObservable } from "mobx";
import axiosClient from "../../../utils/apis/RequestHelper";
import { _IApiResponse } from "../../../utils/interfaces/IApiResponse";
import _ from "lodash";
import axios from "axios";

class DetailStore {
    loading: boolean = true;
    api: any = {};
    constructor() {
        makeAutoObservable(this)
    }
    getDataMethod = async (id: any) => {
        const baseURL = process.env.REACT_APP_URL_BE
        const axiosApi = await axios(`${baseURL}/api/apis/${id}`);
        return axiosApi;
    };
    getData = async (id: any) => {
        try {
            this.loading = true;
            const response = await this.getDataMethod(id)
            if (response.status == 200) {
                this.api = { ...response.data }
                this.loading = false;
            }

        } catch (error) {
            console.log(error);
        }
    };


}

export const detailStore = new DetailStore()
