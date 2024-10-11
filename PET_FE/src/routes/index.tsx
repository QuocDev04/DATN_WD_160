
import LoginPages from "@/components/login/login";
import RegisterPages from "@/components/register/register";
import Dashboard from "@/pages/(dashboard)/dashboard/page";
import LayoutAdmin from "@/pages/(dashboard)/layout";
import { Route, Routes } from "react-router-dom";

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="admin" element={<LayoutAdmin />}>
                    <Route index element={<Dashboard />} />
                </Route>
                {/* Đăng nhập và Đăng ký */}
                <Route path="/register" element={<RegisterPages />} />
                <Route path="/login" element={<LoginPages />} />
            </Routes>
        </>
    );
};

export default Router;
