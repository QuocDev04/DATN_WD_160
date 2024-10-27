import { IRoom } from "@/common/IRoom";
import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";

const ListRoom = () => {
    const {data} = useQuery({
        queryKey:['room'],
        queryFn: () => instance.get('/room')
    })
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];
    const dataSource = data?.data.map((room:IRoom)=>({
        key:room._id,
        ...room
    }) )
    return (
        <>
            <Table dataSource={dataSource} columns={columns} />;
        </>
    )
}
export default ListRoom