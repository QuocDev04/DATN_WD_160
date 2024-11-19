import { Button, Form, FormProps, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AiTwotoneMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import instance from "@/configs/axios";
type FieldType = {
    name?: string;
    password?: string;
    email: string;
    confirmPassword: string;
};
const RegisterPages = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()
    const { mutate } = useMutation({
        mutationFn: async (data: FieldType) => {
            try {
                const response = await instance.post(`/signup`, data);
                if (response.status !== 201) {
                    return messageApi.open({
                        type: "error",
                        content: "Bạn đăng ký thất bại",
                    });
                }
                messageApi.open({
                    type: "success",
                    content: "Bạn đăng ký thành công",
                });
                setTimeout(() => navigate('/login'), 500)
            } catch (error) {
                messageApi.open({
                    type: "error",
                    content: "Đã xảy ra lỗi. Vui lòng thử lại sau.",
                });
                throw new Error("error");
            }
        },
    });
    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        console.log("Success:", values);
        mutate(values);
    };
    const validateMessages = {
        required: "${label} không được bỏ trống!",
        types: {
            email: "${label} phải là một email hợp lệ!",
        },
        pattern: {
            mismatch: "${label} phải có đuôi @gmail.com!",
        },
        string: {
            range: "${label} phải có độ dài từ ${min} đến ${max} ký tự!",
        },
    };
    return (
        <div>
            {contextHolder}
            <div className="h-screen py-16 sm:px-6 lg:px-8 flex bg-white">
                <div className="mx-auto flex">
                    <div className="image-container">
                        <img alt="" src="../../../../../public/cat.png" className="pt-28" />
                    </div>
                    <div>
                        <h1 className="text-center text-2xl font-bold text-[#8b4d02] sm:text-3xl">
                            PET HOTEL
                        </h1>
                        <div className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
                            <p className="text-center text-lg font-medium">
                                Đăng ký để trở thành thành viên PetHotel
                            </p>

                            <Form
                                validateMessages={validateMessages}
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                style={{ maxWidth: 600 }}
                                initialValues={{ remember: true }}
                                autoComplete="off"
                                onFinish={onFinish}
                            >
                                <Form.Item<FieldType>
                                    label="Tên tài khoản"
                                    name="name"
                                    validateTrigger="onBlur"
                                    rules={[
                                        { required: true },
                                        { type: "string", min: 6, max: 30 },
                                    ]}
                                >
                                    <Input
                                        prefix={
                                            <UserOutlined className="site-form-item-icon" />
                                        }
                                        placeholder="Tên tài khoản"
                                    />
                                </Form.Item>
                                <Form.Item<FieldType>
                                    label="Email"
                                    name="email"
                                    validateTrigger="onBlur"
                                    rules={[
                                        { required: true, message: validateMessages.required.replace("${label}", "Email") },
                                        { type: "email", message: validateMessages.types.email.replace("${label}", "Email") },
                                        { pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/, message: validateMessages.pattern.mismatch.replace("${label}", "Email") }
                                    ]}                                >
                                    <Input
                                        prefix={
                                            <AiTwotoneMail className="site-form-item-icon" />
                                        }
                                        placeholder="Email của bạn"
                                    />
                                </Form.Item>
                                <Form.Item<FieldType>
                                    label="Mật Khẩu"
                                    name="password"
                                    validateTrigger="onBlur"
                                    rules={[
                                        { required: true, message: validateMessages.required.replace("${label}", "Mật Khẩu") },
                                        { type: "string", min: 6, max: 30, message: validateMessages.string.range.replace("${label}", "Mật Khẩu").replace("${min}", "6").replace("${max}", "30") }
                                    ]}
                                >
                                    <Input.Password
                                        prefix={
                                            <LockOutlined className="site-form-item-icon" />
                                        }
                                        type="password"
                                        placeholder="Mật Khẩu"
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Nhập lại mật khẩu"
                                    name="confirmPassword"
                                    validateTrigger="onBlur"
                                    dependencies={["password"]}
                                    rules={[
                                        { required: true },
                                        { type: "string", min: 6, max: 30 },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (
                                                    !value ||
                                                    getFieldValue("password") ===
                                                    value
                                                ) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error(
                                                        "Mật khẩu xác nhận không khớp!",
                                                    ),
                                                );
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password
                                        prefix={
                                            <LockOutlined className="site-form-item-icon" />
                                        }
                                        placeholder="Nhập lại mật khẩu"
                                    />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                    <Button type="primary" htmlType="submit">
                                        Đăng Ký
                                    </Button>
                                    <Link to={"/login"} className="ml-3">
                                        Đăng Nhập
                                    </Link>
                                </Form.Item>
                            </Form>

                        </div>
                    </div>
                    <div className="image-container">
                        <img
                            src="../../../../../public/dog.png"
                            className="pt-24  mx-10"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPages;
