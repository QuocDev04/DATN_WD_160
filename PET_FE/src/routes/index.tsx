

import Dashboard from "@/pages/(dashboard)/dashboard/page";
import LayoutAdmin from "@/pages/(dashboard)/layout";
import ProductAddPage from "@/pages/(dashboard)/products/add";
import ProductEditPage from "@/pages/(dashboard)/products/edit";
import ProductPage from "@/pages/(dashboard)/products/list";
import ListRoom from "@/pages/(dashboard)/room/list";
import ServiceAddPage from "@/pages/(dashboard)/service/add";
import ServiceEditPage from "@/pages/(dashboard)/service/edit";
import ListService from "@/pages/(dashboard)/service/list";
import EditUser from "@/pages/(dashboard)/user/edit";
import ListUser from "@/pages/(dashboard)/user/list";
import LoginPages from "@/pages/(website)/auth/login/login";
import RegisterPages from "@/pages/(website)/auth/register/register";
import HomePages from "@/pages/(website)/home/pages";
import Layout from "@/pages/layout";
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
                    {/** Service */}
                    <Route path="service" element={<ListService />} />
                    <Route path="serviceAdd" element={<ServiceAddPage />} />
                    <Route path=":id/serviceEdit" element={<ServiceEditPage />} />
                    {/* {Room} */}
                    <Route path="room" element={<ListRoom />} />
                </Route>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePages />} />
                </Route>
                <Route path="register" element={<RegisterPages />} />
                <Route path="login" element={<LoginPages />} />
            </Routes>

        </>
    );
};
export default Router;
