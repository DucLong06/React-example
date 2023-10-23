import { makeAutoObservable } from "mobx";
import axiosClient from "../../../../utils/apis/RequestHelper";
import { _IApiResponse } from "../../../../utils/interfaces/IApiResponse";
import data from "../../../../@data/apis.json"
import { message } from "antd";

interface IcreateEndpointGroup {
    name: string;
    description: string;
    version: string;
};

class EndpointGroupStore {
    layoutCreate: boolean = false;
    nameNewEndpointGroup: string = "Group mới"
    item: any = {
        name: this.nameNewEndpointGroup
    }
    disableSave: boolean = true
    endpoints: any = []
    endpointGroup: any = data;
    renameEndpointGroup: boolean = false;
    onClickCreateEngpoint: boolean = false;
    idApiVersion: any
    idApi: any
    idEGr: any

    dataFirstCreate: IcreateEndpointGroup = {
        name: this.nameNewEndpointGroup,
        description: "",
        version: ""
    }
    loading: boolean = false

    listEndpointGroup: any


    constructor() {
        makeAutoObservable(this)
    }

    createEndpointGroup = async (data: IcreateEndpointGroup): Promise<_IApiResponse> => {
        return axiosClient.post(`/api/endpoint-groups/`, data);
    }

    getApiVersion = async (id: any): Promise<_IApiResponse> => {
        return axiosClient.get(`/api/apis/${id}/`,)
    }

    getEndpointGroup = async (): Promise<_IApiResponse> => {
        return axiosClient.get(`/api/endpoint-groups/`,);
    }

    viewEndpointGroup = async (id: any): Promise<_IApiResponse> => {
        return axiosClient.get(`/api/endpoint-groups/${id}/`,);
    }

    updateEndpointGroup = async (data: any, id: any): Promise<_IApiResponse> => {
        return axiosClient.patch(`/api/endpoint-groups/${id}/`, data);
    }


    loadIdApiVersion = async (id: any) => {
        try {
            this.idApi = id
            const response = await this.getApiVersion(id)
            if (response.status === 200) {
                this.idApiVersion = response.body.versions[0].id
            }
        } catch (error) {
            console.log(error)
        }
    }

    loadListEndpointGroup = async () => {
        this.loading = true
        try {
            const response = await this.getEndpointGroup()
            if (response.status === 200) {
                this.listEndpointGroup = response.body["results"]

            }
        } catch (error) {
            console.log(error)
        }
        this.loading = false
    }



    loadDetailEndpointGroup = async (id: any) => {
        this.loading = true
        try {
            const response = await this.viewEndpointGroup(id)
            if (response.status === 200) {
                this.endpoints = response.body['endpoints']
            }
        } catch (error) {
            console.log(error)
        }
        this.loading = false
    }

    onFristCreate = async (navigateSearch: any) => {
        this.loading = true;
        this.dataFirstCreate.version = this.idApiVersion
        try {
            const response = await this.createEndpointGroup(this.dataFirstCreate)
            if (response.status === 201) {
                navigateSearch(`/sell/apis/detail/${this.idApi}`, { idegr: response.body.id, content: 'endpoints' })
            }
        } catch (error) {
            console.log(error)
        }
        this.loading = false;

    }

    handleMenuClick = (e: any) => {
        if (e.key === "rename-endpoint") {
            this.renameEndpointGroup = true
        }
        if (e.key === "edit-endpoint") {
            // onUpdate
            this.layoutCreate = true
        }
    }

    handleButtonClick = () => {

    }

    onUdateEndpointGroup = async (e: any) => {
        this.loading = true
        try {
            const response = await this.updateEndpointGroup(e, this.idEGr)
            if (response.status === 200) {
                this.onClickCreateEngpoint = true
                this.nameNewEndpointGroup = response.body['name']
                this.item.name = this.nameNewEndpointGroup
            }
            // this.nameNewEndpointGroup = e.target.value.trim()
            this.renameEndpointGroup = false

        } catch (error) {
            console.log(error)
        }
        this.loading = false;
    }

    handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            this.onUdateEndpointGroup(e)
        }
    }

    onClick = (navigateSearch: any) => {
        this.onFristCreate(navigateSearch)
    }

}

export const endpointGroupStore = new EndpointGroupStore()
