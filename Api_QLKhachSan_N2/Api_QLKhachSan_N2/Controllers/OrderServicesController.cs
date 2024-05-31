using Api_QLKhachSan_N2.Entities;
using Api_QLKhachSan_N2.Interface;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_QLKhachSan_N2.Controllers
{
    [Route("/api/v1/OrderServices")]
    [ApiController]
    public class OrderServicesController : ControllerBase
    {
        public IOrderServiceService _orderServiceService;
        public OrderServicesController(IOrderServiceService orderServiceService)
        {
            _orderServiceService = orderServiceService;
        }

        [HttpPost]
        [SwaggerResponse(StatusCodes.Status201Created, type: typeof(string))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult InsertOrderService([FromQuery] string? CMT, [FromQuery] string? TenPhong, [FromQuery] string? DVID, [FromQuery] DateTime? ThoiGianGoi)
        {
            try
            {
                var result = _orderServiceService.InsertOrderService(CMT, TenPhong, DVID, ThoiGianGoi);

                // Xử lý trả về của DB
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

    }
}
