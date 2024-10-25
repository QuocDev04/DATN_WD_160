import { Button, Form, FormProps, Input, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { AiTwotoneMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import instance from "@/configs/axios";
type FieldType = {
    password: string;
    email: string;
};
const LoginPages = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: async (data: FieldType) => {
            try {
                const response = await instance.post(`/signin`, data);
                console.log(response.data);

                if (response.status !== 200) {
                    return messageApi.open({
                        type: "error",
                        content: "Bạn đăng nhập thất bại",
                    });
                }
                const { accessToken, role} = response.data;
                if (accessToken && role) {
                    localStorage.setItem("token", accessToken);
                    localStorage.setItem("role", role);
                    messageApi.open({
                        type: "success",
                        content: "Bạn đăng nhập thành công",
                    });
                    if (role === "admin") {
                        navigate("/admin");
                    } else {
                        navigate("/");
                    }
                } else {
                    messageApi.open({
                        type: "error",
                        content: "Token hoặc role không tồn tại trong response",
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
        console.log("Success:", values);
        mutate(values);
    };
    const validateMessages = {
        required: "${label} Không được bỏ trống!",
        types: {
            email: "${label} không đúng định dạng @gmail.com!",
            number: "${label} is not a valid number!",
        },
        number: {
            range: "${label} must be between ${min} and ${max}!",
        },
        string: {
            range: "${label} không được nhỏ hơn ${min} và lớn hơn ${max}!",
        },
    };
    return (
        <div>
            {contextHolder}
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">
                    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                        Chào mừng bạn
                    </h1>
                    <div className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
                        <p className="text-center text-lg font-medium">
                            Đăng nhập vào tài khoản của bạn
                        </p>
                        <Form
                            validateMessages={validateMessages}
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item<FieldType>
                                label="Email"
                                name="email"
                                rules={[{ required: true }, { type: "email" }]}
                                validateTrigger="onBlur"
                            >
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
                                rules={[
                                    { required: true },
                                    { type: "string", min: 6, max: 30 },
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
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Đăng Nhập
                                </Button>
                                <Link to={"/register"} className="ml-3">
                                    Đăng ký
                                </Link>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPages;
