import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Image, Input, InputNumber, Space } from "antd";

const InformationUser = () => {
    const userId = localStorage.getItem("userId"); // Lấy userId từ localStorage

    const { data, isLoading, error } = useQuery({
        queryKey: ["user", userId],
        queryFn: () => instance.get(`/user/${userId}`),
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    console.log("User Data:", data);

    return (
        <div>
            <Form
                layout="vertical"
                // onFinish={onFinish}
                autoComplete="off"
                initialValues={data?.data}
            >
                <Form.Item className="w-32">
                    <Image
                        src={data?.data.avatar}
                        alt=""
                        className=" w-10 h-10 rounded-full"
                    />
                </Form.Item>
                <Form.Item name="avatar" label="Tải ảnh lên">
                    <Input placeholder="URL ảnh" className="h-10" />
                </Form.Item>
                <div className="grid grid-cols-4 gap-5">
                    <Form.Item
                        name="name"
                        label="Tên"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên!",
                            },
                            {
                                type: "string",
                                min: 6,
                                message: "Tên phải có ít nhất 6 ký tự!",
                            },
                        ]}
                    >
                        <Input placeholder="Tên" className="h-10" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập email!",
                            },
                            {
                                type: "email",
                                message: "Email không hợp lệ!",
                            },
                        ]}
                    >
                        <Input placeholder="Email" className="h-10" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Mật Khẩu"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu!",
                            },
                            {
                                type: "string",
                                min: 6,
                                message:
                                    "Mật khẩu phải có ít nhất 6 ký tự!",
                            },
                        ]}
                    >
                        <Input.Password
                            disabled
                            placeholder="Mật Khẩu"
                            className="h-10"
                        />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Số Điện Thoại"
                        rules={[
                            {
                                type: "number",
                                min: 0,
                                message:
                                    "Vui lòng nhập đúng số điện thoại!",
                            },
                        ]}
                    >
                        <InputNumber
                            placeholder="Số Điện Thoại"
                            className="w-32 h-10"
                        />
                    </Form.Item>
                </div>

                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};

export default InformationUser;
