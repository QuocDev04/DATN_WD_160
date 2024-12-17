
import { Outlet } from "react-router-dom";
import HeaderPages from "./_component/header";
import FooterPages from "./_component/footer";

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
