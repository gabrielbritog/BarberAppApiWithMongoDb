using BarberApp.Domain.Dto.Client;
using BarberApp.Domain.Models;


namespace BarberApp.Domain.Interface.Services
{
    public interface IClientService
    {
        public Task<ResponseClientDto> Register(RegisterClientDto client, string userId);
        public Task<ResponseClientDto> Update(UpdateClientDto client);
        public Task<Client> GetByPhone(string phone);
        public Task<List<ResponseClientDto>> GetTop(string userId, int top, DateTime first, DateTime last);

    }
}
