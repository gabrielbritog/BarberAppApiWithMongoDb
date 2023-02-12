using AutoMapper;
using BarberApp.Domain.Dto.Scheduling;
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
    public class SchedulingService : ISchedulingService
    {
        private readonly ISchedulingRepository _schedulingRepository;
        private readonly IMapper _mapper;
        public SchedulingService(ISchedulingRepository schedulingRepository, ITokenService tokenService, TokenConfiguration tokenConfiguration, IMapper mapper)
        {
            _schedulingRepository = schedulingRepository;
            _mapper = mapper;
        }

        public Task<Scheduling> Delete(string schedulingId, string userId)
        {
            throw new NotImplementedException();
        }

        public Task<List<Scheduling>> GetAll(string userId)
        {
            throw new NotImplementedException();
        }

        public Task<Scheduling> GetById(string schedulingId)
        {
            throw new NotImplementedException();
        }

        public async Task<RegisterSchedulingDto> Register(RegisterSchedulingDto scheduling, string UserId)
        {

            var schedulingMap = _mapper.Map<Scheduling>(scheduling);
            schedulingMap.UserId = UserId;
            var quantity = scheduling.ServiceType.Count;
            for (int i = 0; i < quantity;)
            {
                scheduling.ServiceType[i].UserId = UserId;
                i++;
            }
            
            await _schedulingRepository.Register(schedulingMap, UserId);
          // var teste = _mapper.Map<ResponseSchedulingDto>(scheduling);
            return scheduling;
        }

        public Task<Scheduling> Update(Scheduling scheduling, string userId)
        {
            throw new NotImplementedException();
        }
    }
}
