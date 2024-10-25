import React from "react";
import {
    DesktopOutlined,
    PieChartOutlined,
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
        getItem(<NavLink to={"/admin/product"}>Danh sách</NavLink>, "2-1"),
        getItem(<NavLink to={"/admin/add"}>Thêm Sản Phẩm</NavLink>, "2-2"),
    ]),
    getItem("Danh mục", "3", <DesktopOutlined />, [
        getItem(<NavLink to={"/admin/category"}>Danh sách</NavLink>, "3-1"),
        getItem(
            <NavLink to={"/admin/addCategory"}>Thêm danh mục</NavLink>,
            "3-2",
        ),
    ]),
    getItem("Người dùng", "4", <UserOutlined />, [
        getItem(
            <NavLink to={"/admin/user"}>Danh Sách</NavLink>,
            "4-1",
        ),
    ]),
];

const LayoutAdmin: React.FC = () => {
    // const navigate = useNavigate()
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    // const token = localStorage.getItem("token")
    // const role = localStorage.getItem("role");
    // useEffect(()=>{
    //     if(!token){
    //         navigate('/login')
    //     }else if(role !== "admin"){
    //         navigate("/unauthorized");
    //     }
    // },[token,role,navigate])
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
