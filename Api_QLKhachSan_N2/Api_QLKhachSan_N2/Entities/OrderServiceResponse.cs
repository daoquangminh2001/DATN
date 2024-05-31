using System;

namespace Api_QLKhachSan_N2.Entities
{
    public class OrderServiceResponse
    {
        public string MaDV { get; set; }
        public string TenDV { get; set; }
        public DateTime ThoiGianGoi { get; set; }
        public double SoLuong { get; set; }
    }
}
