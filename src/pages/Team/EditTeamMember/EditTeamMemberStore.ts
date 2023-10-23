import { makeAutoObservable } from "mobx";


class EditTeamMemberStore {
    loading: boolean = false;
    isModalVisible: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    showModal = () => {
        this.isModalVisible = true;
    }

    handleCancel = () => {
        this.isModalVisible = false;
    };

}

export const editTeamMemberStore = new EditTeamMemberStore()
