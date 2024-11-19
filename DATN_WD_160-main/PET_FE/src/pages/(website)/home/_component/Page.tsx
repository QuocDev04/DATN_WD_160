import { useState } from "react";
import { Link } from 'react-router-dom';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description?: string;
    discount?: number;
    category?: string;
}

const mockProducts = [
    {
        id: 1,
        name: "Royal Canin Mini Adult",
        price: 250000,
        image: "https://www.petmart.vn/wp-content/uploads/2019/04/thuc-an-hat-royal-canin-mini-adult-cho-cho-truong-thanh-1.jpg",
        description: "Thức ăn cao cấp cho chó trưởng thành giống nhỏ",
        discount: 10,
        category: "food"
    },
    {
        id: 2,
        name: "Vòng cổ da cao cấp",
        price: 180000,
        image: "https://bizweb.dktcdn.net/100/346/633/products/1-3.jpg",
        description: "Vòng cổ da thật, êm ái, phù hợp cho chó mèo",
        discount: 0,
        category: "accessories"
    },
    {
        id: 3,
        name: "Đồ chơi bóng cao su",
        price: 45000,
        image: "https://www.petmart.vn/wp-content/uploads/2016/09/do-choi-cao-su-cho-cho-1.jpg",
        description: "Đồ chơi cao su bền bỉ, an toàn cho thú cưng",
        discount: 5,
        category: "toys"
    },
    {
        id: 4,
        name: "Đồ chơi bóng cao su",
        price: 45000,
        image: "https://www.petmart.vn/wp-content/uploads/2016/09/do-choi-cao-su-cho-cho-1.jpg",
        description: "Đồ chơi cao su bền bỉ, an toàn cho thú cưng",
        discount: 5,
        category: "toys"
    },{
        id: 5,
        name: "Đồ chơi bóng cao su",
        price: 45000,
        image: "https://www.petmart.vn/wp-content/uploads/2016/09/do-choi-cao-su-cho-cho-1.jpg",
        description: "Đồ chơi cao su bền bỉ, an toàn cho thú cưng",
        discount: 5,
        category: "toys"
    },
    {
        id: 6,
        name: "Đồ chơi bóng cao su",
        price: 45000,
        image: "https://www.petmart.vn/wp-content/uploads/2016/09/do-choi-cao-su-cho-cho-1.jpg",
        description: "Đồ chơi cao su bền bỉ, an toàn cho thú cưng",
        discount: 5,
        category: "toys"
    },
    {
        id: 7,
        name: "Đồ chơi bóng cao su",
        price: 45000,
        image: "https://www.petmart.vn/wp-content/uploads/2016/09/do-choi-cao-su-cho-cho-1.jpg",
        description: "Đồ chơi cao su bền bỉ, an toàn cho thú cưng",
        discount: 5,
        category: "toys"
    },
    {
        id: 8,
        name: "Đồ chơi bóng cao su",
        price: 45000,
        image: "https://www.petmart.vn/wp-content/uploads/2016/09/do-choi-cao-su-cho-cho-1.jpg",
        description: "Đồ chơi cao su bền bỉ, an toàn cho thú cưng",
        discount: 5,
        category: "toys"
    },
    {
        id: 9,
        name: "Đồ chơi bóng cao su",
        price: 45000,
        image: "https://www.petmart.vn/wp-content/uploads/2016/09/do-choi-cao-su-cho-cho-1.jpg",
        description: "Đồ chơi cao su bền bỉ, an toàn cho thú cưng",
        discount: 5,
        category: "toys"
    },
    {
        id: 10,
        name: "Đồ chơi bóng cao su",
        price: 45000,
        image: "https://www.petmart.vn/wp-content/uploads/2016/09/do-choi-cao-su-cho-cho-1.jpg",
        description: "Đồ chơi cao su bền bỉ, an toàn cho thú cưng",
        discount: 5,
        category: "toys"
    },
];

const ProductPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8; // Số sản phẩm mỗi trang

    const categories = [
        { id: 'all', name: 'Tất cả' },
        { id: 'food', name: 'Thức ăn' },
        { id: 'accessories', name: 'Phụ kiện' },
        { id: 'toys', name: 'Đồ chơi' },
        { id: 'care', name: 'Chăm sóc' }
    ];

    const sortOptions = [
        { value: 'default', label: 'Mặc định' },
        { value: 'price-asc', label: 'Giá tăng dần' },
        { value: 'price-desc', label: 'Giá giảm dần' },
        { value: 'name-asc', label: 'Tên A-Z' },
        { value: 'name-desc', label: 'Tên Z-A' }
    ];

    // Hàm lọc và sắp xếp sản phẩm
    const getFilteredAndSortedProducts = () => {
        let result = [...mockProducts];

        // Lọc theo danh mục
        if (selectedCategory !== 'all') {
            result = result.filter(product => product.category === selectedCategory);
        }

        // Sắp xếp sản phẩm
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }

        return result;
    };

    // Lấy sản phẩm đã được lọc và sắp xếp
    const filteredProducts = getFilteredAndSortedProducts();

    // Tính toán sản phẩm cho trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <div>
            {/* Header Section - không thụt vào */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
                    Sản Phẩm Của Chúng Tôi
                </h1>
                
                {/* Search and Filter Section - thêm container và padding */}
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                        {/* Search Bar */}
                        <div className="relative w-full md:w-96">
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                className="w-full pl-10 pr-4 py-2 rounded-full border-2 
                                border-gray-200 focus:border-[#cfa84c] focus:outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <span className="absolute left-3 top-2.5">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                        </div>

                        {/* Category Filter */}
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-4 py-2 rounded-full transition-all ${
                                        selectedCategory === cat.id
                                            ? 'bg-[#cfa84c] text-white'
                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                    }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        {/* Sort Dropdown */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 rounded-lg border border-gray-200 focus:border-[#cfa84c] focus:outline-none"
                        >
                            {sortOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {currentProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div className="relative pb-[100%]">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
                                />
                                {product.discount > 0 && (
                                    <span className="absolute top-2 right-2 bg-red-500 text-white px-1.5 py-0.5 rounded-full text-xs">
                                        -{product.discount}%
                                    </span>
                                )}
                            </div>
                            <div className="p-3">
                                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">
                                    {product.name}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-2 min-h-[32px]">
                                    {product.description}
                                </p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-sm font-bold text-[#cfa84c]">
                                        {product.price.toLocaleString('vi-VN')}đ
                                    </span>
                                    <Link 
                                        to={`/product/${product.id}`} 
                                        className="px-3 py-1.5 bg-[#cfa84c] text-white text-xs rounded-full 
                                        hover:bg-[#b08d3a] transition-colors"
                                    >
                                        Xem chi tiết
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8 mb-8">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-lg border ${
                                currentPage === 1
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Trước
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`w-10 h-10 rounded-lg ${
                                    currentPage === index + 1
                                        ? 'bg-[#cfa84c] text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-lg border ${
                                currentPage === totalPages
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Sau
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductPage;
