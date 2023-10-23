import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import React, { useState } from "react";
import axiosUpload from "../../utils/apis/RequestUpload";
import { _IApiResponse } from "../../utils/interfaces/IApiResponse";

interface Props {
    callback: any;
}

const UploadAvatar = ({ callback }: Props) => {
    const [imageUrl, setImageUrl] = useState("");

    const handleChange = async (info: any) => {
        const response = await uploadFile(info);
        if (response.status === 201) {
            let imageUrl = response.body["url"];
            if (
                window.location.hostname === "localhost" ||
                window.location.hostname === "127.0.0.1"
            ) {
                imageUrl = encodeURI(response.body["url"] || "");
            }

            setImageUrl(imageUrl);
            callback && callback(imageUrl);
        }
    };

    const checkImage = (file: any) => {
        const isImage = file && file["type"].split("/")[0] === "image";
        if (!isImage) {
            message.error(`Ảnh đại diện tải lên không đúng định dạng!`);
        }
        return false;
    };

    return (
        <Upload
            listType="picture"
            name="logo_url"
            maxCount={1}
            beforeUpload={checkImage}
            onChange={handleChange}
        >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
        </Upload>
    );
};

export async function uploadFile(data: any): Promise<_IApiResponse> {
    return axiosUpload.post("/api/upload/image/", data);
}

export default UploadAvatar;
