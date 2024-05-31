using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_QLKhachSan_N2.Entities
{
    public class OrderService
    {
        /// <summary>
        /// ID gọi dịch vụ
        /// </summary>
        public Guid? IDGoiDV { get; set; }

        /// <summary>
        /// Thời gian gọi dịch vụ
        /// </summary>
        public DateTime ThoiGianGoi { get; set; }

        /// <summary>
        /// Giá tiền các dịch vụ được gọi
        /// </summary>
        public double GiaTien { get; set; }

        /// <summary>
        /// ID dịch vụ
        /// </summary>
        public Guid? DVID { get; set; }

        /// <summary>
        /// ID khách hàng
        /// </summary>
        public Guid? KHID { get; set; }

        public OrderService()
        {

        }
    }
}
