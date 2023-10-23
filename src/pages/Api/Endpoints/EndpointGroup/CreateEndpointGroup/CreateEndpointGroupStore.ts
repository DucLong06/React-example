import { makeAutoObservable, toJS } from "mobx";
import axiosClient from "../../../../../utils/apis/RequestHelper";
import { _IApiResponse } from "../../../../../utils/interfaces/IApiResponse";

class CreateEndpointGroupStore {
    loading: boolean = false;
    onClickCreateEngpoint: boolean = false;
    renameEndpointGroup: boolean = false;
    nameNewEndpointGroup: string = ""
    item: any = {
        name: "",
        description: ""
    }
    idEGr: any
    disableSave: boolean = false
    detailEndpointGroup: any
    endpoints: any = []

    constructor() {
        makeAutoObservable(this)
    }

    updateEndpointGroup = async (data: any, id: any): Promise<_IApiResponse> => {
        return axiosClient.patch(`/api/endpoint-groups/${id}/`, data);
    }

    viewEndpointGroup = async (id: any): Promise<_IApiResponse> => {
        return axiosClient.get(`/api/endpoint-groups/${id}/`,);
    }

    onFinish = async (data: any) => {
        console.log(data)
        this.onUdateEndpointGroup(data)
    }

    onUdateEndpointGroup = async (e: any) => {
        this.loading = true
        try {
            const response = await this.updateEndpointGroup(e, this.idEGr)

            if (response.status === 200) {
                this.onClickCreateEngpoint = true
                this.nameNewEndpointGroup = response.body['name']
                this.item.name = this.nameNewEndpointGroup
                this.item.description = response.body.description
            }
            // this.nameNewEndpointGroup = e.target.value.trim()
            this.renameEndpointGroup = false

        } catch (error) {
            console.log(error)
        }
        this.loading = false;
    }

    loadDetailEndpointGroup = async (id: any) => {
        this.loading = true
        try {
            const response = await this.viewEndpointGroup(id)
            if (response.status === 200) {
                this.detailEndpointGroup = response.body
                this.nameNewEndpointGroup = this.detailEndpointGroup.name
                this.item.name = this.nameNewEndpointGroup
                this.item.description = response.body.description
                this.endpoints = this.detailEndpointGroup['endpoints']
            }
        } catch (error) {
            console.log(error)
        }
        this.loading = false
    }
}

export const createEndpointGroupStore = new CreateEndpointGroupStore()
