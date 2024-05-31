using Api_QLKhachSan_N2.Entities;
using Api_QLKhachSan_N2.Interface;
using Api_QLKhachSan_N2.repositories;
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
    public class ServicesController : ControllerBase
    {
        IServiceService _serviceService;
        public ServicesController(IServiceService serviceService)
        {
            _serviceService = serviceService;
        }
        /// <summary>
        /// Api lấy thông tin tất cả dịch vụ
        /// lọc tên chứa biến search
        /// </summary>
        /// <returns>Danh sách dịch vụ có isDelete = false </returns>
        [HttpGet]
        [Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(List<Service>))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult GetAllServices([FromQuery] string? search, [FromQuery] int? pageNumber, [FromQuery] int? pageSize)
        {
            try
            {
                var result = _serviceService.getGetFilterService(search, pageNumber, pageSize);


                // Xử lý trả về của DB
                if (result != null)
                {
                    return StatusCode(StatusCodes.Status200OK, result);
                }
                return StatusCode(StatusCodes.Status400BadRequest, "e002");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "e001");
            }
        }

        /// <summary>
        /// Api xóa hàng theo mã Hàng
        /// </summary>
        /// <param name="DVID"></param>
        /// <returns>Mã hàng của hàng bị xóa</returns>
        [HttpDelete("{DVID}")]
        [Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(string))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public ActionResult deleteDichVuByDVID([FromRoute] Guid? DVID)
        {
            try
            {
                var result = _serviceService.DeleteService(DVID);

                //Trả về
                if (result != null)
                {
                    return StatusCode(StatusCodes.Status200OK, result);
                }
                return StatusCode(StatusCodes.Status400BadRequest, "e002");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "e001");
            }
        }

        /// <summary>
        /// Tự động tạo mã cho Service
        /// </summary>
        /// <returns>Mã code được tạo tiếp theo </returns>

        [HttpGet]
        [Route("new-code")]
        [Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(string))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult GetNewServiceCode()
        {
            try
            {
                var result = _serviceService.GetNewCode();
                if(result != null) {
                        return StatusCode(StatusCodes.Status200OK, result);
                }
                return StatusCode(StatusCodes.Status400BadRequest, "e002");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "e001");
            }
        }

        /// <summary>
        /// API thêm một dịch vụ vào DB
        /// </summary>
        /// <param name="service"></param>
        /// <returns>DVID của dịch vụ vừa thêm</returns>
        [HttpPost]
        [Authorize]
        [SwaggerResponse(StatusCodes.Status201Created, type: typeof(string))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult InsertService([FromBody] Service service)
        {
            try
            {
                var result = _serviceService.CreateService(service);

                if (result != null)
                {
                    return StatusCode(StatusCodes.Status201Created, result);
                }
                return StatusCode(StatusCodes.Status400BadRequest, "e002");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "e001");
            }

        }


        /// <summary>
        /// API sửa một dịch vụ theo DVID 
        /// </summary>
        /// <param name="dvid"></param>
        /// <param name="service"></param>
        /// <returns></returns>
        [HttpPut("{dvid}")]
        [Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(string))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult UpdateService([FromRoute] Guid dvid, [FromBody] Service? service)
        {
            try
            {
                var result = _serviceService.UpdateService(dvid, service);

                if (result != null)
                {
                    return StatusCode(StatusCodes.Status200OK, result);
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
