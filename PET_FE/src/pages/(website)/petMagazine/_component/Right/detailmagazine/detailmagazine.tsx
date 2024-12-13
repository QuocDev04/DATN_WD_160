import { useParams } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaTags, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import instance from '@/configs/axios';

const MagazineDetail = () => {
    const { id } = useParams();
    const { data } = useQuery({
        queryKey: ['article', id],
        queryFn: () => instance.get(`/article/${id}`).then(res => res.data)
    });

    console.log(data);

    if (!data) return <div>Loading...</div>;

    const article = data;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Image */}
            <div className="relative h-[400px] w-full overflow-hidden rounded-lg shadow-lg">
                <img
                    src={article.imgArticle}
                    alt={article.TitleArticle}
                    className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4" >{article.TitleArticle}</h1>
                        <div className="flex items-center justify-center gap-6 text-sm">
                            <span className="flex items-center gap-2 bg-gray-800 bg-opacity-50 rounded-full px-3 py-1">
                                <FaCalendarAlt /> {article.date}
                            </span>
                            <span className="flex items-center gap-2 bg-gray-800 bg-opacity-50 rounded-full px-3 py-1">
                                <FaUser /> {article.author}
                            </span>
                            <span className="flex items-center gap-2 bg-gray-800 bg-opacity-50 rounded-full px-3 py-1">
                                <FaTags /> {article.category}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        {/* Social Share */}
                        <div className="flex items-center gap-4 mb-8 pb-8 border-b">
                            <span className="text-gray-600">Chia sẻ:</span>
                            <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300">
                                <FaFacebook />
                            </button>
                            <button className="p-2 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition duration-300">
                                <FaTwitter />
                            </button>
                            <button className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition duration-300">
                                <FaLinkedin />
                            </button>
                        </div>

                        {/* Main Content */}
                        <div
                            className="prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: article.DescriptionArticle }}
                        />

                        {/* Tags */}
                        <div className="mt-8 pt-8 border-t">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-600">Tags:</span>
                                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                                    {article.category}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Related Articles */}
                    {/* <div className="mt-12">
                        <h2 className="text-2xl font-bold mb-6">Bài viết liên quan</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {article.relatedArticles.map((related: any) => (
                                <div
                                    key={related.id}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                                >
                                    <div className="relative h-48">
                                        <img
                                            src={related.image}
                                            alt={related.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2 hover:text-[#8B4513] transition-colors">
                                            {related.title}
                                        </h3>
                                        <p className="text-gray-600 line-clamp-2">
                                            {related.summary}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default MagazineDetail;