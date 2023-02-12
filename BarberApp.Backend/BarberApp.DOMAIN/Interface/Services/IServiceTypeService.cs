using BarberApp.Domain.Dto.ServiceType;
using BarberApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Domain.Interface.Services
{
    public interface IServiceTypeService
    {
        public Task<RegisterServiceTypeDto> Register(RegisterServiceTypeDto serviceType, string UserId);
        public Task<ServiceType> Delete(RegisterServiceTypeDto serviceType, string UserId);
        public Task<ServiceType> Update(RegisterServiceTypeDto serviceType, string UserId);
    }
}
