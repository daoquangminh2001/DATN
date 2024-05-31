import React, {Component} from "react";
import $ from "jquery";
import axios from "axios";
import Index from ".";
import Admin from "./Admin";
import Swal from "sweetalert2";

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            "isLogin": false,
            "userName": "admin"
        }
    }
    validateLogin(username, password){
        let isValid = true;
        // Thêm validate username
        let errorOfUsername = "";
        if (username === "") {
            errorOfUsername = errorOfUsername + "Tên đăng nhập không được bỏ trống!\n";
        }
        // Thêm validate password
        let errorOfPass = "";
        if (password === "") {
            errorOfPass = errorOfPass + "Mật khẩu không được bỏ trống!\n";
        }
        // Thêm hiện các dòng validate
        if (errorOfUsername || errorOfPass) {
            Swal.fire(
                'Cảnh báo\n\n Dữ liệu không hợp lệ',
                '',
                'error'
            )
            document.getElementById("errorOfUsername").innerHTML = typeof errorOfUsername === "undefined" ? "" : errorOfUsername;
            document.getElementById("errorOfPass").innerHTML = typeof errorOfPass === "undefined" ? "" : errorOfPass;
            isValid = false;
        }
        return isValid;
    }
    handleLogin(username, password){
        if(this.validateLogin(username, password)){
            var acc = {UserName: username, PassWord: password}
            axios.post("https://localhost:5001/api/v1/Accounts/login", acc, { "Content-Type": "json" })
            .then((response) => {
                localStorage.setItem("Token", response.data.token);
                localStorage.setItem("Role", response.data.role);
                localStorage.setItem("UserName", response.data.user_name);
                localStorage.setItem("EmployeeName", response.data.hoTen);
                this.setState({
                    isLogin: true,
                    userName: response.data.user_name
                })
            })
            .catch((err) => {
                Swal.fire("Sai tên đăng nhập hoặc Mật khẩu!")
            });
        }
    }
    
    render(){
        const errorLabel = {
            color: "red",
            padding: "10px",
        }
        if(this.state.isLogin){
            if(localStorage.getItem("Role") === "Nhân Viên"){
                return(
                    <Index
                    HandleSelectOptions = {this.props.selectOptionsEvent}
                    userName = {this.state.userName}/>
                );
            }
            else{
                return(
                    <Admin
                    HandleSelectOptions = {this.props.selectOptionsEvent}/>
                );
            }
        }
        else{
            return(
                <div className="container">
                    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                            <div className="d-flex justify-content-center py-4">
                            <a href="index.html" className="logo d-flex align-items-center w-auto">
                                <img src="assets/img/logo.png" alt="" />
                                <span className="d-none d-lg-block">Hotel management</span>
                            </a>
                            </div>{/* End Logo */}
                            <div className="card mb-3">
                            <div className="card-body">
                                <div className="pt-4 pb-2">
                                <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                <p className="text-center small">Enter your username &amp; password to login</p>
                                </div>
                                {/* form */}
                                <form className="row g-3 needs-validation" noValidate>
                                <div className="col-12">
                                    <label htmlFor="yourUsername" className="form-label">Username</label>
                                    <div className="input-group has-validation">
                                    <span className="input-group-text" id="inputGroupPrepend">@</span>
                                    <input type="text" name="username" className="form-control" id="yourUsername" 
                                    onChange={(e) => $(e.target).removeClass("active")}/>
                                    {/* Thêm validate tên đăng nhập */}
                                    <label style={errorLabel} id="errorOfUsername"></label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="yourPassword" className="form-label">Password</label>
                                    <input type="password" name="password" className="form-control" id="yourPassword" 
                                    onChange={(e) => $(e.target).removeClass("active")} />
                                    {/* Thêm validate Mật khẩu */}
                                    <label style={errorLabel} id="errorOfPass"></label>
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-primary w-100" type="button" onClick={() => this.handleLogin($("#yourUsername").val(), $("#yourPassword").val())}>Login</button>
                                </div>
                                </form>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </section>
                </div>
            );
        }
    }
}
export default Login;