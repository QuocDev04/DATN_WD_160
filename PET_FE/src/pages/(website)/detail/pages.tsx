import Pagesleft from "./_component/left/pagescomponent";
import PagesRight from "./_component/right/pagescomponent";

const ProductDetailPage = () => {
    return (
        <>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                <div className=""><Pagesleft /></div>
                <div className=""><PagesRight /></div>
            </div>
        </>

    );
};

export default ProductDetailPage;
