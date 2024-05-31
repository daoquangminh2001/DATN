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

namespace Api_QLKhachSan_N2.Controllers
{
    [Route("api/v1/OrderRooms")]
    [ApiController]
    public class OrderRoomsController : ControllerBase
    {
        public IOrderRoomService _orderRoomService;
        public OrderRoomsController(IOrderRoomService orderRoomService)
        {
            _orderRoomService = orderRoomService;
        }
        [HttpGet]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(List<OrderRoom>))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult GetAll_OrderRooms([FromQuery] int? PageIndex, [FromQuery] int? RowPerPage, [FromQuery] string? Search)
        {
            try
            {
                var result = _orderRoomService.GetAllOrderRooms(PageIndex, RowPerPage, Search);

                //trả về dữ liệu
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
        /// api thêm mới thông tin đặt phòng
        /// </summary>
        /// <param name="OrderRoom"></param>
        /// <returns></returns>
        [HttpPost]
        [SwaggerResponse(StatusCodes.Status201Created)]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult InsertOrderRoom([FromBody] OrderRoom OrderRoom)
        {
            try
            {
                var result = _orderRoomService.InsertOrderRoom(OrderRoom);

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
        /// <summary>
        /// api sửa thông tin đặt phòng
        /// </summary>
        /// <param name="OrderRoom"></param>
        /// <returns></returns>
        [HttpPut]
        [Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(OrderRoom))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult UpdateOrderRoom([FromBody] OrderRoom OrderRoom)
        {
            try
            {
                var result = _orderRoomService.UpdateOrderRoom(OrderRoom);

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

        [HttpPost]
        [Route("Room_Can_Order")]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(List<Room>))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult GetRoom_Can_Order([FromBody] FilterRoomByDate filter)
        {
            try
            {
                var result = _orderRoomService.GetRoomAvailable(!string.IsNullOrEmpty(filter.StartDate)?DateTime.Parse(filter.StartDate): null, !string.IsNullOrEmpty(filter.EndDate) ? DateTime.Parse(filter.EndDate) : null);

                //trả về dữ liệu
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
