using Api_QLKhachSan_N2.Entities;
using Api_QLKhachSan_N2.Interface;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;

namespace Api_QLKhachSan_N2.repositories
{
    public class GuestRepository:IGuestRepository
    {
        IConfiguration configuration;
        SqlConnection SqlServerConnection;
        public GuestRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public IEnumerable<Guest> GetFilterGuest(int? pagenumber, int? rowsofpage, string search, string sort)
        {
            // Kết nối DB
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("MINHDQ")))
            {
                // Chuẩn bị proc
                var getProcedure = "Proc_Guest_GetPaging";

                // Chuẩn bị biến paging
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Search", search);
                parameters.Add("@Sort", sort);
                parameters.Add("@Skip", (pagenumber - 1) * rowsofpage);
                parameters.Add("@Take", rowsofpage);

                // Thực thi proc
                var result = SqlServerConnection.QueryMultiple(getProcedure, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return result.Read<Guest>();
                }
                return null;
            }
        }
        public string? CreateGuest(Guest guest)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("MINHDQ")))
            {
                // Chuẩn bị proc
                var insertProcedure = "Proc_Guest_Insert";

                // Chuẩn bị tham số cho proc
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@MaKH", guest.MaKH);
                parameters.Add("@HoTen", guest.HoTen);
                parameters.Add("@CMT", guest.CMT);
                parameters.Add("@GioiTinh", guest.GioiTinh);
                parameters.Add("@SDT", guest.SDT);
                parameters.Add("@GhiChu", guest.GhiChu);
                parameters.Add("@DiaChi", guest.DiaChi);
                parameters.Add("@NgaySinh", guest.NgaySinh);
                parameters.Add("@CreateBy", guest.CreateBy);

                // Thực thi proc
                var result = SqlServerConnection.Query(insertProcedure, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if(result != null)
                {
                    return guest.MaKH;
                }
                return null;
            }
        }

        public string? UpdateGuest(Guest guest)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("MINHDQ")))
            {
                //Chuẩn bị tên proc
                var updateProcedure = "Proc_Guest_Update";

                // Chuẩn bị param cho proc
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@khid", guest.KHID);
                parameters.Add("@HoTen", guest.HoTen);
                parameters.Add("@CMT", guest.CMT);
                parameters.Add("@GioiTinh", guest.GioiTinh);
                parameters.Add("@SDT", guest.SDT);
                parameters.Add("@GhiChu", guest.GhiChu);
                parameters.Add("@DiaChi", guest.DiaChi);
                parameters.Add("@NgaySinh", guest.NgaySinh);
                parameters.Add("@ModifiedBy", guest.ModifiedBy);

                // Thực thi proc
                var result = SqlServerConnection.Execute(updateProcedure, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result > 0)
                {
                    return "Cập nhật thành công!";
                }
                return null;
            }
        }
        public string? DeleteGuest(string? khid)
        {
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("MINHDQ")))
            {
                //Chuẩn bị tên proc
                var deleteProcedure = "Proc_Guest_Delete";

                // Chuẩn bị param cho proc
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@khid", Guid.Parse(khid));

                // Thực thi proc
                var result = SqlServerConnection.Execute(deleteProcedure, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result > 0)
                {
                    return khid;
                }
                return null;
            }
        }
    }
}
