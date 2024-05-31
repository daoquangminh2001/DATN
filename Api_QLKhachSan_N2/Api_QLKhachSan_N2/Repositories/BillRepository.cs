using Api_QLKhachSan_N2.Entities;
using Api_QLKhachSan_N2.Interface;
using Castle.Core.Resource;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace Api_QLKhachSan_N2.Repositories
{
    public class BillRepository : IBillRepository
    {
        IConfiguration configuration;
        SqlConnection SqlServerConnection;
        public BillRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public IEnumerable<Bill> getAllBill()
        {
            // Kết nối DB
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("MINHDQ")))
            {
                // Chuẩn bị proc
                var getProcedure = "Proc_Bill_Get";

                // Thực thi proc
                var result = SqlServerConnection.QueryMultiple(getProcedure, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return result.Read<Bill>();
                }
                return null;
            }
        }

        public IEnumerable<CustomerResponse> getBill_Customer(string customerID)
        {
            // Kết nối DB
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("MINHDQ")))
            {
                // Chuẩn bị proc
                var getProcedure = "Proc_Bill_GetCustomer";

                // Chuẩn bị biến paging
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CMT", customerID);

                // Thực thi proc
                var result = SqlServerConnection.QueryMultiple(getProcedure, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return result.Read<CustomerResponse>();
                }
                return null;
            }
        }

        public IEnumerable<OrderRoomResponse> getBill_OrderRoom(string customerID)
        {
            // Kết nối DB
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("MINHDQ")))
            {
                // Chuẩn bị proc
                var getProcedure = "Proc_Bill_OrderRooms";

                // Chuẩn bị biến paging
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CMT", customerID);

                // Thực thi proc
                var result = SqlServerConnection.QueryMultiple(getProcedure, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return result.Read<OrderRoomResponse>();
                }
                return null;
            }
        }

        public IEnumerable<OrderServiceResponse> getBill_OrderService(string customerID)
        {
            // Kết nối DB
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("MINHDQ")))
            {
                // Chuẩn bị proc
                var getProcedure = "Proc_Bill_OrderServices";

                // Chuẩn bị biến paging
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CMT", customerID);

                // Thực thi proc
                var result = SqlServerConnection.QueryMultiple(getProcedure, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return result.Read<OrderServiceResponse>();
                }
                return null;
            }
        }

        public IEnumerable<Bill> getBill_Payment(string? customerID)
        {
            // Kết nối DB
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("MINHDQ")))
            {
                // Chuẩn bị proc
                var getProcedure = "Proc_Bill_Payment";

                // Chuẩn bị tham số cho proc
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CMT", customerID);

                // Thực thi proc
                var result = SqlServerConnection.QueryMultiple(getProcedure, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return result.Read<Bill>();
                }
                return null;
            }
        }

        public Bill InsertBill(Bill bill)
        {
            // Kết nối DB
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("MINHDQ")))
            {
                // Chuẩn bị proc
                var insertProcedure = "Proc_Bill_Insert";

                // Chuẩn bị tham số cho proc

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@TongTien", bill.TongTien);
                parameters.Add("@GhiChu", bill.GhiChu);
                parameters.Add("@CMT", bill.SoCMTKhachHang);
                parameters.Add("@MaHD", bill.MaHD);
                parameters.Add("@IDDP", bill.IDDP);
                parameters.Add("@TrangThai", bill.TrangThai);

                // Thực thi proc
                var result = SqlServerConnection.Query(insertProcedure, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return bill;
                }
                return null;
            }
        }

        public string UpdateBill(string? customerID)
        {
            // Kết nối DB
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("MINHDQ")))
            {
                // Chuẩn bị tên proc
                var updateProcedure = "Proc_Bill_Update";

                // Chuẩn bị param cho proc
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CMT", customerID);

                // Thực thi proc
                var result = SqlServerConnection.Query(updateProcedure, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return "Update thành công!";
                }
                return null;
            }
        }
        public IEnumerable<Bill> getBillByGuestID(string? guestID)
        {
            // Kết nối DB
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("MINHDQ")))
            {
                // Chuẩn bị proc
                var getProcedure = "Proc_Bill_GetByGuestID";

                // Chuẩn bị tham số cho proc
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CMT", guestID);

                // Thực thi proc
                var result = SqlServerConnection.QueryMultiple(getProcedure, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return result.Read<Bill>();
                }
                return null;
            }
        }
    }
}
