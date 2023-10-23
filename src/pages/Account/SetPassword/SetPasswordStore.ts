import { makeAutoObservable } from "mobx";
import axiosClient from "../../../utils/apis/RequestHelper";
import { setUserSession } from "../../../utils/helpers/LocalStorage";
import { _IApiResponse } from "../../../utils/interfaces/IApiResponse";


interface ISetPassword {
    password: string;
}

class SetPasswordStore {
    tileName: string = "Thiết lập mật khẩu"
    expiredLink: boolean = false;
    idAccount: string = ""
    loading: boolean = false;
    success: boolean = false
    idEmail: string = ""
    code: string = ""
    type: string = "register_account"
    totalItem: any = []



    constructor() {
        makeAutoObservable(this)
    }

    checkSecretKey = async (idEmail: string, code: string, type: string): Promise<_IApiResponse> => {
        return axiosClient.get(`/api/accounts/validate-token/?email=${idEmail}&code=${code}&type=${type}`);
    }

    setPassword = async (data: ISetPassword, idEmail: string, code: string, type: string): Promise<_IApiResponse> => {
        return axiosClient.post(`/api/accounts/set-password/?email=${idEmail}&code=${code}&type=${type}`, data);
    }

    onFinish = async (data: any) => {
        try {


            this.loading = true;
            const response = await this.setPassword({
                ...data,
            }, this.idEmail, this.code, this.type);

            if (response.status == 200) {
                this.success = true
                console.log(response.body)
                setUserSession(response.body.token);
                window.open(window.location.origin + "/user/detail?modal=true", "_self");
            }
            this.loading = false;
        }
        catch (e) {
            console.log("Failed: ", e);
        }
    };

    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }

    checkKey = async (idEmail: string, code: string, type: string) => {
        try {
            const response = await this.checkSecretKey(idEmail, code, type);
            if (response.status === 200) {
                this.idEmail = idEmail
                this.code = code
            }
            else {
                this.expiredLink = true;
            }

        } catch (error) {
            console.log(error);
        }
    };
}


export const setPasswordStore = new SetPasswordStore()
