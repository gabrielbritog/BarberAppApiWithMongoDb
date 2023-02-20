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
                (schedulingCollection.Value.SchedulingCollectionName);
        }

        public async Task<DeleteResult> DeleteAll(string userId)
        {
            try
            {
                var filter = Builders<Scheduling>.Filter.Eq(u => u.UserId, userId);
                var result = await _schedulingCollection.DeleteManyAsync(filter);
                return result;
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }
        public async Task<DeleteResult> DeleteAll(string userId,string barberId)
        {
            try
            {
                var filter = Builders<Scheduling>.Filter.And(
               Builders<Scheduling>.Filter.Eq(u => u.UserId, userId),
               Builders<Scheduling>.Filter.Eq(u => u.BarberId, barberId));
                var result = await _schedulingCollection.DeleteManyAsync(filter);
                return result;
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }

        public async Task<DeleteResult> DeleteById(string userId, string schedulingId)
        {
            try
            {
                var filter = Builders<Scheduling>.Filter.And(
               Builders<Scheduling>.Filter.Eq(u => u.UserId, userId),
               Builders<Scheduling>.Filter.Eq(u => u.SchedulingId, schedulingId));
                var result = await _schedulingCollection.DeleteOneAsync(filter);

                return result;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }         
        }

        public async Task<List<Scheduling>> GetMany(string userId, int start, int count)
        {
            try
            {
                var filter = Builders<Scheduling>.Filter.Eq(u => u.UserId, userId);
                return await _schedulingCollection.Find(filter).Skip(start - 1).Limit(count).ToListAsync();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        public async Task<List<Scheduling>> GetMany(string userId,string barberId, int start, int count)
        {
            try
            {
                var filter = Builders<Scheduling>.Filter.And(
            Builders<Scheduling>.Filter.Eq(u => u.UserId, userId),
            Builders<Scheduling>.Filter.Eq(u => u.BarberId, barberId)
        );
                return await _schedulingCollection.Find(filter).Skip(start - 1).Limit(count).ToListAsync();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task<Scheduling> GetById(string schedulingId, string userId)
        {
            try
            {
                var filter = Builders<Scheduling>.Filter.And(
           Builders<Scheduling>.Filter.Eq(u => u.UserId, userId),
           Builders<Scheduling>.Filter.Eq(u => u.SchedulingId, schedulingId)
       );

                return await _schedulingCollection.Find(filter).FirstOrDefaultAsync();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
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

        public async Task<Scheduling> Update(Scheduling scheduling, string schedulingId,string userId)
       {
            var filter = Builders<Scheduling>.Filter.Eq(s => s.SchedulingId, scheduling.SchedulingId);
            var update = Builders<Scheduling>.Update
                .Set(s => s.ClientName, scheduling.ClientName)
                .Set(s => s.ServiceType, scheduling.ServiceType)
                .Set(s => s.SchedulingDate, scheduling.SchedulingDate);

            var result = await _schedulingCollection.UpdateOneAsync(filter, update);

            return scheduling;
        }
    }
}
