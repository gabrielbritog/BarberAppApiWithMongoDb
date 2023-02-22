﻿using BarberApp.Domain.Interface.Repositories;
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
                var update = Builders<Client>.Update
                    .Set(u => u.Name, client.Name)
                    .Set(u => u.SchedulingCount, client.SchedulingCount);
                var result = await _clientCollection.UpdateOneAsync(filter, update);
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
