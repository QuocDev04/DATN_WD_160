import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const LayoutAdmin: React.FC = () => {
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState<string>("Dashboard");
    const [isSidebarHidden, setSidebarHidden] = useState<boolean>(false);

    // Update active menu based on the current location
    useEffect(() => {
        const path = location.pathname;
        if (path.includes("/admin/product")) {
            setActiveMenu("List");
        } else if (path.includes("/admin/user")) {
            setActiveMenu("User");
        } else if (path.includes("/admin/service")) {
            setActiveMenu("Service");
        } else if (path.includes("/admin/room")) {
            setActiveMenu("Room")
        } else if (path.includes("/admin/category")) {
            setActiveMenu("Category")
        }
        else {
            setActiveMenu("Dashboard");
        }
    }, [location]);

    const handleMenuClick = (menu: string) => {
        setActiveMenu(menu);
    };

    const toggleSidebar = () => {
        setSidebarHidden(!isSidebarHidden);
    };

    return (
        <>
            <div>
                <section id="sidebar" className={isSidebarHidden ? "hide" : ""}>
                    <Link to={'/admin'} className="brand">
                        <i className="bx bxs-smile" />
                        <span className="text">Admin</span>
                    </Link>
                    <ul className="side-menu top">
                        <li className={activeMenu === "Dashboard" ? "active" : ""}>
                            <Link to={'/admin'} onClick={() => handleMenuClick("Dashboard")}>
                                <i className="bx bxs-dashboard" />
                                <span className="text">Thống Kê</span>
                            </Link>
                        </li>
                        <li className={activeMenu === "List" ? "active" : ""}>
                            <Link to={"/admin/product"} onClick={() => handleMenuClick("List")}>
                                <i className="bx bxs-shopping-bag-alt" />
                                <span className="text">Danh Sách Sản Phẩm</span>
                            </Link>
                        </li>
                        <li className={activeMenu === "User" ? "active" : ""}>
                            <Link to={'/admin/user'} onClick={() => handleMenuClick("User")}>
                                <i className="bx bxs-doughnut-chart" />
                                <span className="text">Danh Sách Người Dùng</span>
                            </Link>
                        </li>
                        <li className={activeMenu === "Service" ? "active" : ""}>
                            <Link to={'/admin/service'} onClick={() => handleMenuClick("Service")}>
                                <i className="bx bxs-doughnut-chart" />
                                <span className="text">Danh Sách Dịch Vụ</span>
                            </Link>
                        </li>
                        <li className={activeMenu === "Room" ? "active" : ""}>
                            <Link to={'/admin/room'} onClick={() => handleMenuClick("Room")}>
                                <i className="bx bxs-doughnut-chart" />
                                <span className="text">Danh Sách Phòng</span>
                            </Link>
                        </li>
                        <li className={activeMenu === "Category" ? "active" : ""}>
                            <Link to={'/admin/category'} onClick={() => handleMenuClick("Category")}>
                                <i className="bx bxs-doughnut-chart" />
                                <span className="text">Danh Sách Danh Mục</span>
                            </Link>
                        </li>
                    </ul>
                </section>
                <section id="content">
                    <nav>
                        <i className="bx bx-menu" onClick={toggleSidebar} />
                        <a href="#" className="nav-link">Categories</a>
                        <form action="#">
                            <div className="form-input">
                                <input type="search" placeholder="Search..." />
                                <button type="submit" className="search-btn">
                                    <i className="bx bx-search" />
                                </button>
                            </div>
                        </form>
                        <input type="checkbox" id="switch-mode" hidden />
                        <label htmlFor="switch-mode" className="switch-mode" />
                        <a href="#" className="notification">
                            <i className="bx bxs-bell" />
                            <span className="num">8</span>
                        </a>
                        <a href="#" className="profile">
                            <img src="img/people.png" alt="profile" />
                        </a>
                    </nav>
                    <main>
                        <Outlet />
                    </main>
                </section>
            </div>
        </>
    );
};

export default LayoutAdmin;
