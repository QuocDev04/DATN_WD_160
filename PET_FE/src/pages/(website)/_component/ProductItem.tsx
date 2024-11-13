import { IProduct } from "@/common/type/IProduct";

type ProductsItemProps = {
    product: IProduct;
};

const ProductItem = ({ product }: ProductsItemProps) => {
    const exchangeRate = 1;
    const formatCurrency = (price: number) => {
        const priceInVND = price * exchangeRate;
        return priceInVND.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };

    return (
        <div className="p-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition hover:shadow-2xl relative">
                <div className="absolute top-3 left-3 bg-gray-100 text-gray-700 px-2 py-1 text-xs font-semibold rounded">
                    Giảm giá!
                </div>
                <div className="absolute top-3 right-3">
                    <img src="/logo.png" alt="Logo" className="w-8 h-8" />
                </div>
                <img
                    src={product.gallery[0]}
                    alt={product.productName}
                    className="w-full h-64 object-contain p-4"
                />
                <div className="p-4 text-center border-t border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800">
                        {product.productName.split(" ").slice(0, 6).join(" ")}
                    </h3>
                    <div className="mt-2">
                        <span className="text-red-600 text-xl font-semibold">
                            {formatCurrency(product.price)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
