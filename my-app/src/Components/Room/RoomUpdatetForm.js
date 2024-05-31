import React, { Component } from "react";
import Swal from "sweetalert2";
class RoomUpdatetForm extends Component{
    constructor(props){
        super(props);
    }
    validateRoomForm = () => {
        // validate giá phòng
        let errorOfGiaPhong = "";
        let giaPhong = document.getElementById("GiaPhong").value.trim();
        if (giaPhong === "") {
            errorOfGiaPhong = errorOfGiaPhong + "Giá phòng không được bỏ trống!\n";
        }
        // valitate mô tả
        let errorOfMoTa = "";
        let moTa = document.getElementById("MoTa").value.trim();
        if (moTa === "") {
            errorOfMoTa = errorOfMoTa + "Mô tả không được bỏ trống!\n";
        }
    
        if (errorOfGiaPhong || errorOfMoTa) {
          Swal.fire({
            icon: 'error',
            title: 'Cảnh báo',
            text: 'Dữ liệu không hợp lệ!',
          })
          document.getElementById("errorOfGiaPhong").innerHTML = typeof errorOfGiaPhong === "undefined" ? "" : errorOfGiaPhong;
          document.getElementById("errorOfMoTa").innerHTML = typeof errorOfMoTa === "undefined" ? "" : errorOfMoTa;
        }
        else if(giaPhong<=0){
            Swal.fire({
                icon: 'error',
                title: 'Cảnh báo',
                text: 'Giá phòng không hợp lệ!',
            })
        }
        else {
          this.props.alertComfirm();
        }
      };
      renderIsdelete = () => {
        if(localStorage.getItem("Role") === "Nhân Viên"){
            return(
                <div className="row mb-3">
                <label className="col-sm-2 col-form-label">isDelete</label>
                <div className="col-sm-10">
                    <select className="form-select" aria-label="Default select example" 
                    value={this.props.isDelete}
                    onChange={(event) =>this.props.handleRoomFormisDeleteChange(event.target.value)}
                    disabled>
                    <option value={"True"}>True</option>
                    <option value={"False"}>False</option>
                    </select>
                </div>
                </div>
            );
        }
        return( <div className="row mb-3">
        <label className="col-sm-2 col-form-label">isDelete</label>
        <div className="col-sm-10">
            <select className="form-select" aria-label="Default select example" 
            value={this.props.isDelete}
            onChange={(event) =>this.props.handleRoomFormisDeleteChange(event.target.value)}
            >
            <option value={"True"}>True</option>
            <option value={"False"}>False</option>
            </select>
        </div>
        </div>);
       }
    render(){
        const errorMs={
            color: "red"
        }
        if(this.props.ShowForm===false) return null;
        return(
            <div className="page_right-content">
                <h5 className="card-title">Sửa thông tin phòng</h5>
            <form>
                <div className="row mb-3">
                    <label htmlFor="inputText" className="col-sm-2 col-form-label">Tên phòng</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" 
                        value={this.props.tenPhong}
                        onChange={(event) =>this.props.handleRoomFormtenPhongChange(event.target.value)} disabled
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputText" className="col-sm-2 col-form-label">Trạng thái</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" 
                        value={this.props.trangThai}
                        onChange={(event) =>this.props.handleRoomFormtrangThaiChange(event.target.value)} disabled
                        />
                    </div>
                </div>
                <div className="row mb-3">
                <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Giá phòng</label>
                <div className="col-sm-10">
                    <input type="number" className="form-control"  id={"GiaPhong"}
                    value={this.props.giaPhong}
                    onChange={(event) =>this.props.handleRoomFormgiaPhongChange(event.target.value)}
                    />
                    <label style={errorMs} id="errorOfGiaPhong"></label>
                </div>
                </div>
               {this.renderIsdelete()}
                <div className="row mb-3">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Mô tả</label>
                <div className="col-sm-10">
                    <textarea className="form-control" style={{height: '100px'}}  id={"MoTa"}
                    value={this.props.moTa}
                    onChange={(event) =>this.props.handleRoomFormmoTaChange(event.target.value)}
                    required
                    />
                    <label style={errorMs} id="errorOfMoTa"></label>
                </div>
                </div>
                <div className="row mb-3">
                <div className="flex_right">
                    <button type="button" className="ms-btn cancel_btn" onClick={() =>this.props.RoomUpdateCloseForm()}>Hủy</button>
                    <button type="button" className="ms-btn ms-btn_icon" onClick={() => this.validateRoomForm()}><i className="far fa-save icon"/>Cập nhật</button>
                </div>
                </div>
            </form>
            </div>
        );
    }

}
export default RoomUpdatetForm;