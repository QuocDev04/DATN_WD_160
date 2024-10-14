import React from "react";
import { Layout, Menu, Form, Input, Button, message } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";
import Logo from "../images/logo.png";

const { Header, Content, Footer } = Layout;

const SignUp = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log(values);
    // Hiển thị thông báo thành công
    message.success("Đăng ký thành công!");

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

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
        <div className="register-content">
          <h2>Tạo tài khoản</h2>
          <Form layout="vertical" className="register-form" onFinish={onFinish}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Item
                name="firstName"
                rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                style={{ width: "48%" }}
              >
                <Input placeholder="Tên..." />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[{ required: true, message: "Vui lòng nhập họ!" }]}
                style={{ width: "48%" }}
              >
                <Input placeholder="Họ..." />
              </Form.Item>
            </div>

            <Form.Item
              name="username"
              rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}
            >
              <Input placeholder="Tài khoản" />
            </Form.Item>

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

            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: "Vui lòng nhập lại mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu không khớp!"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Nhập lại mật khẩu" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#FF0202", borderColor: "#FF0202" }}
            >
              Đăng ký ngay
            </Button>

            <div className="signin-link">
              <span
                style={{ cursor: "pointer", color: "#007bff" }}
                onClick={() => (window.location.href = "/login")}
              >
                Bạn đã có tài khoản? Signin
              </span>
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

export default SignUp;
