import React, { Component } from "react";
import axios from "axios";

class RoomType extends Component{
    constructor(){
        super();
        this.state={
            RoomType: []
        }
    }
    
    componentDidMount(){
        axios.get("https://localhost:5001/api/v1/RoomType")
        .then((response) => {
            this.setState({
                RoomType: response.data
            })
        });
    }
    
       rederRoomType =()=>{
            console.log(this.state.RoomType)
            return this.state.RoomType.map((data,index) =>{
                return(
                    <tr key={data.lid}>
                    <td>{data.maLoai}</td>
                    <td>{data.tenLoai}</td>
                    <td>{data.ghiChu}</td>
                </tr>
                );
            }
            ); 
       }  
       
       render(){
            return(
                <div className="App">
                    <div className="container">
                        <h1 className="text-center">Danh sách loại phòng</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Mã loại</th>
                                    <th>Tên loại</th>
                                    <th>Ghi chú</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.rederRoomType()}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
            
       }
              
    }

export default RoomType;