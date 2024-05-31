using Api_QLKhachSan_N2.Entities;
using Api_QLKhachSan_N2.Interface;
using System;
using System.Collections.Generic;

namespace Api_QLKhachSan_N2.Services
{
    public class ServiceService: IServiceService
    {
        IServiceRepository _serviceRepository;
        public ServiceService(IServiceRepository serviceRepository)
        {
            _serviceRepository = serviceRepository;
        }
        public IEnumerable<Service> getGetFilterService(string? search, int? pageNumber, int? pageSize)
        {
            return _serviceRepository.getGetFilterService(search, pageNumber, pageSize);
        }
        public Guid? DeleteService(Guid? DVID)
        {
            return _serviceRepository.DeleteService(DVID);
        }
        public string GetNewCode()
        {
            return _serviceRepository.GetNewCode();
        }
        public string CreateService(Service service)
        {
            return _serviceRepository.CreateService(service);
        }
        public Guid? UpdateService(Guid dvid, Service service)
        {
            return _serviceRepository.UpdateService(dvid, service);
        }
    }
}
