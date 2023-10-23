import { message } from "antd";
import _ from "lodash";
import { makeAutoObservable } from "mobx";
import axiosClient from "../../utils/apis/RequestHelper";
import { _IApiResponse } from "../../utils/interfaces/IApiResponse";

interface IcreateOrganization {
    name: string;
    address: string;
    logo_url: string;
    description: string;
    owner: string;
    country: {
        alpha2_code: string
    };
}


class OrganizationStore {
    modalType: string = "";
    isModalVisible: boolean = false;
    loading: boolean = false;
    loadingPageView: boolean = false;
    loadingCountry: boolean = false;
    count: number = 0;
    page: number = 1
    data: any = []
    next: string = ""
    previous: string = ""
    disableNext: boolean = true;
    disablePrevious: boolean = true;
    itemEdit: object = {}
    orgItem: any = {}
    tabMenu: any = []
    countries: any = []
    id: any = "";
    test: any;
    alpha2_code: string = ""
    owned: boolean = false;
    detailSelect: string = ""
    prePostCountry: any = {}
    updateOrgTime: any = ""



    constructor() {
        makeAutoObservable(this)
    }

    showModal = () => {
        this.isModalVisible = true;
    }
    handleCancel = () => {
        this.isModalVisible = false;
    };
    createOrganization = async (data: IcreateOrganization): Promise<_IApiResponse> => {
        return axiosClient.post(`/api/organizations/`, data);
    }

    checkDuplicateNameOrganization = async (page: any, name: any): Promise<_IApiResponse> => {
        return axiosClient.get(`/api/organizations/check-valid?page=${page}&name=${name}`);
    }

    getOrganization = async (page: any, owned: any): Promise<_IApiResponse> => {
        return axiosClient.get(`/api/organizations/?page=${page}&owned=${owned}`,);
    }


    viewOrganization = async (id: any): Promise<_IApiResponse> => {
        return axiosClient.get(`/api/organizations/${id}/`,);
    }

    listCountry = async (page: number): Promise<_IApiResponse> => {
        return axiosClient.get(`/api/countries/?page=${page}`,);
    }

    updateOrganization = async (data: any, id: any): Promise<_IApiResponse> => {
        //console.log('updateOrganization', data)
        return axiosClient.patch(`/api/organizations/${id}/`, data);
    }

    loadCountries = async (page?: number) => {
        try {
            this.loadingCountry = true;
            const response = await this.listCountry(page ? page : 1);
            if (response.status === 200) {
                this.countries = response.body['results']
                this.loadingCountry = false;
            }
        } catch (error) {
            console.log(error)
        }
    }


    handleChangeApiCountries = async (value: any) => {
        if (value != undefined) {
            //const countryItem = ProxyToJson([...this.countries]).find((country: any) => country.alpha2_code == value)
            //console.log('countryItem', countryItem)
            this.prePostCountry = {
                "alpha2_code": value,
            }
        } else {
            this.prePostCountry = undefined
        }
        //console.log('value', value)
        //console.log('prePostCountry', ProxyToJson({ ...this.prePostCountry }))
    };


    onCreate = async (data: any, form: any, navigateSearch: any) => {
        this.loading = true;
        try {
            if (data.country !== undefined) {
                data.country = this.prePostCountry
            }

            const response = await this.createOrganization({
                ...data,
            })

            const duplicatedOrgNameResponse = await this.checkDuplicateNameOrganization(1, data.name);


            if (response.status === 201) {
                message.success("Lưu thông tin tổ chức thành công.");
                this.id = response.body['id']
                navigateSearch(`/organizations/detail`, { q: response.body.id })
                form.resetFields();
                this.prePostCountry = {}
                this.handleCancel();
            }

            else {
                if (duplicatedOrgNameResponse.status === 400) {
                    message.error("Tên tổ chức đã tồn tại");
                }
                else {
                    message.error("Lưu thông tin tổ chức không thành công!");
                }
            }

        } catch (error) {
            console.log(error)
        }

        this.loading = false;
    };

    onUpdate = async (data: any, form: any, id: any) => {
        const cloneData = _.cloneDeep(data);

        const duplicatedOrgNameResponse = await this.checkDuplicateNameOrganization(1, data.name);

        if (cloneData.country != undefined) {
            const alpha2_code = cloneData.country
            cloneData.country = {
                "alpha2_code": alpha2_code,
            }
        } else {

        }


        //console.log('cloneData', toJS(cloneData))


        const response = await this.updateOrganization({
            ...cloneData,
        }, id)

        if (response.status === 200) {
            message.success("Lưu thông tin tổ chức thành công.");
            form.resetFields();
            this.prePostCountry = {}
            this.handleCancel();
            this.updateOrgTime = new Date()

        }
        else {
            if (duplicatedOrgNameResponse.status === 400) {
                message.error("Tên tổ chức đã tồn tại");
            }
            else {
                message.error("Lưu thông tin tổ chức không thành công!");
            }
        }
    };


    loadPageList = async (page: any) => {
        try {
            this.page = page
            const response = await this.getOrganization(page, this.owned)
            if (response.status === 200) {
                this.disablePrevious = true
                this.disableNext = true
                this.next = response.body['next']
                this.previous = response.body['previous']
                if (this.next != null) {
                    this.disableNext = false
                }
                if (this.previous != null) {
                    this.disablePrevious = false
                }
                this.count = response.body['count']
                this.data = response.body['results']

                // console.log(this.data)
            }
        } catch (error) {
            console.log(error);
            //navigate("/");
        }
    };

    loadDetailView = async (id: any) => {
        try {
            this.loadingPageView = true;
            const response = await this.viewOrganization(id)
            if (response.status === 200) {
                this.orgItem = { ...response.body }
                this.loadingPageView = false;
            }
        } catch (error) {
            console.log(error)
        }
    }


    handleChangeSelectList = async (value: string) => {
        if (value === "my-org") {
            this.owned = true
        }
        else if (value === "in-org") {
            this.owned = false
        }
        this.loadPageList(this.page)
    }


}
export const organizationStore = new OrganizationStore()