import BannerPages from "./_component/Banner"
import CmtPages from "./_component/Cmt"
import MainPages from "./_component/Room"
import ProductPages from "./_component/Product"
import ServicePage from "./_component/Service"


const HomePages = () => {
    return (
        <>
            <BannerPages />
            <MainPages />
            <ServicePage />
            <ProductPages />
            <CmtPages />

        </>
    )
}
export default HomePages