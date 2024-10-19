import { ICategory } from "@/common/type/ICategory";
import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, notification, Popconfirm, Table, TableColumnsType } from "antd";
import { AiFillEdit, AiOutlinePlusCircle, AiTwotoneDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { QuestionCircleOutlined } from "@ant-design/icons";

const CategoryList = () => {
    const {data} = useQuery({
        queryKey:['category'],
        queryFn: () => instance.get("/category")
    })
    const [api, contextHolder] = notification.useNotification();

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
                return await instance.delete(`/category/${id}`);
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
                queryKey: ["category"],
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
            title: 'Tên Danh Mục',
            dataIndex: 'title',
            key: 'title',
            width: 150,
        },
        {
            title: 'Hành Động',
            dataIndex: 'roomdescription',
            key: 'roomdescription',
            fixed: "right",
            width: 150,
            render: (_: any, room: ICategory) => {
                return (
                    <div>
                        <Link to={`/admin/edit/${room._id}`}>
                            <Button type="primary" className="mr-2">
                                <AiFillEdit className="text-xl" />
                            </Button>
                        </Link>
                        <Popconfirm
                            onConfirm={() => mutate(room._id)}
                            title="Xóa Sản Phẩm"
                            description="Bạn có chắc chắn muốn xóa không?"
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
    const dataSource = data?.data.map((category:ICategory)=>({
        key:category._id,
        ...category
    }))
    return (
        <>
            {contextHolder}
            <div className="flex items-center justify-between mb-5">
                <h1>Quản lý Danh Mục</h1>
                <Link to={"/admin/categoryadd"}>
                    {" "}
                    <Button type="primary">
                        <AiOutlinePlusCircle />
                        Thêm Category
                    </Button>
                </Link>
            </div>
            <Table dataSource={dataSource} columns={columns} />;
        </>
    )
}
export default CategoryList