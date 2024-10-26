import BannerPages from "./_component/Banner"
import CmtPages from "./_component/Cmt"
import MainPages from "./_component/Room"
import ProductPages from "./_component/Product"


const HomePages = () => {
    return (
        <>
           <BannerPages/>
           <MainPages/>
           <ProductPages/>
           <CmtPages/>
        </>
    )
}
export default HomePages