import { useParams } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaTags, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const MagazineDetail = () => {
  const { id } = useParams();

  // Giả lập dữ liệu bài viết chi tiết
  const article = {
    id: 1,
    title: 'Chăm sóc thú cưng trong mùa hè',
    image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    date: '15/03/2024',
    author: 'Nguyễn Văn A',
    category: 'Chăm sóc',
    content: `
      <h2>1. Giữ cho thú cưng mát mẻ</h2>
      <p>Trong những ngày hè nóng bức, việc đầu tiên và quan trọng nhất là giữ cho thú cưng của bạn luôn mát mẻ. Đây là một số cách bạn có thể thực hiện:</p>
      <ul>
        <li>Đảm bảo luôn có nước sạch và mát</li>
        <li>Tránh cho thú cưng ra ngoài vào những giờ nắng nóng nhất</li>
        <li>Cung cấp không gian mát mẻ và thoáng khí</li>
      </ul>

      <h2>2. Chế độ dinh dưỡng mùa hè</h2>
      <p>Thời tiết nóng có thể ảnh hưởng đến sự ngon miệng của thú cưng. Hãy điều chỉnh chế độ ăn phù hợp:</p>
      <ul>
        <li>Chia nhỏ bữa ăn trong ngày</li>
        <li>Bổ sung thêm nước trong thức ăn</li>
        <li>Tránh cho ăn quá no một lúc</li>
      </ul>

      <h2>3. Vận động phù hợp</h2>
      <p>Dù thời tiết nóng, thú cưng vẫn cần vận động nhưng cần điều chỉnh phù hợp:</p>
      <ul>
        <li>Chọn thời điểm sáng sớm hoặc chiều tối để đi dạo</li>
        <li>Rút ngắn thời gian vận động</li>
        <li>Tránh các hoạt động quá sức</li>
      </ul>
    `,
    relatedArticles: [
      {
        id: 2,
        title: 'Dinh dưỡng cho chó mèo',
        image: 'https://images.unsplash.com/photo-1623387641168-d9803ddd3f35',
        summary: 'Hướng dẫn chi tiết về chế độ dinh dưỡng cân bằng cho thú cưng'
      },
      {
        id: 3,
        title: 'Huấn luyện thú cưng cơ bản',
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb',
        summary: 'Các kỹ thuật huấn luyện cơ bản giúp thú cưng ngoan ngoãn'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative h-[400px] w-full">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
            <div className="flex items-center justify-center gap-6 text-sm">
              <span className="flex items-center gap-2">
                <FaCalendarAlt /> {article.date}
              </span>
              <span className="flex items-center gap-2">
                <FaUser /> {article.author}
              </span>
              <span className="flex items-center gap-2">
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
              <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700">
                <FaFacebook />
              </button>
              <button className="p-2 rounded-full bg-blue-400 text-white hover:bg-blue-500">
                <FaTwitter />
              </button>
              <button className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800">
                <FaLinkedin />
              </button>
            </div>

            {/* Main Content */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
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
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {article.relatedArticles.map((related) => (
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
                    <h3 className="text-xl font-bold mb-2 hover:text-[#8B4513]">
                      {related.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-2">
                      {related.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagazineDetail;
