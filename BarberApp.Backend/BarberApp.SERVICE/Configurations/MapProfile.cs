using AutoMapper;
using BarberApp.Domain.Dto.Scheduling;
using BarberApp.Domain.Dto.ServiceType;
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

            CreateMap<Scheduling, RegisterSchedulingDto>()
                .ReverseMap();
            CreateMap<Scheduling, ResponseSchedulingDto>()
                .ReverseMap();
            CreateMap<Scheduling, UpdateSchedulingDto>()
                .ReverseMap();

            CreateMap<ServiceType, RegisterServiceTypeDto>()
                .ReverseMap();
            CreateMap<ServiceType, ResponseServiceTypeDto>()
                .ReverseMap();
            CreateMap<ServiceType, UpdateServiceTypeDto>()
                .ReverseMap();

            CreateMap<ResponseSchedulingDto, UpdateSchedulingDto>().ReverseMap();


        }
    }
}
