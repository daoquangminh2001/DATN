using Api_QLKhachSan_N2.Entities;
using Api_QLKhachSan_N2.Interface;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;

namespace Api_QLKhachSan_N2.Repositories
{
    public class OrderServiceRepository : IOrderServiceRepository
    {
        IConfiguration configuration;
        SqlConnection SqlServerConnection;
        public OrderServiceRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public string InsertOrderService(string? CMT, string? TenPhong, string? DVID, DateTime? ThoiGianGoi)
        {
            // Kết nối DB
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("MINHDQ")))
            {
                // Chuẩn bị proc
                var insertProcedure = "Proc_OrderService_Insert";

                // Chuẩn bị tham số cho proc
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@DVID", Guid.Parse(DVID));
                parameters.Add("@CMT", CMT);
                parameters.Add("@TenPhong", TenPhong);
                parameters.Add("@ThoiGianGoi", ThoiGianGoi);

                // Thực thi proc
                var result = SqlServerConnection.Query(insertProcedure, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return "Thêm mới thành công!";
                }
                return null;
            }
        }
    }
}
