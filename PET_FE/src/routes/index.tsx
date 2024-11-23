
import PagesBillRoom from "@/pages/(dashboard)/billbkingroom/pages";
import CategoryAdd from "@/pages/(dashboard)/category/add";
import CategoryEdit from "@/pages/(dashboard)/category/edit";
import CategoryList from "@/pages/(dashboard)/category/list";
import Dashboard from "@/pages/(dashboard)/dashboard/page";
import LayoutAdmin from "@/pages/(dashboard)/layout";
import ProductAddPage from "@/pages/(dashboard)/products/add";
import ProductEditPage from "@/pages/(dashboard)/products/edit";
import ProductPage from "@/pages/(dashboard)/products/list";
import RoomAdd from "@/pages/(dashboard)/room/add";
import RoomEditPage from "@/pages/(dashboard)/room/edit";
import ListRoom from "@/pages/(dashboard)/room/list";
import ServiceAddPage from "@/pages/(dashboard)/service/add";
import ServiceEditPage from "@/pages/(dashboard)/service/edit";
import ListService from "@/pages/(dashboard)/service/list";
import EditUser from "@/pages/(dashboard)/user/edit";
import ListUser from "@/pages/(dashboard)/user/list";
import LoginPages from "@/pages/(website)/auth/login/login";
import RegisterPages from "@/pages/(website)/auth/register/register";
import PagesBookingRoom from "@/pages/(website)/bookingRoom/pages";
import ProductDetailPage from "@/pages/(website)/detail/pages";
import DetalRoom from "@/pages/(website)/detailRoom/pages";
import HomePages from "@/pages/(website)/home/pages";
import HotlinePage from "@/pages/(website)/hotline/pages";
import Inormation from "@/pages/(website)/Inormation/pages";
import MagazineDetail from "@/pages/(website)/petMagazine/_component/Right/detailmagazine/detailmagazine";
import PetMagazine from "@/pages/(website)/petMagazine/pages";
import Pages from "@/pages/(website)/Product/pages";
import Room from "@/pages/(website)/room/pages";
import RoomPageComponent from "@/pages/(website)/roompages/pages";
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
                    <Route path="productadd" element={<ProductAddPage />} />
                    <Route path="product/:id" element={<ProductEditPage />} />
                    {/** Service */}
                    <Route path="service" element={<ListService />} />
                    <Route path="serviceAdd" element={<ServiceAddPage />} />
                    <Route path="service/:id" element={<ServiceEditPage />} />
                    {/* {Room} */}
                    <Route path="room" element={<ListRoom />} />
                    <Route path="room/:id" element={<RoomEditPage />} />
                    <Route path="roomadd" element={<RoomAdd />} />
                    {/* {Category} */}
                    <Route path="category" element={<CategoryList />} />
                    <Route path="categoryadd" element={<CategoryAdd />} />
                    <Route path="category/:id" element={<CategoryEdit />} />
                    <Route path="bill" element={<PagesBillRoom />} />

                   
                </Route>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePages />} />
                    <Route path="PetMagazine" element={<PetMagazine />} />
                    <Route path="Shop" element={<ShopIntroduction />} />
                    <Route path="Hotline" element={<HotlinePage />} />
                    <Route path="/Detailservice/:id" element={<ProductDetailPage />} />
                    <Route path="Room" element={<Room />} />
                    <Route path="Roompages" element={<RoomPageComponent />} />
                    <Route path="Roompages/:id" element={<DetalRoom />} />
                    <Route path="BookingRoompages/:userId/:id" element={<PagesBookingRoom />} />
                    <Route path="/magazine/:id" element={<MagazineDetail />} />
                    <Route path="product" element={<Pages />} />
                    <Route path="profile" element={<Inormation/>}/>
                </Route>
                <Route path="register" element={<RegisterPages />} />
                <Route path="login" element={<LoginPages />} />
            </Routes>
        </>
    );
};
export default Router;
