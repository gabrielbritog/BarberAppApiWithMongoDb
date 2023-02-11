using BarberApp.Domain.Models;

namespace BarberApp.Api.Extensions
{
    public static class AddMongoExtensions
    {
        public static IServiceCollection AddMongo(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<DataBaseSettings>
    (configuration.GetSection("DevNetStoreDatabase"));
            return services;
        }
    }
}
