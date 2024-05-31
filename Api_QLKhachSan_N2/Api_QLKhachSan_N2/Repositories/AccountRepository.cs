using Api_QLKhachSan_N2.Entities;
using Api_QLKhachSan_N2.Interface;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;

namespace Api_QLKhachSan_N2.Repositories
{
    public class AccountRepository: IAccountRepository
    {
        SqlConnection MySqlConnector;
        IConfiguration _cofiguration;
        public AccountRepository(IConfiguration cofiguration)
        {
            _cofiguration = cofiguration;
        }

        public string createAccount(Account account)
        {
            using (MySqlConnector = new SqlConnection(_cofiguration.GetConnectionString("MINHDQ")))
            {
                // Chuẩn bị proc
                string insertProcedure = "proc_InsertAccount";

                // Chuẩn bị tham số cho proc
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@HoTen", account.Hoten);
                parameters.Add("@SDT", account.SDT);
                parameters.Add("@TenDangNhap", account.TenDangNhap);
                parameters.Add("@MatKhau", account.MatKhau);

                // Thực thi procedure
                var result = MySqlConnector.Execute(insertProcedure, parameters, commandType: System.Data.CommandType.StoredProcedure);

                if (result > 0)
                {
                    return "Thêm mới thành công!";
                }
                return null;
            }
        }

        public string deleteAccount(Guid? TKID)
        {
            using (MySqlConnector = new SqlConnection(_cofiguration.GetConnectionString("MINHDQ")))
            {
                // Chuẩn bị tên proc
                var deleteProcedure = "proc_DeleteAccount";

                // Chuẩn bị param cho proc
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@TKID", TKID);

                // Thực thi proc
                var result = MySqlConnector.Execute(deleteProcedure, parameters, commandType: System.Data.CommandType.StoredProcedure); ;

                if (result > 0)
                {
                    return "Xóa thành công!";
                }
                return null;
            }
        }

        public IEnumerable<Account> GetAllAccount()
        {
            using (MySqlConnector = new SqlConnection(_cofiguration.GetConnectionString("MINHDQ")))
            {
                var getProcedure = "Proc_GetAllTaiKhoan";

                var results = MySqlConnector.QueryMultiple(getProcedure, commandType: System.Data.CommandType.StoredProcedure);

                if(results != null)
                {
                    return results.Read<Account>();
                }
                return null;
            }
        }

        public Account UpdateAccount(Account account)
        {
            using (MySqlConnector = new SqlConnection(_cofiguration.GetConnectionString("MINHDQ")))
            {
                // Chuẩn bị proc
                var updateProcedure = "proc_UpdateAccount";

                // Chuẩn bị tham số cho proc
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@TKID", account.TKID);
                parameters.Add("@HoTen", account.Hoten);
                parameters.Add("@SDT", account.SDT);
                parameters.Add("@TenDangNhap", account.TenDangNhap);
                parameters.Add("@MatKhau", account.MatKhau);
                parameters.Add("@Role", account.Role);

                // Thực thi proc
                var result = MySqlConnector.Query(updateProcedure, parameters, commandType: System.Data.CommandType.StoredProcedure);

                if (result != null)
                {
                    return account;
                }
                return null;
            }
        }
    }
}
