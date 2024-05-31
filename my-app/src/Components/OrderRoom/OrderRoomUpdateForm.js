import React, { Component } from "react";
import Swal from "sweetalert2";
class OrderRoomUpdatetForm extends Component{
    constructor(props){
        super(props);
    }
    validateOrderRoomForm = () => {
        // validate giá
        let errorOfGia = "";
        let giaTien = document.getElementById("GiaTien").value.trim();
        if (giaTien === "") {
            errorOfGia = errorOfGia + "Giá tiền không được bỏ trống!\n";
        }
        else if(giaTien<=0){
            errorOfGia = errorOfGia + "Giá tiền không hợp lệ!\n";
        }
        // valitate ngày
        let errorOfNgayDen = "";
        let ngayDen = document.getElementById("NgayDen").value.trim();
        console.log(ngayDen)
        if (ngayDen === "") {
            errorOfNgayDen = errorOfNgayDen + "Ngày không được bỏ trống!\n";
        }
        let errorOfNgayDi = "";
        let ngayDi = document.getElementById("NgayDi").value.trim();
        console.log(ngayDi)
        if (ngayDi === "") {
            errorOfNgayDi = errorOfNgayDi + "Ngày không được bỏ trống!\n";
        }
        else if(ngayDi<ngayDen){
            errorOfNgayDi = errorOfNgayDi + "Ngày đi phải là ngày sau ngày đến!\n";
        }
        if (errorOfGia || errorOfNgayDen || errorOfNgayDi) {
            Swal.fire({
                icon: 'error',
                title: 'Cảnh báo',
                text: 'Dữ liệu không hợp lệ!',
            })
            document.getElementById("errorOfGia").innerHTML = typeof errorOfGia === "undefined" ? "" : errorOfGia;
            document.getElementById("errorOfNgayDen").innerHTML = typeof errorOfNgayDen === "undefined" ? "" : errorOfNgayDen;
            document.getElementById("errorOfNgayDi").innerHTML = typeof errorOfNgayDi === "undefined" ? "" : errorOfNgayDi;
        }
        else {
          this.props.handleComfirm();
        }
      };
    render(){
        const errorMessage={
            color: "red"
        }
        if(this.props.ShowForm === false) return null;
        return(
            <div className="page_right-content">
                <h5 className="card-title">Sửa thông tin đặt phòng</h5>
            <form>
                <div className="row mb-3">
                    <label htmlFor="inputText" className="col-sm-2 col-form-label">
                        Tên phòng
                    </label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control"
                        value={this.props.tenPhong}
                        onChange={(event) =>this.props.handleFormTenPhongChange(event.target.value)}
                        disabled/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputText" className="col-sm-2 col-form-label">
                        Họ tên
                    </label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control"
                        value={this.props.hoTen}
                        onChange={(event) =>this.props.handleFormHoTenChange(event.target.value)}
                        disabled/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputText" className="col-sm-2 col-form-label">Giá tiền</label>
                    <div className="col-sm-10">
                        <input type="number" className="form-control" id="GiaTien"
                        value={this.props.giaTien}
                        onChange={(event) =>this.props.handleFormGiaChange(event.target.value)}
                        />
                        <label style={errorMessage} id="errorOfGia"></label>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputText" className="col-sm-2 col-form-label">Ngày đến</label>
                    <div className="col-sm-10">
                        <input type="date" className="form-control" id="NgayDen"
                        value={this.props.ngayBatDau}
                        onChange={(event) =>this.props.handleFormNgayBDChange(event.target.value)}
                        />
                        <label style={errorMessage} id="errorOfNgayDen"></label>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputText" className="col-sm-2 col-form-label">Ngày đi</label>
                    <div className="col-sm-10">
                        <input type="date" className="form-control" id="NgayDi"
                        value={this.props.ngayKetThuc}
                        onChange={(event) =>this.props.handleFormNgayKTChange(event.target.value)}
                        />
                        <label style={errorMessage} id="errorOfNgayDi"></label>
                    </div>
                </div>
                <div className="row mb-3">
                <label className="col-sm-2 col-form-label">isDelete</label>
                <div className="col-sm-10">
                    <select className="form-select" aria-label="Default select example" 
                    value={this.props.isDelete}
                    onChange={(event) =>this.props.handleFormisDeleteChange(event.target.value)}
                    >
                    <option value={"True"}>True</option>
                    <option value={"False"}>False</option>
                    </select>
                </div>
                </div>
                <div className="flex_right">
                    <button className="ms-btn cancel_btn"  onClick={() =>this.props.OrderRoomUpdateCloseForm()} >Hủy</button>
                    <button className="ms-btn ms-btn_icon" onClick={() => this.validateOrderRoomForm()}><i className="far fa-save icon"/>Cập nhật</button>
                </div>
            </form>
            </div>
        );
    }

}
export default OrderRoomUpdatetForm;