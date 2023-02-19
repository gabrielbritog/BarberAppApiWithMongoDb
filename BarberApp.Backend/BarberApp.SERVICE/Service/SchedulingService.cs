using AutoMapper;
using BarberApp.Domain.Dto.Scheduling;
using BarberApp.Domain.Dto.ServiceType;
using BarberApp.Domain.Interface.Repositories;
using BarberApp.Domain.Interface.Services;
using BarberApp.Domain.Models;
using BarberApp.Infra.Repository;
using BarberApp.Service.Configurations;
using MongoDB.Driver;
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

        public async Task<DeleteResult> DeleteAll(string userId)
        {
            return await _schedulingRepository.DeleteAll(userId);
        }

        public async Task<List<Scheduling>> GetAll(string userId)
        {
            return await _schedulingRepository.GetAll(userId);
        }

        public async Task<Scheduling> GetById(string schedulingId,string userId)
        {
            return await _schedulingRepository.GetById(schedulingId, userId);
        }

        public async Task<RegisterSchedulingDto> Register(RegisterSchedulingDto scheduling, string UserId)
        {
            var count = scheduling.ServiceType.Count();
            var schedulingMap = _mapper.Map<Scheduling>(scheduling);
            for (int i = 0; i < count; i++)
            {
                scheduling.ServiceType[i].UserId = UserId;
            }

            
            schedulingMap.UserId = UserId;
            
            var quantity = scheduling.ServiceType.Count;
            for (int i = 0; i < quantity;)
            {
                scheduling.ServiceType[i].UserId = UserId;
                i++;
            }
            
            await _schedulingRepository.Register(schedulingMap, UserId);
            return scheduling;
        }

        public async Task<Scheduling> Update(Scheduling scheduling, string userId)
        {
            var userDb = await this.GetById(scheduling.SchedulingId, userId);
            if (string.IsNullOrWhiteSpace(scheduling.ClientName))
                scheduling.ClientName = userDb.ClientName;
            if (scheduling.ServiceType == null)
                scheduling.ServiceType = userDb.ServiceType;
            if(scheduling.SchedulingDate == null)
                scheduling.SchedulingDate = userDb.SchedulingDate;

            var result = await _schedulingRepository.Update(scheduling, scheduling.SchedulingId, userId);

            return result;
        }
    }
}
