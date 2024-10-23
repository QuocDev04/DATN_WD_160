
import { Outlet } from "react-router-dom";
import HeaderPages from "./(website)/_component/header";
import FooterPages from "./(website)/_component/footer";

const Layout = () => {
    return (
        <div>
            <HeaderPages />
            <Outlet />
            <FooterPages />
        </div>
    );
};

export default Layout;
