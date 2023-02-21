using BarberApp.Domain.Dto.Client;
using BarberApp.Domain.Models;


namespace BarberApp.Domain.Interface.Services
{
    public interface IClientService
    {
        public Task<ResponseClientDto> Register(RegisterClientDto client);
        public Task<Client> GetByPhone(string phone);

    }
}
