using AutoMapper;
using BarberApp.Domain.Dto.Scheduling;
using BarberApp.Domain.Interface.Repositories;
using BarberApp.Domain.Interface.Services;
using BarberApp.Domain.Models;
using BarberApp.Infra.Repository;
using BarberApp.Service.Configurations;
using MongoDB.Driver;


namespace BarberApp.Service.Service
{
    public class SchedulingService : ISchedulingService
    {
        private readonly ISchedulingRepository _schedulingRepository;
        private readonly IMapper _mapper;
        private readonly IBarberRepository _barberRepository;
        private readonly IUserRepository _userRepository;
        public SchedulingService(ISchedulingRepository schedulingRepository, IMapper mapper, IBarberRepository barberRepository, IUserRepository userRepository)
        {
            _schedulingRepository = schedulingRepository;
            _mapper = mapper;
            _barberRepository = barberRepository;
            _userRepository = userRepository;
        }

        public async Task<DeleteResult> DeleteAll(string userId) =>  await _schedulingRepository.DeleteAll(userId); 
        public async Task<DeleteResult> DeleteAll(string userId,string barberId) => await _schedulingRepository.DeleteAll(userId, barberId);
        public async Task<DeleteResult> DeleteById(string userId, string schedulingId) => await _schedulingRepository.DeleteById(userId, schedulingId);
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
                schedulingMap.Total += schedulingMap.ServiceType[i].ValueService;
                schedulingMap.ServiceType[i].UserId = UserId;
                i++;
            }          
            await _schedulingRepository.Register(schedulingMap, UserId);
            return _mapper.Map<ResponseSchedulingDto>(schedulingMap);
        }

        public async Task<ResponseSchedulingDto> Register(RegisterSchedulingDto scheduling, string UserId,string barberId)
        {
            var checkBarber = await _barberRepository.GetById(barberId);
            var checkUser = await _userRepository.GetById(UserId);
            if (checkBarber == null)
                throw new Exception("Funcionario não encontrado");
            if (checkUser == null)
                throw new Exception("Empresa não encontrada");
            if (checkBarber.UserId != checkUser.UserId)
                throw new Exception("Funcionário não localizado na empresa");

            scheduling.barberId = barberId;
            var schedulingMap = _mapper.Map<Scheduling>(scheduling);
            schedulingMap.UserId = UserId;
            var quantity = scheduling.ServiceType.Count();
            for (int i = 0; i < quantity;)
            {
                schedulingMap.Total += schedulingMap.ServiceType[i].ValueService;
                schedulingMap.ServiceType[i].BarberId = barberId;
                schedulingMap.ServiceType[i].UserId = UserId;
                i++;
            }
            await _schedulingRepository.Register(schedulingMap, UserId);
            return _mapper.Map<ResponseSchedulingDto>(schedulingMap);
        }

        public async Task<ResponseSchedulingDto> Update(UpdateSchedulingDto scheduling, string userId)
        {
            var quantity = 0;
            if (scheduling.ServiceType != null)
            quantity = scheduling.ServiceType.Count();
            for (int i = 0; i < quantity;)
            {
                scheduling.Total += scheduling.ServiceType[i].ValueService;
                i++;
            }
            var schedulingDb = await this.GetById(scheduling.SchedulingId, userId);
            if (schedulingDb == null)
                throw new Exception("Informar Id");
                scheduling.BarberId ??= _mapper.Map<UpdateSchedulingDto>(schedulingDb).BarberId;
                scheduling.Client ??= _mapper.Map<UpdateSchedulingDto>(schedulingDb).Client;
                scheduling.ServiceType ??= _mapper.Map<UpdateSchedulingDto>(schedulingDb).ServiceType;
                scheduling.SchedulingDate ??= schedulingDb.SchedulingDate;
                scheduling.EndOfSchedule ??= schedulingDb.EndOfSchedule;
            await _schedulingRepository.Update(_mapper.Map<Scheduling>(scheduling), scheduling.SchedulingId, userId);

            return _mapper.Map<ResponseSchedulingDto>(scheduling);
        }
    }
}
