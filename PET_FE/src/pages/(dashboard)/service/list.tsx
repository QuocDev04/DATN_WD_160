import { IService } from "@/common/types/IService";
import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { Button, Empty, Popconfirm, Table, TableColumnsType } from "antd";
import { AiFillEdit, AiOutlinePlusCircle, AiTwotoneDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { QuestionCircleOutlined } from "@ant-design/icons";

const ListService = () => {
    const {data, isLoading} = useQuery({
        queryKey:['service'],
        queryFn:() =>instance.get('/service')
    })
    const columns: TableColumnsType = [
        {
            title: 'Tên Dịch Vụ',
            width: 200,
            dataIndex: 'servicesName',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Giá',
            width: 200,
            dataIndex: 'price',
            key: 'age',
        },
        { title: 'Ảnh', dataIndex: 'gallery', key: "gallery",
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
        { title: 'Mô tả', dataIndex: 'description'},
        {
            title: 'Hành động',
            key: 'operation',
            fixed: 'right',
            width: 150,
            render: () =>  <div>
            <Link to={``}>
                <Button type="primary" className="mr-2">
                    <AiFillEdit className="text-xl" />
                </Button>
            </Link>
            <Popconfirm
                // onConfirm={() => mutate(product._id)}
                title="Xóa dịch vụ"
                description="Bạn có chắc chắn muốn xóa dịch vụ này không?"
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
        </div>,
        },
    ];
    const dataSource = data?.data.map((service:IService)=>({
        key:service._id,
        ...service
    }))
    if(isLoading) return (
        <div>
        {" "}
        <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{ height: 60 }}
        />
    </div>
    )
    return (
        <>
         <div className="flex items-center justify-between mb-5">
                <h1>Quản Lý Dịch Vụ</h1>
                <Link to={"/admin/serviceAdd"}>
                    {" "}
                    <Button type="primary">
                        <AiOutlinePlusCircle />
                        Thêm Dịch Vụ
                    </Button>
                </Link>
            </div>
            <Table
                pagination={false}
                columns={columns}
                dataSource={dataSource}
                scroll={{ x: 'max-content' }}
            />
        </>
    )
}
export default ListService