
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
import RoomBookingForm from "@/pages/(website)/bookingroom/bookingform";
import BookingPage from "@/pages/(website)/bookingroom/bookingpage";
import CheckoutPage from "@/pages/(website)/bookingroom/checkoutpage";
import HomePages from "@/pages/(website)/home/pages";
import HotlinePage from "@/pages/(website)/hotline/pages";
import PetMagazine from "@/pages/(website)/petMagazine/pages";
import ShopIntroduction from "@/pages/(website)/Shopintroduction/pages";
import Layout from "@/pages/layout";
import { Route, Routes } from "react-router-dom";

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/register" element={<RegisterPages />} />
                <Route path="/signin" element={<LoginPages />} />
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
                    {/* Booking */}
                    <Route path="bookingform" element={<RoomBookingForm />} />
                    <Route path="bookingpage" element={<BookingPage />} />
                    <Route path="checkoutpage" element={<CheckoutPage />} />
                </Route>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePages />} />
                    <Route path="/PetMagazine" element={<PetMagazine />} />
                    <Route path="/Shop" element={<ShopIntroduction />} />
                    <Route path="/Hotline" element={<HotlinePage />} />
                </Route>
                <Route path="register" element={<RegisterPages />} />
                <Route path="login" element={<LoginPages />} />
            </Routes>
        </>
    );
};
export default Router;
