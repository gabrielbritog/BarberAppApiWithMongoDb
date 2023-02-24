using BarberApp.Domain.Dto.Barber;
using BarberApp.Domain.Models;
using BarberApp.Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Domain.Interface.Repositories
{
    public interface IBarberRepository
    {
        public Task<Barber> Register(Barber barber);
        public Task<Barber> Update(Barber barber, string barberId);
        public Task<Barber> GetById(string barberId);
        public Task<Barber> GetByEmail(string barberEmail);
        public Task<List<Barber>> GetMany(int start, int count, string userId);
    }
}
