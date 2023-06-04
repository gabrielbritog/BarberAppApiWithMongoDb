using AutoMapper;
using BarberApp.Domain.Dto.Class;
using BarberApp.Domain.Dto.Client;
using BarberApp.Domain.Dto.Company;
using BarberApp.Domain.Interface.Repositories;
using BarberApp.Domain.Interface.Services;
using BarberApp.Domain.Models;
using BarberApp.Infra.Repository;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Service.Service
{
    public class ClassService : IClassService
    {
        private readonly IClassRepository _classRepository;
        private readonly IMapper _mapper;
        public ClassService(IClassRepository classRepository, IMapper mapper)
        {
            _mapper = mapper;
            _classRepository = classRepository;
        }

        public async Task<List<ResponseClassDto>> GetAll(string userId) => _mapper.Map<List<ResponseClassDto>>(await _classRepository.GetAll(userId));

        public async Task<ResponseClassDto> GetById(string userId, string id) => _mapper.Map<ResponseClassDto>(await _classRepository.GetById(userId, id));

        public async Task<List<ResponseClassDto>> GetMany(string userId, int start, int count) => _mapper.Map<List<ResponseClassDto>>(await _classRepository.GetMany(userId, start, count));

        public async Task<ResponseClassDto> Register(RegisterClassDto classItem, string userId)
        {
            var classRegister = _mapper.Map<Class>(classItem);
            classRegister.UserId = userId;
            return _mapper.Map<ResponseClassDto>(await _classRepository.Register(classRegister));
        }

        public async Task<ResponseClassDto> Update(string userId, UpdateClassDto classItem)
        {
            var classDb = await _classRepository.GetById(userId, classItem.Id);
            classItem.Name ??= classDb.Name;
            classItem.ClientsId ??= classDb.ClientsId;

            var result = await _classRepository.Update(_mapper.Map<Class>(classItem));

            return _mapper.Map<ResponseClassDto>(result);
        }
    }
}
