import { useState } from 'react';
import instance from "@/configs/axios"
import { useQuery } from "@tanstack/react-query"
import { Empty, Pagination } from "antd";
import ProductList from "../../_component/ProductList";

const ProductPages = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const { data: product, isLoading } = useQuery({
        queryKey: ['product'],
        queryFn: () => instance.get('/product')
    })

    if (isLoading) return (
        <div>
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                imageStyle={{ height: 60 }}
            />
        </div>
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedProducts = product?.data?.slice(startIndex, endIndex);
    const totalItems = product?.data?.length || 0;

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
                    {totalItems > itemsPerPage && (
                        <div className="flex justify-center mt-8">
                            <Pagination
                                current={currentPage}
                                onChange={(page) => setCurrentPage(page)}
                                total={totalItems}
                                pageSize={itemsPerPage}
                            />
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default ProductPages