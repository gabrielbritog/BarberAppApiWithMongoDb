using AutoMapper;
using BarberApp.Domain.Dto.Barber;
using BarberApp.Domain.Dto.Client;
using BarberApp.Domain.Dto.User;
using BarberApp.Domain.Interface.Repositories;
using BarberApp.Domain.Interface.Services;
using BarberApp.Domain.Models;
using BarberApp.Domain.ViewModels;
using BarberApp.Infra.Repository;
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
        public async Task<List<Barber>> GetMany(int start, int count, string userId) => await _barberRepository.GetMany(start, count, userId);

        public async Task<TokenViewModel> Login(LoginBarberDto barber)
        {
            var barberDb = await GetByEmail($"{barber.Email}");
            if (barberDb == null)
                throw new Exception("Email ou senha inválidos.");


            barber.Password = EncryptPassword(barber.Password + barberDb.PasswordSalt);
            if (barberDb.Password != barber.Password)
                throw new Exception("Email ou senha inválidos.");
            if (barberDb.UserConfig.DueDate < DateTime.Now)
            {
                barberDb.Disabled = true;
            }
            else { barberDb.Disabled = false; }

            await Update(_mapper.Map<UpdateBarberDto>(barberDb));
            return new TokenViewModel(
               true,
            DateTime.Now.ToString(),
               DateTime.Now.AddDays(_tokenConfiguration.TimeToExpiry).ToString(),
               _tokenService.GenerateTokenBarber(barberDb),
               _mapper.Map<ResponseBarberDto>(barberDb)
               );
        }

        public async Task<ResponseBarberDto> Register(RegisterBarberDto barber, string userId)
        {
            var checkEmail = await this.GetByEmail($"{barber.Email}");
            var checkAdm = await _userRepository.GetByEmail(barber.Email);
            var associatedCompany = await _userRepository.GetById(userId);
            if (checkEmail != null || checkAdm != null)
                throw new Exception("Email já está sendo usado");
            barber.PasswordSalt = new Random().Next().GetHashCode().ToString();
            barber.Password = EncryptPassword(barber.Password + barber.PasswordSalt);
            var BarberMap = _mapper.Map<Barber>(barber);
            BarberMap.UserRegistration = DateTime.Now;
            BarberMap.UserId = userId;
            BarberMap.Disabled = false;
            BarberMap.ChangePassword = new ChangePassword();
            BarberMap.CompanyName = associatedCompany.CompanyName;
            BarberMap.ChangePassword.IsRequired = true;
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
            if (barber.UrlImage != null)
            {
                try
                {
                    var bytes = Convert.FromBase64String(barber.UrlImage);
                    barber.UrlImage = GoogleCloudService.SaveImage(bytes);
                }
                catch (Exception)
                {

                    throw new Exception("Imagem inválida");
                }
            }
            else
            {
                barber.UrlImage ??= barberDb.UrlImage;
            }
            barber.PhoneNumber ??= barberDb.PhoneNumber;
            barber.UserConfig ??= barberDb.UserConfig;
            barber.WorkingDays ??= barberDb.WorkingDays;
            if (barber.ChangePassword != null)
            {
                barber.ChangePassword.LastChange = DateTime.Now;
                barber.ChangePassword.OldPassword = barberDb.Password;
                barber.ChangePassword.OldPasswordSalt = barberDb.PasswordSalt;
            }
            else
            {
                barber.ChangePassword = barberDb.ChangePassword;
            }




            var result = await _barberRepository.Update(_mapper.Map<Barber>(barber), barberId);
            return _mapper.Map<ResponseBarberDto>(result);
        }
        public async Task<ResponseBarberDto> Update(UpdateBarberDto barber)
        {
            var barberDb = await this.GetByEmail($"{barber.Email}");
            barber.UserRegistration = barberDb.UserRegistration;
            barber.UserLevel = barberDb.UserLevel;
            barber.BarberId = barberDb.BarberId;
            barber.UserId = barberDb.UserId;
            barber.FirstName ??= barberDb.FirstName;
            barber.LastName ??= barberDb.LastName;
            barber.Password = barberDb.Password;
            barber.Email ??= barberDb.Email;
            barber.UrlImage ??= barberDb.UrlImage;
            barber.PhoneNumber ??= barberDb.PhoneNumber;
            barber.UserConfig ??= barberDb.UserConfig;
            barber.WorkingDays ??= barberDb.WorkingDays;
            var result = await _barberRepository.Update(_mapper.Map<Barber>(barber), barberDb.BarberId);
            return _mapper.Map<ResponseBarberDto>(result);
        }

        public async Task<List<string>> GetTop(string userId, int top, DateTime first, DateTime last) => _mapper.Map<List<string>>(await _barberRepository.GetTop(userId, top, first, last));
     
    }
}
