using AutoMapper;
using BarberApp.Domain.Dto.ServiceType;
using BarberApp.Domain.Interface.Repositories;
using BarberApp.Domain.Interface.Services;
using BarberApp.Domain.Models;

namespace BarberApp.Service.Service
{
    public class ServiceTypeService : IServiceTypeService
    {
        private readonly IServiceTypeRepository _serviceTypeRepository;
        private readonly IMapper _mapper;
        public ServiceTypeService(IServiceTypeRepository serviceTypeRepository, IMapper mapper)
        {
            _mapper = mapper;
            _serviceTypeRepository = serviceTypeRepository;
        }
        public Task<ServiceType> Delete(RegisterServiceTypeDto serviceType, string UserId) => throw new NotImplementedException();
        public async Task<List<ServiceType>> GetMany(string userId, int start, int count) => await _serviceTypeRepository.GetMany(userId, start, count);  
        public async Task<List<ServiceType>> GetMany(string userId,string barberId, int start, int count) => await _serviceTypeRepository.GetMany(userId, barberId, start, count);
        public async Task<ServiceType> GetById(string userId, string idService) => await _serviceTypeRepository.GetById(userId, idService);
        public async Task<ResponseServiceTypeDto> Register(RegisterServiceTypeDto serviceType, string UserId)
        {
                serviceType.On = true;
                serviceType.UserId = UserId;
            var serviceMap = _mapper.Map<ServiceType>(serviceType);
            var result = await _serviceTypeRepository.Register(serviceMap, UserId);
                return _mapper.Map<ResponseServiceTypeDto>(result);       
            
        }
        public async Task<ResponseServiceTypeDto> Register(RegisterServiceTypeDto serviceType, string UserId, string barberId)
        {
            serviceType.barberId = barberId;
            serviceType.On = true;
            serviceType.UserId = UserId;
            var serviceMap = _mapper.Map<ServiceType>(serviceType);
            var result = await _serviceTypeRepository.Register(serviceMap, UserId);
            return _mapper.Map<ResponseServiceTypeDto>(result);

        }

        public async Task<ResponseServiceTypeDto> Update(UpdateServiceTypeDto serviceType, string userId)
        {
            var serviceTypeDb = await GetById(userId, serviceType.ServiceTypeId);
            if (string.IsNullOrWhiteSpace(serviceType.NameService))
                serviceType.NameService = serviceTypeDb.NameService;
            if (serviceType.ValueService == 0)
                serviceType.ValueService = serviceTypeDb.ValueService;
            if (string.IsNullOrWhiteSpace(serviceType.barberId))
                serviceType.barberId = serviceTypeDb.BarberId;
            if (string.IsNullOrWhiteSpace(serviceType.Duration))
                serviceType.Duration = serviceTypeDb.Duration;

            await _serviceTypeRepository.Update(_mapper.Map<ServiceType>(serviceType), serviceType.ServiceTypeId, userId);
            return _mapper.Map<ResponseServiceTypeDto>(serviceType);
        }
    }
}
