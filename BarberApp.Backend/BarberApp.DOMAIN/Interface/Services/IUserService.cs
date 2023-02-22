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
    public interface IUserService
    {
        public Task<ResponseUserDto> Register(RegisterUserDto user);
        public Task<TokenViewModel> Login(LoginUserDto user);
        public Task<ResponseUserDto> Update(UpdateUserDto user, string userId);
        public Task<User> GetById(string userId);
        public Task<User> GetByEmail(string userEmail);
        public Task<List<User>> GetMany(int start, int count);
        public Task<User> GetByCompanyName(string companyName);
        public Task DropDataBase();
    }
}
