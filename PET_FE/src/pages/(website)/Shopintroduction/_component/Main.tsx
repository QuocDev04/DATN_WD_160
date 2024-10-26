import { Typography, Row, Col, Card } from "antd";

const { Title, Paragraph } = Typography;

const AboutUs = () => {
    return (
        <>
            <div className="max-w-screen-xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <section className="text-center mb-10">
                    <Title level={2} className="text-[#8b4d02]">Giới thiệu về Pet Hotel</Title>
                    <Paragraph className="text-lg">
                        Chào mừng bạn đến với <strong>PetHotel</strong> - nơi mang đến sự chăm sóc hoàn hảo nhất cho thú cưng của bạn! Chúng tôi cam kết cung cấp các dịch vụ và sản phẩm tốt nhất để thú cưng của bạn luôn vui khỏe và hạnh phúc.
                    </Paragraph>
                </section>

                {/* Section: Our Services */}
                <section className="mb-10">
                    <Title level={3} className="text-center text-[#8b4d02]">Dịch vụ của chúng tôi</Title>
                    <Row gutter={[16, 16]} className="mt-6">
                        <Col xs={24} sm={12} md={8}>
                            <Card title="Chăm sóc lông" bordered={false} className="shadow-lg">
                                <p>Chúng tôi cung cấp dịch vụ cắt tỉa và chăm sóc lông chuyên nghiệp, giúp thú cưng của bạn luôn đẹp và sạch sẽ.</p>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Card title="Tư vấn dinh dưỡng" bordered={false} className="shadow-lg">
                                <p>Đội ngũ chuyên gia của chúng tôi sẽ tư vấn chế độ dinh dưỡng phù hợp nhất cho sức khỏe của thú cưng bạn.</p>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Card title="Khám sức khỏe định kỳ" bordered={false} className="shadow-lg">
                                <p>Đảm bảo thú cưng của bạn luôn khỏe mạnh với dịch vụ khám định kỳ tại cửa hàng.</p>
                            </Card>
                        </Col>
                    </Row>
                </section>

                {/* Section: Our Team */}
                <section className="mb-10">
                    <Title level={3} className="text-center text-[#8b4d02]">Đội ngũ của chúng tôi</Title>
                    <Paragraph className="text-center">
                        Đội ngũ của <strong>PetHotel</strong> bao gồm các bác sĩ thú y và chuyên gia chăm sóc thú cưng giàu kinh nghiệm, luôn tận tâm và yêu thương động vật. Chúng tôi không chỉ có kiến thức chuyên môn cao mà còn đam mê với công việc của mình, cam kết mang lại dịch vụ tốt nhất cho thú cưng của bạn.
                    </Paragraph>
                    <Row gutter={[16, 16]} className="mt-6">
                        <Col xs={24} sm={12} md={8}>
                            <Card cover={<img alt="Team Member" src="https://i.pinimg.com/236x/d7/64/18/d76418f406971b8b0c02d158e159d920.jpg" />} bordered={false}>
                                <Card.Meta title="Bác sĩ Minh Anh" description="Chuyên gia chăm sóc sức khỏe thú cưng" />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Card cover={<img alt="Team Member" src="https://i.pinimg.com/236x/d7/64/18/d76418f406971b8b0c02d158e159d920.jpg" />} bordered={false}>
                                <Card.Meta title="Bác sĩ Khánh Linh" description="Chuyên gia dinh dưỡng thú cưng" />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Card cover={<img alt="Team Member" src="https://i.pinimg.com/236x/d7/64/18/d76418f406971b8b0c02d158e159d920.jpg" />} bordered={false}>
                                <Card.Meta title="Nhân viên Hữu Phúc" description="Chuyên viên cắt tỉa lông" />
                            </Card>
                        </Col>
                    </Row>
                </section>

                {/* Section: Why Choose Us */}
                <section className="text-center">
                    <Title level={3} className="text-[#8b4d02]">Tại sao nên chọn PetHotel?</Title>
                    <Paragraph>
                        Với sự am hiểu về thú cưng cùng với sự tận tâm, <strong>PetHotel</strong> mang đến những dịch vụ chất lượng cao nhất với giá cả hợp lý. Chúng tôi luôn sẵn sàng đồng hành cùng bạn trong hành trình chăm sóc thú cưng của mình.
                    </Paragraph>
                    <img
                        src="https://i.pinimg.com/736x/8a/c5/13/8ac513601011ba9210381fdaa4be2c8c.jpg"
                        alt="Happy Pets"
                        className="w-full max-w-md mx-auto mt-6 rounded-lg shadow-lg"
                    />
                </section>
            </div>
        </>
      
    );
};

export default AboutUs;
