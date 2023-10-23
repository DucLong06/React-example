import { Button, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import UploadAvatar from "../../components/UploadAvatar/UploadAvatar";
import { removeAccents } from "../../utils/helpers/Common";
import { organizationStore as store } from "./OrganizationStore";

type Props = {
    item?: any;
    dateTime?: any;
};

const EditOrganization = observer(({ item, dateTime }: Props) => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const [orgItem, setOrgItem] = useState({});
    const [originalName, setOriginalName] = useState("");

    useEffect(() => {
        const cloneItem = _.cloneDeep(item);
        if (cloneItem.country == undefined || cloneItem.country == null) {
            cloneItem.country = undefined;
        } else {
            cloneItem.country = cloneItem.country.alpha2_code;
        }
        setOrgItem({ ...cloneItem });
        setOriginalName({ ...cloneItem }.name);

        store.loadCountries();
    }, [dateTime]);

    return (
        <Modal
            title="Chỉnh sửa thông tin tổ chức"
            visible={store.isModalVisible}
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
                            if (values.name === originalName) {
                                delete values.name;
                            }
                            //console.log(values);
                            store.onUpdate(values, form, orgItem["id"]);
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
                    initialValues={orgItem}
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
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả">
                        <TextArea
                            autoSize={{ minRows: 4, maxRows: 6 }}
                            placeholder="Mô tả"
                            maxLength={100}
                        />
                    </Form.Item>
                    <Form.Item name="address" label="Địa chỉ">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="country"
                        label="Quốc gia"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn quốc gia!",
                            },
                        ]}
                    >
                        <Select
                            allowClear
                            showSearch
                            placeholder="Quốc gia"
                            optionFilterProp="children"
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
                                        key={country.id}
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

export default EditOrganization;
