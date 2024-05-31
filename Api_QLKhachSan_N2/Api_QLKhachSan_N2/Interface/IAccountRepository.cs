using Api_QLKhachSan_N2.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace Api_QLKhachSan_N2.Interface
{
    public interface IAccountRepository
    {
        IEnumerable<Account> GetAllAccount();
        string createAccount(Account account);
        Account UpdateAccount(Account account);
        string deleteAccount(Guid? TKID);
    }
}
