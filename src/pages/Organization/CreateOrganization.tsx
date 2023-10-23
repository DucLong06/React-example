import { Button, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import UploadAvatar from "../../components/UploadAvatar/UploadAvatar";
import { removeAccents, useNavigateSearch } from "../../utils/helpers/Common";
import { organizationStore as store } from "./OrganizationStore";

type Props = {};

const CreateOrganization = observer(() => {
    const navigateSearch = useNavigateSearch();
    const { Option } = Select;
    const [form] = Form.useForm();
    useEffect(() => {
        store.loadCountries();
    }, []);

    return (
        <Modal
            title="Tạo mới tổ chức"
            visible={store.modalType == "add" && store.isModalVisible}
            onCancel={() => {
                form.resetFields();
                store.handleCancel();
            }}
            footer={[
                <Button
                    key="back"
                    onClick={() => {
                        form.resetFields();
                        store.handleCancel();
                    }}
                >
                    Huỷ
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={() => {
                        form.validateFields().then((values) => {
                            //console.log(values);
                            store.onCreate(values, form, navigateSearch);
                        });
                    }}
                >
                    Lưu
                </Button>,
            ]}
            className="modal-scroll-body modal-md"
        >
            {store.loadingCountry ? (
                <Loading />
            ) : (
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{ modifier: "public" }}
                >
                    <Form.Item name="logo_url" label="Ảnh đại diện">
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
                                message: "Vui lòng nhập tên tổ chức!",
                            },
                        ]}
                        label="Tên tổ chức"
                    >
                        <Input placeholder="Tên tổ chức" />
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả">
                        <TextArea
                            autoSize={{ minRows: 4, maxRows: 6 }}
                            placeholder="Mô tả"
                        />
                    </Form.Item>
                    <Form.Item name="address" label="Địa chỉ">
                        <Input placeholder="Địa chỉ" />
                    </Form.Item>
                    <Form.Item name="country" label="Quốc gia">
                        <Select
                            allowClear
                            showSearch
                            placeholder="Quốc gia"
                            optionFilterProp="children"
                            onChange={store.handleChangeApiCountries}
                            filterOption={(input, option) =>
                                removeAccents(
                                    option!.children as unknown as string
                                )
                                    .toLowerCase()
                                    .includes(
                                        removeAccents(input).toLowerCase()
                                    )
                            }
                        >
                            {store.countries.map((country: any) => {
                                return (
                                    <Option
                                        value={country.alpha2_code}
                                        key={country.alpha2_code}
                                    >
                                        {country.name}
                                    </Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                </Form>
            )}
        </Modal>
    );
});

export default CreateOrganization;
