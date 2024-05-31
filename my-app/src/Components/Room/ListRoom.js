import React, {Component} from "react";
class ListRoom extends Component{
    constructor(props){
        super(props);
    }
    render(){
        if(this.props.display === false) return null;
        return(
            <div className="page_right-content">
            <div className="toolbar" id="toolbar">
            <div className="section1 flex_center">
                <h1 className="card-title">Thông tin phòng</h1>
            </div>
            <div className="section2 flex_center" id="show_option">
                <div className="show_options flex_center">
                <div className="col-sm-10">
                    <select style={{width: '145px'}} className="form-select" aria-label="Default select example" 
                    onChange={(e) => {this.props.handleSearch("&search=" + e.target.value)}}
                    >
                    <option value={""} selected>Tất cả</option>
                    <option value={"Vip"}>Phòng Vip</option>
                    <option value={"Đôi"}>Phòng Đôi</option>
                    <option value={"Đơn"}>Phòng Đơn</option>
                    <option value={"Thường"}>Phòng Thường</option>
                    </select>
                </div>
                </div>
            </div>
            </div>
            <div className="section3 tables" id="employeegrid" toolbar="toolbar" show_option="show_option">
                <table className="table">
                    <thead>
                        <tr>
                            {/* <th scope="col">PID</th> */}
                            <th scope="col">Tên phòng</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Giá phòng</th>
                            <th scope="col">Hoạt động</th>
                            <th scope="col">isDelete</th>
                            <th scope="col">Mô tả</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.rederData()}
                    </tbody>
                </table>
            </div>
        </div>
        )
    }
}
export default ListRoom