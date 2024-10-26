import { Form, Input, Button, Row, Col, Typography, message } from "antd";
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";
const { Title, Paragraph } = Typography;
const ContactPage = () => {
    const [form] = Form.useForm();
    const onFinish = () => {
        message.success("Cảm ơn bạn đã liên hệ với chúng tôi! Chúng tôi sẽ phản hồi sớm.");
        form.resetFields();
    };
    return (
        <div className="max-w-screen-xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <Title level={2} className="text-center text-[#8b4d02]">Liên hệ với chúng tôi</Title>
            <Paragraph className="text-center mb-10">
                Nếu bạn có bất kỳ thắc mắc hoặc yêu cầu nào, hãy để lại tin nhắn cho chúng tôi. Đội ngũ của <strong>PetCHotel</strong> luôn sẵn sàng hỗ trợ bạn và thú cưng của bạn!
            </Paragraph>

            {/* Section: Contact Information */}
            <Row gutter={[16, 16]} justify="center" className="mb-10">
                <Col xs={24} sm={12} md={8} className="text-center">
                    <EnvironmentOutlined style={{ fontSize: '24px', color: '#8b4d02' }} />
                    <Title level={4}>Địa chỉ</Title>
                    <Paragraph>ha noi</Paragraph>
                </Col>
                <Col xs={24} sm={12} md={8} className="text-center">
                    <PhoneOutlined style={{ fontSize: '24px', color: '#8b4d02' }} />
                    <Title level={4}>Số điện thoại</Title>
                    <Paragraph>123 456 789</Paragraph>
                </Col>
                <Col xs={24} sm={12} md={8} className="text-center">
                    <MailOutlined style={{ fontSize: '24px', color: '#8b4d02' }} />
                    <Title level={4}>Email</Title>
                    <Paragraph>a@gmail.com</Paragraph>
                </Col>
            </Row>

            {/* Contact Form */}
            <Row justify="center">
                <Col xs={24} sm={20} md={12}>
                    <Title level={3} className="text-center text-[#8b4d02]">Gửi tin nhắn cho chúng tôi</Title>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        className="mt-6"
                    >
                        <Form.Item
                            label="Tên của bạn"
                            name="name"
                            rules={[{ required: true, message: "Vui lòng nhập tên của bạn!" }]}
                        >
                            <Input placeholder="Tên của bạn" />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: "Vui lòng nhập email!" },
                                { type: "email", message: "Email không hợp lệ!" },
                            ]}
                        >
                            <Input placeholder="Email của bạn" />
                        </Form.Item>
                        <Form.Item
                            label="Tin nhắn"
                            name="message"
                            rules={[{ required: true, message: "Vui lòng nhập tin nhắn của bạn!" }]}
                        >
                            <Input.TextArea rows={4} placeholder="Nội dung tin nhắn của bạn" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="w-full">
                                Gửi tin nhắn
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default ContactPage;
