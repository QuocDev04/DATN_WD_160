/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Button,
    Form,
    FormProps,
    Input,
    InputNumber,
    message,
} from "antd";
import { Link } from "react-router-dom";
import { AiFillBackward } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import { LoadingOutlined } from "@ant-design/icons";
import instance from "@/configs/axios";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AddIService } from "@/common/IService";
const ServiceAddPage = () => {
    const [value, setValue] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: AddIService) => {
            try {
                return await instance.post("/service", data);
            } catch (error) {
                throw new Error((error as any).message);
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Bạn thêm dịch vụ thành công",
            });
            form.resetFields();
        },
        onError: () => {
            messageApi.open({
                type: "error",
                content: "Bạn thêm dịch vụ thất bại. Vui lòng thử lại sau!",
            });
        },
    });
    const onFinish: FormProps<AddIService>["onFinish"] = (values) => {
        const newValues = {
            ...values,        };
        mutate(newValues);
    };
    const toolbarOptions = [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],
        ["link", "image", "video", "formula"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction
        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ["clean"], // remove formatting button
    ];
    const modules = {
        toolbar: toolbarOptions,
    };
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl">Thêm dịch vụ</h1>
                <Link to={"/admin/service"}>
                    <Button type="primary">
                        <AiFillBackward />
                        Quay lại
                    </Button>
                </Link>
            </div>
            {contextHolder}
            <Form
                form={form}
                name="basic"
                layout="vertical"
                onFinish={onFinish}
            >
                <div className="">
                    <div className="py-5">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Form.Item
                                label="Tên dịch vụ"
                                name="servicesName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Tên dịch vụ bắt buộc nhập",
                                    },
                                ]}
                            >
                                <Input disabled={isPending} />
                            </Form.Item>
                            <Form.Item
                                label="Giá dịch vụ"
                                name="priceService"
                                rules={[
                                    {
                                        required: true,
                                        message: "Giá dịch vụ bắt buộc nhập",
                                    },
                                    {
                                        type: "number",
                                        min: 0,
                                        message: "Giá không được nhỏ hơn 0",
                                    },
                                ]}
                            >
                                <InputNumber
                                    style={{ width: "100%" }}
                                    formatter={(value) =>
                                        `${value}`.replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ",",
                                        )
                                    }
                                    parser={(value) =>
                                        value
                                            ? value.replace(/\$\s?|(,*)/g, "")
                                            : ""
                                    }
                                    disabled={isPending}
                                />
                                {/* Thuộc tính formatter là một hàm để định dạng giá trị hiển thị trong trường đầu vào.
                        Hàm formatter nhận vào giá trị value và trả về giá trị đã được định dạng với dấu phẩy để phân cách hàng nghìn.
                        Biểu thức \B(?=(\d{3})+(?!\d)) là một biểu thức chính quy (regular expre */}
                            </Form.Item>

                        </div>
                        <Form.Item label="Mô tả dịch vụ" name="descriptionService" className="mb-16">
                            <ReactQuill
                                className="h-[300px]"
                                theme="snow"
                                value={value}
                                onChange={setValue}
                                modules={modules}
                            />
                        </Form.Item>
                    </div>
                    <div className="ml-5">
                    </div>
                    <Form.Item wrapperCol={{ span: 16 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <>
                                    <LoadingOutlined className="animate-spin" />
                                </>
                            ) : (
                                "Thêm"
                            )}
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </>
    );
};
export default ServiceAddPage;
