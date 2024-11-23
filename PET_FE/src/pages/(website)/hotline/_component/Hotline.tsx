import { Form, Input, Button, Row, Col, Typography, message } from "antd";
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, HeartOutlined, HomeOutlined, GiftOutlined, SmileOutlined, StarOutlined, ShopOutlined } from "@ant-design/icons";
import { FaDog, FaCat, FaFish, FaPaw, FaBone, FaHeart } from 'react-icons/fa';
import { motion } from "framer-motion";
const { Title, Paragraph } = Typography;

const ContactPage = () => {
    const [form] = Form.useForm();
    const onFinish = () => {
        message.success("Cảm ơn bạn đã liên hệ với chúng tôi! Chúng tôi sẽ phản hồi sớm.");
        form.resetFields();
    };

    return (
        <div className="relative min-h-screen">
            {/* Background Pattern with Icons */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-50 to-white overflow-hidden">
                <div className="absolute w-96 h-96 -top-48 -left-48 bg-amber-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute w-96 h-96 -top-48 -right-48 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute w-96 h-96 bottom-0 left-1/2 transform -translate-x-1/2 bg-amber-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

                {/* Floating Icons */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, index) => (
                        <div
                            key={index}
                            className={`absolute text-[#8b4d02]/10 animate-float`}
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                fontSize: `${Math.random() * 20 + 20}px`,
                                animationDelay: `${Math.random() * 5}s`,
                                transform: `rotate(${Math.random() * 360}deg)`
                            }}
                        >
                            {[
                                <FaDog />, <FaCat />, <FaFish />, <FaPaw />,
                                <FaBone />, <FaHeart />
                            ][Math.floor(Math.random() * 6)]}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="relative max-w-screen-xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <Title level={2} className="text-[#8b4d02] !mb-6 font-bold text-4xl">
                        Liên hệ với chúng tôi
                    </Title>
                    <Paragraph className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Nếu bạn có bất kỳ thắc mắc hoặc yêu cầu nào, hãy để lại tin nhắn cho chúng tôi.
                        Đội ngũ của <strong className="text-[#8b4d02]">PetHotel</strong> luôn sẵn sàng hỗ trợ bạn và thú cưng của bạn!
                    </Paragraph>
                </motion.div>

                {/* Contact Information Cards with hover effect */}
                <Row gutter={[32, 32]} justify="center" className="mb-16">
                    {[
                        { icon: <EnvironmentOutlined />, title: "Địa chỉ", content: "Hà Nội, Việt Nam" },
                        { icon: <PhoneOutlined />, title: "Số điện thoại", content: "0909090909" },
                        { icon: <MailOutlined />, title: "Email", content: "pethotel@gmail.com" }
                    ].map((item, index) => (
                        <Col xs={24} sm={12} md={8} key={index}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                <div className="text-4xl text-[#8b4d02] mb-4">{item.icon}</div>
                                <Title level={4} className="!mb-3">{item.title}</Title>
                                <Paragraph className="text-gray-600">{item.content}</Paragraph>
                            </motion.div>
                        </Col>
                    ))}
                </Row>

                {/* Contact Form with glass effect */}
                <Row justify="center">
                    <Col xs={24} sm={20} md={16} lg={12}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg"
                        >
                            <Title level={3} className="text-center text-[#8b4d02] !mb-8">
                                Gửi tin nhắn cho chúng tôi
                            </Title>
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    label="Tên của bạn"
                                    name="name"
                                    rules={[{ required: true, message: "Vui lòng nhập tên của bạn!" }]}
                                >
                                    <Input
                                        placeholder="Tên của bạn"
                                        className="rounded-lg py-2"
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
                                    <Input
                                        placeholder="Email của bạn"
                                        className="rounded-lg py-2"
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Tin nhắn"
                                    name="message"
                                    rules={[{ required: true, message: "Vui lòng nhập tin nhắn của bạn!" }]}
                                >
                                    <Input.TextArea
                                        rows={4}
                                        placeholder="Nội dung tin nhắn của bạn"
                                        className="rounded-lg"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="w-full h-10 bg-[#8b4d02] hover:bg-[#6d3c01] rounded-lg text-lg"
                                    >
                                        Gửi tin nhắn
                                    </Button>
                                </Form.Item>
                            </Form>
                        </motion.div>
                    </Col>
                </Row>

                {/* Google Maps */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-16"
                >
                    <Row justify="center" className="mb-16 pt-16">
                        <Col xs={24}>
                            <div className="rounded-xl overflow-hidden shadow-lg h-[400px]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.096947657144!2d105.78049431541382!3d21.028825493151946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4cd0c66f05%3A0xea31563511af2e54!2zOCBUw7RuIFRo4bqldCBUaHV54bq_dCwgTeG7uSDEkMOsbmgsIEPhuqd1IEdp4bqleSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1679981414316!5m2!1svi!2s"
                                    width="100%"
                                    height="400"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Maps"
                                    className="w-full h-full"
                                />
                            </div>
                        </Col>
                    </Row>
                </motion.div>
            </div>
        </div>
    );
};

// Update the styles with new animations
const styles = `
@keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
}

@keyframes float {
    0% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
    100% { transform: translateY(0) rotate(360deg); }
}

.animate-blob {
    animation: blob 7s infinite;
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}

.animation-delay-2000 {
    animation-delay: 2s;
}

.animation-delay-4000 {
    animation-delay: 4s;
}
`;

// Add this to your tailwind.config.js
const tailwindConfig = `
module.exports = {
    // ... other config
    theme: {
        extend: {
            animation: {
                float: 'float 6s ease-in-out infinite',
            },
        },
    },
}
`;

export default ContactPage;