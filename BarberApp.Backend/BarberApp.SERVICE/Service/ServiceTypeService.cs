using AutoMapper;
using BarberApp.Domain.Dto.ServiceType;
using BarberApp.Domain.Dto.User;
using BarberApp.Domain.Interface.Repositories;
using BarberApp.Domain.Interface.Services;
using BarberApp.Domain.Models;
using BarberApp.Service.Configurations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Service.Service
{
    public class ServiceTypeService : IServiceTypeService
    {
        private readonly IServiceTypeRepository _serviceTypeRepository;
        private readonly ITokenService _tokenService;
        private readonly TokenConfiguration _tokenConfiguration;
        private readonly IMapper _mapper;
        public ServiceTypeService(IServiceTypeRepository serviceTypeRepository, IMapper mapper, ITokenService tokenService, TokenConfiguration tokenConfiguration)
        {
            _mapper = mapper;
            _serviceTypeRepository = serviceTypeRepository;
            _tokenService = tokenService;
            _tokenConfiguration = tokenConfiguration;
        }
        public Task<ServiceType> Delete(RegisterServiceTypeDto serviceType, string UserId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<ServiceType>> GetMany(string userId, int start, int count)
        {
            return await _serviceTypeRepository.GetMany(userId,start,count);
        }

        public async Task<ServiceType> GetById(string userId, string idService)
        {
            return await _serviceTypeRepository.GetById(userId, idService);
        }

        public async Task<RegisterServiceTypeDto> Register(RegisterServiceTypeDto serviceType, string UserId)
        {
                serviceType.On = true;
                serviceType.UserId = UserId;
            var serviceMap = _mapper.Map<ServiceType>(serviceType);
            await _serviceTypeRepository.Register(serviceMap, UserId);
                return serviceType;       
            
        }

        public async Task<ResponseServiceTypeDto> Update(UpdateServiceTypeDto serviceType, string userId)
        {
            var serviceTypeDb = await GetById(userId, serviceType.ServiceTypeId);
            if (string.IsNullOrWhiteSpace(serviceType.NameService))
                serviceType.NameService = serviceTypeDb.NameService;
            if (serviceType.ValueService == 0)
                serviceType.ValueService = serviceTypeDb.ValueService;
            
           await _serviceTypeRepository.Update(_mapper.Map<ServiceType>(serviceType), serviceType.ServiceTypeId, userId);
            return _mapper.Map<ResponseServiceTypeDto>(serviceType);
        }
    }
}
