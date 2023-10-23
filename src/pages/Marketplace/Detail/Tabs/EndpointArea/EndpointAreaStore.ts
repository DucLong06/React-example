import axios from "axios";
import { makeAutoObservable } from "mobx";
import axiosClient from "../../../../../utils/apis/RequestHelper";
import { _IApiResponse } from "../../../../../utils/interfaces/IApiResponse";




class EndpointAreaStore {
    type: string = "";
    loading: boolean = true;
    endpoints: any = [];
    endpointGroup: any = {};
    listEndpointGroup: any
    baseURL_api: string = ""
    bodyData: any
    dataResponse: any

    constructor() {
        makeAutoObservable(this)
    }
    getEndpointGroup = async (api_id: any) => {
        const baseURL = process.env.REACT_APP_URL_BE
        const axiosApi = await axios(`${baseURL}/api/endpoint-groups/api/${api_id}/`);
        return axiosApi;
    };
    getEndpoint = async (egr_id: any) => {
        const baseURL = process.env.REACT_APP_URL_BE
        const axiosApi = await axios(`${baseURL}/api/endpoint/group/${egr_id}`);
        return axiosApi;
    };
    getBaseURL = async (id: any): Promise<_IApiResponse> => {
        return axiosClient.get(`/api/api-settings/api/${id}/`,);
    }




    getData = async (api_id: any) => {
        try {
            const endpointGroupRes = await this.getEndpointGroup(api_id)
            if (endpointGroupRes.status === 200) {
                this.endpointGroup = endpointGroupRes.data
                console.log("endpointGroup: ", endpointGroupRes.data)
            }
            const endpointRes = await this.getEndpoint(this.endpointGroup[0]['id'])
            if (endpointRes.status === 200) {
                this.endpoints = endpointRes.data
                console.log("endpoints: ", endpointRes.data)
            }
            const baseURLRes = await this.getBaseURL(api_id)
            if (baseURLRes.status === 200) {
                if (baseURLRes.body.length > 0) {
                    this.baseURL_api = baseURLRes.body[0]["url"]
                }
            }

            // if (endpointGroupRes.status == 200 && endpointRes.status == 200) {
            //     this.loading = false
            // }
            this.loading = false
        } catch (error) {
            console.log(error);
        }
    };
    viewEndpoint = async (item: any) => {
        //console.log('view endpoint', item.id)
    }

    testAPi = async (data: any): Promise<_IApiResponse> => {
        return axiosClient.post(`http://test.api.cyberapis.xyz/api/endpoint/test/`, data);
    }

    onTestAPI = async () => {

        axios({
            data: {
                endpoint_id: "682b2766-9bab-4928-8d7d-5a90ed0da009",
                body: this.bodyData
            },
            headers: {
                // 'Access-Control-Allow-Origin': 'http://axt-demo.v10.t.cyberapis.com',
                // "X-Sender": "pti",
                // "X-APIKey": "p0++AsH/ RVplRAA8of8g7K7 + 9lOz8du / bL9Qcmh / maA=",
                // "Content-Type": "application/json"
            },
            method: "POST",
            url: `http://test.api.cyberapis.xyz/api/endpoint/test/`
        }).then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
                console.log(error)
            })

        // const data = {
        //     endpoint_id: "682b2766-9bab-4928-8d7d-5a90ed0da009",
        //     body: this.bodyData
        // }
        // const response = await this.testAPi(data)
        // if(response.status===200){
        //     this.dataResponse = response.body['response'].data
        // }
        // console.log(response.body)
    }
}
export const endpointAreaStore = new EndpointAreaStore()
