using AutoMapper;
using BarberApp.Domain.Dto.Scheduling;
using BarberApp.Domain.Dto.ServiceType;
using BarberApp.Domain.Interface.Repositories;
using BarberApp.Domain.Interface.Services;
using BarberApp.Domain.Models;
using BarberApp.Infra.Repository;
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

            var schedulingMap = _mapper.Map<Scheduling>(scheduling);
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

        public async Task<UpdateSchedulingDto> Update(UpdateSchedulingDto scheduling, string userId)
        {
            var schedulingDb = await GetById(scheduling.SchedulingId, userId);
            var schedulingConvert = _mapper.Map<UpdateSchedulingDto>(schedulingDb);


            if (string.IsNullOrEmpty(scheduling.ClientName))
                scheduling.ClientName = schedulingDb.ClientName;
            if (scheduling.ServiceType == null)
                scheduling.ServiceType = schedulingConvert.ServiceType;
            if (scheduling.SchedulingDate == DateTime.MinValue)
                scheduling.SchedulingDate = schedulingDb.SchedulingDate;


            var result = await _schedulingRepository.Update(_mapper.Map<Scheduling>(scheduling), userId);
            return _mapper.Map<UpdateSchedulingDto>(result);
        }
    }
}
