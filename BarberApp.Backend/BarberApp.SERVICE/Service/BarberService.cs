using AutoMapper;
using BarberApp.Domain.Dto.Barber;
using BarberApp.Domain.Interface.Repositories;
using BarberApp.Domain.Interface.Services;
using BarberApp.Domain.Models;
using BarberApp.Domain.ViewModels;
using BarberApp.Service.Configurations;
using BarberApp.Service.Global;

namespace BarberApp.Service.Service
{

    public class BarberService : Functions, IBarberService
    {
        private readonly IBarberRepository _barberRepository;
        private readonly ITokenService _tokenService;
        private readonly IUserRepository _userRepository;
        private readonly TokenConfiguration _tokenConfiguration;
        private readonly IMapper _mapper;
        public BarberService(IBarberRepository barberRepository, IMapper mapper, ITokenService tokenService, IUserRepository userRepository, TokenConfiguration tokenConfiguration)
        {
            _mapper = mapper;
            _barberRepository = barberRepository;
            _tokenService = tokenService;
            _tokenConfiguration = tokenConfiguration;
            _userRepository = userRepository;
        }
        public async Task<Barber> GetByEmail(string barberEmail) => await _barberRepository.GetByEmail(barberEmail);
        public Task<Barber> GetById(string barberId) => throw new NotImplementedException();
        public async Task<List<Barber>> GetMany(int start, int count,string userId) =>  await _barberRepository.GetMany(start, count, userId);

        public async Task<TokenViewModel> Login(LoginBarberDto barber)
        {
            var barberDb = await  GetByEmail($"{barber.Email}");
            if (barberDb == null)
                throw new Exception("Email ou senha inválidos.");
            barber.Password = EncryptPassword(barber.Password + barberDb.PasswordSalt);
            if (barberDb.Password != barber.Password)
                throw new Exception("Email ou senha inválidos.");
            return new TokenViewModel(
               true,
            DateTime.Now.ToString(),
               DateTime.Now.AddDays(_tokenConfiguration.TimeToExpiry).ToString(),
               _tokenService.GenerateTokenBarber(barberDb),
               _mapper.Map<ResponseBarberDto>(barberDb)
               );
        }

        public async Task<ResponseBarberDto> Register(RegisterBarberDto barber,string userId)
        {
            var checkEmail = await this.GetByEmail($"{barber.Email}");
            var associatedCompany = await _userRepository.GetById(userId);
            if (checkEmail != null)
            throw new Exception("Email já está sendo usado");
            barber.PasswordSalt = new Random().Next().GetHashCode().ToString();
            barber.Password = EncryptPassword(barber.Password + barber.PasswordSalt);
            var BarberMap = _mapper.Map<Barber>(barber);
            BarberMap.UserRegistration = DateTime.Now;
            BarberMap.UserId = userId;
            BarberMap.Disabled= false;
            BarberMap.CompanyName = associatedCompany.CompanyName;
            await _barberRepository.Register(BarberMap);
            return _mapper.Map<ResponseBarberDto>(BarberMap);
        }

        public async Task<ResponseBarberDto> Update(UpdateBarberDto barber, string email, string barberId)
        {
            var barberDb = await this.GetByEmail($"{email}");
            var checkEmail = await this.GetByEmail($"{barber.Email}");
            barber.UserRegistration = barberDb.UserRegistration;
            barber.BarberId = barberDb.BarberId;
            barber.UserId = barberDb.UserId;
            if (checkEmail != null)
                throw new Exception("Email já está sendo usado");
                barber.FirstName ??= barberDb.FirstName;
                barber.LastName ??= barberDb.LastName;
                barber.Password = string.IsNullOrEmpty(barber.Password) ? barberDb.Password : EncryptPassword(barber.Password + barberDb.PasswordSalt);
                barber.Email ??= barberDb.Email;
                barber.UrlImage ??= barberDb.UrlImage;
                barber.PhoneNumber ??= barberDb.PhoneNumber;
                barber.WorkingDays ??= barberDb.WorkingDays;
            var result = await _barberRepository.Update(_mapper.Map<Barber>(barber), barberId);
            return _mapper.Map<ResponseBarberDto>(result);
        }
    }
}
