using System;

namespace Api_QLKhachSan_N2.Entities
{
    public class RoomType
    {
        public Guid? LID { get; set; }
        /// <summary>
        /// Mã loại
        /// </summary>
        public string MaLoai { get; set; }
        /// <summary>
        /// Tên loại
        /// </summary>
        public string TenLoai { get; set; }
        /// <summary>
        /// Ghi chú
        /// </summary>
        public string GhiChu { get; set; }
        public RoomType()
        {

        }
    }
}
