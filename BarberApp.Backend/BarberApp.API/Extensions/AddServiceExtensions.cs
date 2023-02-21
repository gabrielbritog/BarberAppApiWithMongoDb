using BarberApp.Domain.Interface.Repositories;
using BarberApp.Domain.Interface.Services;
using BarberApp.Domain.Models;
using BarberApp.Infra.Repository;
using BarberApp.Service.Service;

namespace BarberApp.Api.Extensions
{
    public static class AddServiceExtensions
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<ITokenService, TokenService>();

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUserRepository, UserRepository>();

            services.AddScoped<ISchedulingRepository, SchedulingRepository>();
            services.AddScoped<ISchedulingService, SchedulingService>();

            services.AddScoped<IServiceTypeRepository, ServiceTypeRepository>();
            services.AddScoped<IServiceTypeService, ServiceTypeService>();

            services.AddScoped<IBarberRepository, BarberRepository>();
            services.AddScoped<IBarberService, BarberService>();

            services.AddScoped<IClientRepository, ClientRepository>();
            services.AddScoped<IClientService, ClientService>();

            return services;
        }
    }
}
