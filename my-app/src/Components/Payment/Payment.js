import React, { Component } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Swal from 'sweetalert2';

class Payment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "data": [],
            "dataCustomer": [],
            CMT: "",
            ThanhToan: [],
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

    renderItem_OrderRoom() {
        console.log(this.state.data);
        return this.state.data.map((item) => {
            return (
                <tr>
                    <td>{item.tenPhong}</td>
                    <td>{this.formatDateDisplay(item.ngayBatDau)}</td>
                    <td>{this.formatDateDisplay(item.ngayKetThuc)}</td>
                </tr>

            );
        });
    }

    renderthead_OrderRoom() {
        return (
            <thead>
                <tr>
                    <th>Tên phòng</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                </tr>
            </thead>
        );
    }

    renderItem_OrderService() {
        console.log(this.state.data);
        return this.state.data.map((item) => {
            return (
                <tr>
                    <td>{item.tenDV}</td>
                    <td>{this.formatDateDisplay(item.thoiGianGoi)}</td>
                </tr>

            );
        });
    }

    renderthead_OrderService() {
        return (
            <thead>
                <tr>
                    <th>Tên dịch vụ</th>
                    <th>Thời gian gọi</th>
                </tr>
            </thead>
        );
    }

    updateBill(cmt) {
        let config = this.getConfigToken();
        let url = "https://localhost:5001/api/v1/Bills?customerID=" + cmt;
        axios.put(url, cmt, config)
            .then((response) => {
                if (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Thanh toán thành công',
                        showConfirmButton: true
                    });
                }
            })
            .catch(error => {
                if (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: 'Thanh toán thất bại!'
                    });
                }
            });
    }

    handleUpdate = () => {
        const cmt = this.props.CMT;
        return (
            <div>
                {Swal.fire({
                    title: 'Bạn có muốn thanh toán hóa đơn này không?',
                    showDenyButton: false,
                    showCancelButton: true,
                    confirmButtonText: 'Có',
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.updateBill(cmt);
                    }
                })}
            </div>
        );
    }

    getData(url) {
        let config = this.getConfigToken();
        axios.get(url, config)
            .then((response) => {
                this.setState({
                    data: response.data
                })
            });
    }

    getPayment(url) {
        let config = this.getConfigToken();
        axios.get(url, config)
            .then((response) => {
                this.setState({
                    ThanhToan: response.data
                })
            });
    }

    renderPayment() {
        console.log(this.state.ThanhToan);
        return this.state.ThanhToan.map((item) => {
            return (
                <b>{this.formatMoney(item.thanhToan)}</b>
            );
        });
    }

    renderCustomer = () => {
        return this.state.ThanhToan.map((item) => {
            return (
                <div style={{ fontSize: 20 }}>
                    <p style={{ marginBottom: 10 }}>Khách hàng: {item.hoTen}</p>
                    <p style={{ marginBottom: 10 }}>Số chứng minh thư: {item.soCMTKhachHang}</p>
                    <p style={{ marginBottom: 10 }}>Địa chỉ: {item.diaChi}</p>
                    <p style={{ marginBottom: 10 }}>Điện thoại: {item.sdt}</p>
                </div>
            );
        });
    }

    componentDidMount = () => {
        this.handleValue()
    }

    handleValue = () => {
        const value = this.props.CMT;
        let url = "https://localhost:5001/api/v1/Bills/GetBillByGuestID?guestID=" + value;
        let url_Payment = "https://localhost:5001/api/v1/Bills/GetPayment?customerID=" + value;
        this.getData(url);
        this.getPayment(url_Payment);
    }

    formatDateDisplay = dateSrc => {
        let date = new Date(dateSrc),
            year = date.getFullYear().toString(),
            month = (date.getMonth() + 1).toString().padStart(2, '0'),
            day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    // Hàm format số tiền
    formatMoney = moneyinput => {
        let money = Math.round(moneyinput);
        if(money && !isNaN(money)){
            return money.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
        }else{
            return money;
        }
    }

    // In hóa đơn
    printDocument = () => {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'pt', 'a4');
                pdf.addImage(imgData, 'PNG', 0, 0, 680, 0, undefined, false);
                pdf.save(this.props.CMT+".pdf");
            })
    }

    render() {
        return (
            <div className="page_right-content">
                <div id="divToPrint" style={{ padding: 20 }}>
                    <div style={{ textAlign: 'center' }}>
                        <b style={{ fontSize: 30 }}>Khách sạn Feathers Angel</b>
                        <p style={{ fontSize: 20 }}>Địa chỉ: 850 Đ. Láng, Trung Hoà, Đống Đa, Hà Nội, Việt Nam</p>
                        <p style={{ fontSize: 20 }}>Điện thoại: 0123456789</p>
                        <br />
                        <b style={{ fontSize: 25 }}>HÓA ĐƠN</b>
                    </div>
                    <br />
                    <div style={{ fontSize: 20 }}>
                        {this.renderCustomer()}
                    </div>
                    <br />
                    <table style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }}>
                        {this.renderthead_OrderRoom()}
                        <tbody>
                            {this.renderItem_OrderRoom()}
                        </tbody>
                    </table>
                    <table style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }}>
                        {this.renderthead_OrderService()}
                        <tbody>
                            {this.renderItem_OrderService()}
                        </tbody>
                    </table>
                    <p style={{ fontSize: 25 }}>Tổng tiền: {this.renderPayment()}</p>
                    <br />
                    <p style={{ textAlign: 'center', fontSize: 20 }}>Cảm ơn quý khách và hẹn gặp lại</p>
                </div>
                <div className="flex_right">
                <button className="btn btn-primary" onClick={this.printDocument}><i class="fa-solid fa-print"></i></button>
                <button className="btn btn-dark" onClick={this.props.turnOnPayment}><i class="fa-solid fa-backward"></i></button>
                <button className="btn btn-success" onClick={this.handleUpdate}><i class="fa-solid fa-money-check-dollar"></i> Thanh toán</button>
                </div>
            </div>
        )
    };
}
export default Payment;