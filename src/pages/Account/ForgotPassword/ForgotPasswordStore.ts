import { message } from "antd";
import { makeAutoObservable } from "mobx";
import axiosClient from "../../../utils/apis/RequestHelper";
import { _IApiResponse } from "../../../utils/interfaces/IApiResponse";

interface Iforgot {
    password: string;
}

class ForgotPasswordStore {

    loading : boolean =false;
    forgotSuccess:boolean =false;
    emailForgot: string = "";

    constructor() {
        makeAutoObservable(this)
    }

    forgot = async (data: Iforgot): Promise<_IApiResponse> => {
        return axiosClient.post("/api/accounts/forgot-password/", data);
    }

    onFinish = async (data: any) => {
        try {
            this.loading = true;
            const response = await this.forgot({
                ...data,
            });

            this.loading = false;
            if (response.status === 200) {
                this.forgotSuccess = true;
                this.emailForgot = data.email;
            }
            else if (response.status === 201) {
                this.forgotSuccess = true;
                this.emailForgot = data.email;
            }
            else if (response.status ===404){
                message.error("404")
            }

        } catch (e) {
            message.error("Lỗi hệ thống!")
            console.log("Failed: ", e);
        }
    }

    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }
}

export const forgotPasswordStore = new ForgotPasswordStore()
