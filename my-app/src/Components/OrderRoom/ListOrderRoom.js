import React, {Component} from "react";
import axios from "axios";
import Swal from "sweetalert2";
class ListOrderRoom extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            showFormCreate: false,
            PID: "",
            CMT: "",
            NgayBatDau: "",
            NgayKetThuc: ""
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
    //get api
    getData(url){
        let config = this.getConfigToken();
        axios.get(url, config)
        .then((response) => {
            this.setState({
                data: response.data
            })
        });
    }

    checkValidStartDateFromDate() {

        axios.post("https://localhost:5001/api/v1/OrderRooms/Room_Can_Order", {
                startDate: this.state.NgayBatDau,
                endDate: this.state.NgayKetThuc
            }
        )
        .then((response) => {
            this.setState({
                data: response.data
            })
        });
        console.log();
    }

    componentDidMount(url = "https://localhost:5001/api/v1/Rooms/Can_Order"){
        this.getData(url);
    }
    handleFormCMTChange(value){
        if(value){
            this.setState({CMT: value});
        }
    }
    handleFormPIDChange(value){
        if(value){
            this.setState({PID: value});
        }
    }
    handleFormThoiGianBDChange(value){
        if(value){
            this.setState({NgayBatDau: value},() => {
                // Hàm được gọi sau khi state được cập nhật
                this.checkValidStartDateFromDate();
            });
        }
    }


    handleFormThoiGianKTChange(value){
        if(value){
            this.setState({NgayKetThuc: value},() => {
                // Hàm được gọi sau khi state được cập nhật
                this.checkValidStartDateFromDate();
            });
        }
    }
    insertData(url){
        let config = this.getConfigToken();
        axios.post(url, {
            pid: this.state.PID,
            cmt: this.state.CMT,
            ngayBatDau: this.state.NgayBatDau,
            ngayKetThuc: this.state.NgayKetThuc
        }, config)
        .then((response) => {
            if(response){
                Swal.fire('Đặt phòng thành công!', '', 'success')
                this.setState({showFormCreate: false});
                // this.props.componentDidMount();
            }
            else{
                Swal.fire('Đặt phòng thất bại!', '', 'info')
            }
        })
        .catch(err => {
            Swal.fire('Có lỗi trong quá trình đặt!', '', 'error')
        });
    }
    validateOrderRoomForm = () => {
        // valitate ngày
        let errorOfNgayDen = "";
        let ngayDen = this.state.NgayBatDau;
        console.log(ngayDen)
        if (ngayDen === "") {
            errorOfNgayDen = errorOfNgayDen + "Ngày không được bỏ trống!\n";
        }
        let errorOfNgayDi = "";
        let ngayDi = this.state.NgayKetThuc;
        console.log(ngayDi)
        if (ngayDi === "") {
            errorOfNgayDi = errorOfNgayDi + "Ngày không được bỏ trống!\n";
        }
        else if(ngayDi<ngayDen){
            errorOfNgayDi = errorOfNgayDi + "Ngày đi phải là ngày sau ngày đến!\n";
        }
        if (errorOfNgayDen || errorOfNgayDi) {
            Swal.fire({
                icon: 'error',
                title: 'Cảnh báo',
                text: 'Dữ liệu không hợp lệ!',
            })
            // document.getElementById("errorOfGia").innerHTML = typeof errorOfGia === "undefined" ? "" : errorOfGia;
            document.getElementById("errorOfNgayDen").innerHTML = typeof errorOfNgayDen === "undefined" ? "" : errorOfNgayDen;
            document.getElementById("errorOfNgayDi").innerHTML = typeof errorOfNgayDi === "undefined" ? "" : errorOfNgayDi;
        }
        else {
          this.alertComfirmCreate();
        }
      };
      alertComfirmCreate = () => {
        this.handleInsert();
    }
    handleInsert(){
        let url = "https://localhost:5001/api/v1/OrderRooms";
        this.insertData(url)
    }
    renderDataPhong(){
        // this.componentDidMount();
        return this.state.data.map(item => {
            return(
                <option value={item.pid}>
                    {item.tenPhong}
                </option>
            );
        })
    }
    render(){
        const errorMs={
            color: "red"
        }
        if(this.props.display === false) return null;
        if(!this.state.showFormCreate){
            return(
                <div className="page_right-content">
                <div className="toolbar" id="toolbar">
                    <div className="section1 flex_center">
                        <h1 className="card-title">Danh sách thuê phòng</h1>
                        <div className="row mb-3">
                    </div>
                    </div>
                    <div className="section2 flex_center" id="show_option">
                        <div className="show_options flex_center">
                            <div className="search_option">
                                <p>Tìm kiếm theo tên khách hàng</p>
                                <input type="text" className="search_input ms-input" option_name="Search" placeholder="Tìm kiếm theo tên khách hàng"  
                                onChange={(e) => {
                                    this.props.handleSearch({
                                        ...this.props.searchParams,
                                        customerName: e.event.value,
                                    });
                                }} />
                                <i className="fas fa-search search_icon search_icon" />
                            </div>
                            <div className="search_option">
                                <p>Từ ngày</p>
                                <input type="date" className="form-control" id="NgayDen"
                                 onChange={(e) => {
                                    this.props.handleSearch({
                                        ...this.props.searchParams,
                                        startDate: e.event.value,
                                    });
                                }}
                                />
                            </div>
                            <div className="search_option">
                                <p>Đến ngày</p>
                                <input type="date" className="form-control" id="NgayDen"
                                onChange={(e) => {
                                    this.props.handleSearch({
                                        ...this.props.searchParams,
                                        endDate: e.event.value,
                                    });
                                }}
                                />
                            </div>
                        </div>
                        <button className="add_button ms-btn" commandtype="add" onClick={() => {this.setState({showFormCreate: true})}}>
                            <i className="fas fa-search add_icon" />
                            Tìm kiếm
                        </button>
                    </div>
                    <div className="buttons">
                        <button className="add_button ms-btn" commandtype="add" onClick={() => this.setState({showFormCreate: true})}>
                            <i className="fas fa-user-plus add_icon" />
                            Thuê/Đặt phòng
                        </button>
                    </div>
                </div>
                <div className="section3 tables" id="employeegrid" toolbar="toolbar" show_option="show_option">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Tên Phòng</th>
                                <th scope="col">Họ tên khách thuê</th>
                                <th scope="col">Ngày đến</th>
                                <th scope="col">Ngày đi</th>
                                <th scope="col">Giá tiền</th>
                                <th scope="col">isDelete</th>
                                <th scope="col">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.rederData()}
                        </tbody>
                    </table>
                </div>
            <div className="card-body">
                
                </div>
            </div>
            )
        }
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Thuê/Đặt phòng</h5>
                    <form>
                    <div className="form_closeicon flex_center" onClick={() => this.setState({showFormCreate: false})}>
                    <i className="fas fa-times form_icon" />
                    </div>
                        {/* Nhập số CMT */}
                        <div className="row mb-3">
                            <label htmlFor="CMT" className="col-sm-2 col-form-label">Số CMT</label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    id="CMT"
                                    className="form-control"
                                    onChange={(e) =>
                                        this.handleFormCMTChange(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        {/* Chọn Phòng */}
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Chọn phòng</label>
                            <div className="col-sm-10">
                                <select
                                    id="MaPhong"
                                    className="form-select"
                                    aria-label="Default select example"
                                    onChange={(event) =>
                                        this.handleFormPIDChange(event.target.value)
                                    }
                                >
                                    <option value={""} selected>
                                        Chọn phòng
                                    </option>
                                    {this.renderDataPhong()}
                                </select>
                            </div>
                        </div>

                        {/* Nhập thời gian chọn */}
                        <div className="row mb-3">
                            <label htmlFor="ThoiGianBD" className="col-sm-2 col-form-label">Thời gian Bắt đầu</label>
                            <div className="col-sm-10">
                                <input
                                    id="ThoiGianBD"
                                    type="date"
                                    className="form-control"
                                    onChange={(event) =>
                                        this.handleFormThoiGianBDChange(event.target.value)
                                    }
                                />
                                <label style={errorMs} id="errorOfNgayDen"></label>

                            </div>
                        </div>

                        {/* Nhập thời gian chọn */}
                        <div className="row mb-3">
                            <label htmlFor="ThoiGianGoi" className="col-sm-2 col-form-label">Thời gian kết thúc</label>
                            <div className="col-sm-10">
                                <input
                                    id="ThoiGianKT"
                                    type="date"
                                    className="form-control"
                                    onChange={(event) =>
                                        this.handleFormThoiGianKTChange(event.target.value)
                                    }
                                />
                                <label style={errorMs} id="errorOfNgayDi"></label>

                            </div>
                        </div>
                        <div className="text-center">
                            {/* Thêm dịch vụ vào bảng gọi dịch vụ */}
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => this.validateOrderRoomForm()}
                            >
                                Thuê/Đặt
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
export default ListOrderRoom