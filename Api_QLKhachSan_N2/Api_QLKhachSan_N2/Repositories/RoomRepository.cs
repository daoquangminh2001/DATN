using Api_QLKhachSan_N2.Entities;
using Api_QLKhachSan_N2.Interface;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;

namespace Api_QLKhachSan_N2.Repositories
{
    public class RoomRepository: IRoomRepository
    {
        IConfiguration configuration;
        SqlConnection SqlServerConnection;
        public RoomRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public IEnumerable<Room> GetAllRoom(int? PageIndex, int? RowPerPage, string? Search)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("MINHDQ")))
            {
                //chuẩn bị câu truy vấn
                var getProcedure = "Proc_Rooms_GetPaging";

                //chuẩn bị parameters
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PageIndex", PageIndex);
                parameters.Add("@RowPerPage", RowPerPage);
                //parameters.Add("@Sort", Sort);
                parameters.Add("@Search", Search);

                //truy vấn
                var result = SqlServerConnection.QueryMultiple(getProcedure, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return result.Read<Room>();
                }
                return null;
            }
        }
        public Room UpdateRoom(Room room)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("MINHDQ")))
            {
                //chuẩn bị câu truy vấn
                var updateProcedure = "Proc_Rooms_Update";

                //chuẩn bị parameters
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PID", room.PID);
                parameters.Add("@GiaPhong", room.GiaPhong);
                parameters.Add("@isDelete", room.isDelete);
                parameters.Add("@MoTa", room.MoTa);

                //truy vấn
                var result = SqlServerConnection.Query(updateProcedure, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return room;
                }
                return null;
            }
        }
        public string UpdateRoomStatus()
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("MINHDQ")))
            {
                // Chuẩn bị proc
                var insertProcedure = "Proc_TrangThai_Update";

                // Thực thi proc
                var result = SqlServerConnection.Query(insertProcedure, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return "Update thành công!";
                }
                return null;
            }
        }
        public IEnumerable<Room> GetRoomToOrderRoom()
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("MINHDQ")))
            {
                // Chuẩn bị proc
                var getProcedure = "Proc_OrderRoom_GetRooms";

                // Thực thi proc
                var result = SqlServerConnection.QueryMultiple(getProcedure, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return result.Read<Room>();
                }
                return null;
            }
        }
    }
}
