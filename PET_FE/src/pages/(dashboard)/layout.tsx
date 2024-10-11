import React from "react";
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";

import { Layout, Menu, theme } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { MenuProps } from "rc-menu";

const { Header, Content, Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}
const items: MenuItem[] = [
    getItem(
        <NavLink to={"/admin"}>Thống kê</NavLink>,
        "1",
        <PieChartOutlined />,
    ),
    getItem("Sản phẩm", "2", <DesktopOutlined />, [
        getItem(<NavLink to={"/admin"}>Danh sách</NavLink>, "2-1"),
        getItem(<NavLink to={"/admin"}>Thêm Sản Phẩm</NavLink>, "2-2"),
    ]),
    getItem("Danh mục", "3", <DesktopOutlined />, [
        getItem(<NavLink to={"/admin"}>Danh sách</NavLink>, "3-1"),
        getItem(
            <NavLink to={"/admin"}>Thêm danh mục</NavLink>,
            "3-2",
        ),
    ]),
    getItem("Người dùng", "4", <UserOutlined />, [
        getItem(
            <NavLink to={"/admin"}>Danh Sách</NavLink>,
            "4-1",
        ),
    ]),
    getItem("Team", "sub2", <TeamOutlined />, [
        getItem("Team 1", "6"),
        getItem("Team 2", "8"),
    ]),
    getItem("Files", "9", <FileOutlined />),
];

const LayoutAdmin: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout hasSider>
            <Sider
                style={{
                    overflow: "auto",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["4"]}
                    items={items}
                />
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
                    <div
                        style={{
                            padding: 24,
                            textAlign: "left",
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>

            </Layout>
        </Layout>
    );
};

export default LayoutAdmin;
