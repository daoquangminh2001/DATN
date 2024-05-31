using System;

namespace Api_QLKhachSan_N2.Entities
{
    public class Service
    {
        public Guid? DVID { get; set; }

        public string TenDV { get; set; }
        public string MaDV { get; set; }
        public double GiaTien { get; set; }
        public string? HoatDong { get; set; }
        public string DonVi { get; set; }
        public string? isDelete { get; set; }
        public string? GhiChu { get; set; }
        public string? MoTa { get; set; }
        public Service()
        {

        }
    }


}
