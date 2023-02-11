using AutoMapper;
using BarberApp.Domain.Dto.User;
using BarberApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Service.Configurations
{
    public class MapProfile : Profile
    {
        public MapProfile()
        {
            CreateMap<User, LoginUserDto>()
            .ReverseMap();
            CreateMap<User, ResponseUserDto>()
                .ReverseMap();
            CreateMap<User, RegisterUserDto>()
                .ReverseMap();

        }
    }
}
