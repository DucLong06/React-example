import { makeAutoObservable } from "mobx";

interface DataType {
    key: any,
    dataType: any,
    defaultValue: any,
    description: any,
    imposition: boolean,
}

class ResponseStore {

    count: number = 1;
    record: any
    newData: DataType = {
        key: this.count,
        dataType: "",
        defaultValue: "",
        description: "",
        imposition: false,
    }
    tableData: any = [
        this.newData,
    ]

    loading: boolean = false
    newDataDelete: any

    constructor() {
        makeAutoObservable(this)
    }

    handleAdd = (value: any, record: any) => {
        this.record = { ...record }
        if (this.count == this.record.key && value.target.value.length > 0) {
            this.count++
            this.tableData = [
                ...this.tableData,
                {
                    key: this.count,
                    dataType: "",
                    defaultValue: "",
                    description: "",
                    imposition: false,
                }
            ]
        }
    }

    handleDelete = (record: any) => {
        this.count--
        this.tableData = this.tableData.filter((e: any) => { return e.key != record.key })
    }

    onChangeCheckbok = () => {

    }
    onFinish = (value: any) => {
        console.log({ ...value })
    }
}

export const responseStore = new ResponseStore()
