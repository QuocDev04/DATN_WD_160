import React, { useState } from "react";
import { Layout, Menu, Avatar, Badge } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  BellOutlined,
} from "@ant-design/icons";
import logo from "../../images/logo.png"; 
const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");

  const handleMenuClick = (key: any) => {
    setSelectedKey(key);
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#F9F9F9" }}>
      <Header
        style={{
          backgroundColor: "#F6A623",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ height: "40px", marginRight: "20px" }}
        />
        <h1
          style={{
            margin: 0,
            color: "white",
            fontSize: "24px",
            fontFamily: "'Comic Sans MS', cursive, sans-serif",
          }}
        >
          Quản lý Admin
        </h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Badge count={5} style={{ marginRight: "15px" }}>
            <BellOutlined style={{ fontSize: "20px", color: "white" }} />
          </Badge>
          <Avatar icon={<UserOutlined />} />
        </div>
      </Header>
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={({ key }) => handleMenuClick(key)}
            style={{
              backgroundColor: "#8B4D02",
              border: "none",
              borderRadius: "5px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <Menu.SubMenu
              key="sub1"
              title="Quản lý sản phẩm"
              icon={<ShoppingCartOutlined />}
            >
              <Menu.Item key="1" style={{ fontWeight: "normal" }}>
                Danh sách sản phẩm
              </Menu.Item>
              <Menu.Item key="2" style={{ fontWeight: "normal" }}>
                Thêm sản phẩm
              </Menu.Item>
              <Menu.Item key="3" style={{ fontWeight: "normal" }}>
                Cập nhật sản phẩm
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="sub2"
              title="Quản lý danh mục"
              icon={<UserOutlined />}
            >
              <Menu.Item key="4" style={{ fontWeight: "normal" }}>
                Danh sách danh mục
              </Menu.Item>
              <Menu.Item key="5" style={{ fontWeight: "normal" }}>
                Thêm danh mục
              </Menu.Item>
              <Menu.Item key="6" style={{ fontWeight: "normal" }}>
                Cập nhật danh mục
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: "20px" }}>
          <Content
            style={{
              backgroundColor: "#ffffff",
              padding: 20,
              margin: 0,
              minHeight: 280,
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            {/* Nội dung chính ở đây */}
            <h2
              style={{
                color: "#8B4D02",
                fontFamily: "'Comic Sans MS', cursive, sans-serif",
              }}
            >
              Chào mừng bạn đến với trang quản lý Admin!
            </h2>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
