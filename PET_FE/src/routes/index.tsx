
import Dashboard from "@/pages/(dashboard)/dashboard/page";
import LayoutAdmin from "@/pages/(dashboard)/layout";
import ProductAddPage from "@/pages/(dashboard)/products/add";
import ProductPage from "@/pages/(dashboard)/products/list";
import EditUser from "@/pages/(dashboard)/user/edit";
import ListUser from "@/pages/(dashboard)/user/list";
import { Route, Routes } from "react-router-dom";

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="admin" element={<LayoutAdmin />}>
                    <Route index element={<Dashboard />} />
                    {/* User */}
                    <Route path="user" element={<ListUser />} />
                    <Route path="user/:id" element={<EditUser />} />
                    {/** Product */}
                    <Route path="product" element={<ProductPage />} />
                    <Route path="add" element={<ProductAddPage />} />
                </Route>
            </Routes>

        </>
    );
};
export default Router;
