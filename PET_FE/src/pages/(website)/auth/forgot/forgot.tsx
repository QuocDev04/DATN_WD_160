import { Button, Form, FormProps, Input, message } from "antd";
import { AiTwotoneMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import instance from "@/configs/axios";
import { useMutation } from "@tanstack/react-query";


const ForgotPages = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: async (data: any) => {
            try {
                const response = await instance.post(`/forgot-password`, data);
                if (response.status !== 200) {
                    return messageApi.open({
                        type: "error",
                        content: "Bạn đăng nhập thất bại",
                    });
                }
                navigate('/resetPass')
            } catch (error) {
                messageApi.open({
                    type: "error",
                    content: "Tài Khoản Không Tồn Tại",
                });
                throw new Error("error");
            }
        },
    });

    const onFinish: FormProps<any>["onFinish"] = (values) => {
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
                                Nhập email của bạn để khôi phục mật khẩu
                            </p>
                        </div>

                        <Form
                            validateMessages={validateMessages}
                            name="basic"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            onFinish={onFinish}
                            initialValues={{ remember: true }}
                            autoComplete="off"
                            layout="vertical"
                            className="space-y-4"
                        >
                            <Form.Item<any>
                                required={false}
                                label={<div className="flex items-center justify-between">
                                    <span>Email</span>
                                    <span className="text-red-500">*</span>
                                </div>}
                                name="email"
                                validateTrigger="onBlur"
                                rules={[
                                    { required: true, message: "Email không được bỏ trống" },
                                    { type: "email", message: "Email phải là một email hợp lệ" },
                                    { pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/, message: "Email phải có đuôi @gmail.com" }
                                ]}
                            >
                                <Input
                                    prefix={<AiTwotoneMail className="text-gray-400" />}
                                    placeholder="Email của bạn"
                                    className="h-12 rounded-lg"
                                />
                            </Form.Item>
                            <Form.Item wrapperCol={{ span: 24 }} className="mb-0">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="w-full h-12 rounded-lg text-lg font-medium bg-[#8b4d02] hover:bg-[#a15a03] border-none transition-all duration-300"
                                >
                                    Gửi
                                </Button>
                                <div className="mt-6 text-center text-gray-600 mb-3">
                                   
                                    <Link
                                        to="/login"
                                        className="text-[#8b4d02] hover:text-[#a15a03] font-medium transition-all duration-300"
                                    >
                                        Trở về
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

export default ForgotPages;
