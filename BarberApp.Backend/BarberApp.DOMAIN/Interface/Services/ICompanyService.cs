using BarberApp.Domain.Dto.Company;
using BarberApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Domain.Interface.Services
{
    public interface ICompanyService
    {
        public Task<ResponseCompanyDto> Register(RegisterCompanyDto company);
        public Task<ResponseCompanyDto> Update(UpdateCompanyDto company);
        public Task<ResponseCompanyDto> GetById(string companyId);
    }
}
