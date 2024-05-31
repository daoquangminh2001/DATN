using Api_QLKhachSan_N2.Entities;
using Api_QLKhachSan_N2.Interface;
using Castle.Core.Configuration;
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
    [Route("/api/v1/Bills")]
    [ApiController]
    public class BillsController : ControllerBase
    {
        public BillsController(IBillService billService)
        {
            _billService = billService;
        }
        public IBillService _billService;

        [HttpGet]
        [Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(List<Bill>))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult getAllBill()
        {
            try
            {
                var result = _billService.getAllBill();
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

        // API lấy danh sách các phòng khách hàng đã đặt
        [HttpGet]
        [Route("GetOrderRoom")]
        [Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(List<>))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult getBill_OrderRoom([FromQuery] string? customerID)
        {
            try
            {
                var result = _billService.getBill_OrderRoom(customerID);

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

        // API lấy danh sách các dịch vụ đã gọi của khách hàng
        [HttpGet]
        [Route("GetOrderService")]
        [Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(List<>))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult getBill_OrderService([FromQuery] string? customerID)
        {
            try
            {
                var result = _billService.getBill_OrderService(customerID);

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

        // API lấy tổng tiền của các phòng và các dịch vụ của khách hàng
        [HttpGet]
        [Route("GetPayment")]
        [Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(List<>))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult getBill_Payment([FromQuery] string? customerID)
        {
            try
            {
                var result = _billService.getBill_Payment(customerID);

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

        // API lấy thông tin khách hàng
        [HttpGet]
        [Route("GetCustomer")]
        [Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(List<>))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult getBill_Customer([FromQuery] string? customerID)
        {
            try
            {
                var result = _billService.getBill_Customer(customerID);

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


        // API update thông tin trạng thái của hóa đơn
        [HttpPut]
        [Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(Bill))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult updateBill([FromQuery] string? customerID)
        {
            try
            {
                    var result = _billService.UpdateBill(customerID);

                // Xử lý giá trị trả về từ db
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


        // API thêm hóa đơn
        [HttpPost]
        [Authorize]
        [SwaggerResponse(StatusCodes.Status201Created, type: typeof(Bill))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult InsertBill([FromBody] Bill bill)
        {
            try
            {
                var result = _billService.InsertBill(bill);

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

        // Lấy hóa đơn theo CMT khách hàng
        [Route("/api/v1/Bills/GetBillByGuestID")]
        [HttpGet]
        [Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(List<Bill>))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult getBillByGuestID(string? guestID)
        {
            try
            {
                var result = _billService.getBillByGuestID(guestID);

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
    }
}
