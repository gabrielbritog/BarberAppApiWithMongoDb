using AutoMapper;
using BarberApp.Domain.Dto.Scheduling;
using BarberApp.Domain.Interface.Repositories;
using BarberApp.Domain.Interface.Services;
using BarberApp.Domain.Models;
using MongoDB.Driver;
using System.Globalization;

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
        public async Task<List<ResponseSchedulingDto>> GetManyDesc(string userId, int start, int count)
        {
            var result = await _schedulingRepository.GetManyDesc(userId, start, count);
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
        public async Task<List<ResponseSchedulingDto>> GetManyByDate(string userId, DateTime startDate, DateTime endDate)
        {
            var result = await _schedulingRepository.GetManyByDate(userId,startDate, endDate);
            return _mapper.Map<List<ResponseSchedulingDto>> (result);
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
            if (scheduling.Recurrence == null)
            {
                schedulingMap.Recurrence = new Recurrence();
                schedulingMap.Recurrence.IsRecurrence = false;
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
            if (scheduling.Recurrence == null)
            {
                schedulingMap.Recurrence = new Recurrence();
                schedulingMap.Recurrence.IsRecurrence = false;
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
            scheduling.Recurrence ??= schedulingDb.Recurrence;


            await _schedulingRepository.Update(_mapper.Map<Scheduling>(scheduling), scheduling.SchedulingId, userId);

            return _mapper.Map<ResponseSchedulingDto>(scheduling);
        }

        public async Task<ResponseHistoricSchedulingDto> Historic(string userId, int start, int count)
        {
            var schedulingsDb = await _schedulingRepository.GetManyDesc(userId, start, count);
            schedulingsDb = schedulingsDb.Where(s => s.SchedulingDate <= DateTime.Now).ToList();
            var quantity = schedulingsDb.Count;
            ResponseHistoricSchedulingDto result = new ResponseHistoricSchedulingDto();
            List<HistoricSchedulingDto> historic = new List<HistoricSchedulingDto>();
            decimal calc = 0;
            for (int i = 0; i < quantity; i++)
            {
                var counting = schedulingsDb[i].ServiceType.Count();
               
                    Barber barber =  await _barberRepository.GetById(schedulingsDb[i].BarberId);
                DateTime schedulingDate = schedulingsDb[i].SchedulingDate;
                string clientName = schedulingsDb[i].Client.Name;
                string barberName = barber.FirstName;
                string total = schedulingsDb[i].Total.ToString("C", new CultureInfo("pt-BR"));
                List<string> service = schedulingsDb[i].ServiceType.Select(s => $"{s.NameService} {s.ValueService.ToString("C", new CultureInfo("pt-BR"))}").ToList();


                calc += schedulingsDb[i].Total;
                historic.Add(new HistoricSchedulingDto
                {
                    SchedulingDate = schedulingDate.ToString("dd/MM/yyyy HH:mm:ss"),
                    Client = clientName,
                    Service = service,
                    BarberName = barberName,
                    Total = total

                });

                result.Historic = historic;
                result.PeriodTotal = calc.ToString("C", new CultureInfo("pt-BR"));

            }
                return result;
        }

        public async Task<List<ResponseSchedulingDto>> GetManyByDate(string userId, string barberId, DateTime startDate, DateTime endDate)
        {
            var result = await _schedulingRepository.GetManyByDate(userId,barberId, startDate, endDate);
            return _mapper.Map<List<ResponseSchedulingDto>>(result);
        }
    }
}
