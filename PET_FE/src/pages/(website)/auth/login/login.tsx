import { Button, Form, FormProps, Input, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { AiTwotoneMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import instance from "@/configs/axios";
import { useMutation } from "@tanstack/react-query";

type FieldType = {
    email: string;
    password: string;
    username: string;
};

const LoginPages = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: async (data: FieldType) => {
            try {
                const response = await instance.post(`/signin`, data);
                if (response.status !== 200) {
                    return messageApi.open({
                        type: "error",
                        content: "Bạn đăng nhập thất bại",
                    });
                }
                const { accessToken, role, userId } = response.data; // Lấy userId từ response
                if (accessToken && role && userId) {
                    // Lưu thông tin vào localStorage
                    localStorage.setItem("token", accessToken);
                    localStorage.setItem("role", role);
                    localStorage.setItem("userId", userId); // Lưu userId vào localStorage

                    messageApi.open({
                        type: "success",
                        content: "Bạn đăng nhập thành công",
                    });
                    navigate(role === "admin" ? "/admin" : "/");
                } else {
                    messageApi.open({
                        type: "error",
                        content: "Token, role hoặc userId không tồn tại trong response",
                    });
                }
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
                        <img alt="" src="../../../../../public/cat.png" className="pt-28 mx-10" />
                    </div>
                    <div>
                        <h1 className="text-center text-2xl font-bold text-[#8b4d02] sm:text-3xl">
                            PET HOTEL
                        </h1>
                        <div className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
                            <p className="text-center text-lg font-medium">
                                Đăng nhập vào tài khoản của bạn
                            </p>
                            <Form
                                validateMessages={validateMessages}
                                name="basic"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 20 }}
                                style={{ maxWidth: 600 }}
                                onFinish={onFinish}
                                initialValues={{ remember: true }}
                                autoComplete="off"
                            >
                                <Form.Item<FieldType>
                                    label="Email"
                                    name="email"
                                    validateTrigger="onBlur"
                                    rules={[
                                        { required: true, message: validateMessages.required.replace("${label}", "Email") },
                                        { type: "email", message: validateMessages.types.email.replace("${label}", "Email") },
                                        { pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/, message: validateMessages.pattern.mismatch.replace("${label}", "Email") }
                                    ]}
                                >
                                    <Input
                                        prefix={<AiTwotoneMail className="site-form-item-icon" />}
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
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Mật Khẩu"
                                    />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 5, span: 18 }}>
                                    <Button type="primary" htmlType="submit" className="w-full">
                                        Đăng Nhập
                                    </Button>
                                    <p className="pt-4">
                                        Bạn quên mật khẩu? <Link to={"/register"}>Đăng ký</Link>
                                    </p>
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

export default LoginPages;
