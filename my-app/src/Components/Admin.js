import React, { Component } from "react";
import MainPageNav from "./MainPageNav";
import { NavLink } from "react-router-dom";

class Admin extends Component{
    constructor(pros){
      super(pros)
      this.state = {
        "option": "trang chủ"
      }
    }
    render(){
        return(
            <div>
        <header id="header" className="header fixed-top d-flex align-items-center">
          <div className="d-flex align-items-center justify-content-between">
            <a href="index.html" className="logo d-flex align-items-center">
              <img src="./img/logo.png" alt="" />
              <span className="d-none d-lg-block">Hotel management</span>
            </a>
          </div>{/* End Logo */}
          <nav className="header-nav ms-auto">
            <ul className="d-flex align-items-center">
              <li className="nav-item dropdown pe-3">
                <div className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                  <span className="d-none d-md-block dropdown-toggle ps-2">Admin</span>
                </div>{/* End Profile Iamge Icon */}
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                  <li className="dropdown-header">
                    <h6>{localStorage.getItem("EmployeeName")}</h6>
                    <span>{localStorage.getItem("Role")}</span>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                      <i className="bi bi-person" />
                      <span>My Profile</span>
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                      <i className="bi bi-gear" />
                      <span>Account Settings</span>
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item d-flex align-items-center" href="pages-faq.html">
                      <i className="bi bi-question-circle" />
                      <span>Need Help?</span>
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item d-flex align-items-center" href="../App.js" onClick={() => localStorage.removeItem("Token")}>
                      <i className="bi bi-box-arrow-right" />
                      <span>Sign Out</span>
                    </a>
                  </li>
                </ul>{/* End Profile Dropdown Items */}
              </li>{/* End Profile Nav */}
            </ul>
          </nav>{/* End Icons Navigation */}
        </header>{/* End Header */}
        {/* ======= Sidebar ======= */}
        <aside id="sidebar" className="sidebar">
          <ul className="sidebar-nav" id="sidebar-nav">
            <li className="nav-item">
              <NavLink to="/Services" className="nav-link collapsed">
                <i className="bi bi-layout-text-window-reverse" /><span>Quản lý dịch vụ</span>
              </NavLink>
            </li>{/* End quản lý dịch vụ Nav */}
            <li className="nav-item">
              <NavLink to="/Rooms" className="nav-link collapsed">
                <i className="bi bi-bar-chart" /><span>Quản lý thông tin phòng</span>
              </NavLink>
            </li>{/* End quản lý thông tin phòng Nav */}
            <li className="nav-item">
              <NavLink to="/Accounts" className="nav-link collapsed">
                <i class="bi bi-person"></i>
                <span>Quản lý tài khoản</span>
              </NavLink>
            </li>
          </ul>
        </aside>
        <main id="main" classname="main">
          <MainPageNav/>
        </main>
      </div>
        );
    }
}
export default Admin;