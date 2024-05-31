using Api_QLKhachSan_N2.Entities;
using Api_QLKhachSan_N2.Interface;
using System;

namespace Api_QLKhachSan_N2.Services
{
    public class OrderServiceService : IOrderServiceService
    {
        public readonly IOrderServiceRepository _orderServiceRepository;
        public OrderServiceService(IOrderServiceRepository orderServiceRepository)
        {
            _orderServiceRepository = orderServiceRepository;
        }

        public string InsertOrderService(string? CMT, string? TenPhong, string? DVID, DateTime? ThoiGianGoi)
        {
            return _orderServiceRepository.InsertOrderService(CMT, TenPhong, DVID, ThoiGianGoi);
        }
    }
}
