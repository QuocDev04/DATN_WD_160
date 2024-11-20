import { Tabs, TabsProps } from "antd";
import Pending from "./_component/pennding";
import Confirmed from "./_component/confirmed";
import Cancelled from "./_component/cancelled";
const onChange = (key: string) => {
    console.log(key);
};
const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Chờ Xác Nhận',
        children:(<Pending/>),
    },
    {
        key: '2',
        label: 'Đã Xác Nhận',
        children: (<Confirmed/>),
    },
    {
        key: '3',
        label: 'Đã hủy',
        children: (<Cancelled/>),
    },
];
const PagesBillRoom = () => {
   
    return (
        <>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </>
    )
}
export default PagesBillRoom