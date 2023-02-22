using BarberApp.Domain.Dto.Barber;
using BarberApp.Domain.Interface.Repositories;
using BarberApp.Domain.Models;
using BarberApp.Domain.ViewModels;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace BarberApp.Infra.Repository
{
    public class BarberRepository : IBarberRepository
    {
        private readonly IMongoCollection<Barber> _barberCollection;
        public BarberRepository(IOptions<DataBaseSettings> barberCollection)
        {
            var mongoClient = new MongoClient(barberCollection.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(barberCollection.Value.DatabaseName);

            _barberCollection = mongoDatabase.GetCollection<Barber>
                (barberCollection.Value.BarberCollectionName);
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

        public async Task<List<Barber>> GetMany(int start, int count)
        {
            try
            {
                var filter = Builders<Barber>.Filter.Exists(x => x.Email);
                var results = await _barberCollection.Find(filter).Skip(start - 1).Limit(count).ToListAsync();
                return results;
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
                    .Set(u => u.UrlImage, barber.UrlImage)
                    .Set(u => u.Cep, barber.Cep)
                    .Set(u => u.Email, barber.Email)
                    .Set(u => u.PhoneNumber, barber.PhoneNumber)
                    .Set(u => u.Disabled, barber.Disabled)
                    .Set(u => u.WorkingDays, barber.WorkingDays);

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
