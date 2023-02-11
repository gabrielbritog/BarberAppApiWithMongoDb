using AutoMapper;
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

        public async Task<User> GetByEmail(string userEmail)
        {
            return await _userRepository.GetByEmail(userEmail);
        }

        public Task<User> GetById(int userId)
        {
            throw new NotImplementedException();
        }

        public async Task<TokenViewModel> Login(LoginUserDto user)
        {
            user.Password = EncryptPassword(user.Password);
            var userDb = await this.GetByEmail($"{user.Email}");            
            if (userDb == null || userDb.Password != user.Password)
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
            if (checkEmail != null)             
                throw new Exception("Email já está sendo usado");
            
            user.Password = EncryptPassword(user.Password);  
            var UserMap = _mapper.Map<User>(user);
            UserMap.UserRegistration= DateTime.Now;
            await _userRepository.Register(UserMap);
            return _mapper.Map<ResponseUserDto>(UserMap);
        }

        public Task<ResponseUserDto> Update(UpdateUserDto user, string email)
        {
            throw new NotImplementedException();
        }
    }
}
