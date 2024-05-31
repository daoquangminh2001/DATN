using Api_QLKhachSan_N2.Entities;
using Api_QLKhachSan_N2.Interface;
using Castle.Core.Configuration;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;

namespace Api_QLKhachSan_N2.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        public AccountsController(IAccountService accountService)
        {
            _accountService = accountService;
        }
        public IAccountService _accountService;

        /// <summary>
        /// Api đăng nhập
        /// </summary>
        /// <param name="authenticationRequest"></param>
        /// <returns>{username, password, role, token}</returns>
        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] AuthenticationRequest authenticationRequest)
        {
            var jwtAuthenticationManager = new JwtAuthenticationManager(_accountService);
            var authResult = jwtAuthenticationManager.Authenticate(authenticationRequest.UserName, authenticationRequest.Password);
            if (authResult == null)
            {
                return Unauthorized();
            }
            else
                return Ok(authResult);
        }

        [HttpGet]
        [Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(List<Account>))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult getAllAccount()
        {
            try
            {
                var result = _accountService.GetAllAccount();

                // Xử lý trả về của DB
                if (result != null)
                {
                    return StatusCode(StatusCodes.Status200OK, result);
                }
                return StatusCode(StatusCodes.Status400BadRequest, "e002");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "e001");
            }
        }

        /// <summary>
        /// Thêm tài khoản
        /// </summary>
        /// <param name="taikhoan"></param>
        /// <returns></returns>
        [HttpPost]
        [Authorize]
        [SwaggerResponse(StatusCodes.Status201Created, type: typeof(string))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult createAccount([FromBody] Account account)
        {
            try
            {
                var result = _accountService.createAccount(account);

                // Xử lý trả về của DB
                if (result != null)
                {
                    return StatusCode(StatusCodes.Status201Created, result);

                }
                return StatusCode(StatusCodes.Status400BadRequest, "e002");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "e001");
            }
        }

        /// <summary>
        /// Sửa thông tin tài khoản
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        [HttpPut]
        [Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(Account))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult UpdateAccount([FromBody] Account account)
        {
            try
            {
                var result = _accountService.UpdateAccount(account);

                // Xử lý trả về của DB
                if (result != null)
                {
                    return StatusCode(StatusCodes.Status200OK, result);
                }
                return StatusCode(StatusCodes.Status400BadRequest, "e002");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "e001");
            }
        }

        [HttpDelete("{TKID}")]
        [Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(string))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult deleteAccount([FromRoute] Guid? TKID)
        {
            try
            {
                var result = _accountService.deleteAccount(TKID);

                // Xử lý giá trị trả về từ db
                if (result != null)
                {
                    return StatusCode(StatusCodes.Status200OK, result);
                }
                return StatusCode(StatusCodes.Status400BadRequest, "e002");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "e001");
            }
        }
    }
}
