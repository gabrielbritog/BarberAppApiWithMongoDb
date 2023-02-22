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

        public async Task<List<User>> GetMany(int start, int count)
        {
            return await _userRepository.GetMany(start, count);
        }

        public async Task<User> GetByEmail(string userEmail)
        {
            return await _userRepository.GetByEmail(userEmail);
        }

        public async Task<User> GetById(string userId)
        {
            return await _userRepository.GetById(userId);
        }

        public async Task<TokenViewModel> Login(LoginUserDto user)
        {
            var userDb = await this.GetByEmail($"{user.Email}");
            if (userDb == null)
                throw new Exception("Email ou senha inválidos.");
            user.Password = EncryptPassword(user.Password + userDb.PasswordSalt);
            if (userDb.Password != user.Password)
                throw new Exception("Email ou senha inválidos.");          
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
            var UserMap = _mapper.Map<User>(user);
            UserMap.UserRegistration= DateTime.Now;
            await _userRepository.Register(UserMap);
            return _mapper.Map<ResponseUserDto>(UserMap);
        }

        public async Task<ResponseUserDto> Update(UpdateUserDto user, string email)
        {

            var userDb = await this.GetByEmail($"{email}");
            var checkEmail = await this.GetByCompanyName($"{user.CompanyName}");
            user.UserId = userDb.UserId;
            user.UserRegistration = userDb.UserRegistration;
            if (checkEmail != null)
                throw new Exception("Email já está sendo usado");
            if (string.IsNullOrEmpty(user.FirstName))
                user.FirstName = userDb.FirstName;
            if (string.IsNullOrEmpty(user.LastName))
                user.LastName = userDb.LastName;
            user.Password = string.IsNullOrEmpty(user.Password) ? userDb.Password : EncryptPassword(user.Password + userDb.PasswordSalt);
            if (string.IsNullOrEmpty(user.Email))
                user.Email = userDb.Email;
            if (string.IsNullOrEmpty(user.UrlImage))
                user.UrlImage = userDb.UrlImage;
            if (string.IsNullOrEmpty(user.PhoneNumber))
                user.PhoneNumber = userDb.PhoneNumber;
            if (string.IsNullOrEmpty(user.Cep))
                user.Cep = userDb.Cep;
            if (user.WorkingDays == null)
                user.WorkingDays = userDb.WorkingDays;
            var result = await _userRepository.Update(_mapper.Map<User>(user) , email);
            return _mapper.Map<ResponseUserDto>(result);
        }

        public async Task<User> GetByCompanyName(string companyName)
        {
            return await _userRepository.GetByCompanyName(companyName);
        }       
    }
}
