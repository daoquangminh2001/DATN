namespace Api_QLKhachSan_N2.Entities
{
    public class AccountResponse
    {
        public string role { get; set; }
        public string hoten { get; set; }
        public AccountResponse(string role, string hoten)
        {
            this.role = role;
            this.hoten = hoten;
        }
    }
}
