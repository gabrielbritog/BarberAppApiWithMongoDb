using BarberApp.Domain.Interface.Repositories;
using BarberApp.Domain.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
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

        public Task<ServiceType> Update(ServiceType serviceType, string UserId)
        {
            throw new NotImplementedException();
        }
    }
}
