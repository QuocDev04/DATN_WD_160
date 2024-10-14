import AdminLayout from "@/pages/(dashboard)/layout";
import SignIn from "@/pages/Login";
import SignUp from "@/pages/Register";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="admin" element={<AdminLayout />}></Route>
      <Route path="signup" element={<SignUp />}></Route>
      <Route path="login" element={<SignIn />}></Route>
    </Routes>
  );
};
export default Router;
