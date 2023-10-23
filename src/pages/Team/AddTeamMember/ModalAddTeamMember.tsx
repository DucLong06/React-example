import { Button, Form, Modal } from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import AddTeamMember from "./AddTeamMember";
type Props = {
    store: any;
    item: any;
    dateTime: any;
};

const ModalAddTeamMember = observer(({ item, store, dateTime }: Props) => {
    const [form] = Form.useForm();
    let [searchParams, setSearchParams] = useSearchParams();

    const [itemTeamMember, setItemTeamMember] = useState({});
    const [loading, setLoading] = useState(true);

    return (
        <Modal
            title="Thêm mới thành viên nhóm"
            visible={store.isModalVisible}
            onCancel={store.handleCancel}
            footer={[
                <div className="steps-action">
                    <Button key="back" onClick={store.handleCancel}>
                        Huỷ
                    </Button>

                    <Button
                        key="submit"
                        type="primary"
                        onClick={() => {
                            form.validateFields().then((values) => {
                                store.onAddMember(form, setSearchParams);
                            });
                        }}
                    >
                        Thêm
                    </Button>
                </div>,
            ]}
            className="modal-scroll-body modal-md"
        >
            {loading === true ? (
                <Loading />
            ) : (
                <AddTeamMember store={store} label="Thêm mới thành viên" />
            )}
        </Modal>
    );
});

export default ModalAddTeamMember;
