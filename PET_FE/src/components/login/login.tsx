import { Button, Form, Input } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { AiTwotoneMail } from "react-icons/ai";
import { Link } from "react-router-dom";
type FieldType = {
    password: string;
    email: string;
};
const LoginPages = () => {
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
                            autoComplete="off"
                        >
                            <Form.Item<FieldType>
                                label="Email"
                                name="email"
                                rules={[{ required: true }, { type: "email" }]}
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
                                    { type: "string", min: 3, max: 30 },
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
