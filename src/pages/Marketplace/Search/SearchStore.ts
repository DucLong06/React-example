import { makeAutoObservable } from "mobx";
import axiosClient from "../../../utils/apis/RequestHelper";
import { _IApiResponse } from "../../../utils/interfaces/IApiResponse";
import _ from "lodash";
import axios from "axios";

class SearchStore {
    currentPage: number = 1;
    totalPage: number = 0;
    pageData: any = {};
    loading: boolean = true;
    loadingMore: boolean = false;
    sortType: string = "newest";
    totalItems: any = [];
    loadEnd: boolean = false;
    category: any = [];

    constructor() {
        makeAutoObservable(this)
    }


    getDataMethod = async (page: any, searchKey: any) => {
        const baseURL = process.env.REACT_APP_URL_BE
        const axiosApi = await axios(`${baseURL}/api/apis/?page=${page}&search=${searchKey}`);
        return axiosApi;
    };
    getData = async (page: any, searchKey: any, isLoadMore?: any) => {
        try {

            const response = await this.getDataMethod(page, searchKey)
            //console.log('response', response)
            if (response.status == 200) {
                this.pageData = response.data
                this.totalItems = isLoadMore ? this.totalItems.concat(response.data.results) : response.data.results
                this.totalPage = Math.ceil(response.data.count/10)
                this.loading = false
                if(isLoadMore){
                    this.loadingMore = false
                }
            }

        } catch (error) {
            console.log(error);
        }
    };
    fetchMoreData = () => {
        if(this.loadEnd != true){
            if(this.currentPage == this.totalPage)
            {
                this.loadingMore = false
                this.loadEnd = true
            }
            else{
                this.loadingMore = true
                this.currentPage = this.currentPage < this.totalPage ? this.currentPage + 1 : this.currentPage
                //console.log('Đang lấy thêm dữ liệu');
                this.getData(this.currentPage, "", true)
            }
        }else{
            //console.log('Bạn đã xem hết kết quả');
        }

    };





    sortBy = (type: string) => {
        this.sortType = type
    };


}

export const searchStore = new SearchStore()
