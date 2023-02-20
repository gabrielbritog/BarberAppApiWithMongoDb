using AutoMapper;
using BarberApp.Domain.Dto.Barber;
using BarberApp.Domain.Dto.User;
using BarberApp.Domain.Interface.Repositories;
using BarberApp.Domain.Interface.Services;
using BarberApp.Domain.Models;
using BarberApp.Domain.ViewModels;
using BarberApp.Infra.Repository;
using BarberApp.Service.Configurations;
using BarberApp.Service.Global;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Service.Service
{

    public class BarberService : Functions, IBarberService
    {
        private readonly IBarberRepository _barberRepository;
        private readonly ITokenService _tokenService;
        private readonly TokenConfiguration _tokenConfiguration;
        private readonly IMapper _mapper;
        public BarberService(IBarberRepository barberRepository, IMapper mapper, ITokenService tokenService, TokenConfiguration tokenConfiguration)
        {
            _mapper = mapper;
            _barberRepository = barberRepository;
            _tokenService = tokenService;
            _tokenConfiguration = tokenConfiguration;
        }
        public async Task<Barber> GetByEmail(string barberEmail)
        {
            return await _barberRepository.GetByEmail(barberEmail);
        }

        public Task<Barber> GetById(string barberId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Barber>> GetMany(int start, int count)
        {
            return await _barberRepository.GetMany(start, count);
        }

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
            if (checkEmail != null)
            throw new Exception("Email já está sendo usado");
            barber.PasswordSalt = new Random().Next().GetHashCode().ToString();
            barber.Password = EncryptPassword(barber.Password + barber.PasswordSalt);
            var BarberMap = _mapper.Map<Barber>(barber);
            BarberMap.UserRegistration = DateTime.Now;
            BarberMap.UserId = userId;
            BarberMap.Disabled= false;
            await _barberRepository.Register(BarberMap);
            return _mapper.Map<ResponseBarberDto>(BarberMap);
        }

        public Task<ResponseBarberDto> Update(Barber barber, string userId)
        {
            throw new NotImplementedException();
        }
    }
}
