using BarberApp.Domain.Interface.Repositories;
using BarberApp.Domain.Interface.Services;
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
    public class SchedulingRepository : ISchedulingRepository
    {
        private readonly IMongoCollection<Scheduling> _schedulingCollection;
        public SchedulingRepository(IOptions<DataBaseSettings> schedulingCollection)
        {
            var mongoClient = new MongoClient(schedulingCollection.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(schedulingCollection.Value.DatabaseName);

            _schedulingCollection = mongoDatabase.GetCollection<Scheduling>
                (schedulingCollection.Value.CollectionName);
        }

        public Task<Scheduling> Delete(string schedulingId, string userId)
        {
            throw new NotImplementedException();
        }

        public Task<List<Scheduling>> GetAll(string userId)
        {
            throw new NotImplementedException();
        }

        public Task<Scheduling> GetById(string schedulingId)
        {
            throw new NotImplementedException();
        }

        public async Task<Scheduling> Register(Scheduling scheduling, string UserId)
        {
            try
            {
                await _schedulingCollection.InsertOneAsync(scheduling);
                return scheduling;
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }

        public Task<Scheduling> Update(Scheduling scheduling, string userId)
        {
            throw new NotImplementedException();
        }
    }
}
