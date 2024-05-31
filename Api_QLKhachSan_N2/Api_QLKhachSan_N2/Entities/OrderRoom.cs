using System;
using System.ComponentModel.DataAnnotations;

namespace Api_QLKhachSan_N2.Entities
{
    public class OrderRoom
    {
        /// <summary>
        /// Mã đặt phòng
        /// </summary>
        public Guid? IDDP { get; set; }

        /// <summary>
        /// Mã phòng
        /// </summary>
        //[Required(ErrorMessage = "e004")]
        public Guid? PID { get; set; }

        /// <summary>
        /// Mã khách hàng
        /// </summary>
        //[Required(ErrorMessage = "e005")]

        public string HoTen { get; set; }
        public string TenPhong { get; set; }
        public Guid? KHID { get; set; }
        public string? CMT { get; set; }

        /// <summary>
        /// Ngày bắt đầu đến ở
        /// </summary>
        [Required(ErrorMessage = "e006")]
        public DateTime NgayBatDau { get; set; }

        /// <summary>
        /// Ngày trả phòng
        /// </summary>
        [Required(ErrorMessage = "e007")]
        public DateTime NgayKetThuc { get; set; }

        /// <summary>
        /// Tiền Phòng
        /// </summary>
        public double GiaTien { get; set; }

        /// <summary>
        /// Trạng thái trả phòng (false là đang ở, true là đã trả phòng)
        /// </summary>
        //[Required(ErrorMessage = "e009")]
        public string isDelete { get; set; }

        public OrderRoom()
        {

        }
    }
}
