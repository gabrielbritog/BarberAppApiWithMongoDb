

using AutoMapper;
using BarberApp.Domain.Dto.Barber;
using BarberApp.Domain.Dto.Company;
using BarberApp.Domain.Interface.Repositories;
using BarberApp.Domain.Interface.Services;
using BarberApp.Domain.Models;
using BarberApp.Service.Configurations;
using System.Threading;

namespace BarberApp.Service.Service
{
    public class CompanyService : ICompanyService
    {
        private readonly IMapper _mapper;
        private readonly ICompanyRepository _companyRepository;
        public CompanyService(ICompanyRepository companyRepository, IMapper mapper)
        {
            _mapper = mapper;
            _companyRepository = companyRepository;
        }
        public async Task<ResponseCompanyDto> GetById(string companyId) => _mapper.Map<ResponseCompanyDto>(await _companyRepository.GetById(companyId));

        public async Task<ResponseCompanyDto> Register(RegisterCompanyDto company)
        {
            var companyRegister = _mapper.Map<Company>(company);
            companyRegister.Registration = DateTime.Now;
            return _mapper.Map< ResponseCompanyDto>(await _companyRepository.Register(companyRegister));
        }

        public async Task<ResponseCompanyDto> Update(UpdateCompanyDto company)
        {
           var companyDb = await _companyRepository.GetById(company.Id);
            companyDb.Name ??= company.Name;
            companyDb.Adress ??= company.Adress;

            return _mapper.Map<ResponseCompanyDto>(await _companyRepository.Update(companyDb));
        }
    }
}
