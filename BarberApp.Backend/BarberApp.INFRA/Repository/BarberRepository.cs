using BarberApp.Domain.Dto.Barber;
using BarberApp.Domain.Interface.Repositories;
using BarberApp.Domain.Interface.Services;
using BarberApp.Domain.Models;
using BarberApp.Domain.ViewModels;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System.Globalization;

namespace BarberApp.Infra.Repository
{
    public class BarberRepository : IBarberRepository
    {
        private readonly IMongoCollection<Barber> _barberCollection;
        private readonly IMongoCollection<Scheduling> _schedulingCollection;
        public BarberRepository(IOptions<DataBaseSettings> barberCollection)
        {
            var mongoClient = new MongoClient(barberCollection.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(barberCollection.Value.DatabaseName);

            _barberCollection = mongoDatabase.GetCollection<Barber>
                (barberCollection.Value.BarberCollectionName);
            _schedulingCollection = mongoDatabase.GetCollection<Scheduling>
                (barberCollection.Value.SchedulingCollectionName);
        }

        public async Task<Barber> GetByEmail(string barberEmail)
        {
            try
            {
                var filter = Builders<Barber>.Filter.Eq(u => u.Email, barberEmail.ToLower());
                var result = await _barberCollection.Find(filter).FirstOrDefaultAsync();
                return result;

            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task<Barber> GetById(string barberId)
        {
            try
            {
                var filter = Builders<Barber>.Filter.Eq(u => u.BarberId, barberId);
                var result = await _barberCollection.Find(filter).FirstOrDefaultAsync();
                return result;

            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task<List<Barber>> GetMany(int start, int count, string userId)
        {
            try
            {
                var filter = Builders<Barber>.Filter.Eq(x => x.UserId, userId);
                var results = await _barberCollection.Find(filter).Skip(start - 1).Limit(count).ToListAsync();
                return results;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        public async Task<List<string>> GetTop(string userId, int top, DateTime first, DateTime last)
        {
            try
            {
  

              var filter = Builders<Scheduling>.Filter.Eq(s => s.UserId, userId) &
                    Builders<Scheduling>.Filter.Gte(s => s.SchedulingDate, first) &
                    Builders<Scheduling>.Filter.Lte(s => s.SchedulingDate, last);
                var schedulings = await _schedulingCollection.Find(filter).ToListAsync();

                var groupedSchedulings = schedulings.GroupBy(s => s.BarberId)
                                    .Select(group => new {
                                        BarberId = group.Key,
                                        TotalValue = group.Sum(s => s.Total)
                                    });

                var topBarbers = groupedSchedulings.OrderByDescending(g => g.TotalValue)
                                                   .Take(top)
                                                   .ToList();

                var topBarbersStrings = topBarbers.Select(g => $"{_barberCollection.Find(b => b.BarberId == g.BarberId).FirstOrDefault()?.FirstName ?? "Funcionário desconhecido"}: {g.TotalValue.ToString("C2", CultureInfo.GetCultureInfo("pt-BR"))}")
                                    .ToList();

                return topBarbersStrings;
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }

        public async Task<Barber> Register(Barber barber)
        {
            try
            {
                barber.Email = barber.Email.ToLower();
                await _barberCollection.InsertOneAsync(barber);
                return barber;
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }

        public async Task<Barber> Update(Barber barber, string barberId)
        {
            try
            {
                var filter = Builders<Barber>.Filter.Eq(u => u.BarberId, barberId);
                var update = Builders<Barber>.Update
                    .Set(u => u.FirstName, barber.FirstName)
                    .Set(u => u.LastName, barber.LastName)
                    .Set(u => u.Password, barber.Password)
                    .Set(u => u.UserConfig, barber.UserConfig)
                    .Set(u => u.UrlImage, barber.UrlImage)
                    .Set(u => u.Cep, barber.Cep)
                    .Set(u => u.Email, barber.Email)
                    .Set(u => u.PhoneNumber, barber.PhoneNumber)
                    .Set(u => u.Disabled, barber.Disabled)
                    .Set(u => u.WorkingDays, barber.WorkingDays)
                    .Set(u => u.ChangePassword, barber.ChangePassword);

                var result = await _barberCollection.UpdateOneAsync(filter, update);
                if (result.MatchedCount == 0)
                    throw new Exception("Usuário não encontrado.");
                return barber;
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }
    }
}
