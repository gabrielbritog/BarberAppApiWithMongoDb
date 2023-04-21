using AutoMapper;
using BarberApp.Domain.Dto.Client;
using BarberApp.Domain.Dto.User;
using BarberApp.Domain.Interface.Repositories;
using BarberApp.Domain.Interface.Services;
using BarberApp.Domain.Models;
using System.Collections.Generic;
using System.Numerics;

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
        public async Task<Client> GetByPhone(string phone) => await _clientRepository.GetByPhone(phone);
        public async Task<List<ResponseClientDto>> GetTop(string userId, int top, DateTime first, DateTime last) => _mapper.Map<List<ResponseClientDto>>(await _clientRepository.GetTop(userId, top, first, last));
        public async Task<ResponseClientDto> Update(UpdateClientDto client)
        {
            var ClientMap = _mapper.Map<Client>(client);
            await _clientRepository.Register(ClientMap);
            return _mapper.Map<ResponseClientDto>(ClientMap);
        }
        public async Task<ResponseClientDto> Register(RegisterClientDto client, string userId)
        {
            var checkPhone = await this.GetByPhone($"{client.Phone}");
            var ClientMap = _mapper.Map<Client>(client);
            
            if (checkPhone != null)
            {
                ClientMap.SchedulingCount = checkPhone.SchedulingCount + 1;
                ClientMap.LastVisit = DateTime.Now;
                await _clientRepository.Update(ClientMap);
            }
            else {
                ClientMap.UserId = userId;
                ClientMap.LastVisit = DateTime.Now;
                ClientMap.SchedulingCount = 1;
            await _clientRepository.Register(ClientMap);            
            }
            return _mapper.Map<ResponseClientDto>(ClientMap);
        }
        public async Task<List<ResponseClientDto>> GetAll(string userId) => _mapper.Map<List<ResponseClientDto>>(await _clientRepository.GetAll(userId));

        public async Task<List<ResponseClientDto>> GetMany(string userId, int start, int count) => _mapper.Map<List<ResponseClientDto>>(await _clientRepository.GetMany(userId, start, count));
    }
    }

