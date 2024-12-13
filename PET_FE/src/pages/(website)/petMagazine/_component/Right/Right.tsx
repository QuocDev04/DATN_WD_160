import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import instance from '@/configs/axios';

const Magazine = () => {
    const {data} = useQuery({
        queryKey: ['article'],
        queryFn: () => instance.get('/article')
    })
    console.log(data?.data);
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F6F0E2] to-white">
            {/* Hero Section với hiệu ứng animation */}
            <div className="relative bg-gradient-to-r from-[#6B3E26] to-[#F6F0E2] text-white py-10 overflow-hidden">
                {/* Background Animation */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute w-96 h-96 -top-48 -left-48 bg-white rounded-full mix-blend-overlay animate-pulse"></div>
                    <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-[#542E00] rounded-full mix-blend-overlay animate-pulse delay-1000"></div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-down">
                        Tạp Chí Thú Cưng
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-200 animate-fade-in-up">
                        Khám phá những kiến thức bổ ích và thú vị về thế giới thú cưng
                    </p>
                </div>
            </div>

            {/* Articles Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data?.data?.map((article:any) => (
                            <div
                                key={article._id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-102 hover:shadow-xl"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={article.imgArticle}
                                        alt={article.TitleArticle}
                                        className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                                    />
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center text-gray-500 text-sm mb-3">
                                        <FaCalendarAlt className="mr-2" />
                                        {new Date(article.createdAt).toLocaleString("vi-VN")}
                                    </div>

                                    <h3 className="text-xl font-bold mb-3 text-gray-800 hover:text-[#8B4513] transition-colors">
                                        {article.TitleArticle}
                                    </h3>

                                    <Link
                                        to={`/magazine/${article._id}`}
                                        className="inline-flex items-center gap-2 bg-[#8B4513] text-white px-4 py-2 rounded-lg 
                    hover:bg-[#6B3E26] transition-colors duration-300"
                                    >
                                        Đọc thêm
                                        <FaArrowRight className="text-sm" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    
                </div>
            </section>

            {/* Newsletter Section */}

        </div>
    );
};

export default Magazine;