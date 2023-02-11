using AutoMapper;
using BarberApp.Domain.Dto.User;
using BarberApp.Domain.Models;

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
            CreateMap<User, UpdateUserDto>()
                .ReverseMap();

        }
    }
}
