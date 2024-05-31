import React, { Component } from "react";
import axios from "axios";
import ServiceForm from "./ServiceForm";
import Swal from 'sweetalert2'
import ServiceEditForm from "./ServiceEditForm";
import ServiceList from "./ServiceList";

class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // for get list
      showListService: true,
      services: [],
      search: "",
      pageNumber: 1,
      url:"",
      // for delete
      DvidToDelete: "",
      isDeleteSuccess: true,
      // for insert
      showServiceForm: false,
      tenDV: "",
      maDV: "",
      giaTien: 0,
      hoatDong: "",
      donVi: "",
      isDelete: "",
      ghiChu: "",
      moTa: "",
      isInsertSuccess: true,
      newcode: "",
      defaultHoatDong: 'Rảnh',
      defaultDonVi: 'Lượt',
      // for update
      showUpdateForm: false,
      DvidToEditForm: "",
      isEditSuccess: true,

      defaultUrl: "https://localhost:5001/api/v1/Services"
    };
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
        services: response.data,
      });
    });
  }

  componentDidMount = (
    url = this.state.defaultUrl
  ) => {
    this.getData(url);
  };

  handleSearch = (search) => {
    let url = this.state.defaultUrl + search
    this.componentDidMount(url);

  }

  // POST API

  // hàm thực hiện on off form nhập mới dịch vụ
  turnOnServiceForm = () => {
    this.getNewCode();
    this.setState({
      showServiceForm: !this.state.showServiceForm,
      showListService: !this.state.showListService,
    });

  };

  turnOffServiceForm = () => {
    this.setState({
      showServiceForm: !this.state.showServiceForm,
      showListService: !this.state.showListService,
    });
  };



  // chưa sử lý đượcccccccccccccccccccccccccccccccc số
  clearInsertForm = () => {
    this.setState({
      tenDV: "",
      giaTien: 0,
      hoatDong: "",
      donVi: "",
      isDelete: "",
      ghiChu: "",
      moTa: "",
    });
  };

  handleFormTenDVChange = (value) => {
    this.setState({
      tenDV: value,
    });
  };
  handleFormmaDVChange = (value) => {
    this.setState({
      maDV: value,
    });
  };
  handleFormgiaTienChange = (value) => {
    this.setState({
      giaTien: value,
    });
  };
  handleFormhoatDongChange = (value) => {
    this.setState({
      defaultHoatDong: value,
      hoatDong: value,
    });
  };

  handleFormdonViChange = (value) => {
    this.setState({
      defaultDonVi: value,
      donVi: value,
    });
  };
  handleFormghiChuChange = (value) => {
    this.setState({
      ghiChu: value,
    });
  };
  handleFormmoTaChange = (value) => {
    this.setState({
      moTa: value,
    });
  };

  getNewCode = () => {
    let config = this.getConfigToken();
    axios
      .get(this.state.defaultUrl+ "/new-code", config)
      .then((response) => {
        this.setState({
          newcode: response.data,
        });
      });
  }

  postData = () => {
    let config = this.getConfigToken();
    axios
      .post(this.state.defaultUrl, {
        tenDV: this.state.tenDV,
        maDV: this.state.newcode,
        giaTien: this.state.giaTien,
        hoatDong: this.state.defaultHoatDong,
        donVi: this.state.defaultDonVi,
        isDelete: "false",
        ghiChu: this.state.ghiChu,
        moTa: this.state.moTa,
      }, config)
      .then(response => {
        if (response.data) {
          Swal.fire(
            'Thêm thành công!',
            'Thay đổi đã xảy ra',
            'success'
          )
        }
        else {
          Swal.fire(
            'Không thể thực hiện thêm!',
            'Đã xảy ra một vấn đề nào đó',
            'warning'
          )
        }
      })
      .catch(error => {
        Swal.fire(
          'Không thể thực hiện thêm!',
          'Đã xảy ra một vấn đề nào đó',
          'warning'
        )
      });
    this.clearInsertForm();
    //this.showInsertResult();
    this.turnOffServiceForm();
    this.componentDidMount();
  };


  // HTTP DELETE
  deleteService = (dvid) => {
    var url = this.state.defaultUrl + "/" + dvid;
    let config = this.getConfigToken();
    axios
      .delete(url, config)
      .then(response => {
        const tempData = response.data;
        if (tempData) {
        }
        else {
          Swal.fire(
            'Không thể thực hiện xóa!',
            'Đã xảy ra một vấn đề nào đó',
            'success'
          )
        }
      })
      .catch(error => {
        Swal.fire(
          'Không thể thực hiện xóa!',
          'Đã xảy ra một vấn đề nào đó',
          'success'
        )
      });
    this.componentDidMount();
  };




  showDeleteConfirmAlert = (service) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Bạn có chắc chắn?',
      text: "Thao tác này có thể không hoàn tác được!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý, xóa nó!',
      cancelButtonText: 'Không, Hủy!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteService(service.dvid);
        // end comfirmed
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Đã hủy',
          'Không có gì xảy ra',
          'error'
        )
      }
    })
  }


  // HTTP PUT - for update service
  // hàm thực hiện on off form sửa dịch vụ
  onServiceEditForm = (service) => {
    this.setState({
      DvidToEditForm: service.dvid,
      tenDV: service.tenDV,
      maDV: service.maDV,
      giaTien: service.giaTien,
      hoatDong: service.hoatDong,
      donVi: service.donVi,
      ghiChu: service.ghiChu,
      moTa: service.moTa,
      showUpdateForm: !this.state.showUpdateForm,
      showUpdateAlert: false,
      showListService: !this.state.showListService,
    });
  };

  offServiceEditForm = () => {
    this.setState({
      showUpdateForm: !this.state.showUpdateForm,
      showUpdateAlert: false,
      showListService: !this.state.showListService,
    })
    this.clearInsertForm();
  }

  putData = () => {
    var url = this.state.defaultUrl + "/" + this.state.DvidToEditForm;
    let config = this.getConfigToken();
    axios
      .put(url, {
        tenDV: this.state.tenDV,
        giaTien: this.state.giaTien,
        hoatDong: this.state.hoatDong,
        donVi: this.state.donVi,
        ghiChu: this.state.ghiChu,
        moTa: this.state.moTa,
      }, config)
      .then(response => {
        if (response.data) {
          Swal.fire(
            'Sửa thành công!',
            'Thay đổi đã xảy ra',
            'success'
          )
        }
        else {
          Swal.fire(
            'Không thể thực hiện sửa!',
            'Đã xảy ra một vấn đề nào đó',
            'warning'
          )
        }
      })
      .catch(error => {
        Swal.fire(
          'Không thể thực hiện sửa!',
          'Đã xảy ra một vấn đề nào đó',
          'warning'
        )
      });
    //this.showUpdateResultAlert();
    this.clearInsertForm();
    this.offServiceEditForm();
    this.componentDidMount();
  };


  // Hàm format số tiền
  formatMoney = moneyinput => {
    let money = Math.round(moneyinput);
    if(money && !isNaN(money)){
        return money.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
    }else{
        return money;
    }
}

  // Ham thuc hien hien thi danh sach
  renderService = () => {
    return this.state.services.map((service, index) => {
      return (
        <tr>
          <td style={{ width: "10%" }} className="text-center">
            {index + 1}
          </td>
          <td>{service.tenDV}</td>
          <td>{this.formatMoney(service.giaTien)}</td>
          <td>{service.hoatDong}</td>
          <td>{service.donVi}</td>
          <td>{service.moTa}</td>
          <td>
            <div className="flex_center">
                <div className="update" commandtype="update" onClick={(e) => {this.onServiceEditForm(service)}}>
                    <i class="fa-solid fa-pen-to-square"></i>
                </div>
                <div className="delete" commandtype="delete" onClick={(e) => this.showDeleteConfirmAlert(service)}>
                    <div className="delete_icon">
                    <i className="fas fa-trash" />
                    </div>
                </div>
            </div> 
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="container">
        {/* Form Insert */}
        <ServiceForm
          showServiceForm={this.state.showServiceForm}
          turnOffServiceForm={this.turnOffServiceForm}
          postData={this.postData}
          clearInsertForm={this.clearInsertForm}
          tenDV={this.state.tenDV}
          maDV={this.state.newcode}
          giaTien={this.state.giaTien}
          hoatDong={this.state.hoatDong}
          donVi={this.state.donVi}
          ghiChu={this.state.ghiChu}
          moTa={this.state.moTa}
          handleFormmoTaChange={this.handleFormmoTaChange}
          handleFormgiaTienChange={this.handleFormgiaTienChange}
          handleFormhoatDongChange={this.handleFormhoatDongChange}
          handleFormdonViChange={this.handleFormdonViChange}
          handleFormghiChuChange={this.handleFormghiChuChange}
          handleFormmaDVChange={this.handleFormmaDVChange}
          handleFormTenDVChange={this.handleFormTenDVChange}
        />


        {/* Form update */}
        <ServiceEditForm
          showUpdateForm={this.state.showUpdateForm}
          offServiceEditForm={this.offServiceEditForm}
          DvidToEditForm={this.state.DvidToEditForm}
          tenDV={this.state.tenDV}
          maDV={this.state.maDV}
          giaTien={this.state.giaTien}
          hoatDong={this.state.hoatDong}
          donVi={this.state.donVi}
          ghiChu={this.state.ghiChu}
          moTa={this.state.moTa}
          handleFormmoTaChange={this.handleFormmoTaChange}
          handleFormgiaTienChange={this.handleFormgiaTienChange}
          handleFormhoatDongChange={this.handleFormhoatDongChange}
          handleFormdonViChange={this.handleFormdonViChange}
          handleFormghiChuChange={this.handleFormghiChuChange}
          handleFormTenDVChange={this.handleFormTenDVChange}
          putData={this.putData}
          resultUpdate={this.state.resultUpdate}
          showUpdateAlert={this.state.showUpdateAlert}
        />
        {/* Display list of service */}
        <ServiceList
          showListService={this.state.showListService}
          services={this.state.services}
          search={this.state.search}
          renderService={this.renderService}
          turnOnServiceForm={this.turnOnServiceForm}
          handleSearch  = {this.handleSearch}
        />
      </div>
    );
  }
}

export default Service;
