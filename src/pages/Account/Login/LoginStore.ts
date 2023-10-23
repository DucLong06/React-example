import { message } from "antd";
import { makeAutoObservable } from "mobx";
import axiosClient from "../../../utils/apis/RequestHelper";
import { setUserSession } from "../../../utils/helpers/LocalStorage";
import { _IApiResponse } from "../../../utils/interfaces/IApiResponse";




interface Ilogin {
    email: string;
    password: string;
}
class LoginStore {
    success: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }
    login = async (data: Ilogin): Promise<_IApiResponse> => {
        return axiosClient.post(`/api/accounts/login/`, data);
    }

    onFinish = async (data: any) => {
        try {
            const response = await this.login({
                ...data,
            })

            let referrer = window.location.search.split("?path=")[1];
            if (response.status == 200) {
                setUserSession(response.body.token);

                if (referrer) {
                    setTimeout(() => {
                        window.open(window.location.origin + referrer, "_self");
                    }, 500);
                } else {
                    setTimeout(() => {
                        window.open(window.location.origin, "_self");
                    }, 500);
                }
            }
            else (
                message.error("Thông tin đăng nhập không chính xác.Vui lòng kiểm tra và thử lại!")
            )
        }
        catch (e) {
            console.log("Failed: ", e);
        }
    }

    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }
}

export const loginStore = new LoginStore()
