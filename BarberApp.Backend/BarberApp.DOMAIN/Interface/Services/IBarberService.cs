using BarberApp.Domain.Dto.Barber;
using BarberApp.Domain.Dto.User;
using BarberApp.Domain.Models;
using BarberApp.Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Domain.Interface.Services
{
    public interface IBarberService
    {
        public Task<ResponseBarberDto> Register(RegisterBarberDto barber, string userId);
        public Task<TokenViewModel> Login(LoginBarberDto barber);
        public Task<ResponseBarberDto> Update(Barber barber, string userId);
        public Task<Barber> GetById(string barberId);
        public Task<Barber> GetByEmail(string barberEmail);
        public Task<List<Barber>> GetMany(int start, int count);
    }
}
