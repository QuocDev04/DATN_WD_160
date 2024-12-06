import { IRoom } from "@/common/type/IRoom";
import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, notification, Popconfirm, Table, TableColumnsType, Select } from "antd";
import { AiFillEdit, AiOutlinePlusCircle, AiTwotoneDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { ICategory } from "@/common/type/ICategory";
import { useState } from "react";
const ListRoom = () => {
    const [api, contextHolder] = notification.useNotification();
    const { data } = useQuery({
        queryKey: ['room'],
        queryFn: () => instance.get('/room')
    })
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
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: async (id: string) => {
            try {
                return await instance.delete(`/room/${id}`);
            } catch (error) {
                throw new Error("error")
            }
        },
        onSuccess: () => {
            openNotification(false)(
                "success",
                "Bạn Xóa Thành Công",
                "Bạn Đã Xóa Thành Công",
            )
            queryClient.invalidateQueries({
                queryKey: ["room"],
            });
        },
        onError: () =>
            openNotification(false)(
                "error",
                "Bạn Xóa Thất Bại",
                "Bạn Đã Xóa Thất Bại",
            ),
    })
    const columns: TableColumnsType = [
        {
            title: 'Tên Phòng',
            dataIndex: 'roomName',
            key: 'roomName',
            width: 150,
        },
        {
            title: 'Giá Phòng',
            dataIndex: 'roomprice',
            key: 'roomprice',
            width: 150,
        },
        {
            title: 'Ảnh Phòng',
            dataIndex: 'roomgallely',
            key: 'roomgallely',
            width: 150,
            render: (gallery: string[]) => {
                const firstImage =
                    gallery && gallery.length > 0 ? gallery[0] : "";
                return firstImage ? (
                    <img
                        src={firstImage}
                        style={{ width: "100px", height: "auto" }}
                        alt="Ảnh phụ"
                    />
                ) : (
                    "Không có ảnh nào"
                );
            },
        },
        {
            title: 'Danh Mục Phòng',
            dataIndex: 'category',
            key: 'category',
            width: 150,
render: (_: any, product: IRoom) =>
                product?.category?.map((category: ICategory, index: number) => (
                    <div key={index}>
                        {index + 1}. {category.title}
                    </div>
                )),
        },
        {
            title: 'Mô Tả Phòng',
            dataIndex: 'roomdescription',
            key: 'roomdescription',
            render: (_: any, product: IRoom) => {
                const limitWords = (text: string, wordLimit: number) => {
                    const words = text.split(' ');
                    return words.length > wordLimit
                        ? words.slice(0, wordLimit).join(' ') + '...'
                        : text;
                };

                return (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: limitWords(product?.roomdescription || "", 20),
                        }}
                    />
                );
            }
        },
        {
            title: 'Hành Động',
            dataIndex: 'roomdescription',
            key: 'roomdescription',
            fixed: "right",
            width: 150,
            render: (_: any, room: IRoom) => {
                return (
                    <div>
                        <Link to={`/admin/room/${room._id}`}>
                            <Button type="primary" className="mr-2">
                                <AiFillEdit className="text-xl" />
                            </Button>
                        </Link>
                        <Popconfirm
                            onConfirm={() => mutate(room._id)}
                            title="Xóa Sản Phẩm"
                            description="Bạn có chắc chắn muốn xóa sản phẩm này không?"
                            okText="Có"
                            cancelText="Không"
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
                )
            }
        },
    ];
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const { data: categoriesData, isLoading: categoryLoading, error: categoryError } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            try {
                const response = await instance.get('/category');
                console.log("Categories Response:", response);
                return response;
            } catch (error) {
                console.error("Error fetching categories:", error);
                throw error;
            }
        }
    });
console.log("Categories Data:", categoriesData);
    console.log("Category Loading:", categoryLoading);
    console.log("Category Error:", categoryError);
    const dataSource = data?.data
        .filter((room: IRoom) => {
            if (!selectedCategory) return true;
            return room.category.some((cat:any) => cat._id === selectedCategory);
        })
        .map((room: IRoom) => ({
            key: room._id,
            ...room
        }));
    return (
        <>
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h1>Quản lý Phòng</h1>
                    <Select
                        style={{ width: 200, marginTop: 8 }}
                        placeholder="Lọc theo danh mục"
                        allowClear
                        loading={categoryLoading}
                        onChange={(value) => setSelectedCategory(value)}
                    >
                        {categoriesData?.data?.map((category: ICategory) => {
                            console.log("Mapping category:", category);
                            return (
                                <Select.Option key={category._id} value={category._id}>
                                    {category.title}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </div>
                <Link to={"/admin/roomadd"}>
                    <Button type="primary">
                        <AiOutlinePlusCircle />
                        Thêm Phòng
                    </Button>
                </Link>
            </div>
            {contextHolder}
            <Table dataSource={dataSource} columns={columns} />
        </>
    )
}
export default ListRoom