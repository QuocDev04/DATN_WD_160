import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Image, Input, InputNumber, Modal } from "antd";
import { useState } from "react";

const InformationUser = () => {
    const userId = localStorage.getItem("userId");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);

    const { data, isLoading, error } = useQuery({
        queryKey: ["user", userId],
        queryFn: () => instance.get(`/user/${userId}`),
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setReloadKey(prev => prev + 1);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="w-full max-w-5xl mx-auto py-12 px-4 sm:px-6">
                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                    <div className="relative h-64 bg-gradient-to-r from-blue-500 to-indigo-600">
                        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
                            <div className="relative">
                                <Image
                                    src={data?.data.avatar || '/default-avatar.png'}
                                    alt="Avatar"
                                    width={128}
                                    height={128}
                                    className="w-32 h-32 rounded-full border-4 border-white object-cover"
                                />
                                <label htmlFor="avatar-upload" 
                                    className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-50 transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="pt-20 pb-6 px-8 text-center">
                        <h2 className="text-2xl font-bold text-gray-900">{data?.data.name}</h2>
                        <p className="text-gray-500">{data?.data.email}</p>
                    
                        {/* Chỉ hiện video khi status là confirm */}
                        {data?.data.status === "confirmed" && (
                            <div className="mt-4">
                                <p className="text-gray-600 mb-2">Link Video:</p>
                                <a 
                                    onClick={() => setIsModalOpen(true)}
                                    className="text-blue-500 hover:text-blue-600 underline cursor-pointer"
                                >
                                    https://www.youtube.com/watch?v=dQw4w9WgXcQ
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Form Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h3 className="text-xl font-semibold mb-8 text-center">Chỉnh sửa thông tin</h3>
                    <Form
                        layout="vertical"
                        autoComplete="off"
                        initialValues={data?.data}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <Form.Item
                                name="name"
                                label={<span className="text-gray-700 font-medium">Họ và tên</span>}
                                rules={[
                                    { required: true, message: "Vui lòng nhập tên!" },
                                    { type: "string", min: 6, message: "Tên phải có ít nhất 6 ký tự!" },
                                ]}
                            >
                                <Input 
                                    placeholder="Nhập họ và tên" 
                                    className="h-11 rounded-lg border-gray-200 hover:border-blue-400 focus:border-blue-400 transition-colors"
                                />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                label={<span className="text-gray-700 font-medium">Email</span>}
                                rules={[
                                    { required: true, message: "Vui lòng nhập email!" },
                                    { type: "email", message: "Email không hợp lệ!" },
                                ]}
                            >
                                <Input 
                                    placeholder="example@email.com" 
                                    className="h-11 rounded-lg border-gray-200 hover:border-blue-400 focus:border-blue-400 transition-colors"
                                />
                            </Form.Item>

                            <Form.Item
                                name="phone"
                                label={<span className="text-gray-700 font-medium">Số điện thoại</span>}
                                rules={[
                                    { required: true, message: "Vui lòng nhập số điện thoại!" },
                                ]}
                            >
                                <InputNumber
                                    placeholder="Nhập số điện thoại"
                                    className="w-full h-11 rounded-lg border-gray-200 hover:border-blue-400 focus:border-blue-400 transition-colors"
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label={<span className="text-gray-700 font-medium">Mật khẩu</span>}
                            >
                                <Input.Password
                                    disabled
                                    placeholder="••••••••"
                                    className="h-11 rounded-lg border-gray-200"
                                    addonAfter={
                                        <Button type="link" className="text-blue-500 hover:text-blue-600">
                                            Đổi mật khẩu
                                        </Button>
                                    }
                                />
                            </Form.Item>
                        </div>

                        <div className="flex justify-center mt-8 space-x-4">
                            <Button 
                                type="default"
                                className="h-11 px-8 rounded-lg hover:bg-gray-50"
                            >
                                Hủy
                            </Button>
                            <Button 
                                type="primary"
                                htmlType="submit"
                                className="h-11 px-8 rounded-lg bg-blue-500 hover:bg-blue-600 border-none"
                            >
                                Lưu thay đổi
                            </Button>
                        </div>
                    </Form>
                </div>

                {/* Video Modal */}
                <Modal
                    title="Video"
                    open={isModalOpen}
                    onCancel={handleCloseModal}
                    footer={null}
                    width={800}
                    destroyOnClose={true}
                >
                    <div className="aspect-video">
                        {isModalOpen && (
                            <iframe
                                key={reloadKey}
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&autoplay=0"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        )}
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default InformationUser;
