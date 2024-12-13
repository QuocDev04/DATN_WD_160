import { Card, Col, Row, Statistic } from 'antd'
import { useQuery } from '@tanstack/react-query'
import instance from '@/configs/axios'
import {
    UserOutlined,
    HomeOutlined,
    DollarCircleOutlined,
    CommentOutlined
} from '@ant-design/icons'

const DashboardPage = () => {
    // Fetch statistics data
    const { data: stats } = useQuery({
        queryKey: ['dashboad'],
        queryFn: () => instance.get('/dashboad')
    })
    console.log(stats?.data);
    
    const statistics = [
        {
            title: 'Tổng số người dùng',
            value: stats?.data?.totalUsers || 0,
            icon: <UserOutlined className="text-blue-500 text-2xl" />,
            color: 'blue'
        },
        {
            title: 'Số phòng đã đặt thành công',
            value: stats?.data?.totalcompletedRooms || 0,
            icon: <HomeOutlined className="text-green-500 text-2xl" />,
            color: 'green'
        },
        {
            title: 'Tổng số phòng đã hủy',
            value: stats?.data?.totalCancelledRooms || 0,
            icon: <HomeOutlined className="text-green-500 text-2xl" />,
            color: 'green'
        },
        {
            title: 'Tổng Danh Thu',
            value: stats?.data?.totalPrice ? `${stats.data.totalPrice.toLocaleString()} VND` : '0 VND',
            icon: <DollarCircleOutlined className="text-purple-600 text-3xl" />,
            color: 'purple'
        }
    ]
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Thống kê tổng quan</h1>
            <Row gutter={[16, 16]}>
                {statistics.map((stat, index) => (
                    <Col xs={24} sm={12} lg={6} key={index}>
                        <Card 
                            hoverable 
                            className="h-full"
                            bodyStyle={{ padding: '24px' }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-full bg-${stat.color}-100 flex items-center justify-center`}>
                                    {stat.icon}
                                </div>
                            </div>
                            <Statistic
                                title={<span className="text-gray-600">{stat.title}</span>}
                                value={stat.value}
                                valueStyle={{ 
                                    color: `var(--ant-${stat.color}-6)`,
                                    fontSize: '24px',
                                    fontWeight: 'bold'
                                }}
                            />
                            <div className="mt-2">
                                <span className="text-sm text-gray-500">
                                    Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
                                </span>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default DashboardPage