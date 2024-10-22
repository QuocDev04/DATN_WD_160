import {
    AiOutlinePlusCircle,
    AiTwotoneDelete,
    AiFillEdit,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Empty, message, Popconfirm, Table, TableColumnsType } from "antd";

import instance from "@/configs/axios";
import { IProduct } from "@/common/types/IProduct";

const ProductPage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const { data, isLoading } = useQuery({
        queryKey: ["product"],
        queryFn: () => instance.get(`/product`),
    });
    console.log(data?.data);

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: async (id: string) => {
            try {
                return await instance.delete(`/product/${id}`);
            } catch (error) {
                throw new Error("error");
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Xóa sản phẩm thành công",
            });
            queryClient.invalidateQueries({
                queryKey: ["product"],
            });
        },
        onError: () => {
            messageApi.open({
                type: "success",
                content: "Xóa sản phẩm thất bại",
            });
        },
    });

    const dataSource = data?.data.map((product: IProduct) => ({
        key: product._id,
        ...product,
    }));

    const exchangeRate = 1;
    const formatCurrency = (price: number) => {
        const priceInVND = price * exchangeRate;
        return priceInVND.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };

    const createFilter = (products: IProduct[]) => {
        return products
            .map((product: IProduct) => product.name)
            .filter(
                (value: string, index: number, self: string[]) =>
                    self.indexOf(value) === index,
            )
            .map((name: string) => ({ text: name, value: name }));
    };

    const columns: TableColumnsType = [
        {
            title: "Tên Sản Phẩm",
            width: 200,
            dataIndex: "name",
            key: "name",
            fixed: "left",
            filterSearch: true,
            filters: data ? createFilter(data?.data) : [],
            onFilter: (value: any, product: IProduct) =>
                product.name.includes(value),
            sorter: (a: IProduct, b: IProduct) => a.name.localeCompare(b.name),
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Giá",
            dataIndex: "price",
            width: 150,
            key: "price",
            className: "text-red-500",
            render: (_: any, product: IProduct) =>
                formatCurrency(product.price),
        },
        {
            title: "Ảnh",
            dataIndex: "gallery",
            key: "gallery",
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
            title: "Hành động",
            key: "operation",
            fixed: "right",
            width: 150,
            render: (_: any, product: IProduct) => {
                return (
                    <div>
                        <Link to={`/admin/${product._id}/edit`}>
                            <Button type="primary" className="mr-2">
                                <AiFillEdit className="text-xl" />
                            </Button>
                        </Link>
                        <Popconfirm
                            onConfirm={() => mutate(product._id)}
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
                );
            },
        },
    ];
    if (isLoading) return (
        <div>
            {" "}
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                imageStyle={{ height: 60 }}
            />
        </div>
    );
    return (
        <div>
            <div className="flex items-center justify-between">
                <h1>Quản lý sản phẩm</h1>
                <Link to={"/admin/add"}>
                    {" "}
                    <Button type="primary">
                        <AiOutlinePlusCircle />
                        Thêm Sản Phẩm
                    </Button>
                </Link>
            </div>
            {contextHolder}

            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={{ pageSize: 50 }}
                expandable={{
                    expandedRowRender: (record) => (
                        <p style={{ margin: 0 }}>Mô tả: {record.description}</p>
                    ),
                }}
            />
        </div>
    );
};

export default ProductPage;