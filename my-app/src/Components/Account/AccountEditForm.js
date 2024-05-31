import React, { Component } from "react";
import Swal from "sweetalert2";

class AccountEditForm extends Component {
  // constructor(props) {
  //   super(props);
  //   this.renderRole();
  // }

  renderRole =() => {
    if(this.props.vaiTro === 'Nhân Viên') {
      return(
        <div>
          <div className="form-check">
                  <input className="form-check-input" type="radio" name="gridRadios" id="gridRadiosNhanVien" defaultValue="Nhân viên"
                    onChange={(event) =>
                      this.props.handleFormVaiTroChange(event.target.value)
                    } checked />
                  <label className="form-check-label" htmlFor="gridRadios1">
                    Nhân viên
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="gridRadios" id="gridRadiosQuanLy" defaultValue="Admin"
                    onChange={(event) =>
                      this.props.handleFormVaiTroChange(event.target.value)
                    } />
                  <label className="form-check-label" htmlFor="gridRadios2">
                    Quản lý
                  </label>
                </div>
        </div>
      )
    }
    else {
      return (
        <div>
          <div className="form-check">
                  <input className="form-check-input" type="radio" name="gridRadios" id="gridRadiosNhanVien" defaultValue="Nhân viên"
                    onChange={(event) =>
                      this.props.handleFormVaiTroChange(event.target.value)
                    } />
                  <label className="form-check-label" htmlFor="gridRadios1">
                    Nhân viên
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="gridRadios" id="gridRadiosQuanLy" defaultValue="Admin"
                    onChange={(event) =>
                      this.props.handleFormVaiTroChange(event.target.value)
                    } checked />
                  <label className="form-check-label" htmlFor="gridRadios2">
                    Quản lý
                  </label>
                </div>
        </div>
      )
    }
  }
  
  validateAccountForm(){
    // validate họ tên
    let errorOfHoTen = "";
    let tenDV = document.getElementById("inputHoten").value.trim();
    if (tenDV === "") {
      errorOfHoTen = errorOfHoTen + "Họ tên không được bỏ trống!\n";
    }
    if (tenDV.length > 100) {
      errorOfHoTen += "Họ tên chứa tối đa 100 ký tự.\n";
    }
    var format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    if (format.test(tenDV)) {
      errorOfHoTen += "Họ tên không được chứa ký tự đặc biệt";
    }

    // valitate số điện thoại
    let errorOfSoDienThoai = "";
    let soDienThoai = document.getElementById("inputSoDienThoai").value;
    var numbersOnly = /^[0-9]+$/;
    var firstPhoneNumber = /((09|03|07|08|05)+([0-9])\b)/g;
    if(firstPhoneNumber.test(soDienThoai)){
      errorOfSoDienThoai += 'Đầu số không hợp lệ!';
    }
    if (!numbersOnly.test(soDienThoai)) {
      errorOfSoDienThoai += 'Số điện thoại chỉ chứa số';
    }
    if (soDienThoai.length > 20) {
      errorOfSoDienThoai += 'Số điện thoại có độ dài tối đa 20 ký tự';
    }

    let errorOfTenDangNhap = "";
    let tenDangNhap = document.getElementById("inputTenDangNhap").value.trim();
    if (tenDangNhap.length > 20) {
      errorOfTenDangNhap += 'Tên đăng nhập có độ dài tối đa 20 ký tự'
    }
    if (tenDangNhap === "") {
      errorOfTenDangNhap = errorOfTenDangNhap + "Tên đăng nhập không được bỏ trống!\n";
    }

    let errorOfPassword = "";
    let password = document.getElementById("inputPassword").value.trim();
    if (password.length > 50) {
      errorOfPassword += 'Tên đăng nhập có độ dài tối đa 50 ký tự'
    }
    if (password === "") {
      errorOfPassword = errorOfPassword + "Mật khẩu không được bỏ trống!\n";
    }

    if (errorOfHoTen || errorOfSoDienThoai || errorOfTenDangNhap || errorOfPassword) {
      Swal.fire(
        'Cảnh báo\n\n Dữ liệu không hợp lệ',
        '',
        'error'
      )
      document.getElementById("errorOfHoTen").innerHTML = typeof errorOfHoTen === "undefined" ? "" : errorOfHoTen;
      document.getElementById("errorOfSoDienThoai").innerHTML = typeof errorOfSoDienThoai === "undefined" ? "" : errorOfSoDienThoai;
      document.getElementById("errorOfTenDangNhap").innerHTML = typeof errorOfTenDangNhap === "undefined" ? "" : errorOfTenDangNhap;
      document.getElementById("errorOfPassword").innerHTML = typeof errorOfPassword === "undefined" ? "" : errorOfPassword;
    }
    else {
      this.props.putData();
    }
  };

  render() {
    const errorLabel = {
      color: "red",
      padding: "10px",
    }
    if (this.props.showEditFormAccount === false) return null;
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Chỉnh sửa tài khoản</h5>
          {/* Horizontal Form */}
          <form>
            <div className="row mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Họ tên</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" id="inputHoten" value={this.props.hoTen}
                  onChange={(event) =>
                    this.props.handleFormHoTenChange(event.target.value)
                  }
                />
                <label style={errorLabel} id="errorOfHoTen"></label>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Số điện thoại</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" id="inputSoDienThoai" value={this.props.soDienThoai}
                  onChange={(event) =>
                    this.props.handleFormSoDienThoaiChange(event.target.value)
                  } />
                <label style={errorLabel} id="errorOfSoDienThoai"></label>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Tên đăng nhập</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" id="inputTenDangNhap" value={this.props.tenDangNhap}
                  onChange={(event) =>
                    this.props.handleFormTenDangNhapChange(event.target.value)
                  } />
                <label style={errorLabel} id="errorOfTenDangNhap"></label>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
              <div className="col-sm-6">
                <input type="password" className="form-control" id="inputPassword" value={this.props.password}
                  onChange={(event) =>
                    this.props.handleFormPasswordChange(event.target.value)
                  } />
                <label style={errorLabel} id="errorOfPassword"></label>
              </div>
            </div>
            <fieldset className="row mb-3" style={{
              display: "none"
            }}>
              <legend className="col-form-label col-sm-2 pt-0">Vai trò</legend>
              <div className="col-sm-6">
                {this.renderRole()}
              </div>
            </fieldset>
            <div className="flex_right">
              <button className="ms-btn cancel_btn"  onClick={() => this.props.closeEditFormAccount()} >Hủy</button>
              <button type="button" className="ms-btn ms-btn_icon" onClick={() => this.validateAccountForm()}><i className="far fa-save icon"/>Lưu</button>
            </div>
          </form>{/* End Horizontal Form */}
        </div>
      </div>
    );
  }
}
export default AccountEditForm;