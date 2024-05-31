using Api_QLKhachSan_N2.Entities;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;

namespace Api_QLKhachSan_N2.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class RoomTypeController : ControllerBase
    {
        public RoomTypeController(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }

        [HttpGet]
        [Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(List<RoomType>))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult getLoaiPhong()
        {
            try
            {
                // Kết nối DB
                var appSetting = Configuration.GetSection("AppSetting");
                var connectionString = appSetting.GetValue<string>("ConnectionString");
                SqlConnection myConnection = new SqlConnection(connectionString);
                myConnection.Open();

                // Chuẩn bị procedure
                string getProcedure = "proc_getLoaiPhong";

                // Thực thi proceduce
                var getLoaiPhong = myConnection.QueryMultiple(getProcedure, commandType: System.Data.CommandType.StoredProcedure);

                // Xử lý trả về của DB
                if (getLoaiPhong != null)
                {
                    var loaiphongs = getLoaiPhong.Read<RoomType>();
                    return StatusCode(StatusCodes.Status200OK, loaiphongs);
                }
                return StatusCode(StatusCodes.Status400BadRequest, "e002");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "e001");
            }
        }
    }
}
