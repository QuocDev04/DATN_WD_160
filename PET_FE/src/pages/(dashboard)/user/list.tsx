/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from "../../../common/types/IUser";
import instance from "@/configs/axios";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { notification, Popconfirm, Table, TableColumnsType } from "antd";
import { AiFillDelete, AiTwotoneTool } from "react-icons/ai";
import { Link } from "react-router-dom";

const ListUser = () => {
    const [api, contextHolder] = notification.useNotification();

    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: () => instance.get(`/user`),
    });
    console.log(user);
    const dataSource = user?.data.map((item: IUser) => ({
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
        onSuccess: () =>
            openNotification(false)(
                "success",
                "Bạn Xóa Thành Công",
                "Bạn Đã Xóa Thành Công",
            ),
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
            filters: user ? filterEmail(user?.data) : [],
            onFilter: (value: any, item: IUser) =>
                item.email.includes(value),
            sorter: (a: IUser, b: IUser) => a.name.localeCompare(b.email),
            sortDirections: ["ascend", "descend"],
        },
        // {
        //     title: "Mật Khẩu",
        //     dataIndex: "password",
        //     width: 280,
        //     render: (password: string) => <span>{password}</span>,
        // },
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
            width: 100,
            render: (_: any, item: IUser) => (
                <>
                    <div className="flex gap-4">
                        <Link to={`/admin/user/${item._id}`}>
                            <AiTwotoneTool className="size-6" />
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
                            <AiFillDelete className="size-6 text-red-600" />
                        </Popconfirm>
                    </div>
                </>
            ),
        },
    ];
    return (
        <>
            {contextHolder}
            <div className="flex justify-between m-5">
                <h1 className="text-2xl font-medium">Danh Sách Người Dùng</h1>
            </div>
            <Table
                className="border rounded-lg"
                columns={columns}
                dataSource={dataSource}
                pagination={{ pageSize: 50 }}
                scroll={{ y: 240, x: 1500 }}
            />
        </>
    );
};

export default ListUser;
