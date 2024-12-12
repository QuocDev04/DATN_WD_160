import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, notification, Popconfirm, Table, TableColumnsType } from "antd";
import { AiFillEdit, AiOutlinePlusCircle, AiTwotoneDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { QuestionCircleOutlined } from "@ant-design/icons";

const ArticleList = () => {
    const { data } = useQuery({
        queryKey: ['article'],
        queryFn: () => instance.get("/article")
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
                return await instance.delete(`/article/${id}`);
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
                queryKey: ["article"],
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
            title: 'Tên Bài Viết',
            dataIndex: 'TitleArticle',
            key: 'TitleArticle',
            width: 150,
        },
        {
            title: 'Ảnh Bài Viết',
            dataIndex: 'imgArticle',
            key: 'imgArticle',
            width: 150,
            render: (img: string) => (
                <img src={img} alt="Ảnh Bài Viết" style={{ width: "100px", height: "auto" }} />
            )
        },
        {
            title: 'Mô Tả Bài Viết',
            dataIndex: 'DescriptionArticle',
            key: 'DescriptionArticle',
            width: 150,
        },
        {
            title: 'Hành Động',
            fixed: "right",
            width: 150,
            render: (_: any, category: any) => {
                return (
                    <div>
                        <Link to={`/admin/article/${category._id}`}>
                            <Button type="primary" className="mr-2">
                                <AiFillEdit className="text-xl" />
                            </Button>
                        </Link>
                        <Popconfirm
                            onConfirm={() => mutate(category._id)}
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
    const dataSource = data?.data.map((article: any) => ({
        key: article._id,
        ...article
    }))
    return (
        <>
            {contextHolder}
            <div className="flex items-center justify-between mb-5">
                <h1>Quản lý Bài Viết</h1>
                <Link to={"/admin/articleadd"}>
                    {" "}
                    <Button type="primary">
                        <AiOutlinePlusCircle />
                        Thêm Bài Viết
                    </Button>
                </Link>
            </div>
            <Table dataSource={dataSource} columns={columns} />
        </>
    )
}
export default ArticleList