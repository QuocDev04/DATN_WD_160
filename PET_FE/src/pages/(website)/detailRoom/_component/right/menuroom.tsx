import { Tabs, TabsProps } from "antd";
import CmtRoom from "./cmtRoom";
const MenuRoom = () => {

    const onChange = (key: string) => {
        console.log(key);
    };
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Mô Tả',
            children: (
                <CmtRoom/>
            ),
        },
        {
            key: '2',
            label: 'Bình Luận',
            children: 'Content of Tab Pane 2',
        }
    ];
    return (
        <>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </>
    )
}
export default MenuRoom;