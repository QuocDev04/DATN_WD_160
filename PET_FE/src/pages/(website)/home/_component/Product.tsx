import instance from "@/configs/axios"
import { useQuery } from "@tanstack/react-query"
import { Empty } from "antd";
import ProductList from "../../_component/ProductList";
import { useState } from 'react';

const ProductPages = () => {
    const [showAll, setShowAll] = useState(false);
    const { data: product, isLoading } = useQuery({
        queryKey: ['product'],
        queryFn: () => instance.get('/product')
    })
    if (isLoading) return (
        <div>
            {" "}
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                imageStyle={{ height: 60 }}
            />
        </div>
    );
    const displayedProducts = showAll ? product?.data : product?.data?.slice(0, 8);
    return (
        <>
            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <header>
                        <h2 className="text-xl font-bold text-red-600 sm:text-3xl">Sản Phẩm Có Tại Shop</h2>
                    </header>
                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <ProductList products={displayedProducts} />
                    </div>
                    {product?.data?.length > 8 && (
                        <div className="text-center mt-8">
                            <span
                                onClick={() => setShowAll(!showAll)}
                                className="cursor-pointer text-base font-semibold 
                                    text-[#cfa84c] hover:text-[#b08d3a]
                                    border-b-2 border-[#cfa84c] hover:border-[#b08d3a]
                                    transition-all duration-300"
                            >
                                {showAll ? 'Thu gọn' : 'Xem thêm sản phẩm'}
                            </span>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}
export default ProductPages