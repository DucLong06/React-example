import { message } from "antd";
import { makeAutoObservable, toJS } from "mobx";
import axiosClient from "../../utils/apis/RequestHelper";
import { _IApiResponse } from "../../utils/interfaces/IApiResponse";


interface IcreateTeam {
    name: string;
    logo_url: string;
    description: string;
    organization: string;
}

interface IteamMember {
    logo_url: string
    email: string;
    role: string;
}

class TeamStore {
    loading: boolean = false;
    isModalVisible: boolean = false;
    current = 0
    page: number = 1
    pageMember: number = 1
    count: number = 1;
    countMember: number = 1;
    force: boolean = true;
    data: any = []
    next: string = ""
    previous: string = ""
    disableNext: boolean = true;
    disablePrevious: boolean = true;
    modalType: string = ""
    itemTeamMember: any
    itemTeam: object = {}
    idOrg: any
    idTeam: any
    showListTeam: boolean = true
    member: IteamMember = {
        logo_url: "",
        email: "",
        role: ""
    }
    listMembers = [
        this.member
    ]

    constructor() {
        makeAutoObservable(this)
    }

    getTeam = async (page: any, org?: any): Promise<_IApiResponse> => {
        return axiosClient.get(`/api/organizations/${org}/teams/?page=${page}`,);
    }

    createTeam = async (data: IcreateTeam): Promise<_IApiResponse> => {
        data.organization = this.idOrg
        return axiosClient.post(`/api/teams/`, data);
    }

    inviteMember = async (data: any, id: any): Promise<_IApiResponse> => {
        return axiosClient.post(`/api/teams/${id}/invite-member/`, data);
    }

    updateTeam = async (data: IcreateTeam, id: any): Promise<_IApiResponse> => {
        return axiosClient.patch(`/api/teams/${id}/`, data);
    }

    viewTeam = async (id: any): Promise<_IApiResponse> => {
        return axiosClient.get(`/api/teams/${id}/`,);
    }

    viewTeamMembers = async (id: any): Promise<_IApiResponse> => {
        return axiosClient.get(`/api/teams/${id}/members/`,);
    }

    checkTeamName = async (page: any, name: any):  Promise<_IApiResponse> => {
        return axiosClient.get(`/api/teams/check-valid`);
    }

    showModal = () => {
        this.isModalVisible = true;
    }

    handleCancel = () => {
        this.isModalVisible = false;
    };

    nextPage = () => {
        this.current = this.current + 1
    }

    prevPage = () => {
        this.current = this.current - 1
    };

    loadPageList = async (page: any, org?: any) => {
        try {
            this.page = page
            const response = await this.getTeam(page, org)
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
            }
        } catch (error) {
            console.log(error);
        }
    };

    onCreate = async (data: any, form: any) => {
        this.loading = true;
        const response = await this.createTeam({
            ...data,
        })
        if (response.status === 201) {
            this.member.logo_url = response.body['members'][0].logo_url
            this.member.email = response.body['members'][0].email.email
            this.member.role = response.body['members'][0].role
            this.listMembers = [this.member]
            this.idTeam = response.body.id
            form.resetFields();
            this.nextPage()
        } else {
            const teamNameResponse = await this.checkTeamName(1, data.name)
            if (teamNameResponse.status === 400) {
                message.error("Tên nhóm đã tồn tại!");
            } else {
                message.error("Lưu thông tin nhóm không thành công!");
            }
        }
        this.loading = false;
    };

    onAddMember = async (form: any, setSearchParams: any) => {
        this.loading = true;
        try {
            this.listMembers.shift()
            const response = await this.inviteMember([
                ...toJS(this.listMembers),
            ], this.idTeam)
            if (response.status === 201) {
                message.success("Thêm thành viên thành công!")
                form.resetFields();
                this.handleCancel()
                this.idTeam = response.body['id']
                setSearchParams({ q: this.idOrg, team: this.idTeam, content: "groups" })
            } else {
                message.error("Thêm thành viên không thành công. Vui lòng kiểm tra lại định dạng email.")
            }
        } catch (error) {
            console.log(error)
        }


        this.loading = false;
    }

    onUpdate = async (data: any, form: any, id: any) => {
        this.loading = true;
        try {
            const response = await this.updateTeam({
                ...data,
            }, id)
            if (response.status === 200) {
                message.success("Chỉnh sửa thông tin nhóm thành công.");
                form.resetFields()
                this.handleCancel()
            }
            else {
                message.error("Chỉnh sửa thông tin nhóm không thành công!");
            }
            this.loading = false;
        } catch (error) {
            console.log(error)
        }
    };

    loadPageView = async (id: any) => {
        // load team detail
        try {
            const response = await this.viewTeam(id)
            if (response.status === 200) {
                this.itemTeam = { ...response.body }
            }
        } catch (error) {
            console.log(error)
        }
        // load team members
        try {
            const response = await this.viewTeamMembers(id)
            if (response.status === 200) {
                this.itemTeamMember = response.body['results']
            }
        } catch (error) {
            console.log(error)
        }
    }

    addMember = (item: any) => {
        this.listMembers = [
            ...this.listMembers,
            {
                logo_url: "",
                email: item,
                role: ""
            }
        ]
    }

    handleChange = async (values: any) => {
        this.countMember = values.length + 1;
        this.listMembers = [this.member]
        values.forEach(this.addMember)
    }

    showDetailTeam = async (setSearchParams: any, idTeam: any, idOrg: any) => {
        this.idTeam = idTeam
        this.showListTeam = false
        setSearchParams({ q: idOrg, team: idTeam, content: 'groups' })
    }

    emailValidator = (rule: any, values: any, callback: any) => {
        const emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        const invalidInputs = values.filter((value: any) => !value.match(emailRegex));
        if (invalidInputs.length === 0) {
            callback()
        } else if (invalidInputs.length === 1) {
            callback(invalidInputs.join('') + ' email không đúng định dạng');
        } else {
            callback(invalidInputs.slice(0, -1).join(', ') + ' và ' + invalidInputs.slice(-1) + ' email không đúng định dạng');
        }
    }
}

export const teamStore = new TeamStore()
