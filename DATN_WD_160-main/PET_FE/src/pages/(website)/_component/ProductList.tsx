import { IProduct } from "@/common/type/IProduct";
import ProductItem from "./ProductItem";

type Props = {
    products: IProduct[];
};
const ProductList = ({ products }: Props) => {
    return (
        <>
            {products.map((product: IProduct) => (
                <ProductItem key={product._id} product={product} />
            ))}
        </>
    );
};

export default ProductList;
