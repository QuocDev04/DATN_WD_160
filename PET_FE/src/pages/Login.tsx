import React from "react";
import { Form, Input, Button, Typography } from "antd";
import "../styles/Signin.css";
import cat from "../images/cat.png";
import dog from "../images/dog.png";

const { Title } = Typography;

const SignIn = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="signin-wrapper">
      <h1 className="title">PET HOTEL</h1>
      <div className="signin-container">
        <div className="image-container">
          <img src={cat} alt="Cat" className="side-image" />
        </div>
        <div className="form-container">
          <Title level={4} className="form-title">
            Đăng nhập Pet hotel
          </Title>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email hoặc số điện thoại!",
                },
              ]}
            >
              <Input
                placeholder="Email hoặc số điện thoại"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password
                placeholder="Mật khẩu"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="submit-button"
              >
                Đăng nhập
              </Button>
            </Form.Item>

            <Form.Item>
              <p style={{ textAlign: "center" }}>
                Bạn quên tài khoản? <a href="/signup">Đăng ký Pet hotel</a>
              </p>
            </Form.Item>
          </Form>
        </div>
        <div className="image-container">
          <img
            src={dog}
            alt="Dog"
            className="side-image"
            style={{ marginRight: "-20px" }}
          />{" "}
          {/* Lùi hình chó về bên phải */}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
