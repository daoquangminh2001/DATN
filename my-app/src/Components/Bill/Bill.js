import React, { Component } from "react";
import axios from "axios";
import Payment from "../Payment/Payment";



class Bill extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "data": [],
            pageNumber: 1,
            showPayment: false,
            showList: true,
            showReport: false,
            CMT: "",
        }
    }
    getConfigToken() {
        let config = {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("Token"),
                "Content-type": "application/json"
            }
        };
        return config;
    }
    getData(url) {
        let config = this.getConfigToken();
        axios.get(url, config)
            .then((response) => {
                this.setState({
                    data: response.data
                })
                console.log(response)
            });
    }


    componentDidMount = (url = "https://localhost:5001/api/v1/Bills") => {
        this.getData(url);
    }

    turnOnPayment = (cmt) => {
        this.setState({
            showList: !this.state.showList,
            CMT: cmt
        })
    }

    renderbuttonThanhToan(status, cmt) {
        if (status === "Chưa thanh toán") {
            return (<td>
                <div className="flex_center">
                    <div className="pay flex_center" commandtype="pay" onClick={(e) => { this.turnOnPayment(cmt) }}>
                    <i class="fa-solid fa-receipt"></i>
                    </div></div>
            </td>);
        }
        else{
            return (<td>
                <div className="flex_center">
                    <div className="pay flex_center" commandtype="pay">
                        <i class="fa-solid fa-check"></i>
                    </div></div>
            </td>);
        }
    }

    renderItem() {
        console.log(this.state.data);
        return this.state.data.map((item) => {
            return (
                <tr>
                    <td>{item.hoTen}</td>
                    <td>{item.soCMTKhachHang}</td>
                    <td>{item.tenPhong}</td>
                    <td>{item.tenDV}</td>
                    <td>{item.trangThai}</td>
                    {this.renderbuttonThanhToan(item.trangThai, item.soCMTKhachHang)}
                </tr>

            );
        });
    }

    renderthead() {
        return (
            <thead>
                <tr>
                    <th>Họ tên</th>
                    <th>Số CMT khách hàng</th>
                    <th>Tên phòng</th>
                    <th>Tên dịch vụ</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
        );
    }

    rendertReporthead() {
        return (
            <thead>
                <tr>
                    <th>Họ tên</th>
                    <th>Số CMT khách hàng</th>
                    <th>Tên phòng</th>
                    <th>Tên dịch vụ</th>
                    <th>Trạng thái</th>
                    <th>Tiền</th>
                </tr>
            </thead>
        );
    }

    renderReportItem() {
        console.log(this.state.data);
        return this.state.data.map((item,index) => {
            return (
                <tr>
                    <td>{item.hoTen}</td>
                    <td>{item.soCMTKhachHang}</td>
                    <td>{item.tenPhong}</td>
                    <td>{item.tenDV}</td>
                    <td>{item.trangThai}</td>
                    <td>{ (index + 1) * 10000}</td>
                </tr>
            );
        });
    }

    //UPDATE THÊM NÚT REFRESH
    handleRefresh() {
        this.componentDidMount("https://localhost:5001/api/v1/Bills")
    }


    render() {
        if (this.state.showReport === true) {
            return (
                <div className="page_right-content">
                    <div className="toolbar" id="toolbar">
                            <div className="section1 flex_center">
                                <h1 className="title_content">Báo cáo</h1>
                            </div>
                            <div className="flex_right">
                            <div className="search_option">
                                <p>Từ ngày</p>
                                <input type="date" className="form-control" id="NgayDen"
                                 onChange={(e) => {}}
                                />
                            </div>
                            <div className="search_option">
                                <p>Đến ngày</p>
                                <input type="date" className="form-control" id="NgayDen"
                                onChange={(e) => {}}
                                />
                            </div>
                            <div className="flex_center ml-3">
                                    <button className="btn btn-primary" onClick={() => this.setState({
                                        showReport: false
                                    })}>
                                        Danh sách hóa đơn
                                    </button>
                                </div>
                            </div>
                            
                    </div>
                    <div className="section3 tables" id="billGrid" toolbar="toolbar" show_option="show_option">
                        <table>
                            {this.rendertReporthead()}
                            <tbody>
                                {this.renderReportItem()}
                                <tr>
                                    <td colSpan={5}>Tổng tiền</td>
                                    <td colSpan={1}>100000000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        } else if (this.state.showList === true) {
            return (
                <div className="page_right-content">
                    <div className="toolbar" id="toolbar">
                        <div className="section1 flex_center">
                            <h1 className="title_content">Danh sách hóa đơn</h1>
                        </div>

                        {/* UPDATE THÊM NÚT REFRESH */}
                        <div className="flex_right">

                            <div className="refresh flex_center" commandtype="refresh" onClick={() => this.handleRefresh()}>
                                <div className="refresh_icon">
                                    <i class="fa-solid fa-arrows-rotate"></i>
                                </div>
                            </div>
                            <div className="flex_center ml-3">
                                <button className="btn btn-primary" onClick={() => this.setState({
                                    showReport: true
                                })}>
                                    Xuất hóa đơn
                                </button>
                            </div>
                        </div>
                         
                    </div>
                    <div className="section3 tables" id="billGrid" toolbar="toolbar" show_option="show_option">
                        <table>
                            {this.renderthead()}
                            <tbody>
                                {this.renderItem()}
                            </tbody>
                        </table>
                    </div>
                    <div>

                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Payment
                        turnOnPayment={this.turnOnPayment}
                        CMT={this.state.CMT}
                    />
                </div>
            )
        }
    }
}
export default Bill;