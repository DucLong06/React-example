import { Button, Form, Input, Modal, Steps } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import UploadAvatar from "../../components/UploadAvatar/UploadAvatar";
import AddTeamMember from "./AddTeamMember/AddTeamMember";
import { teamStore as store } from "./TeamStore";

type Props = {
    idOrg: any;
};

const CreateTeam = observer(({ idOrg }: any) => {
    const [form] = Form.useForm();
    const { Step } = Steps;
    let [searchParams, setSearchParams] = useSearchParams();
    const steps = [
        {
            title: "Thông tin nhóm",
            form: true,
        },
        {
            title: "Thành viên",
            form: false,
        },
    ];

    useEffect(() => {
        store.idOrg = idOrg;
        // store.loadMember(store.pageMember);
    }, [idOrg]);

    return (
        <Modal
            title="Tạo mới nhóm"
            visible={store.modalType === "add_team" && store.isModalVisible}
            onCancel={store.handleCancel}
            footer={[
                <div className="steps-action">
                    <Button key="back" onClick={store.handleCancel}>
                        Huỷ
                    </Button>
                    {store.current < steps.length - 1 && (
                        <Button
                            className="justify-center button-icon-right"
                            type="primary"
                            loading={store.loading}
                            onClick={() => {
                                form.validateFields().then((values) => {
                                    store.onCreate(values, form);
                                });
                            }}
                        >
                            Lưu
                        </Button>
                    )}
                    {store.current === steps.length - 1 && (
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
                    )}
                </div>,
            ]}
            className="modal-scroll-body modal-md"
        >
            <Steps current={store.current}>
                {steps.map((item) => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="pt-4">
                {steps[store.current].form ? (
                    <Form
                        form={form}
                        layout="vertical"
                        name="create_team"
                        initialValues={{ modifier: "public" }}
                        // hidden:True
                    >
                        <Form.Item name="name" label="Ảnh đại diện">
                            <UploadAvatar
                                callback={(e: any) => {
                                    {
                                        form.setFieldsValue({
                                            ["logo_url"]: e,
                                        });
                                    }
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên nhóm!",
                                },
                                {
                                    max: 128,
                                    message: "Tên nhóm không được vượt quá 128 ký tự!"
                                }

                            ]}
                            label="Tên nhóm"
                        >
                            <Input placeholder="Tên nhóm" />
                        </Form.Item>
                        <Form.Item name="description" label="Mô tả" 
                        rules={[{
                            max: 2048,
                            message: "Mô tả không được vượt quá 2048 ký tự!"
                        }]}>
                            <TextArea
                                autoSize={{ minRows: 4, maxRows: 6 }}
                                placeholder="Mô tả"
                            />
                        </Form.Item>
                    </Form>
                ) : (
                    <AddTeamMember store={store} />
                )}
            </div>
        </Modal>
    );
});

export default CreateTeam;
