using BarberApp.Domain.Interface.Repositories;
using BarberApp.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Xml.Linq;


namespace BarberApp.Infra.Repository
{
    public class UserRepository : IUserRepository
    {

        private readonly IMongoCollection<User> _userCollection;

        public UserRepository(IOptions<DataBaseSettings> userServices)
        {
            var mongoClient = new MongoClient(userServices.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(userServices.Value.DatabaseName);

            _userCollection = mongoDatabase.GetCollection<User>
                (userServices.Value.CollectionName);
        }
        public async Task<User> GetByEmail(string email)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq(u => u.Email, email.ToLower());
                var result = await _userCollection.Find(filter).FirstOrDefaultAsync();
                return result;

            }
            catch (Exception e )
            {
                throw new Exception(e.Message);
            }
            
        }

        public Task<User> GetById(User user)
        {
             
            throw new NotImplementedException();
        }
      

        public async Task<User> Register(User user)
        {
            try
            {
                user.Email = user.Email.ToLower();
                await _userCollection.InsertOneAsync(user);
                return user;
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            
        }

        public Task<User> Update(User user)
        {
            throw new NotImplementedException();
        }
    }
}
