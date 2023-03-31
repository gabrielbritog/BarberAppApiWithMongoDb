using BarberApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Domain.Interface.Repositories
{
    public interface ICompanyRepository
    {
        public Task<Company> Register(Company company);
        public Task<Company> Update(Company company);
        public Task<Company> GetById(string companyId);
    }
}
