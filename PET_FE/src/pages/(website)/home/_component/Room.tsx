import Link from "antd/es/typography/Link";

const MainPages = () => {
    return (
        <>
            <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
                <header className="mb-8 text-center">
                    <h2 className="text-2xl font-bold text-red-600 sm:text-4xl pb-4">
                        Đặt Phòng Cho Thú Cưng Của Bạn
                    </h2>
                </header>

                {/* Main Service Article */}
                <article className="mb-12 flex flex-col sm:flex-row bg-white rounded-lg shadow-lg transition hover:shadow-xl overflow-hidden">
                    <div className="sm:basis-1/3">
                        <img
                            src="https://i.pinimg.com/236x/5a/3a/25/5a3a25641c384af03fe31f5654f34b2a.jpg"
                            className="w-full "
                        />
                    </div>
                    <div className="flex-1 p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            Phòng Thoáng Mát - Nơi Tận Hưởng Không Gian Sống Lý Tưởng
                        </h3>
                        <p className="text-lg text-gray-600 mb-4">
                            Chào mừng bạn đến với Phòng Thoáng Mát, nơi thú cưng của bạn không chỉ có một chỗ ở mà còn là một trải nghiệm tuyệt vời. Phòng được thiết kế rộng rãi, thoáng đãng, với ánh sáng tự nhiên tràn ngập, tạo cảm giác dễ chịu và thư giãn cho các chú thú cưng. Các trang thiết bị hiện đại cùng không gian vui chơi sẽ giúp thú cưng của bạn luôn năng động và hạnh phúc. Hãy để chúng tôi chăm sóc và cung cấp cho chúng những khoảnh khắc tuyệt vời nhất trong suốt thời gian ở đây!
                        </p>
                        <div className="text-right">
                            <Link
                                className="bg-yellow-400 px-4 py-5 text-lg font-semibold uppercase text-gray-900 rounded-md transition hover:bg-yellow-500"
                            >
                               Đặt Phòng
                            </Link>
                        </div>
                    </div>
                </article>
            </div>
        </>
    );
};

export default MainPages;
