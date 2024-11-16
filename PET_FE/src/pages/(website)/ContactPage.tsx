import React from "react";
import { Form, Input, Button } from "antd";
import "antd/dist/reset.css";

const ContactPage = () => {
  const onFinish = (values: any) => {
    console.log("Submitted:", values);
    alert("Gửi liên hệ thành công! Chúng tôi sẽ phản hồi sớm.");
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 py-8 px-4">
      {/* Maps and Form */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Contact Form */}
        <div className="bg-amber-50 p-6 rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-4 text-orange-700">
            Liên hệ với chúng tôi:
          </h2>
          <Form
            layout="vertical"
            onFinish={onFinish}
            className="space-y-4"
            autoComplete="off"
          >
            <Form.Item
              label="Họ và tên"
              name="fullName"
              rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
            >
              <Input placeholder="Họ và tên" className="border-orange-500" />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
              ]}
            >
              <Input
                placeholder="Số điện thoại"
                className="border-orange-500"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input placeholder="Email" className="border-orange-500" />
            </Form.Item>

            <Form.Item
              label="Nội dung"
              name="message"
              rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
            >
              <Input.TextArea
                placeholder="Nhập nội dung cần thắc mắc"
                className="border-orange-500"
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              className="bg-orange-500 text-white hover:bg-orange-600"
            >
              Gửi liên hệ
            </Button>
          </Form>
        </div>

        {/* Google Map */}
        <div className="bg-amber-50 p-6 rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-4 text-orange-700">Bản đồ:</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.613765270256!2d105.77227917508085!3d21.029249880620185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b175108ff7%3A0x2f105faa3d0a4f8d!2zNzAgxJAuIE3hu7kgxJDDrG5oLCBN4bu5IMSQw6xuaCwgTmFtIFThu6sgTGnDqm0sIEjDoCBO4buZaSAxMDAwMDAsIFZp4buHdCBOYW0!5e1!3m2!1svi!2s!4v1731736844360!5m2!1svi!2s"
            className="w-full h-64 border-0 rounded-md"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>
      </div>

      {/* Header */}
      <div className="w-full max-w-6xl bg-amber-50 p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-orange-700">
          Liên hệ với PET HOTEL
        </h1>
        <ul className="mt-4 space-y-4 text-gray-700">
          <li>🏠 ĐỊA CHỈ: 70 MỸ ĐÌNH, NAM TỪ LIÊM, HÀ NỘI</li>
          <li>📞 HOTLINE: 0866027491</li>
          <li>📧 Email: supportpethotel@gmail.com</li>
        </ul>
      </div>
    </div>
  );
};

export default ContactPage;
