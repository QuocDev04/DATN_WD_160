import { IService } from "@/common/types/IService";
import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, notification, Popconfirm, Table, TableColumnsType } from "antd";
import { AiFillEdit, AiOutlinePlusCircle, AiTwotoneDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { QuestionCircleOutlined } from "@ant-design/icons";

const ListService = () => {
    const [api, contextHolder] = notification.useNotification();
    const queryClient = useQueryClient();
    const { data: service } = useQuery({
        queryKey: ['service'],
        queryFn: () => instance.get('/service')
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
    const { mutate } = useMutation({
        mutationFn: async (id: string) => {
            try {
                return await instance.delete(`service/${id}`)
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
                queryKey: ["service"],
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
            title: 'Tên Dịch Vụ',
            dataIndex: 'servicesName',
            key: 'servicesName',
            width: 250,
        },
        {
            title: 'Giá',
            dataIndex: 'priceService',
            key: 'priceService',
            width: 250,
        },
        {
            title: 'Ảnh',
            dataIndex: 'galleryService',
            key: 'galleryService',
            width: 250,
        },
        {
            title: 'Mô Tả',
            dataIndex: 'descriptionService',
            key: 'descriptionService',
        },
        {      
            title: 'Hành Động',
            fixed: "right",
            width: 150,
            render: (_: any, service: IService) => {
                return (
                    <div>
                        <Link to={`/admin/${service._id}/serviceEdit`}>
                            <Button type="primary" className="mr-2">
                                <AiFillEdit className="text-xl" />
                            </Button>
                        </Link>
                        <Popconfirm
                            onConfirm={() => mutate(service._id)}
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
        }
    ];
    const dataSourcee = service?.data.map((service: IService) => ({
        key: service._id,
        ...service
    }))
    return (
        <>
            <div className="flex items-center justify-between mb-5">
                <h1>Quản lý dịch vụ</h1>
                <Link to={"/admin/serviceAdd"}>
                    {" "}
                    <Button type="primary">
                        <AiOutlinePlusCircle />
                        Thêm Dịch Vụ 
                    </Button>
                </Link>
            </div>
            {contextHolder}
            <Table dataSource={dataSourcee} columns={columns} />
        </>
    )
}
export default ListService