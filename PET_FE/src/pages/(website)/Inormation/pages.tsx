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
        <div className="container mx-auto max-w-[1440px] mb-96 p-4 pt-14 md:p-8 ">
            <div className="mx-auto max-w-[1200px] rounded-md bg-white border border-black">
                <div className="flex items-center justify-between">
                    <Tabs
                        defaultActiveKey="1"
                        items={items}
                        type="card"
                        className="px-4 overflow-y-auto"
                    />
                </div>
            </div>
        </div>
    )
}
export default Inormation