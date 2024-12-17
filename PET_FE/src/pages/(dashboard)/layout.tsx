import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
    DashboardOutlined,
    ShoppingOutlined,
    UserOutlined,
    CustomerServiceOutlined,
    HomeOutlined,
    FileTextOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    BellOutlined,
    SearchOutlined,
    SettingOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, Input, Badge, Avatar, Dropdown, theme, MenuProps } from 'antd';

const { Header, Sider, Content } = Layout;

const LayoutAdmin: React.FC = () => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string>("Dashboard");
    const { token } = theme.useToken();

    // Update active menu based on the current location
    useEffect(() => {
        const path = location.pathname;
        if (path.includes("/admin/product")) {
            setActiveMenu("List");
        } else if (path.includes("/admin/user")) {
            setActiveMenu("User");
        } else if (path.includes("/admin/service")) {
            setActiveMenu("Service");
        } else if (path.includes("/admin/room")) {
            setActiveMenu("Room")
        } else if (path.includes("/admin/category")) {
            setActiveMenu("Category")
        } else if (path.includes("/admin/bill")) {
            setActiveMenu("Bill")
        } else if (path.includes("/admin/article")) {
            setActiveMenu("Article")
        }
        else if (path.includes("/admin/evaluate")) {
            setActiveMenu("Evaluate")
        }
        else {
            setActiveMenu("Dashboard");
        }
    }, [location]);

    const menuItems = [
        {
            key: 'Dashboard',
            icon: <DashboardOutlined className="text-lg" />,
            label: <Link to="/admin/dashboard" className="text-base">Quản Lý Thống Kê</Link>,
        },
        {
            type: 'divider',
            dashed: true
        },
        {
            key: 'List',
            icon: <ShoppingOutlined className="text-lg" />,
            label: <Link to="/admin/product" className="text-base">Quản Lý Sản Phẩm</Link>,
        },
        {
            key: 'User',
            icon: <UserOutlined className="text-lg" />,
            label: <Link to="/admin/user" className="text-base">Quản Lý Người Dùng</Link>,
        },
        {
            key: 'Service',
            icon: <CustomerServiceOutlined className="text-lg" />,
            label: <Link to="/admin/service" className="text-base">Quản Lý Dịch Vụ</Link>,
        },
        {
            key: 'Room',
            icon: <HomeOutlined className="text-lg" />,
            label: <Link to="/admin/room" className="text-base">Quản Lý Phòng</Link>,
        },
        {
            type: 'divider',
            dashed: true
        },
        {
            key: 'Bill',
            icon: <FileTextOutlined className="text-lg" />,
            label: <Link to="/admin/bill" className="text-base">Quản Lý Đặt Phòng</Link>,
        },
        {
            key: 'Article',
            icon: <FileTextOutlined className="text-lg" />,
            label: <Link to="/admin/article" className="text-base">Quản Lý Bài Viết</Link>,
        },
        {
            key: 'Evaluate',
            icon: <FileTextOutlined className="text-lg" />,
            label: <Link to="/admin/evaluate" className="text-base">Quản Lý Bình Luận</Link>,
        },
    ] as MenuProps['items'];

    const userMenu = (
        <Menu className="w-48 p-2">
            <div className="px-4 py-3">
                <p className="text-sm text-gray-600">Đăng nhập với</p>
                <p className="text-sm font-medium text-gray-900">admin@example.com</p>
            </div>
            <Menu.Divider />
            <Menu.Item key="profile" icon={<UserOutlined className="text-gray-600" />}>
                Thông tin cá nhân
            </Menu.Item>
            <Menu.Item key="settings" icon={<SettingOutlined className="text-gray-600" />}>
                Cài đặt
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout" icon={<LogoutOutlined />} className="text-red-500">
                Đăng xuất
            </Menu.Item>
        </Menu>
    );

    return (
        <Layout className="min-h-screen">
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                className="shadow-lg fixed left-0 h-screen"
                style={{
                    background: token.colorBgContainer,
                    borderRight: `1px solid ${token.colorBorderSecondary}`,
                    position: 'fixed',
                    zIndex: 999
                }}
                width={280}
            >
                <div className="h-16 flex items-center justify-center border-b border-gray-100">
                    <Link to="/admin/dashboard" className="flex items-center gap-3">
                        <img src="/logo.png" alt="Logo" className="h-10 w-10" />
                        {!collapsed && (
                            <span className="text-xl font-bold bg-gradient-to-r from-[#8B4513] to-[#D2691E] bg-clip-text text-transparent">
                                Pet Hotel Admin
                            </span>
                        )}
                    </Link>
                </div>

                <div className="flex flex-col h-[calc(100vh-4rem)]">
                    <Menu
                        mode="inline"
                        selectedKeys={[activeMenu]}
                        items={menuItems}
                        className="border-r-0 py-4"
                        style={{
                            height: 'calc(100vh - 4rem - 72px)', // Trừ đi chiều cao của header và profile
                            position: 'fixed',
                            width: collapsed ? '80px' : '280px',
                            overflow: 'hidden',
                            overflowY: 'auto'
                        }}
                    />

                    <div className="p-4 border-t border-gray-100 fixed bottom-0 bg-white"
                        style={{
                            width: collapsed ? '80px' : '280px'
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <Avatar
                                size={40}
                                icon={<UserOutlined />}
                                className="bg-gradient-to-r from-[#8B4513] to-[#D2691E] text-white flex items-center justify-center"
                            />
                            {!collapsed && (
                                <div>
                                    <p className="font-medium">Admin User</p>
                                    <p className="text-xs text-gray-500">Super Admin</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Sider>

            <Layout style={{ marginLeft: collapsed ? '80px' : '280px' }}>
                <Header
                    className="p-0 bg-white border-b border-gray-100 fixed top-0 right-0 z-10"
                    style={{
                        width: `calc(100% - ${collapsed ? 80 : 280}px)`,
                    }}
                >
                    <div className="flex justify-between items-center h-16 px-6">
                        <div className="flex items-center gap-6">
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                className="text-lg hover:bg-gray-50"
                            />
                            <Input
                                prefix={<SearchOutlined className="text-gray-400" />}
                                placeholder="Tìm kiếm..."
                                className="w-80"
                                bordered={false}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <Badge count={3}>
                                <Button
                                    type="text"
                                    icon={<BellOutlined />}
                                    className="flex items-center justify-center w-10 h-10 hover:bg-gray-50 rounded-full text-xl text-gray-600"
                                />
                            </Badge>

                            <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
                                <Button
                                    type="text"
                                    className="flex items-center gap-2 hover:bg-gray-50 h-10 px-3 rounded-full"
                                >
                                    <UserOutlined className="text-xl text-gray-600" />
                                    <span className="text-gray-700">Admin</span>
                                </Button>
                            </Dropdown>
                        </div>
                    </div>
                </Header>

                <Content
                    className="m-6"
                    style={{
                        marginTop: '80px', // Tăng margin-top để tránh bị header che
                        minHeight: 'calc(100vh - 112px)', // 112px = 64px (header) + 2 * 24px (margin)
                        padding: '24px',
                        background: token.colorBgContainer,
                    }}
                >
                    <div className="min-h-[280px] p-6 bg-white rounded-xl shadow-sm">
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutAdmin;