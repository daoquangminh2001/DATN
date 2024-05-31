using Api_QLKhachSan_N2.Entities;
using System;
using System.Collections.Generic;

namespace Api_QLKhachSan_N2.Interface
{
    public interface IOrderServiceRepository
    {
        string InsertOrderService(string? CMT, string? TenPhong, string? DVID, DateTime? ThoiGianGoi);

    }
}
