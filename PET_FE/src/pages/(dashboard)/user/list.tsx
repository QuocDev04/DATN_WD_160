/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from "../../../common/types/IUser";
import instance from "@/configs/axios";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, notification, Popconfirm, Table, TableColumnsType } from "antd";
import {  AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const ListUser = () => {
    const [api, contextHolder] = notification.useNotification();
    const queryClient = useQueryClient();
    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: () => instance.get(`/user`),
    });
    const filteredUsers = user?.data.filter((item: IUser) => item.role !== "admin");

    const dataSource = filteredUsers?.map((item: IUser) => ({
        key: item._id,
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
                return await instance.delete(`/user/${id}`);
            } catch (error) {
                throw new Error("error");
            }
        },
        onSuccess: () =>{
            openNotification(false)(
                "success",
                "Bạn Xóa Thành Công",
                "Bạn Đã Xóa Thành Công",
                
            )
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
},
            
        onError: () =>
            openNotification(false)(
                "error",
                "Bạn Xóa Thất Bại",
                "Bạn Đã Xóa Thất Bại",
            ),
    });
    const filterEmail = (items: IUser[]) => {
        return items
            .map((item: IUser) => item.email)
            .filter(
                (value: string, index: number, self: string[]) =>
                    self.indexOf(value) === index,
            )
            .map((name: string) => ({ text: name, value: name }));
    };
    const columns: TableColumnsType = [
        {
            title: "Tên",
            dataIndex: "name",
            width: 150,
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
            title: "Email",
            dataIndex: "email",
            width: 280,
            filterSearch: true,
            // Filter out admin users based on a condition
            filters: user ? filterEmail(user?.data.filter((item: IUser) => item.role !== "admin")) : [],
            onFilter: (value: any, item: IUser) =>
                item.email.includes(value),
            sorter: (a: IUser, b: IUser) => a.email.localeCompare(b.email),
            sortDirections: ["ascend", "descend"],
        },

        {
            title: "Số Điện Thoại",
            dataIndex: "phone",
            width: 200,
        },
        {
            title: "Thành Phố",
            dataIndex: "city",
            width: 200,
        },
        {
            title: "Huyện",
            dataIndex: "district",
            width: 200,
        },
        {
            title: "Xã",
            dataIndex: "commune",
            width: 200,
        },
        {
            title: "Action",
            key: "operation",
            fixed: "right",
            width: 150,
            render: (_: any, item: IUser) => (
                <>
                    <div className="flex gap-3">
                        <Link to={`/admin/user/${item._id}`}>
                            <Button type="primary" className="mr-2">
                                <AiFillEdit className="text-xl" />
                            </Button>
                        </Link>
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
    return (
        <>
            {contextHolder}
            <div className="flex justify-between mb-7">
                <h1 className="text-2xl font-medium">Danh Sách Người Dùng</h1>
            </div>
            <Table
                className="border rounded-lg"
                columns={columns}
                dataSource={dataSource}
                pagination={{ pageSize: 50 }}
                scroll={{ y: 440, x: 1500 }}
            />
        </>
    );
};

export default ListUser;
