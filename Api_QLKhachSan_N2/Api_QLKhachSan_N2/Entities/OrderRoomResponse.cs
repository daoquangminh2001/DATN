using System;

namespace Api_QLKhachSan_N2.Entities
{
    public class OrderRoomResponse
    {
        public string MaPhong { get; set; }
        public string TenPhong { get; set; }
        public DateTime NgayBatDau { get; set; }
        public DateTime NgayKetThuc { get; set; }
    }
}
