import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import instance from "@/configs/axios";
import { motion } from "framer-motion";
import { Typography, Breadcrumb, Avatar, Tag, Divider } from "antd";
import { FaCalendar, FaUser, FaTag, FaHeart, FaShare, FaComment, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { useState } from "react";

const { Title, Paragraph } = Typography;

const DetailArticle = () => {
    const { id } = useParams();
    const [liked, setLiked] = useState(false);

    const { data: article, isLoading } = useQuery({
        queryKey: ['article', id],
        queryFn: () => instance.get(`/articles/${id}`)
    });

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#8b4d02]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F6F0E2] to-white pb-12">
            {/* Hero Section with Article Image */}
            <div className="relative h-[400px]">
                <div className="absolute inset-0">
                    <img 
                        src={article?.data?.image || "default-image.jpg"}
                        alt={article?.data?.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>
                
                <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="text-white max-w-3xl"
                    >
                        <Breadcrumb className="mb-4">
                            <Breadcrumb.Item>
                                <a href="/" className="text-white/80 hover:text-white">Trang chủ</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <a href="/articles" className="text-white/80 hover:text-white">Bài viết</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item className="text-white/60">
                                {article?.data?.title}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        
                        <Title level={1} className="text-white mb-4">
                            {article?.data?.title}
                        </Title>

                        <div className="flex items-center gap-6 text-white/80">
                            <div className="flex items-center gap-2">
                                <FaCalendar />
                                <span>{new Date(article?.data?.createdAt).toLocaleDateString('vi-VN')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaUser />
                                <span>{article?.data?.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaTag />
                                <span>{article?.data?.category}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Article Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <motion.div 
                        className="lg:col-span-2"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <div className="prose max-w-none">
                                <div dangerouslySetInnerHTML={{ __html: article?.data?.content }} />
                            </div>

                            {/* Tags */}
                            <div className="mt-8">
                                <Title level={4}>Tags</Title>
                                <div className="flex flex-wrap gap-2">
                                    {article?.data?.tags?.map((tag: string, index: number) => (
                                        <Tag key={index} className="px-3 py-1">
                                            {tag}
                                        </Tag>
                                    ))}
                                </div>
                            </div>

                            {/* Social Share */}
                            <Divider />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <button 
                                        onClick={() => setLiked(!liked)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                                            ${liked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
                                    >
                                        <FaHeart />
                                        <span>{liked ? 'Đã thích' : 'Thích'}</span>
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-500 rounded-lg transition-colors">
                                        <FaComment />
                                        <span>Bình luận</span>
                                    </button>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                                        <FaFacebookF />
                                    </button>
                                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors">
                                        <FaTwitter />
                                    </button>
                                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors">
                                        <FaLinkedinIn />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Author Info */}
                        <motion.div 
                            variants={fadeInUp}
                            className="bg-white rounded-xl shadow-lg p-8 mt-8"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <Avatar size={64} src={article?.data?.authorAvatar} />
                                <div>
                                    <Title level={4} className="mb-1">{article?.data?.author}</Title>
                                    <p className="text-gray-600">{article?.data?.authorRole}</p>
                                </div>
                            </div>
                            <Paragraph className="text-gray-600">
                                {article?.data?.authorBio}
                            </Paragraph>
                        </motion.div>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div 
                        variants={fadeInUp}
                        className="lg:col-span-1"
                    >
                        {/* Related Articles */}
                        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                            <Title level={4} className="mb-4">Bài viết liên quan</Title>
                            {article?.data?.relatedArticles?.map((related: any, index: number) => (
                                <div key={index} className="mb-4 last:mb-0">
                                    <a href={`/article/${related.id}`} className="group">
                                        <div className="aspect-video rounded-lg overflow-hidden mb-2">
                                            <img 
                                                src={related.image} 
                                                alt={related.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                        <Title level={5} className="group-hover:text-[#8b4d02] transition-colors">
                                            {related.title}
                                        </Title>
                                    </a>
                                </div>
                            ))}
                        </div>

                        {/* Categories */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <Title level={4} className="mb-4">Danh mục</Title>
                            <div className="space-y-2">
                                {article?.data?.categories?.map((category: any, index: number) => (
                                    <a 
                                        key={index}
                                        href={`/category/${category.id}`}
                                        className="flex items-center justify-between py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="text-gray-600 hover:text-[#8b4d02]">
                                            {category.name}
                                        </span>
                                        <span className="text-gray-400">
                                            ({category.count})
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default DetailArticle;
