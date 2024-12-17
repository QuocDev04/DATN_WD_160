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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            {contextHolder}
            <div className="max-w-6xl w-full mx-auto flex items-center justify-between px-8">
                <div className="hidden lg:block w-1/4">
                    <img 
                        src="../../../../../public/cat.png" 
                        alt="Cat" 
                        className="w-full h-auto max-w-[300px]"
                    />
                </div>

                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-[#8b4d02] mb-2">
                                PET HOTEL
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Đăng ký để trở thành thành viên PetHotel
                            </p>
                        </div>

                        <Form
                            validateMessages={validateMessages}
                            name="basic"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            onFinish={onFinish}
                            autoComplete="off"
                            layout="vertical"
                            className="space-y-4"
                        >
                            <Form.Item<FieldType>
                                required={false}
                                label={<>Tên tài khoản <span className="text-red-500">*</span></>}
                                name="name"
                                validateTrigger="onBlur"
                                rules={[
                                    { required: true },
                                    { type: "string", min: 3, max: 30 },
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined className="text-gray-400" />}
                                    placeholder="Tên tài khoản"
                                    className="h-12 rounded-lg"
                                />
                            </Form.Item>

                            <Form.Item<FieldType>
                                required={false}
                                label={<>Email <span className="text-red-500">*</span></>}
                                name="email"
                                validateTrigger="onBlur"
                                rules={[
                                    { required: true },
                                    { type: "email" },
                                    { pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/ }
                                ]}
                            >
                                <Input
                                    prefix={<AiTwotoneMail className="text-gray-400" />}
                                    placeholder="Email của bạn"
                                    className="h-12 rounded-lg"
                                />
                            </Form.Item>

                            <Form.Item<FieldType>
                                required={false}
                                label={<>Mật khẩu <span className="text-red-500">*</span></>}
                                name="password"
                                validateTrigger="onBlur"
                                rules={[
                                    { required: true },
                                    { type: "string", min: 6, max: 30 }
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="text-gray-400" />}
                                    placeholder="Mật khẩu"
                                    className="h-12 rounded-lg"
                                />
                            </Form.Item>

                            <Form.Item
                                required={false}
                                label={<>Nhập lại mật khẩu <span className="text-red-500">*</span></>}
                                name="confirmPassword"
                                validateTrigger="onBlur"
                                dependencies={["password"]}
                                rules={[
                                    { required: true },
                                    { type: "string", min: 6, max: 30 },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("password") === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="text-gray-400" />}
                                    placeholder="Nhập lại mật khẩu"
                                    className="h-12 rounded-lg"
                                />
                            </Form.Item>

                            <Form.Item wrapperCol={{ span: 24 }} className="mb-0">
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    className="w-full h-12 rounded-lg text-lg font-medium bg-[#8b4d02] hover:bg-[#D4A373] border-none transition-all duration-300"
                                >
                                    Đăng Ký
                                </Button>
                                <div className="mt-6 text-center text-gray-600">
                                    <span>Đã có tài khoản? </span>
                                    <Link 
                                        to="/login" 
                                        className="text-[#8b4d02] hover:text-[#D4A373] font-medium transition-all duration-300"
                                    >
                                        Đăng nhập ngay
                                    </Link>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </div>

                <div className="hidden lg:block w-1/4">
                    <img 
                        src="../../../../../public/dog.png" 
                        alt="Dog"
                        className="w-full h-auto max-w-[300px] ml-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default RegisterPages;
