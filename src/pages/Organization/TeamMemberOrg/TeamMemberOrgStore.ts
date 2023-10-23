import { makeAutoObservable } from "mobx";
import axiosClient from "../../../utils/apis/RequestHelper";
import { _IApiResponse } from "../../../utils/interfaces/IApiResponse";

class TeamMemberOrgStore {

    data: any = []
    page: number = 1
    loading: boolean = false

    constructor() {
        makeAutoObservable(this);
    }

    getOrganizationMember = async (id: any): Promise<_IApiResponse> => {
        return axiosClient.get(`/api/organizations/${id}/members/`,);
    }

    loadPageList = async (id: any) => {
        this.loading = true;
        try {
            const response = await this.getOrganizationMember(id)
            if (response.status === 200) {
                this.data = []
                for (var member in response.body) {
                    this.data = [
                        ...this.data,
                        {
                            email: member,
                            first_name: response.body[member].first_name,
                            last_name: response.body[member].last_name,
                            teams: response.body[member].teams,
                            avatar_url: response.body[member].avatar_url
                        }
                    ]

                }
            }
        } catch (error) {
            console.log(error);

        }
        this.loading = false;
    };


}

export const teamMemberOrgStore = new TeamMemberOrgStore();
