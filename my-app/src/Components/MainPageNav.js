import React, { Component } from "react";
import Guest from "./Guest/Guest";
import Service from "./Service/Service";
import Account from "./Account/Account";
import Room from "./Room/Room";
import OrderRoom from "./OrderRoom/OrderRoom";
import Bill from "./Bill/Bill";
import OrderService from "./OrderService/OrderService";
import HomePage from "./HomePage";
import { Route, Routes } from "react-router-dom";

class MainPageNav extends Component{
    render(){

        return(
        <Routes>
            <Route path="/HomePage" element={<HomePage/>}></Route>
            <Route path="/guests" element={<Guest/>}></Route>
            <Route path="/OrderRoom" element={<OrderRoom/>}></Route>
            <Route path="/OrderService" element={<OrderService/>}></Route>
            <Route path="/Services" element={<Service/>}></Route>
            <Route path="/Rooms" element={<Room/>}></Route>
            <Route path="/Bills" element={<Bill/>}></Route>
            <Route path="/Accounts" element={<Account/>}></Route>
        </Routes>
        );
    }
}
export default MainPageNav;