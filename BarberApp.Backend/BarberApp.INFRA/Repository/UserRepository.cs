using BarberApp.Domain.Interface.Repositories;
using BarberApp.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;


namespace BarberApp.Infra.Repository
{
    public class UserRepository : IUserRepository
    {

        private readonly IMongoCollection<User> _userCollection;
        private readonly IMongoCollection<Barber> _barberCollection;
        private readonly IMongoCollection<Scheduling> _schedulingCollection;
        private readonly IMongoCollection<ServiceType> _serviceTypeCollection;
        private readonly IMongoCollection<Client> _clientTypeCollection;

        public UserRepository(IOptions<DataBaseSettings> userServices)
        {
            var mongoClient = new MongoClient(userServices.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(userServices.Value.DatabaseName);
            _barberCollection = mongoDatabase.GetCollection<Barber>
                (userServices.Value.BarberCollectionName);
            _schedulingCollection = mongoDatabase.GetCollection<Scheduling>
                (userServices.Value.SchedulingCollectionName);
            _serviceTypeCollection = mongoDatabase.GetCollection<ServiceType>
                (userServices.Value.ServiceTypeCollectionName);
            _clientTypeCollection = mongoDatabase.GetCollection<Client>
                (userServices.Value.ClientTypeCollectionName);
            _userCollection = mongoDatabase.GetCollection<User>
                (userServices.Value.CollectionName);
        }

        public async Task<List<User>> GetMany(int start, int count)
        {
            try
            {
                var filter = Builders<User>.Filter.Exists(x => x.Email);
                var results = await _userCollection.Find(filter).Skip(start - 1).Limit(count).ToListAsync();
                return results;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task<User> GetByEmail(string email)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq(u => u.Email, email.ToLower());
                var result = await _userCollection.Find(filter).FirstOrDefaultAsync();
                return result;

            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

        }

        public async Task<User> GetById(string userId)
        {
            var filter = Builders<User>.Filter.Eq(u => u.UserId, userId);
            var result = await _userCollection.Find(filter).FirstOrDefaultAsync();
            return result;
        }


        public async Task<User> Register(User user)
        {
            try
            {
                
                await _userCollection.InsertOneAsync(user);
                return user;
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }

        }

        public async Task<User> Update(User user, string email)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq(u => u.Email, email);
                var update = Builders<User>.Update
                    .Set(u => u.FirstName, user.FirstName)
                    .Set(u => u.LastName, user.LastName)
                    .Set(u => u.Password, user.Password)
                    .Set(u => u.UrlImage, user.UrlImage)
                    .Set(u => u.Cep, user.Cep)
                    .Set(u => u.UserConfig, user.UserConfig)
                    .Set(u => u.Email, user.Email)
                    .Set(u => u.PhoneNumber, user.PhoneNumber)
                    .Set(u => u.Disabled, user.Disabled)
                    .Set(u => u.WorkingDays, user.WorkingDays);
                var result = await _userCollection.UpdateOneAsync(filter, update);
                if (result.MatchedCount == 0)
                    throw new Exception("Usuário não encontrado.");
                return user;
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }

        public async Task<User> GetByCompanyName(string companyName)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq(u => u.CompanyName, companyName.ToLower());
                var result = await _userCollection.Find(filter).FirstOrDefaultAsync();

                return result;
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }

        }
        public async Task DropDataBase()
        {
            try
            {
                var filter = new BsonDocument();
                _barberCollection.DeleteMany(filter);
                _schedulingCollection.DeleteMany(filter);
                _serviceTypeCollection.DeleteMany(filter);
                _clientTypeCollection.DeleteMany(filter);
                _userCollection.DeleteMany(filter);
               
            }

            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }

        } }
