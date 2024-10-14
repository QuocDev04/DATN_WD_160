import React from "react";
import { Layout, Menu, Form, Input, Button, Checkbox } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import "../styles/Signin.css";
import Logo from "../images/logo.png";
import { GoogleOutlined, AppleOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

const SignIn = () => {
  return (
    <Layout>
      {/* Header */}
      <Header style={{ backgroundColor: "#F6F0E2", padding: 0 }}>
        <div className="header-content">
          <img src={Logo} alt="logo" className="logo" />
          <span className="hotline">HOTLINE: 0123456789</span>
          <Input.Search placeholder="Tìm kiếm" className="search-bar" />
          <HomeOutlined className="home-icon" />
        </div>

        {/* Menu */}
        <Menu
          mode="horizontal"
          theme="light"
          className="menu"
          style={{
            width: "100%",
            backgroundColor: "#F6F0E2",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Menu.Item key="1" className="menu-item">
            HOME
          </Menu.Item>
          <Menu.Item key="2" className="menu-item">
            GIỚI THIỆU SẢN PHẨM
          </Menu.Item>
          <Menu.Item key="3" className="menu-item">
            TẠP CHÍ THÚ CƯNG
          </Menu.Item>
          <Menu.Item key="4" className="menu-item">
            ĐẶT PHÒNG
          </Menu.Item>
          <Menu.Item key="5" className="menu-item">
            LIÊN HỆ
          </Menu.Item>
          <Menu.Item key="6" className="menu-item">
            GIỚI THIỆU VỀ SHOP
          </Menu.Item>
        </Menu>
      </Header>

      {/* Content */}
      <Content style={{ padding: "20px" }}>
        <div className="login-content">
          <h2>Đăng nhập ngay</h2>
          <Form
            layout="vertical"
            className="login-form"
            onFinish={(values) => console.log(values)}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password placeholder="Mật khẩu" />
            </Form.Item>

            <div
              className="remember-forgot"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Form.Item valuePropName="checked" noStyle>
                <Checkbox>Nhớ mật khẩu</Checkbox>
              </Form.Item>
              <span
                className="forgot-password"
                style={{
                  cursor: "pointer",
                  color: "#007bff",
                }}
              >
                Quên mật khẩu?
              </span>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#FF0202", borderColor: "#FF0202" }}
            >
              Đăng nhập
            </Button>

            <div className="login-link">
              <span
                style={{ cursor: "pointer", color: "#007bff" }}
                onClick={() => (window.location.href = "/signup")}
              >
                Bạn chưa có tài khoản? Đăng ký ngay
              </span>
            </div>

            {/* Đăng nhập với Google và Apple nằm trong form */}
            <div
              className="social-login"
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button icon={<GoogleOutlined />} style={{ margin: "10px" }}>
                Google
              </Button>
              <Button icon={<AppleOutlined />} style={{ margin: "10px" }}>
                Apple
              </Button>
            </div>
          </Form>
        </div>
      </Content>

      {/* Footer */}
      <Footer style={{ backgroundColor: "#8B4D02", color: "white" }}>
        Pet Hotel ©2024 Created by Your Team
      </Footer>
    </Layout>
  );
};

export default SignIn;
