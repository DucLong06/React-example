import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { observer } from "mobx-react-lite";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Loading from "../../../components/Loading/Loading";
import UploadAvatar from "../../../components/UploadAvatar/UploadAvatar";
import {
    LocalDate,
    removeAccents,
    useNavigateSearch,
} from "../../../utils/helpers/Common";
import { inforAccountStore as store } from "./InforAccountStore";
import { appLayoutStore as layoutStore } from "../../../layouts/App/AppLayoutStore";
type Props = {
    item?: any;
    dateTime?: any;
};

const EditInforAccount = observer(({ item, dateTime }: Props) => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const disabled = true;
    const [initialValues, setInitialValues] = useState({});
    const [loading, setLoading] = useState(true);
    const navigateSearch = useNavigateSearch();
    const dateFormat = "DD/MM/YYYY";

    useEffect(() => {
        const accountInfo = { ...item };
        if (accountInfo.country) {
            accountInfo.country = accountInfo.country.alpha2_code;
        }
        setInitialValues(accountInfo);
        setTimeout(() => {
            setLoading(false);
        }, 100);

        store.loadCountries(store.page);
    }, [dateTime]);

    return (
        <Modal
            title="Chỉnh sửa thông tin cá nhân"
            visible={store.modalType == "edit_infor" && store.isModalVisible}
            onCancel={() => store.handleCancel(navigateSearch)}
            footer={[
                <Button
                    key="back"
                    onClick={() => store.handleCancel(navigateSearch)}
                >
                    Huỷ
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={() => {
                        form.validateFields().then((values) => {
                            store.onUpdate(values, form, layoutStore);
                        });
                    }}
                >
                    Lưu
                </Button>,
            ]}
            className="modal-scroll-body modal-md"
        >
            {loading === true ? (
                <Loading />
            ) : (
                <Form
                    layout="vertical"
                    form={form}
                    name="form_in_modal"
                    initialValues={initialValues}
                >
                    <Form.Item name="avatar_url" label="Ảnh đại diện">
                        <UploadAvatar
                            callback={(e: any) => {
                                {
                                    form.setFieldsValue({
                                        ["avatar_url"]: e,
                                    });
                                }
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="Tên" name="last_name">
                        <Input placeholder="Tên" />
                    </Form.Item>
                    <Form.Item label="Họ" name="first_name">
                        <Input placeholder="Họ" />
                    </Form.Item>
                    <Form.Item label="Email" name="primary_email">
                        <Input placeholder="" disabled={disabled} />
                    </Form.Item>
                    {/* <Form.Item
                            label="Số điện thoại"
                            name="phone"
                        >
                            <Input placeholder="Số diện thoại" style={{ width: '100%' }} />
                        </Form.Item> */}
                    <Form.Item label="Ngày sinh" name="date_of_birth">
                        <DatePicker
                            defaultPickerValue={
                                (initialValues["date_of_birth"]! = null
                                    ? moment(
                                          LocalDate(
                                              initialValues["date_of_birth"]
                                          ),
                                          dateFormat
                                      )
                                    : undefined)
                            }
                            placeholder="Ngày sinh"
                            style={{ width: "100%" }}
                            format={dateFormat}
                        />
                    </Form.Item>
                    <Form.Item label="Giới tính" name="gender">
                        <Select placeholder="Giới tính">
                            <Option value="male">Nam</Option>
                            <Option value="female">Nữ</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Địa chỉ" name="address">
                        <Input placeholder="Địa chỉ" />
                    </Form.Item>
                    <Form.Item label="Quốc gia" name="country">
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

export default EditInforAccount;
