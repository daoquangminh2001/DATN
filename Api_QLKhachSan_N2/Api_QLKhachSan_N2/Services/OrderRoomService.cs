using Api_QLKhachSan_N2.Entities;
using Api_QLKhachSan_N2.Interface;
using System;
using System.Collections.Generic;

namespace Api_QLKhachSan_N2.Services
{
    public class OrderRoomService : IOrderRoomService
    {
        public readonly IOrderRoomRepository _orderRoomRepository;
        public OrderRoomService(IOrderRoomRepository orderRoomRepository)
        {
            _orderRoomRepository = orderRoomRepository;
        }
        public IEnumerable<OrderRoom> GetAllOrderRooms(int? PageIndex, int? RowPerPage, string Search)
        {
            return _orderRoomRepository.GetAllOrderRooms(PageIndex, RowPerPage, Search);
        }

        public string InsertOrderRoom(OrderRoom OrderRoom)
        {
            return _orderRoomRepository.InsertOrderRoom(OrderRoom);
        }

        public OrderRoom UpdateOrderRoom(OrderRoom OrderRoom)
        {
            return _orderRoomRepository.UpdateOrderRoom(OrderRoom);
        }

        public IEnumerable<Room> GetRoomAvailable(DateTime? NgayBatDau, DateTime? NgayKetThuc)
        {
            return _orderRoomRepository.GetRoomAvailable(NgayBatDau, NgayKetThuc);
        }
    }
}
