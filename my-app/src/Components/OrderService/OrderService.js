import React, { Component } from "react";
import axios from "axios";
import Swal from 'sweetalert2'; //UPDATE sweetalert2

class OrderService extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            CMT: "",
            TenPhong: "",
            DVID: "",
            ThoiGianGoi: ""
        }
    }

    getConfigToken(){
        let config = {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("Token"),
                "Content-type": "application/json"
              }
        };
        return config;
    }
    
      // GET API
      getData(url) {
        let config = this.getConfigToken();
        axios.get(url, config).then((response) => {
          this.setState({
            data: response.data,
          });
        });
      }


    // UPDATE LẠI postData
    postData(url) {
        let config = this.getConfigToken();
        axios.post(url, config)
            .then((response) => {
                if (response.data) {
                    // Thêm thông báo thành công
                    Swal.fire({
                        icon: 'success',
                        title: 'Thêm thành công',
                        showConfirmButton: true
                    });
                    // Reset lại các validate
                    document.getElementById("errorOfCMT").innerHTML = "";
                    document.getElementById("errorOfTenPhong").innerHTML = "";
                    document.getElementById("errorOfMaDV").innerHTML = "";
                    document.getElementById("errorOfThoiGianChon").innerHTML = "";
                }
            })
            .catch(error => {
                if (error) {
                    // Thêm thông báo lỗi
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: 'Thêm thất bại!'
                    });
                    // Reset lại các validate
                    document.getElementById("errorOfCMT").innerHTML = "";
                    document.getElementById("errorOfTenPhong").innerHTML = "";
                    document.getElementById("errorOfMaDV").innerHTML = "";
                    document.getElementById("errorOfThoiGianChon").innerHTML = "";
                }
            });
    }


    // UPDATE LẠI handleInsert
    handleInsert() {
        // Thêm validate CMT
        let errorOfCMT = "";
        let CMT = document.getElementById("CMT").value;
        let numberOnly = /^[0-9]+$/;
        if (!numberOnly.test(CMT)) {
            errorOfCMT = errorOfCMT + "CMT không hợp lệ!\n";
        }
        if (CMT === "") {
            errorOfCMT = errorOfCMT + "CMT không được bỏ trống!\n";
        }
        if (CMT < 13) {
            errorOfCMT = errorOfCMT + "CMT không được vượt quá 13 số!\n";
        }

        // Thêm validate TenPhong
        let errorOfTenPhong = "";
        let TenPhong = document.getElementById("TenPhong").value;
        if (TenPhong === "") {
            errorOfTenPhong = errorOfTenPhong + "Tên phòng không được bỏ trống!\n";
        }

        // Thêm validate MaDV
        let errorOfMaDV = "";
        let MaDV = document.getElementById("MaDV").value;
        if (MaDV === "") {
            errorOfMaDV = errorOfMaDV + "Chưa chọn dịch vụ!\n";
        }

        // Thêm validate ThoiGianChon
        let errorOfThoiGianChon = "";
        let ThoiGianChon = document.getElementById("ThoiGianChon").value;
        if (ThoiGianChon === "") {
            errorOfThoiGianChon = errorOfThoiGianChon + "Chưa chọn được thời gian gọi!\n";
        }

        // Thêm hiện các dòng validate
        if (errorOfCMT || errorOfTenPhong || errorOfMaDV || errorOfThoiGianChon) {
            Swal.fire(
                'Cảnh báo\n\n Dữ liệu không hợp lệ',
                '',
                'error'
            )
            document.getElementById("errorOfCMT").innerHTML = typeof errorOfCMT === "undefined" ? "" : errorOfCMT;
            document.getElementById("errorOfTenPhong").innerHTML = typeof errorOfTenPhong === "undefined" ? "" : errorOfTenPhong;
            document.getElementById("errorOfMaDV").innerHTML = typeof errorOfMaDV === "undefined" ? "" : errorOfMaDV;
            document.getElementById("errorOfThoiGianChon").innerHTML = typeof errorOfThoiGianChon === "undefined" ? "" : errorOfThoiGianChon;
        }
        else {
            let url = "https://localhost:5001/api/v1/OrderServices?CMT=" + this.state.CMT + "&TenPhong=" + this.state.TenPhong + "&DVID=" + this.state.MaDV + "&ThoiGianGoi=" + this.state.ThoiGianGoi;
            console.log(url)
            this.postData(url);
        }
    }

    componentDidMount = (url = "https://localhost:5001/api/v1/Services") => {
        this.getData(url);
    }

    renderItemService() {
        return this.state.data.map((item) => {
            if(item.hoatDong !== "Bận"){
                return (
                    <option value={item.dvid}>{item.tenDV}</option>
                );
            }
        });
    }

    handleFormCMTChange(value) {
        this.setState({
            CMT: value,
        });
    };

    handleFormTenPhongChange(value) {
        this.setState({
            TenPhong: value,
        });
    };

    handleFormMaDVChange(value) {
        this.setState({
            MaDV: value,
        });
    };

    handleFormThoiGianGoiChange(value) {
        this.setState({
            ThoiGianGoi: value,
        });
    };

    formatDate = dateSrc => {
        let date = new Date(dateSrc),
            year = date.getFullYear().toString(),
            month = (date.getMonth() + 1).toString().padStart(2, '0'),
            day = date.getDate().toString().padStart(2, '0');

        return `${day}/${month}/${year}`;
    }

    // UPDATE THÊM CÁC DÒNG VALIDATE
    render() {
        const errorLabel = {
            color: "red",
            padding: "10px",
        }
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Gọi dịch vụ</h5>
                    <form>
                        {/* Nhập số CMT */}
                        <div className="row mb-3">
                            <label htmlFor="CMT" className="col-sm-2 col-form-label">Số CMT</label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    id="CMT"
                                    className="form-control"
                                    value={this.props.CMT}
                                    onChange={(event) =>
                                        this.handleFormCMTChange(event.target.value)
                                    }
                                />

                                {/* Thêm dòng validate CMT */}
                                <label style={errorLabel} id="errorOfCMT"></label>
                            </div>
                        </div>

                        {/* Nhập mã phòng */}
                        <div className="row mb-3">
                            <label htmlFor="TenPhong" className="col-sm-2 col-form-label">Phòng</label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    id="TenPhong"
                                    className="form-control"
                                    value={this.props.TenPhong}
                                    onChange={(event) =>
                                        this.handleFormTenPhongChange(event.target.value)
                                    }
                                />

                                {/* Thêm dòng validate TenPhong */}
                                <label style={errorLabel} id="errorOfTenPhong"></label>
                            </div>
                        </div>

                        {/* Chọn dịch vụ */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Chọn dịch vụ</label>
                            <div className="col-sm-10">
                                <select
                                    id="MaDV"
                                    className="form-select"
                                    aria-label="Default select example"
                                    value={this.props.MaDV}
                                    onChange={(event) =>
                                        this.handleFormMaDVChange(event.target.value)
                                    }
                                >
                                    <option value={""} selected>
                                        Chọn dịch vụ
                                    </option>
                                    {this.renderItemService()}
                                </select>

                                {/* Thêm validate MaDV */}
                                <label style={errorLabel} id="errorOfMaDV"></label>
                            </div>
                        </div>

                        {/* Nhập thời gian chọn */}
                        <div className="row mb-3">
                            <label htmlFor="ThoiGianGoi" className="col-sm-2 col-form-label">Thời gian chọn</label>
                            <div className="col-sm-10">
                                <input
                                    id="ThoiGianChon"
                                    type="date"
                                    className="form-control"
                                    value={this.props.ThoiGianGoi}
                                    onChange={(event) =>
                                        this.handleFormThoiGianGoiChange(event.target.value)
                                    }
                                />

                                {/* Thêm validate ThoiGianChon */}
                                <label style={errorLabel} id="errorOfThoiGianChon"></label>
                            </div>
                        </div>
                        <div className="text-center">
                            {/* Thêm dịch vụ vào bảng gọi dịch vụ */}
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => this.handleInsert()}
                            >
                                Đặt dịch vụ
                            </button>

                            {/* Reset lại các vùng nhập dữ liệu*/}
                            <button type="reset" className="btn btn-secondary">Nhập lại</button>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}
export default OrderService;