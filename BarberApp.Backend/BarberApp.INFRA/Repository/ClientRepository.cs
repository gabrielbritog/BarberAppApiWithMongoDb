using BarberApp.Domain.Interface.Repositories;
using BarberApp.Domain.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Infra.Repository
{
    public class ClientRepository : IClientRepository
    {
        private readonly IMongoCollection<Client> _clientCollection;

        public ClientRepository(IOptions<DataBaseSettings> clientServices)
        {
            var mongoClient = new MongoClient(clientServices.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(clientServices.Value.DatabaseName);
            _clientCollection = mongoDatabase.GetCollection<Client>
                (clientServices.Value.ClientTypeCollectionName);
        }

        public async Task<List<Client>> GetAll(string userId)
        {
            try
            {
                var filter = Builders<Client>.Filter.Eq(x => x.UserId, userId);
                var results = await _clientCollection.Find(filter).ToListAsync();
                return results;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task<Client> GetByPhone(string phone)
        {
            try
            {
                var filter = Builders<Client>.Filter.Eq(u => u.Phone, phone);
                var result = await _clientCollection.Find(filter).FirstOrDefaultAsync();
                return result;

            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task<List<Client>> GetMany(string userId, int start, int count)
        {
            try
            {
                var filter = Builders<Client>.Filter.Eq(x => x.UserId, userId);
                var results = await _clientCollection.Find(filter).Skip(start - 1).Limit(count).ToListAsync();
                return results;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task<List<Client>> GetTop(string userId,int top, DateTime first, DateTime last )
        {
            try
            {
                var filter = Builders<Client>.Filter.And(
                   Builders<Client>.Filter.Eq(u => u.UserId, userId),
                   Builders<Client>.Filter.Gte(u => u.LastVisit, first),
                   Builders<Client>.Filter.Lte(u => u.LastVisit, last)
                   );
                   
                var sort = Builders<Client>.Sort.Descending(u => u.SchedulingCount);

                var result = await _clientCollection.Find(filter).Sort(sort).Limit(top).ToListAsync();
                return result;

            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task<Client> Register(Client client)
        {
            try
            {              
                await _clientCollection.InsertOneAsync(client);
                return client;
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }

        public async Task<Client> Update(Client client)
        {
            try
            {
                var filter = Builders<Client>.Filter.Eq(u => u.Phone, client.Phone);

                if (existingClient == null)
                    throw new Exception("Cliente não encontrado.");


                if (existingClient == null)
                    throw new Exception("Cliente não encontrado.");


                if (existingClient == null)
                    throw new Exception("Cliente não encontrado.");

                var update = Builders<Client>.Update
                    .Set(u => u.Name, client.Name)
                    .Set(u => u.SchedulingCount, client.SchedulingCount)
                    .Set(u => u.LastVisit, client.LastVisit)
                    .Set(u => u.Email, client.Email)
                    .Set(u => u.Cpf, client.Cpf)
                    .Set(u => u.Retiree, client.Retiree)
                    .Set(u => u.Adress, client.Adress)
                    .Set(u => u.DateOfBirth, client.DateOfBirth)
                    .Set(u => u.Age, client.Age)
                    .Set(u => u.CivilStatus, client.CivilStatus)
                    .Set(u => u.ClassesId, client.ClassesId)
                    .Set(u => u.EmergencyContact, client.EmergencyContact)
                    .Set(u => u.Observation, client.Observation)
                    .Set(u => u.Occupation, client.Occupation)
                    .Set(u => u.Phone, client.Phone)
                    .Set(u => u.Rg, client.Rg)
                    .Set(u => u.Death, client.Death)
                    .Set(u => u.InterviewNumber, client.InterviewNumber)
                    .Set(u => u.RegisterNumber, client.RegisterNumber);

                var result = await _clientCollection.UpdateOneAsync(c => c.ClientId == client.ClientId, update);

                if (result.MatchedCount == 0)
                    throw new Exception("Cliente não encontrado.");

                return client;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}
