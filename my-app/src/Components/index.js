import React, { Component } from "react";
import MainPageNav from "./MainPageNav";
import $, { get } from "jquery";
import { Route, Routes, NavLink, Link } from "react-router-dom";

class Index extends Component{
    constructor(pros){
      super(pros)
      this.state = {
        "option": "trang chủ"
      }
    }
    selectOptionsEvent(target){
      $("#sidebar-nav").find(".nav-link").addClass("collapsed");
      $("#sidebar-nav").find(".nav-dropdown").removeClass("active");
      $(target).closest(".nav-link").toggleClass("collapsed");
    }
    selectDropDownItem(target){
      $("#sidebar-nav").find(".nav-link").addClass("collapsed");
      $("#sidebar-nav").find(".nav-dropdown").removeClass("active");
      $(target).closest(".nav-dropdown").toggleClass("active");
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
            <i className="bi bi-list toggle-sidebar-btn"/>
          </div>{/* End Logo */}
          <div className="search-bar">
            <form className="search-form d-flex align-items-center" method="POST" action="#">
              <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
              <button type="submit" title="Search"><i className="bi bi-search" /></button>
            </form>
          </div>{/* End Search Bar */}
          <nav className="header-nav ms-auto">
            <ul className="d-flex align-items-center">
              <li className="nav-item d-block d-lg-none">
                <a className="nav-link nav-icon search-bar-toggle " href="#">
                  <i className="bi bi-search" />
                </a>
              </li>{/* End Search Icon*/}
              <li className="nav-item dropdown">
                <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                  <i className="bi bi-bell" />
                  <span className="badge bg-primary badge-number">4</span>
                </a>{/* End Notification Icon */}
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                  <li className="dropdown-header">
                    You have 4 new notifications
                    <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="notification-item">
                    <i className="bi bi-exclamation-circle text-warning" />
                    <div>
                      <h4>Lorem Ipsum</h4>
                      <p>Quae dolorem earum veritatis oditseno</p>
                      <p>30 min. ago</p>
                    </div>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="notification-item">
                    <i className="bi bi-x-circle text-danger" />
                    <div>
                      <h4>Atque rerum nesciunt</h4>
                      <p>Quae dolorem earum veritatis oditseno</p>
                      <p>1 hr. ago</p>
                    </div>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="notification-item">
                    <i className="bi bi-check-circle text-success" />
                    <div>
                      <h4>Sit rerum fuga</h4>
                      <p>Quae dolorem earum veritatis oditseno</p>
                      <p>2 hrs. ago</p>
                    </div>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="notification-item">
                    <i className="bi bi-info-circle text-primary" />
                    <div>
                      <h4>Dicta reprehenderit</h4>
                      <p>Quae dolorem earum veritatis oditseno</p>
                      <p>4 hrs. ago</p>
                    </div>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="dropdown-footer">
                    <a href="#">Show all notifications</a>
                  </li>
                </ul>{/* End Notification Dropdown Items */}
              </li>{/* End Notification Nav */}
              <li className="nav-item dropdown">
                <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                  <i className="bi bi-chat-left-text" />
                  <span className="badge bg-success badge-number">3</span>
                </a>{/* End Messages Icon */}
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                  <li className="dropdown-header">
                    You have 3 new messages
                    <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="message-item">
                    <a href="#">
                      <img src="./img/messages-1.jpg" alt="" className="rounded-circle" />
                      <div>
                        <h4>Maria Hudson</h4>
                        <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                        <p>4 hrs. ago</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="message-item">
                    <a href="#">
                      <img src="./img/messages-2.jpg" alt="" className="rounded-circle" />
                      <div>
                        <h4>Anna Nelson</h4>
                        <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                        <p>6 hrs. ago</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="message-item">
                    <a href="#">
                      <img src="./img/messages-3.jpg" alt="" className="rounded-circle" />
                      <div>
                        <h4>David Muldon</h4>
                        <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                        <p>8 hrs. ago</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="dropdown-footer">
                    <a href="#">Show all messages</a>
                  </li>
                </ul>{/* End Messages Dropdown Items */}
              </li>{/* End Messages Nav */}
              <li className="nav-item dropdown pe-3">
                <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                  <img src="./img/profile-img.jpg" alt="Profile" className="rounded-circle" />
                  <span className="d-none d-md-block dropdown-toggle ps-2">{this.props.userName}</span>
                </a>{/* End Profile Iamge Icon */}
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                  <li className="dropdown-header">
                    <h6>{localStorage.getItem("EmployeeName")}</h6>
                    <span>{localStorage.getItem("Role")}</span>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                      <i className="bi bi-person" />
                      <span>My Profile</span>
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                      <i className="bi bi-gear" />
                      <span>Account Settings</span>
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                      <i className="bi bi-question-circle" />
                      <span>Need Help?</span>
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item d-flex align-items-center" href="../Login.js" onClick={() => localStorage.removeItem("Token")}>
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
              <NavLink to="/HomePage" className="nav-link collapsed">
                <i className="bi bi-grid" />
                <span>Quản lý khách sạn</span>
              </NavLink>
            </li>{/* End Dashboard Nav */}
            <li className="nav-item">
              <NavLink to="/guests" className="nav-link collapsed">
                <i className="bi bi-menu-button-wide" /><span>Quản lý khách hàng</span>
              </NavLink>
            </li>{/* End Quản lý khách hàng Nav */}
            <li className="nav-item">
              <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#" >
                <i className="bi bi-journal-text" /><span>Quản lý giao dịch</span><i className="bi bi-chevron-down ms-auto" />
              </a>
              <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                <li>
                  <NavLink to="/OrderRoom" className="nav-link collapsed">
                    <i className="bi bi-circle" /><span>Thuê Phòng</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/OrderService" className="nav-link collapsed">
                    <i className="bi bi-circle" /><span>Gọi dịch vụ</span>
                  </NavLink>
                </li>
              </ul>
            </li>{/* End quản lý giao dịch Nav */}
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
              <NavLink to="/Bills" className="nav-link collapsed">
                <i className="bi bi-gem" /><span>Quản lý hóa đơn</span>
              </NavLink>
            </li>{/* End quản lý hóa đơn Nav */}
          </ul>
        </aside>
        <main id="main" classname="main">
          <MainPageNav/>
        </main>
      </div>
        );
    }
}
export default Index;