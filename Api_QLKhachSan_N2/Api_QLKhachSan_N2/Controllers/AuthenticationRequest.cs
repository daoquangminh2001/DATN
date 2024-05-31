using System;

namespace Api_QLKhachSan_N2.Controllers
{
    [Serializable]
    public class AuthenticationRequest
    {
        /// <summary>
        /// Tên đăng nhập
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// Mật khẩu
        /// </summary>
        public string Password { get; set; }
    }
}
