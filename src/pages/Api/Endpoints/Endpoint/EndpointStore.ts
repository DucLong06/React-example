import { message } from "antd";
import { makeAutoObservable } from "mobx";
import axiosClient from "../../../../utils/apis/RequestHelper";
import { _IApiResponse } from "../../../../utils/interfaces/IApiResponse";

interface IdataType {
    key: any,
    name: ""
    data_type: any,
    default_value: any,
    description: any,
    required: boolean,
}

interface IcreateEndpoint {
    endpoint_request: {
        headers: any
        query_parameters: any,
        body: {
            content_type: {
                name: string,
            },
            description: string
        }
        path: any,
    },
    endpoint_response: {
        headers: any,
        body: {
            content_type: {
                name: string,
            },
            description: string
        }
    },
    http_method: {
        name: string
    },
    name: string
    description: string,
    endpoint_group: any
}

interface IcreateEndpointNew {
    endpoint_request: {
        path: any
    },
    endpoint_response: {
    },
    http_method: {
        name: any
    },
    name: any,
    description: any,
    endpoint_group: any

}

class EndpointStore {
    disableSave: boolean = true
    nameNewEndpointGroup: string = "Endpoint mới"
    nameNewEndpoint: string = ""
    idEGr: any
    item: any = {
        name: this.nameNewEndpointGroup
    }
    baseURL: string = ""
    bodyType: string = ""
    //request
    record: any;
    countHeaders: number = 1;
    newDataHeaders: IdataType = {
        key: this.countHeaders,
        name: "",
        data_type: "string",
        default_value: "",
        description: "",
        required: false,
    }
    tableDataHeaders: any = [
        this.newDataHeaders,
    ]

    countQuery: number = 1;
    newDataQuery: IdataType = {
        key: this.countQuery,
        name: "",
        data_type: "string",
        default_value: "",
        description: "",
        required: false,
    }
    tableDataQuery: any = [
        this.newDataQuery,
    ]

    countVariables: number = 1
    tableVariables: any = [
        {
            key: this.countVariables,
            data_type: "string",
            default_value: "",
            description: "",
        }
    ]

    loading: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    createEndpoint = async (data: IcreateEndpointNew): Promise<_IApiResponse> => {
        console.log(data)
        return axiosClient.post(`/api/endpoint/`, data);
    }

    //request 
    addNewData = (value: any, record: any, tableData: any, count: number, index: any, nameCol: any) => {
        if (count === { ...record }.key && value.target.value.length > 0) {
            count++
            tableData = [
                ...tableData,
                {
                    key: count,
                    name: "",
                    data_type: "string",
                    default_value: "",
                    description: "",
                    required: false,
                }
            ]
        }

        if (nameCol === "name") {
            tableData[index].name = value.target.value
        } else if (nameCol === "data_type") {
            tableData[index].data_type = value
        } else if (nameCol === "description") {
            tableData[index].description = value.target.value
        } else if (nameCol === "required") {
            tableData[index].required = value.target.checked
        } else if (nameCol === "default_value") {
            tableData[index].default_value = value.target.value
        }


        return [tableData, count, tableData]
    }

    handleAdd = (value: any, record: any, typeData: string, index: any, nameCol: any) => {
        if (typeData === "Query parameters") {
            [this.tableDataQuery, this.countQuery] = this.addNewData(
                value,
                record,
                this.tableDataQuery,
                this.countQuery,
                index,
                nameCol,
            )
        } else {
            [this.tableDataHeaders, this.countHeaders] = this.addNewData(
                value,
                record,
                this.tableDataHeaders,
                this.countHeaders,
                index,
                nameCol,
            )
        }

    }


    deleteData = (record: any, tableData: any, count: any) => {
        count--
        tableData = tableData.filter((e: any) => { return e.key != record.key })
        return [tableData, count]
    }

    handleDelete = (record: any, typeData: any) => {
        if (typeData === "Query parameters") {
            [this.tableDataQuery, this.countQuery] = this.deleteData(record, this.tableDataQuery, this.countQuery)
        }
        else {
            [this.tableDataHeaders, this.countQuery] = this.deleteData(record, this.tableDataHeaders, this.countHeaders)
        }
    }

    onCreateEndpoint = async (data: any) => {

        this.loading = true;
        try {
            let value = {
                endpoint_request: {
                    path: data.path
                },
                endpoint_response: {
                },
                http_method: {
                    name: 'get'
                },
                name: data.name,
                description: data.description,
                endpoint_group: this.idEGr
            }
            const response = await this.createEndpoint({
                ...value,
            })
            if (response.status === 201) {
                message.success("Tạo endpoint thành công")
            }
        } catch (error) {
            console.log(error)
        }

        this.loading = false
    }

    getBaseURL = async (id: any): Promise<_IApiResponse> => {
        return axiosClient.get(`/api/api-settings/api/${id}/`,);
    }

    loadBaseURL = async (id: any) => {
        const response = await this.getBaseURL(id)
        if (response.status === 200) {
            if (response.body.length > 0) {
                this.baseURL = response.body[0]["url"]
            }
        }
    }

    onChangeSelect = (e: any) => {
        this.bodyType = e
    }

}

export const endpointStore = new EndpointStore()
