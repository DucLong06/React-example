import { makeAutoObservable } from "mobx";
import axiosClient from "../../../utils/apis/RequestHelper";
import { _IApiResponse } from "../../../utils/interfaces/IApiResponse";

class ViewEndpointStore {
    layoutCreate: boolean = false;
    nameNewEndpointGroup: string = "Group mới"
    item: any = {
        name: this.nameNewEndpointGroup
    }
    disableSave: boolean = true
    endpoint: any = {};
    onClickCreateEngpoint: boolean = false
    renameEndpointGroup: boolean = false;
    loading: boolean = false
    listEndpointGroup: any = []

    constructor() {
        makeAutoObservable(this)
    }

    createEndpointGroup = (data: any) => {
        console.log(data)
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

    updateEndpointGroup = (e: any) => {
        this.nameNewEndpointGroup = e.target.value.trim()
        this.renameEndpointGroup = false
    }

    handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            this.updateEndpointGroup(e)
        }
    }

    getEndpointGroup = async (): Promise<_IApiResponse> => {
        return axiosClient.get(`/api/endpoint-groups/`,);
    }

    loadEndpointGroup = async () => {
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



}

export const viewEndpointStore = new ViewEndpointStore()
