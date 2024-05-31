import React, { Component } from "react";
import Swal from 'sweetalert2'

class ServiceForm extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  validateForm() {
    // validate tên dịch vụ
    let errorOfTenDV = "";
    let tenDV = document.getElementById("tenDV").value;
    if (tenDV === "") {
      errorOfTenDV = errorOfTenDV + "Tên dịch vụ không được bỏ trống!\n";
    }
    if (tenDV.length > 50) {
      errorOfTenDV += "Tên dịch vụ chứa tối đa 50 ký tự.\n";
    }
    var format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]+/;
    if (format.test(tenDV)) {
      errorOfTenDV += "Tên dịch vụ không được chứa ký tự đặc biệt";
    }

    // validate cho giá tiền
    let errorOfGiaTien;
    if (document.getElementById("giaTien").value <= 0) {
      errorOfGiaTien = "Giá tiền có giá trị không hợp lệ."
    }

    // validate cho ghi chú
    let ghiChu = document.getElementById("ghiChu").value;
    let errorOfGhiChu = "";
    if (ghiChu.length > 500) {
      errorOfGhiChu += "Ghi chú chứa tối đa 500 ký tự";
    }
    if (ghiChu.length === 0) {
      errorOfGhiChu += "Ghi chú không được để trống";
    }

    // validate cho mô tả
    let moTa = document.getElementById("moTa").value;
    let errorOfMota = "";
    if (moTa.length > 500) {
      errorOfMota += "Mô tả chứa tối đa 500 ký tự";
    }
    if (moTa.length === 0) {
      errorOfMota += "Mô tả không được để trống";
    }
    if (errorOfTenDV || errorOfGiaTien || errorOfGhiChu || errorOfMota) {
      Swal.fire(
        'Cảnh báo\n\n Dữ liệu không hợp lệ',
        '',
        'error'
      )
      document.getElementById("errorOfTenDV").innerHTML = typeof errorOfTenDV === "undefined" ? "" : errorOfTenDV;
      document.getElementById("errorOfGiaTien").innerHTML = typeof errorOfGiaTien === "undefined" ? "" : errorOfGiaTien;
      document.getElementById("errorOfGhiChu").innerHTML = typeof errorOfGhiChu === "undefined" ? "" : errorOfGhiChu;
      document.getElementById("errorOfMota").innerHTML = typeof errorOfMota === "undefined" ? "" : errorOfMota;
    } else {
      this.props.postData();
    }
  }

  render() {
    const errorLabel = {
      color: "red",
      padding: "10px",
    }
    if (this.props.showServiceForm === false) return null;
    return (
      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Thêm mới dịch vụ</h5>
              <form>
                <div className="row mb-3">
                  <label
                    htmlFor="inputTenDichVu"
                    className="col-sm-2 col-form-label"
                  >
                    Tên dịch vụ
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      id="tenDV"
                      className="form-control"
                      value={this.props.tenDV}
                      onChange={(event) =>
                        this.props.handleFormTenDVChange(event.target.value)
                      }
                    />
                    <label style={errorLabel} id="errorOfTenDV"></label>
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputGiaTien"
                    className="col-sm-2 col-form-label"
                  >
                    Giá tiền
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      className="form-control"
                      id="giaTien"
                      value={this.props.giaTien}
                      onChange={(event) =>
                        this.props.handleFormgiaTienChange(event.target.value)
                      }
                    />
                    <label style={errorLabel} id="errorOfGiaTien"></label>
                  </div>
                </div>
                <div className="row mb-3">
                <label
                    htmlFor="inputHoatDong"
                    className="col-sm-2 col-form-label"
                  >
                    Hoạt động
                  </label>
                  <div className="col-sm-10">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={this.props.hoatDong}
                      onChange={(event) =>
                        this.props.handleFormhoatDongChange(event.target.value)
                      }
                    >
                      <option value={'Rảnh'} selected>Rảnh</option>
                      <option value={'Bận'}>Bận</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">Đơn vị</label>
                  <div className="col-sm-10">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={this.props.donVi}
                      onChange={(event) =>
                        this.props.handleFormdonViChange(event.target.value)
                      }
                    >
                      <option value={'Lượt'} selected>Lượt</option>
                      <option value={'Cái'}>Cái</option>
                      <option value={'Người'}>Người</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputGhiChu"
                    className="col-sm-2 col-form-label"
                  >
                    Ghi chú
                  </label>
                  <div className="col-sm-10">
                    <textarea
                      id="ghiChu"
                      className="form-control"
                      style={{ height: "100px" }}
                      defaultValue={""}
                      value={this.props.ghiChu}
                      onChange={(event) =>
                        this.props.handleFormghiChuChange(event.target.value)
                      }
                    />
                    <label style={errorLabel} id="errorOfGhiChu"></label>
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputMoTa"
                    className="col-sm-2 col-form-label"
                  >
                    Mô tả
                  </label>
                  <div className="col-sm-10">
                    <textarea
                      id="moTa"
                      className="form-control"
                      style={{ height: "100px" }}
                      defaultValue={""}
                      value={this.props.moTa}
                      onChange={(event) =>
                        this.props.handleFormmoTaChange(event.target.value)
                      }
                    />
                    <label style={errorLabel} id="errorOfMota"></label>
                  </div>
                </div>
                <div className="flex_right">
                    <button className="ms-btn cancel_btn"  onClick={() => this.props.turnOffServiceForm()} >Hủy</button>
                    <button className="ms-btn ms-btn_icon" onClick={() => this.validateForm()}><i className="far fa-save icon"/>Lưu</button>
                </div>
              </form>
              {/* End General Form Elements */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ServiceForm;
