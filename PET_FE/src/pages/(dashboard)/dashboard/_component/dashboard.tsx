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
        queryKey: ['dashboard-stats'],
        queryFn: () => instance.get('/statistics')
    })

    const statistics = [
        {
            title: 'Tổng số người dùng',
            value: stats?.data?.totalUsers || 0,
            icon: <UserOutlined className="text-blue-500 text-2xl" />,
            color: 'blue'
        },
        {
            title: 'Tổng số phòng',
            value: stats?.data?.totalRooms || 0,
            icon: <HomeOutlined className="text-green-500 text-2xl" />,
            color: 'green'
        },
        {
            title: 'Doanh thu',
            value: stats?.data?.totalRevenue || 0,
            prefix: '₫',
            icon: <DollarCircleOutlined className="text-red-500 text-2xl" />,
            color: 'red'
        },
        {
            title: 'Tổng bình luận',
            value: stats?.data?.totalComments || 0,
            icon: <CommentOutlined className="text-purple-500 text-2xl" />,
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
                                prefix={stat.prefix}
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

            {/* Recent Activity Section */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Hoạt động gần đây</h2>
                <Row gutter={[16, 16]}>
                    <Col xs={24} lg={12}>
                        <Card title="Phòng mới đăng" className="h-full">
                            {stats?.data?.recentRooms?.map((room: any) => (
                                <div key={room.id} className="py-2 border-b last:border-0">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">{room.name}</span>
                                        <span className="text-gray-500 text-sm">
                                            {new Date(room.createdAt).toLocaleDateString('vi-VN')}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Giá: {room.price}₫/tháng
                                    </div>
                                </div>
                            ))}
                        </Card>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Card title="Bình luận mới" className="h-full">
                            {stats?.data?.recentComments?.map((comment: any) => (
                                <div key={comment.id} className="py-2 border-b last:border-0">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">{comment.User?.name}</span>
                                        <span className="text-gray-500 text-sm">
                                            {new Date(comment.createdAt).toLocaleDateString('vi-VN')}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {comment.description}
                                    </div>
                                </div>
                            ))}
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default DashboardPage