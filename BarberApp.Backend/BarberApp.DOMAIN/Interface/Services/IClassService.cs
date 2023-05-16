using BarberApp.Domain.Dto.Class;
using BarberApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Domain.Interface.Services
{
    public interface IClassService
    {
        public Task<ResponseClassDto> Register(RegisterClassDto classItem, string userId);
        public Task<ResponseClassDto> Update(string userId, UpdateClassDto classItem);
        public Task<ResponseClassDto> GetById(string userId, string id);
        public Task<List<ResponseClassDto>> GetAll(string userId);
        public Task<List<ResponseClassDto>> GetMany(string userId, int start, int count);
    }
}
