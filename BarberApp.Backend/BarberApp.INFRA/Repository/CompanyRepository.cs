using BarberApp.Domain.Interface.Repositories;
using BarberApp.Domain.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace BarberApp.Infra.Repository
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly IMongoCollection<Company> _companyCollection;

        public CompanyRepository(IOptions<DataBaseSettings> companyServices)
        {
            var mongoClient = new MongoClient(companyServices.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(companyServices.Value.DatabaseName);
            _companyCollection = mongoDatabase.GetCollection<Company>
                (companyServices.Value.CompanyTypeCollectionName);
        }

        public async Task<Company> GetById(string companyId)
        {
            try
            {
                var filter = Builders<Company>.Filter.Eq(u => u.Id, companyId);   
                return await _companyCollection.Find(filter).FirstOrDefaultAsync();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task<Company> Register(Company company)
        {

            try
            {
                await _companyCollection.InsertOneAsync(company);
                return company;
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }

        public async Task<Company> Update(Company company)
        {
            try
            {

                var filter = Builders<Company>.Filter.Eq(u => u.Id, company.Id);
                var update = Builders<Company>.Update
                    .Set(u => u.Adress, company.Adress)
                    .Set(u => u.Name, company.Name);
                    
                var result = await _companyCollection.UpdateOneAsync(filter, update);
                if (result.MatchedCount == 0)
                    throw new Exception("Usuário não encontrado.");

                return company;
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
           
        }

       
    }
}
