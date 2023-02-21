using AutoMapper;
using BarberApp.Domain.Dto.Client;
using BarberApp.Domain.Dto.User;
using BarberApp.Domain.Interface.Repositories;
using BarberApp.Domain.Interface.Services;
using BarberApp.Domain.Models;
using BarberApp.Service.Configurations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Service.Service
{
    public class ClientService : IClientService
    {
        private readonly IClientRepository _clientRepository;
        private readonly IMapper _mapper;
        public ClientService(IClientRepository clientRepository, IMapper mapper)
        {
            _mapper = mapper;
            _clientRepository = clientRepository;

        }

        public async  Task<Client> GetByPhone(string phone)
        {

            return await _clientRepository.GetByPhone(phone);
        }

        public async Task<ResponseClientDto> Register(RegisterClientDto client)
        {
            var checkPhone = await this.GetByPhone($"{client.Phone}");
            var ClientMap = _mapper.Map<Client>(client);
            
            if (checkPhone != null)
            {
                ClientMap.SchedulingCount = checkPhone.SchedulingCount + 1;
                await _clientRepository.Update(ClientMap);
            }
            else {                           
                ClientMap.SchedulingCount = 1;
            await _clientRepository.Register(ClientMap);            
            }
            return _mapper.Map<ResponseClientDto>(ClientMap);
        }
    }
}
