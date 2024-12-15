import { Typography, Row, Col, Card } from "antd";
import { motion } from "framer-motion";
import { FaPaw, FaHeart, FaMedal, FaUserMd, FaCut, FaUtensils, FaFacebookF,  FaEnvelope, FaPhoneAlt, FaCalendarCheck, FaCertificate, FaUserPlus } from "react-icons/fa";

const { Title, Paragraph } = Typography;

const AboutUs = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const services = [
        {
            icon: <FaCut className="text-3xl text-[#8b4d02]" />,
            title: "Chăm sóc lông",
            description: "Dịch vụ cắt tỉa và chăm sóc lông chuyên nghiệp, giúp thú cưng của bạn luôn đẹp và sạch sẽ."
        },
        {
            icon: <FaUtensils className="text-3xl text-[#8b4d02]" />,
            title: "Tư vấn dinh dưỡng",
            description: "Đội ngũ chuyên gia dinh dưỡng sẽ tư vấn chế độ ăn phù hợp nhất cho thú cưng của bạn."
        },
        {
            icon: <FaUserMd className="text-3xl text-[#8b4d02]" />,
            title: "Khám sức khỏe định kỳ",
            description: "Đảm bảo thú cưng của bạn luôn khỏe mạnh với dịch vụ khám định kỳ chuyên nghiệp."
        }
    ];

    const team = [
        {
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
            name: "Bác sĩ Minh Anh",
            role: "Chuyên gia chăm sóc sức khỏe thú cưng",
            description: "Với hơn 5 năm kinh nghiệm trong lĩnh vực thú y",
            specialties: [
                { icon: <FaUserMd />, text: "Chuyên khoa thú y" },
                { icon: <FaCertificate />, text: "Chứng chỉ quốc tế" },
                { icon: <FaCalendarCheck />, text: "Lịch khám linh hoạt" }
            ],
            social: [
                { icon: <FaFacebookF />, link: "https://www.facebook.com/people/H%E1%BB%87-th%E1%BB%91ng-Kh%C3%A1ch-S%E1%BA%A1n-Th%C3%BA-C%C6%B0ng-Pet-Hotel/61569308776714/" },
                { icon: <FaEnvelope />, link: "#" }
            ]
        },
        {
            image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7",
            name: "Bác sĩ Khánh Linh",
            role: "Chuyên gia dinh dưỡng thú cưng",
            description: "Chuyên gia hàng đầu về dinh dưỡng cho thú cưng",
            specialties: [
                { icon: <FaUtensils />, text: "Tư vấn dinh dưỡng" },
                { icon: <FaCertificate />, text: "Chứng nhận quốc tế" },
                { icon: <FaPaw />, text: "Chăm sóc đặc biệt" }
            ],
            social: [
                { icon: <FaFacebookF />, link: "https://www.facebook.com/people/H%E1%BB%87-th%E1%BB%91ng-Kh%C3%A1ch-S%E1%BA%A1n-Th%C3%BA-C%C6%B0ng-Pet-Hotel/61569308776714/" },
                { icon: <FaEnvelope />, link: "#" }

            ]
        },
        {
            image: "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            name: "Nhân viên Hữu Phúc",
            role: "Chuyên viên cắt tỉa lông",
            description: "Nhiều năm kinh nghiệm trong chăm sóc và làm đẹp",
            specialties: [
                { icon: <FaCut />, text: "Cắt tỉa chuyên nghiệp" },
                { icon: <FaHeart />, text: "Chăm sóc tận tình" },
                { icon: <FaMedal />, text: "Kinh nghiệm cao" }
            ],
            social: [
                { icon: <FaFacebookF />, link: "https://www.facebook.com/people/H%E1%BB%87-th%E1%BB%91ng-Kh%C3%A1ch-S%E1%BA%A1n-Th%C3%BA-C%C6%B0ng-Pet-Hotel/61569308776714/" },
                { icon: <FaEnvelope />, link: "#" }
            ]
        }
    ];

    return (
        <div className="bg-gradient-to-b from-[#F6F0E2] to-white min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[400px] mb-16">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>
                <div className="relative container mx-auto px-4 h-full flex items-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="text-white max-w-2xl"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Chào mừng đến với PetHotel
                            <FaPaw className="inline-block ml-3 text-[#F6F0E2]" />
                        </h1>
                        <p className="text-lg text-gray-200">
                            Nơi mang đến sự chăm sóc hoàn hảo nhất cho thú cưng của bạn
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-screen-xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                {/* Services Section */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.2 }}
                    className="mb-20"
                >
                    <Title level={2} className="text-center text-[#8b4d02] mb-12">
                        Dịch vụ của chúng tôi
                    </Title>
                    <Row gutter={[24, 24]}>
                        {services.map((service, index) => (
                            <Col xs={24} sm={12} md={8} key={index}>
                                <motion.div variants={fadeInUp}>
                                    <Card
                                        className="h-full hover:shadow-xl transition-shadow duration-300"
                                        bordered={false}
                                    >
                                        <div className="text-center mb-4">
                                            {service.icon}
                                        </div>
                                        <Title level={4} className="text-center mb-4">
                                            {service.title}
                                        </Title>
                                        <Paragraph className="text-gray-600 text-center">
                                            {service.description}
                                        </Paragraph>
                                    </Card>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </motion.section>

                {/* Team Section */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.2 }}
                    className="mb-20"
                >
                    <Title level={2} className="text-center text-[#8b4d02] mb-12 flex items-center justify-center gap-2">
                        <FaUserPlus className="text-3xl" />
                        Đội ngũ chuyên nghiệp
                    </Title>
                    <Row gutter={[24, 24]}>
                        {team.map((member, index) => (
                            <Col xs={24} sm={12} md={8} key={index}>
                                <motion.div
                                    variants={fadeInUp}
                                    className="group"
                                >
                                    <Card
                                        hoverable
                                        className="text-center h-full overflow-hidden bg-white/80 backdrop-blur-sm"
                                        bodyStyle={{ padding: '24px' }}
                                        cover={
                                            <div className="relative h-[300px] overflow-hidden">
                                                <img
                                                    alt={member.name}
                                                    src={member.image}
                                                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                                {/* Social Icons */}
                                                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                    {member.social.map((item, idx) => (
                                                        <a
                                                            key={idx}
                                                            href={item.link}
                                                            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-[#8b4d02] transition-all duration-300"
                                                        >
                                                            {item.icon}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        }
                                    >
                                        <Title level={4} className="mb-2 group-hover:text-[#8b4d02] transition-colors">
                                            {member.name}
                                        </Title>
                                        <p className="text-[#8b4d02] font-medium mb-4">
                                            {member.role}
                                        </p>

                                        <p className="text-gray-600 mb-4">
                                            {member.description}
                                        </p>

                                        {/* Specialties with Icons */}
                                        <div className="space-y-3 mb-6">
                                            {member.specialties.map((specialty, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-gray-600">
                                                    <span className="text-[#8b4d02]">{specialty.icon}</span>
                                                    <span>{specialty.text}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-full px-4 py-2 bg-[#8b4d02] text-white rounded-lg hover:bg-[#6b3a01] transition-colors duration-300 flex items-center justify-center gap-2"
                                        >
                                            <FaCalendarCheck />
                                            Đặt lịch hẹn
                                        </motion.button> */}
                                    </Card>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </motion.section>

                {/* Why Choose Us Section */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center"
                >
                    <Title level={2} className="text-[#8b4d02] mb-8">
                        Tại sao chọn PetHotel?
                    </Title>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <FaHeart className="text-3xl text-[#8b4d02] mx-auto mb-4" />
                            <Title level={4}>Tận tâm chăm sóc</Title>
                            <Paragraph className="text-gray-600">
                                Chúng tôi yêu thương và chăm sóc thú cưng của bạn như chính thú cưng của mình.
                            </Paragraph>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <FaMedal className="text-3xl text-[#8b4d02] mx-auto mb-4" />
                            <Title level={4}>Chất lượng hàng đầu</Title>
                            <Paragraph className="text-gray-600">
                                Cam kết mang đến dịch vụ chất lượng cao nhất với giá cả hợp lý.
                            </Paragraph>
                        </div>
                    </div>
                    <motion.img
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Veterinary Care"
                        className="w-full max-w-2xl mx-auto rounded-xl shadow-2xl"
                    />
                </motion.section>
            </div>
        </div>
    );
};

export default AboutUs;