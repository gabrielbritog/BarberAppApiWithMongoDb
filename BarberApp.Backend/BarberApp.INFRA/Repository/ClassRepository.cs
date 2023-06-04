using BarberApp.Domain.Interface.Repositories;
using BarberApp.Domain.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BarberApp.Infra.Repository
{
    public class ClassRepository : IClassRepository
    {
        private readonly IMongoCollection<Class> _classCollection;

        public ClassRepository(IOptions<DataBaseSettings> classServices)
        {
            var mongoClient = new MongoClient(classServices.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(classServices.Value.DatabaseName);
            _classCollection = mongoDatabase.GetCollection<Class>
                (classServices.Value.ClassTypeCollectionName);
        }

        public async Task<List<Class>> GetAll(string userId)
        {
            try
            {
                var filter = Builders<Class>.Filter.Eq(x => x.UserId, userId);
                var results = await _classCollection.Find(filter).ToListAsync();
                return results;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task<Class> GetById(string userId, string id)
        {
            try
            {
                var filter = Builders<Class>.Filter.And(
                  Builders<Class>.Filter.Eq(u => u.UserId, userId),
                  Builders<Class>.Filter.Eq(u => u.Id, id));
                var results = await _classCollection.Find(filter).FirstOrDefaultAsync();
                return results;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task<List<Class>> GetMany(string userId, int start, int count)
        {
            try
            {
                var filter = Builders<Class>.Filter.Eq(x => x.UserId, userId);
                var results = await _classCollection.Find(filter).Skip(start - 1).Limit(count).ToListAsync();
                return results;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task<Class> Register(Class classItem)
        {
            try
            {
                await _classCollection.InsertOneAsync(classItem);
                return classItem;
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }

        public async Task<Class> Update(Class classItem)
        {
            try
            {
                var filter = Builders<Class>.Filter.Eq(u => u.Id, classItem.Id);
                var update = Builders<Class>.Update
                    .Set(u => u.ClientsId, classItem.ClientsId)
                    .Set(u => u.Name, classItem.Name);
                    

                var result = await _classCollection.UpdateOneAsync(filter, update);
                if (result.MatchedCount == 0)
                    throw new Exception("Turma não encontrada.");
                return classItem;
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }
    }
}
