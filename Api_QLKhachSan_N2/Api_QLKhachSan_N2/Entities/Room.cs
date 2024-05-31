using System;
using System.ComponentModel.DataAnnotations;

namespace Api_QLKhachSan_N2.Entities
{
    public class Room
    {
        /// <summary>
        /// ID phòng
        /// </summary>
        public Guid? PID { get; set; }

        /// <summary>
        /// ID loại phòng
        /// </summary>
        public Guid? LID { get; set; }

        /// <summary>
        /// Mã phòng
        /// </summary>
        public string MaPhong { get; set; }

        /// <summary>
        /// Tên phòng
        /// </summary>
        public string TenPhong { get; set; }

        /// <summary>
        /// Trạng thái
        /// </summary>
        public string TrangThai { get; set; }

        /// <summary>
        /// Giá phòng
        /// </summary>
        public double GiaPhong { get; set; }

        /// <summary>
        /// Hoạt động
        /// </summary>
        public string HoatDong { get; set; }

        /// <summary>
        /// is delete (phòng còn sử dụng hay đã bỏ)
        /// </summary>
        public string isDelete { get; set; }

        /// <summary>
        /// Mô tả
        /// </summary>
        public string MoTa { get; set; }
        public Room()
        {

        }
    }
}
