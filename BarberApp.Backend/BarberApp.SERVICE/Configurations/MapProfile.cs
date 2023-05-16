using AutoMapper;
using BarberApp.Domain.Dto.Barber;
using BarberApp.Domain.Dto.Class;
using BarberApp.Domain.Dto.Client;
using BarberApp.Domain.Dto.Company;
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

            CreateMap<Barber, LoginBarberDto>()
                .ReverseMap();
            CreateMap<Barber, RegisterBarberDto>()
                .ReverseMap();
            CreateMap<Barber, ResponseBarberDto>()
                .ReverseMap();
            CreateMap<Barber, UpdateBarberDto>()
                .ReverseMap();

            CreateMap<Client, RegisterClientDto>()
               .ReverseMap();
            CreateMap<Client, ResponseClientDto>()
              .ReverseMap();

            CreateMap<Company, RegisterCompanyDto>()
              .ReverseMap();
            CreateMap<Company, ResponseCompanyDto>()
              .ReverseMap(); 
            CreateMap<Company, UpdateCompanyDto>()
              .ReverseMap();

            CreateMap<Class, RegisterClassDto>()
             .ReverseMap();
            CreateMap<Class, ResponseClassDto>()
              .ReverseMap();
            CreateMap<Class, UpdateClassDto>()
              .ReverseMap();

            CreateMap<ResponseSchedulingDto, UpdateSchedulingDto>().ReverseMap();
            CreateMap<ResponseServiceTypeDto, UpdateServiceTypeDto>().ReverseMap();


        }
    }
}
