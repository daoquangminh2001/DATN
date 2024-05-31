using Api_QLKhachSan_N2.Entities;
using Api_QLKhachSan_N2.Interface;
using System;
using System.Collections.Generic;

namespace Api_QLKhachSan_N2.Services
{
    public class AccountService: IAccountService
    {
        public IAccountRepository _accountRepository;
        public AccountService(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }

        public string createAccount(Account account)
        {
            return _accountRepository.createAccount(account);
        }

        public string deleteAccount(Guid? TKID)
        {
            return _accountRepository.deleteAccount(TKID);
        }

        public IEnumerable<Account> GetAllAccount()
        {
            return _accountRepository.GetAllAccount();
        }

        public Account UpdateAccount(Account account)
        {
            return _accountRepository.UpdateAccount(account);
        }
    }
}
