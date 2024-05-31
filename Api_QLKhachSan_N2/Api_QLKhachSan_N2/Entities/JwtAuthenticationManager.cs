using Api_QLKhachSan_N2.Interface;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Api_QLKhachSan_N2.Entities
{
    public class JwtAuthenticationManager
    {
        public JwtAuthenticationManager(IAccountService accountService)
        {
            _accountService = accountService;
        }
        public IAccountService _accountService;

        public JwtAuthResponse Authenticate(string userName, string password)
        {
            AccountResponse KQ = KiemTra(userName, password);
            if (KQ == null)
            {
                return null;
            }
            var tokenExpiryTimeStamp = DateTime.Now.AddMinutes(Constants.JWT_TOKEN_VALIDITY_MINS);
            var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(Constants.JWT_SECURITY_KEY);
            var securityTokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new List<Claim>
                {
                    new Claim("role", KQ.role),
                    new Claim(ClaimTypes.PrimaryGroupSid, "User Group 01")
                }),
                Expires = tokenExpiryTimeStamp,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
            };
            var securityToken = jwtSecurityTokenHandler.CreateToken(securityTokenDescriptor);
            var token = jwtSecurityTokenHandler.WriteToken(securityToken);
            return new JwtAuthResponse
            {
                token = token,
                user_name = userName,
                role = KQ.role,
                hoTen = KQ.hoten,
                expires_in = (int)tokenExpiryTimeStamp.Subtract(DateTime.Now).TotalSeconds
            };
        }

        public AccountResponse KiemTra(string userName, string password)
        {
              try
            {
                var taikhoans = _accountService.GetAllAccount();
                if(taikhoans != null)
                {
                    foreach (var taikhoan in taikhoans)
                    {
                        if (taikhoan.TenDangNhap == userName && taikhoan.MatKhau == password)
                        {
                            return new AccountResponse(taikhoan.Role, taikhoan.Hoten);
                        }
                    }
                    return null;
                }
                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
