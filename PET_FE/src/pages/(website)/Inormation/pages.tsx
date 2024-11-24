import { Tabs, TabsProps } from "antd"
import BillBooking from "./_component/bill"
import InormationUser from "./_component/InormatinonUser";

const Inormation = () => {
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Thông tin của tôi',
            children: (<InormationUser/>),
        },
        {
            key: '2',
            label: 'Thông tin phòng đã đặt',
            children: (<BillBooking/>),
        }
    ];
    return (
     
                    <Tabs
                        defaultActiveKey="1"
                        items={items}
                        type="card"
                        className="px-4 overflow-y-auto"
                    />
              
    )
}
export default Inormation