import { useEffect, useState } from 'react';
import { Image, Card, Tag, Divider } from 'antd';
import { PhoneOutlined, EnvironmentOutlined, SafetyCertificateOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import instance from '@/configs/axios';

const ProductDetail = () => {
    const { id } = useParams();
    const { pathname } = useLocation();

    const { data } = useQuery({
        queryKey: ['product', id],
        queryFn: () => instance.get(`/product/${id}`)
    });

    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        if (data?.data?.gallery) {
            setSelectedImage(Array.isArray(data.data.gallery)
                ? data.data.gallery[0]
                : data.data.gallery
            );
        }
    }, [data]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-[#F8F9FA] via-[#F6F0E2] to-[#F8F9FA] py-12"
        >
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-600 mb-8">
                    <span className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
                    <span className="mx-2">/</span>
                    <span className="hover:text-blue-600 cursor-pointer">Thú cưng</span>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900">{data?.data?.productName}</span>
                </div>

                <Card className="shadow-2xl rounded-3xl overflow-hidden border-0 bg-white/80 backdrop-blur-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Phần hình ảnh */}
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="relative rounded-2xl overflow-hidden shadow-xl"
                            >
                                <Image
                                    src={selectedImage}
                                    className="w-full object-contain"
                                    preview={false}
                                    style={{ maxHeight: '600px' }}
                                />
                            </motion.div>

                            <div className="grid grid-cols-4 gap-4">
                                {Array.isArray(data?.data?.gallery) &&
                                    data.data.gallery.map((img: any, index: any) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ y: -5, scale: 1.05 }}
                                            transition={{ duration: 0.2 }}
                                            className="relative rounded-xl overflow-hidden shadow-lg group"
                                            style={{ aspectRatio: '1' }}
                                        >
                                            <img
                                                src={img}
                                                alt={`Gallery image ${index + 1}`}
                                                onClick={() => setSelectedImage(img)}
                                                className={`absolute inset-0 w-full h-full object-cover cursor-pointer 
                                                    transition-all duration-300 group-hover:brightness-110
                                                    ${selectedImage === img
                                                        ? 'ring-3 ring-blue-500 ring-offset-2'
                                                        : 'ring-1 ring-gray-200'}`}
                                            />
                                        </motion.div>
                                    ))
                                }
                            </div>
                        </div>

                        {/* Phần thông tin */}
                        <div className="space-y-8 lg:pl-8">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <Tag color="blue" className="px-3 py-1 text-sm uppercase tracking-wider">
                                        Thú cưng
                                    </Tag>
                                    <Tag color="green" className="px-3 py-1 text-sm uppercase tracking-wider">
                                        Có sẵn
                                    </Tag>
                                </div>
                                <h1 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
                                    {data?.data?.productName}
                                </h1>
                                <div className="text-3xl font-bold text-red-600">
                                    {data?.data?.price?.toLocaleString('vi-VN')}đ
                                </div>
                            </div>

                            <Divider className="my-8" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-blue-50 rounded-2xl p-6 border border-blue-100"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-blue-500 rounded-xl text-white">
                                            <SafetyCertificateOutlined className="text-2xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-blue-900">Bảo đảm</h3>
                                            <p className="text-blue-700 mt-1">Sức khỏe tốt</p>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-green-50 rounded-2xl p-6 border border-green-100"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-green-500 rounded-xl text-white">
                                            <ClockCircleOutlined className="text-2xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-green-900">Thời gian</h3>
                                            <p className="text-green-700 mt-1">Hỗ trợ 24/7</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-6 space-y-4 border border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-gray-200 rounded-xl">
                                        <PhoneOutlined className="text-2xl text-gray-700" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Liên hệ</h3>
                                        <p className="text-gray-700 mt-1">Hotline: 1900 xxxx</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                                    <div className="p-3 bg-gray-200 rounded-xl">
                                        <EnvironmentOutlined className="text-2xl text-gray-700" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Địa chỉ</h3>
                                        <p className="text-gray-700 mt-1">123 Đường ABC, Quận XYZ</p>
                                    </div>
                                </div>
                            </div>
                            <Link to={'/Hotline'}>
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-gradient-to-r from-[#8B4513] via-[#8B4513] to-[#8B4513] 
                                         text-white py-4 px-6 rounded-xl font-semibold text-lg
                                         shadow-lg hover:shadow-xl transition-all duration-300 
                                         flex items-center justify-center gap-3"
                                >
                                    <PhoneOutlined className="text-xl" />
                                    Liên hệ tư vấn ngay
                                </motion.button>
                            </Link>
                        </div>
                    </div>

                    {/* Phần mô tả */}
                    <Divider className="my-12" />
                    <div className="prose max-w-none">
                        <h2 className="text-3xl font-bold mb-8">Thông tin chi tiết</h2>
                        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100"
                            dangerouslySetInnerHTML={{
                                __html: data?.data?.description || ""
                            }}
                        />
                    </div>
                </Card>
            </div>
        </motion.div>
    );
};

export default ProductDetail;


