﻿using AutoMapper;
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

        public async Task<RegisterServiceTypeDto> Register(RegisterServiceTypeDto serviceType, string UserId)
        {
            
                serviceType.UserId = UserId;
            var serviceMap = _mapper.Map<ServiceType>(serviceType);
            await _serviceTypeRepository.Register(serviceMap, UserId);
                return serviceType;       
            
        }

        public Task<ServiceType> Update(RegisterServiceTypeDto serviceType, string UserId)
        {
            throw new NotImplementedException();
        }
    }
}