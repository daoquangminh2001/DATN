using Api_QLKhachSan_N2.Entities;
using System;
using System.Collections.Generic;

namespace Api_QLKhachSan_N2.Interface
{
    public interface IServiceService
    {
        IEnumerable<Service> getGetFilterService(string? search, int? pageNumber, int? pageSize);
        Guid? DeleteService(Guid? DVID);
        string GetNewCode();
        string CreateService(Service service);
        Guid? UpdateService(Guid dvid, Service service);
    }
}
