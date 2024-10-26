import { IProduct } from "@/common/types/IProduct";

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
        <>
            <section>
                <div className="rounded-xl">
                    <ul className=" font-semibold">
                        <li>
                            <a href="#" className="group relative block overflow-hidden">
                                <img
                                    src={product.gallery[0]}
                                    alt=""
                                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72 rounded-md"
                                />
                                <div className="relative border border-gray-100 bg-white p-3 text-center">
                                    <h3 className="mt-1.5 text-lg font-medium text-gray-900">
                                        {product.productName.split(" ").slice(0, 7).join(" ")}
                                    </h3>
                                    <p className="text-red-600 text-xl text-center">
                                        {formatCurrency(product.price)}
                                    </p>
                                    <form className="mt-4 flex gap-4">
                                        <button
                                            className="block w-full rounded bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"
                                        >
                                            Mua Ngay
                                        </button>
                                    </form>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    )
}
export default ProductItem