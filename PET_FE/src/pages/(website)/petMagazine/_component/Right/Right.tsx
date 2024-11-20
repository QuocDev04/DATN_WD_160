import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { useState } from 'react';

const Magazine = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 9;

    const articles = [
        {
            id: 1,
            title: 'Chăm sóc thú cưng trong mùa hè',
            image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
            summary: 'Những lời khuyên hữu ích để giúp thú cưng của bạn vượt qua mùa hè một cách thoải mái',
            date: '15/03/2024',
            category: 'Chăm sóc'
        },
        {
            id: 2,
            title: 'Dinh dưỡng cho chó mèo',
            image: 'https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
            summary: 'Hướng dẫn chi tiết về chế độ dinh dưỡng cân bằng cho thú cưng',
            date: '14/03/2024',
            category: 'Dinh dưỡng'
        },
        {
            id: 3,
            title: 'Huấn luyện thú cưng cơ bản',
            image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
            summary: 'Các kỹ thuật huấn luyện cơ bản giúp thú cưng ngoan ngoãn và vâng lời',
            date: '13/03/2024',
            category: 'Huấn luyện'
        },
        {
            id: 4,
            title: 'Huấn luyện thú cưng cơ bản',
            image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
            summary: 'Các kỹ thuật huấn luyện cơ bản giúp thú cưng ngoan ngoãn và vâng lời',
            date: '13/03/2024',
            category: 'Huấn luyện'
        }, {
            id: 5,
            title: 'Huấn luyện thú cưng cơ bản',
            image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
            summary: 'Các kỹ thuật huấn luyện cơ bản giúp thú cưng ngoan ngoãn và vâng lời',
            date: '13/03/2024',
            category: 'Huấn luyện'
        },
        {
            id: 6,
            title: 'Huấn luyện thú cưng cơ bản',
            image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
            summary: 'Các kỹ thuật huấn luyện cơ bản giúp thú cưng ngoan ngoãn và vâng lời',
            date: '13/03/2024',
            category: 'Huấn luyện'
        },
        {
            id: 7,
            title: 'Huấn luyện thú cưng cơ bản',
            image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
            summary: 'Các kỹ thuật huấn luyện cơ bản giúp thú cưng ngoan ngoãn và vâng lời',
            date: '13/03/2024',
            category: 'Huấn luyện'
        },
        {
            id: 8,
            title: 'Huấn luyện thú cưng cơ bản',
            image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
            summary: 'Các kỹ thuật huấn luyện cơ bản giúp thú cưng ngoan ngoãn và vâng lời',
            date: '13/03/2024',
            category: 'Huấn luyện'
        },
        {
            id: 9,
            title: 'Huấn luyện thú cưng cơ bản',
            image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
            summary: 'Các kỹ thuật huấn luyện cơ bản giúp thú cưng ngoan ngoãn và vâng lời',
            date: '13/03/2024',
            category: 'Huấn luyện'
        },
        {
            id: 10,
            title: 'Huấn luyện thú cưng cơ bản',
            image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
            summary: 'Các kỹ thuật huấn luyện cơ bản giúp thú cưng ngoan ngoãn và vâng lời',
            date: '13/03/2024',
            category: 'Huấn luyện'
        },
        {
            id: 11,
            title: 'Huấn luyện thú cưng cơ bản',
            image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
            summary: 'Các kỹ thuật huấn luyện cơ bản giúp thú cưng ngoan ngoãn và vâng lời',
            date: '13/03/2024',
            category: 'Huấn luyện'
        },

    ];

    // Tính toán số trang
    const totalPages = Math.ceil(articles.length / articlesPerPage);

    // Lấy các bài viết cho trang hiện tại
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

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
                        {currentArticles.map((article) => (
                            <div
                                key={article.id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-102 hover:shadow-xl"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-[#8B4513] text-white px-3 py-1 rounded-full text-sm">
                                            {article.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center text-gray-500 text-sm mb-3">
                                        <FaCalendarAlt className="mr-2" />
                                        {article.date}
                                    </div>

                                    <h3 className="text-xl font-bold mb-3 text-gray-800 hover:text-[#8B4513] transition-colors">
                                        {article.title}
                                    </h3>

                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {article.summary}
                                    </p>

                                    <Link
                                        to={`/magazine/${article.id}`}
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
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-12">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded-lg border ${currentPage === 1
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-white text-[#8B4513] hover:bg-[#8B4513] hover:text-white transition-colors duration-300'
                                    }`}
                            >
                                Trước
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`w-10 h-10 rounded-lg ${currentPage === index + 1
                                            ? 'bg-[#8B4513] text-white'
                                            : 'bg-white text-[#8B4513] hover:bg-[#8B4513] hover:text-white'
                                        } transition-colors duration-300`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded-lg border ${currentPage === totalPages
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-white text-[#8B4513] hover:bg-[#8B4513] hover:text-white transition-colors duration-300'
                                    }`}
                            >
                                Sau
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Section */}

        </div>
    );
};

export default Magazine;