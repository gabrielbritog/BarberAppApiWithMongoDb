using BarberApp.Domain.Interface.Repositories;
using BarberApp.Domain.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Infra.Repository
{
    public class ServiceTypeRepository : IServiceTypeRepository
    {
        private readonly IMongoCollection<ServiceType> _serviceTypeCollection;
        public ServiceTypeRepository(IOptions<DataBaseSettings> serviceTypeCollection)
        {
            var mongoClient = new MongoClient(serviceTypeCollection.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(serviceTypeCollection.Value.DatabaseName);

            _serviceTypeCollection = mongoDatabase.GetCollection<ServiceType>
                (serviceTypeCollection.Value.CollectionName);
        }
        public Task<ServiceType> Delete(ServiceType serviceType, string UserId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<ServiceType>> GetMany(string userId, int start, int count)
        {
            try
            {
                var filter = Builders<ServiceType>.Filter.Eq(u => u.UserId, userId);
                var services =  _serviceTypeCollection.Find(filter).Skip(start - 1).Limit(count);
                return await services.ToListAsync();
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
                  }

        public async Task<ServiceType> GetById(string userId, string idService)
        {
            try
            {
                var filter = Builders<ServiceType>.Filter.And(
                    Builders<ServiceType>.Filter.Eq(u => u.UserId, userId),
                    Builders<ServiceType>.Filter.Eq(u => u.ServiceTypeId, idService)
                    );
                return await _serviceTypeCollection.Find(filter).FirstOrDefaultAsync();

            }
            catch (Exception e )
            {

                throw new Exception(e.Message);
            }
        }

        public async Task<ServiceType> Register(ServiceType serviceType, string UserId)
        {
            try
            {
                await _serviceTypeCollection.InsertOneAsync(serviceType);
                return serviceType;
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }

        public async Task<ServiceType> Update(ServiceType serviceType,string serviceTypeId, string userId)
        {
            var filter = Builders<ServiceType>.Filter.And(
                Builders<ServiceType>.Filter.Eq(u => u.UserId, userId),
                Builders<ServiceType>.Filter.Eq(u => u.ServiceTypeId, serviceTypeId));
            var update = Builders<ServiceType>.Update
                .Set(s => s.NameService, serviceType.NameService)
                .Set(s => s.ValueService, serviceType.ValueService)
                .Set(s => s.On, serviceType.On);
            var result = await _serviceTypeCollection.UpdateOneAsync(filter, update);
            return serviceType;
        }
    }
}
