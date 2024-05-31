using Api_QLKhachSan_N2.Entities;
using Api_QLKhachSan_N2.Interface;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;

namespace Api_QLKhachSan_N2.Repositories
{
    public class ServiceRepository : IServiceRepository
    {
        IConfiguration configuration;
        SqlConnection SqlServerConnection;
        public ServiceRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public IEnumerable<Service> getGetFilterService(string? search, int? pageNumber, int? pageSize)
        {
            // Kết nối DB
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("MINHDQ")))
            {
                // Chuẩn bị proc
                var getProcedure = "proc_GetAllServices";

                // Chuẩn bị biến paging
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@search", search);
                parameters.Add("@pageNumber", pageNumber);
                parameters.Add("@pageSize", pageSize);

                // Thực thi proc
                var result = SqlServerConnection.QueryMultiple(getProcedure, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return result.Read<Service>();
                }
                return null;
            }
        }
        public Guid? DeleteService(Guid? DVID)
        {
            // Kết nối DB
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("MINHDQ")))
            {
                // Chuẩn bị proc 
                var deleteProcedure = "proc_Service_Delete";

                // Chuẩn bị param
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@DVID", DVID);

                //Thực thi query
                var result = SqlServerConnection.Execute(deleteProcedure, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result > 0)
                {
                    return DVID;
                }
                return null;
            }
        }
        public string GetNewCode()
        {
            // Kết nối DB
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("MINHDQ")))
            {
                // Chuẩn bị proc 
                var GetMaxCodeProcedure = "Proc_DichVu_GetMaxCode";

                // Thực thi proc
                var result = SqlServerConnection.ExecuteScalar(GetMaxCodeProcedure);
                if (result is not null)
                {
                    int tempCode = int.Parse(result.ToString());
                    tempCode++;
                    string answer;
                    if (tempCode < 10)
                    {
                        answer = "DV00" + tempCode.ToString();
                    }
                    else if (tempCode < 100)
                    {
                        answer = "DV0" + tempCode.ToString();
                    }
                    else
                    {
                        answer = "DV" + tempCode.ToString();
                    }
                    return answer;
                }
                return null;
            }
        }

        public string CreateService(Service service)
        {
            // Kết nối DB
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("MINHDQ")))
            {
                // Chuẩn bị proc 
                var InsertServiceProcedure = "Proc_Service_Insert";

                // Chuẩn bị biến paging
                DynamicParameters parameters = new DynamicParameters();
                service.DVID = new Guid();
                //(@madv,@tendichvu,@giatien,@hoatdong,@donvi,@ghichu,@isDelete,@mota)
                parameters.Add("@madv", service.MaDV);
                parameters.Add("@tendichvu", service.TenDV);
                parameters.Add("@giatien", service.GiaTien);
                parameters.Add("@hoatdong", service.HoatDong);
                parameters.Add("@donvi", service.DonVi);
                parameters.Add("@ghichu", service.GhiChu);
                parameters.Add("@isDelete", service.isDelete);
                parameters.Add("@mota", service.MoTa);

                // Thực thi proc
                var result = SqlServerConnection.Execute(InsertServiceProcedure, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result > 0)
                {
                    return service.MaDV;
                }
                return null;
            }
        }
        public Guid? UpdateService(Guid dvid, Service service)
        {
            // Kết nối DB
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("MINHDQ")))
            {
                // Chuẩn bị proc 
                var UpdateServiceProcedure = "Proc_Service_Update";

                // Chuẩn bị biến paging
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@dvid", dvid);
                parameters.Add("@tendichvu", service.TenDV);
                parameters.Add("@giatien", service.GiaTien);
                parameters.Add("@hoatdong", service.HoatDong);
                parameters.Add("@donvi", service.DonVi);
                parameters.Add("@ghichu", service.GhiChu);
                parameters.Add("@mota", service.MoTa);

                // Thực thi proc
                var result = SqlServerConnection.Execute(UpdateServiceProcedure, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result > 0)
                {
                    return dvid;
                }
                return null;
            }
        }
    }
}
