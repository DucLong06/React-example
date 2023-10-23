import { makeAutoObservable } from "mobx";
import axiosClient from "../../../utils/apis/RequestHelper";
import { _IApiResponse } from "../../../utils/interfaces/IApiResponse";

interface IRegister {
    email: string;
}

class RegisterStore {
    registerSuccess: boolean = false;
    emailRegister: string = "";
    loading: boolean = false;
    email:string = "";

    constructor() {
        makeAutoObservable(this)
    }
    register = async (data: IRegister): Promise<_IApiResponse> => {
        return axiosClient.post("api/accounts/register/", data);
    }
    onFinish = async (data: any) => {
        try {
            this.loading = true;
            const response = await this.register({
                ...data,
            });

            this.loading = false;
            if (response.status === 200) {
                this.registerSuccess = true;
                this.emailRegister = data.email;
            }
            else if (response.status === 201) {
                this.registerSuccess = true;
                this.emailRegister = data.email;
            }

        } catch (e) {
            console.log("Failed: ", e);
        }

    }

    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }


    onEmailBlur =(e:any) => {
        //console.log(e.target.value.trim())
        return e.target.value.trim()
    }

}

export const registerStore = new RegisterStore()
