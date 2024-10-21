import React from "react";
import { Form, Input, Button, Radio } from "antd";
import "../styles/Signup.css";
import cat from "../images/cat.png";
import dog from "../images/dog.png";

const Signup = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="signup-wrapper">
      <h1 className="title">PET HOTEL</h1>
      <div className="signup-container">
        <div className="image-container left">
          <img src={cat} alt="Cat" className="side-image" />
        </div>
        <div className="form-container">
          <Form
            name="signup"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <h2 className="form-title">Tạo tài khoản mới</h2>
            <p>Nhanh chóng và dễ dàng</p>

            <Form.Item
              label="Họ và Tên"
              name="fullname"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Giới tính"
              name="gender"
              rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
            >
              <Radio.Group>
                <Radio value="male">Nam</Radio>
                <Radio value="female">Nữ</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Xác nhận mật khẩu"
              name="passwordConfirmation"
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu!" },
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
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="submit-button"
              >
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="image-container right">
          <img src={dog} alt="Dog" className="side-image" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
