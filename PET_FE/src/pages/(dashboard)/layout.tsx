import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const LayoutAdmin: React.FC = () => {
    const [activeMenu, setActiveMenu] = useState<string>("Dashboard");
    const [isSidebarHidden, setSidebarHidden] = useState<boolean>(false);

    // Handle the active menu click
    const handleMenuClick = (menu: string) => {
        setActiveMenu(menu);
    };

    // Toggle sidebar visibility
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
                        <li className={activeMenu === "Analytics" ? "active" : ""}>
                            <Link to={'/admin/user'} onClick={() => handleMenuClick("Analytics")}>
                                <i className="bx bxs-doughnut-chart" />
                                <span className="text">Danh Sách Người Dùng</span>
                            </Link>
                        </li>
                    </ul>
                </section>

                <section id="content">
                    <nav>
                        <i className="bx bx-menu" onClick={toggleSidebar} />
                        <a href="#" className="nav-link">
                            Categories
                        </a>
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
                       <Outlet/>
                    </main>
                </section>
            </div>
        </>
    );
};

export default LayoutAdmin;
