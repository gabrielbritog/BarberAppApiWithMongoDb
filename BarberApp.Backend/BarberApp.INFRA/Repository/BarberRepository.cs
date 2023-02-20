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

        public Task<Barber> GetById(string barberId)
        {
            throw new NotImplementedException();
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

        public Task<Barber> Update(Barber barber, string userId)
        {
            throw new NotImplementedException();
        }
    }
}
