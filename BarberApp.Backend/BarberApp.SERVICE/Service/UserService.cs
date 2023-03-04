using AutoMapper;
using BarberApp.Domain.Dto.Scheduling;
using BarberApp.Domain.Dto.User;
using BarberApp.Domain.Interface.Repositories;
using BarberApp.Domain.Interface.Services;
using BarberApp.Domain.Models;
using BarberApp.Domain.ViewModels;
using BarberApp.Service.Configurations;
using BarberApp.Service.Global;

namespace BarberApp.Service.Service
{
    public class UserService : Functions, IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenService _tokenService;
        private readonly TokenConfiguration _tokenConfiguration;
        private readonly IMapper _mapper;
        public UserService(IUserRepository userRepository, IMapper mapper, ITokenService tokenService, TokenConfiguration tokenConfiguration)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _tokenService = tokenService;
            _tokenConfiguration = tokenConfiguration;
        }
        public async Task DropDataBase() => await _userRepository.DropDataBase();
        public async Task<List<User>> GetMany(int start, int count) => await _userRepository.GetMany(start, count);
        public async Task<User> GetByEmail(string userEmail) => await _userRepository.GetByEmail(userEmail);
        public async Task<User> GetById(string userId) => await _userRepository.GetById(userId);
        public async Task<User> GetByCompanyName(string companyName) => await _userRepository.GetByCompanyName(companyName);
        public async Task<TokenViewModel> Login(LoginUserDto user)
        {
            var userDb = await this.GetByEmail($"{user.Email}");
            if (userDb == null)
                throw new Exception("Email ou senha inválidos.");                     
            user.Password = EncryptPassword(user.Password + userDb.PasswordSalt);
            if (userDb.Password != user.Password)
                throw new Exception("Email ou senha inválidos.");

            if (userDb.UserConfig.DueDate < DateTime.Now)
            {
                userDb.Disabled = true;              
            }
            else { userDb.Disabled = false; }

            await Update(_mapper.Map<UpdateUserDto>(userDb));

            return new TokenViewModel(
               true,
            DateTime.Now.ToString(),          
               DateTime.Now.AddDays(_tokenConfiguration.TimeToExpiry).ToString(),
               _tokenService.GenerateToken(userDb),
               _mapper.Map<ResponseUserDto>(userDb)
               );
        }
        public async Task<ResponseUserDto> Register(RegisterUserDto user)
        {
            var checkEmail = await this.GetByEmail($"{user.Email}");
            var checkCompany = await this.GetByCompanyName($"{user.CompanyName}");

            if (checkEmail != null)             
                throw new Exception("Email já está sendo usado");
            if (checkCompany != null)
                throw new Exception("Nome da empresa já está sendo usado");
            user.PasswordSalt = new Random().Next().GetHashCode().ToString();
            user.Password = EncryptPassword(user.Password+user.PasswordSalt);
            user.Email = user.Email.ToLower();
            user.CompanyName = user.CompanyName.ToLower();
            var UserMap = _mapper.Map<User>(user);
            UserMap.UserRegistration= DateTime.Now;
            await _userRepository.Register(UserMap);
            return _mapper.Map<ResponseUserDto>(UserMap);
        }
        public async Task<ResponseUserDto> Update(UpdateUserDto user, string email)
        {
            var userDb = await this.GetByEmail($"{email}");
            var checkEmail = await this.GetByEmail($"{user.Email}");
            user.UserId = userDb.UserId;
            user.UserRegistration = userDb.UserRegistration;
            if (checkEmail != null)
                throw new Exception("Email já está sendo usado");
            user.FirstName ??= userDb.FirstName;
            user.LastName ??= userDb.LastName;
            user.Password = string.IsNullOrEmpty(user.Password) ? userDb.Password : EncryptPassword(user.Password + userDb.PasswordSalt);
            user.Email ??= userDb.Email;
            user.CompanyName ??= userDb.CompanyName;            
            if (user.UrlImage != null)
            {
                try
                {
                    var bytes = Convert.FromBase64String(user.UrlImage);
                    user.UrlImage = GoogleCloudService.SaveImage(bytes);
                }
                catch (Exception)
                {

                    throw new Exception("Imagem inválida");
                }
            }
            else 
            { 
                user.UrlImage = userDb.UrlImage; 
            }
            user.PhoneNumber ??= userDb.PhoneNumber;
            user.Cep ??= userDb.Cep;
            user.WorkingDays ??= userDb.WorkingDays;
            user.UserConfig??= userDb.UserConfig;
            var result = await _userRepository.Update(_mapper.Map<User>(user) , email);
            return _mapper.Map<ResponseUserDto>(result);
        }
        public async Task<ResponseUserDto> Update(UpdateUserDto user)
        {
            var userDb = await this.GetByEmail($"{user.Email}");
            user.UserId = userDb.UserId;
            user.UserRegistration = userDb.UserRegistration;
            user.FirstName ??= userDb.FirstName;
            user.LastName ??= userDb.LastName;
            user.Password = userDb.Password;
            user.Email ??= userDb.Email;
            user.CompanyName ??= userDb.CompanyName;
            user.UrlImage ??= userDb.UrlImage;
            user.PhoneNumber ??= userDb.PhoneNumber;
            user.Cep ??= userDb.Cep;
            user.WorkingDays ??= userDb.WorkingDays;
            user.UserConfig ??= userDb.UserConfig;
            var result = await _userRepository.Update(_mapper.Map<User>(user), userDb.Email);
            return _mapper.Map<ResponseUserDto>(result);
        }
    }
}
