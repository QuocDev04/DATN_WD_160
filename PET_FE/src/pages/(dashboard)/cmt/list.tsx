/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "@/configs/axios";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, notification, Popconfirm, Table, TableColumnsType, Form, Input, Modal } from "antd";
import { useState, useEffect } from "react";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";

const ListCmt = () => {
    const [api, contextHolder] = notification.useNotification();
    const queryClient = useQueryClient();
    const { data: evaluate, refetch } = useQuery({
        queryKey: ["evaluate"],
        queryFn: async () => {
            const response = await instance.get(`/evaluate`);
            console.log("API response:", response.data);
            return response.data;
        },
    });

    useEffect(() => {
        console.log("Evaluate data:", evaluate);
    }, [evaluate]);

    const dataSource = evaluate?.map((item: any) => ({
        key: item._id,
        name: item?.user?.name || "Không có tên",
        avatar: item?.user?.avatar || "Không có avatar",
        ...item,
    }));
    const openNotification =
        (pauseOnHover: boolean) =>
            (type: "success" | "error", message: string, description: string) => {
                api.open({
                    message,
                    description,
                    type,
                    showProgress: true,
                    pauseOnHover,
                });
            };
    const { mutate: del } = useMutation({
        mutationFn: async (id: string) => {
            try {
                return await instance.delete(`/evaluate/${id}`);
            } catch (error) {
                throw new Error("error");
            }
        },
        onSuccess: () => {
            openNotification(false)(
                "success",
                "Bạn Xóa Thành Công",
                "Bạn Đã Xóa Thành Công",

            )
            queryClient.invalidateQueries({
                queryKey: ["evaluate"],
            });
        },

        onError: () =>
            openNotification(false)(
                "error",
                "Bạn Xóa Thất Bại",
                "Bạn Đã Xóa Thất Bại",
            ),
    });
    const columns: TableColumnsType = [
        {
            title: "Tên",
            dataIndex: "name",
            width: 150,
        },
        {
            title: "Ngày Tạo",
            dataIndex: "createdAt",
            width: 200,
            render: (createdAt: string) => new Date(createdAt).toLocaleDateString(),
        },
        {
            title: "avatar",
            dataIndex: "avatar",
            width: 100,
            render: (avatar: string) => (
                <img src={avatar} alt="" className="w-20" />
            ),
        },
        {
            title: "Nội Dung",
            dataIndex: "description",
            width: 150,
        },
        {
            title: "Hành Động",
            key: "operation",
            fixed: "right",
            width: 150,
            render: (_: any, item: any) => (
                <>
                    <div className="flex gap-3">
                        <Button type="primary" className="mr-2" onClick={() => showModal(item)}>
                            <AiFillEdit className="text-xl" />
                        </Button>
                        <Popconfirm
                            onConfirm={() => del(item._id)}
                            title="Xóa"
                            description="Bạn Chắc Chắn Muốn Xóa Nó Chứ?"
                            icon={
                                <QuestionCircleOutlined
                                    style={{ color: "red" }}
                                />
                            }
                        >
                            <Button danger>
                                <AiTwotoneDelete className="text-lg" />
                            </Button>
                        </Popconfirm>
                    </div>
                </>
            ),
        },
    ];
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState<any>(null);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            await instance.put(`/evaluate/${currentItem._id}`, values);
            await refetch();
            setIsModalVisible(false);
            api.success({ message: "Cập nhật thành công!", description: "Bình luận đã được cập nhật." });
        } catch (error) {
            console.error("Failed to update comment:", error);
            api.error({ message: "Cập nhật thất bại!", description: "Có lỗi xảy ra khi cập nhật bình luận." });
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showModal = (item: any) => {
        setCurrentItem(item);
        form.setFieldsValue({ description: item.description });
        setIsModalVisible(true);
    };

    return (
        <>
            {contextHolder}
            <div className="flex justify-between mb-7">
                <h1 className="text-2xl font-medium">Danh Sách Người Dùng Bình Luận</h1>
            </div>
            <Table
                className="border rounded-lg"
                columns={columns}
                dataSource={dataSource}
                pagination={{ pageSize: 50 }}
                scroll={{ y: 540 }}
            />
            <Modal title="Sửa Bình Luận" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form}>
                    <Form.Item
                        name="description"
                        rules={[{ required: true, message: 'Vui lòng nhập nội dung bình luận!' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ListCmt;
