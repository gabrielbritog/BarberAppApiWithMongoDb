using BarberApp.Domain.Interface.Services;
using BarberApp.Service.Service;

namespace BarberApp.Api.Extensions
{
    public static class AddServiceExtensions
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddScoped<ITokenService, TokenService>();

            return services;
        }
    }
}
