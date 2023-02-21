using AutoMapper;
using BarberApp.Domain.Dto.Scheduling;
using BarberApp.Domain.Interface.Repositories;
using BarberApp.Domain.Interface.Services;
using BarberApp.Domain.Models;
using BarberApp.Service.Configurations;
using MongoDB.Driver;


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
        public async Task<DeleteResult> DeleteAll(string userId,string barberId)
        {
            return await _schedulingRepository.DeleteAll(userId, barberId);
        }

        public async Task<DeleteResult> DeleteById(string userId, string schedulingId)
        {
            return await _schedulingRepository.DeleteById(userId, schedulingId);
        }

        public async Task<List<ResponseSchedulingDto>> GetMany(string userId, int start, int count)
        {
            var result = await _schedulingRepository.GetMany(userId,start,count);
            return _mapper.Map<List<ResponseSchedulingDto>>(result);
        } 

        public async Task<List<ResponseSchedulingDto>> GetMany(string userId, string barberId, int start, int count)
        {
            var result = await _schedulingRepository.GetMany(userId,barberId,start,count);
            return _mapper.Map<List<ResponseSchedulingDto>>(result);
        }

        public async Task<ResponseSchedulingDto> GetById(string schedulingId,string userId)
        {
           
            var result = await _schedulingRepository.GetById(schedulingId, userId);
            return _mapper.Map<ResponseSchedulingDto>(result);
        }

        public async Task<ResponseSchedulingDto> Register(RegisterSchedulingDto scheduling, string UserId)
        {
            
                
            var schedulingMap = _mapper.Map<Scheduling>(scheduling);           
            schedulingMap.UserId = UserId;
                var quantity = scheduling.ServiceType.Count();
            for (int i = 0; i < quantity;)
            {
                schedulingMap.ServiceType[i].UserId = UserId;
                i++;
            }          
            await _schedulingRepository.Register(schedulingMap, UserId);
            return _mapper.Map<ResponseSchedulingDto>(schedulingMap);
        }

        public async Task<ResponseSchedulingDto> Register(RegisterSchedulingDto scheduling, string UserId,string barberId)
        {
            scheduling.barberId = barberId;
            var schedulingMap = _mapper.Map<Scheduling>(scheduling);
            schedulingMap.UserId = UserId;
            var quantity = scheduling.ServiceType.Count();
            for (int i = 0; i < quantity;)
            {
                schedulingMap.ServiceType[i].BarberId = barberId;
                schedulingMap.ServiceType[i].UserId = UserId;
                i++;
            }
            await _schedulingRepository.Register(schedulingMap, UserId);
            return _mapper.Map<ResponseSchedulingDto>(schedulingMap);
        }

        public async Task<ResponseSchedulingDto> Update(UpdateSchedulingDto scheduling, string userId)
        {
            var schedulingDb = await this.GetById(scheduling.SchedulingId, userId);
            if (string.IsNullOrWhiteSpace(scheduling.ClientName))
                scheduling.ClientName = schedulingDb.ClientName;
            if (scheduling.ServiceType == null)
                scheduling.ServiceType = _mapper.Map<UpdateSchedulingDto>(schedulingDb).ServiceType;
            if(scheduling.SchedulingDate == null || scheduling.SchedulingDate == DateTime.MinValue)
                scheduling.SchedulingDate = schedulingDb.SchedulingDate;
            if (scheduling.EndOfSchedule == null || scheduling.SchedulingDate == DateTime.MinValue)
                scheduling.EndOfSchedule = schedulingDb.EndOfSchedule;

            await _schedulingRepository.Update(_mapper.Map<Scheduling>(scheduling), scheduling.SchedulingId, userId);

            return _mapper.Map<ResponseSchedulingDto>(scheduling);
        }
    }
}
