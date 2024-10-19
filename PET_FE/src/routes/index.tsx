
import LoginPages from "@/components/login/login";
import RegisterPages from "@/components/register/register";
import Dashboard from "@/pages/(dashboard)/dashboard/page";
import LayoutAdmin from "@/pages/(dashboard)/layout";
import ProductAddPage from "@/pages/(dashboard)/products/add";
import ProductEditPage from "@/pages/(dashboard)/products/edit";
import ProductPage from "@/pages/(dashboard)/products/list";
import EditUser from "@/pages/(dashboard)/user/edit";
import ListUser from "@/pages/(dashboard)/user/list";
import { Route, Routes } from "react-router-dom";

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="admin" element={<LayoutAdmin />}>
                    <Route index path="/admin" element={<Dashboard />} />
                    {/* User */}
                    <Route path="user" element={<ListUser />} />
                    <Route path="user/:id" element={<EditUser />} />
                    {/** Product */}
                    <Route path="product" element={<ProductPage />} />
                    <Route path="add" element={<ProductAddPage />} />
                    <Route path=":id/edit" element={<ProductEditPage />} />
                </Route>
                <Route path="register" element={<RegisterPages />} />
                <Route path="login" element={<LoginPages />} />
            </Routes>

        </>
    );
};
export default Router;
