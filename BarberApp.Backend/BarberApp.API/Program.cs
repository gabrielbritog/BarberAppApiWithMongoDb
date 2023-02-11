using BarberApp.Api.Extensions;
using BarberApp.Domain.Interface.Repositories;
using BarberApp.Domain.Interface.Services;
using BarberApp.Domain.Models;
using BarberApp.Infra.Repository;
using BarberApp.Service.Service;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<DataBaseSettings>
    (builder.Configuration.GetSection("DevNetStoreDatabase"));
builder.Services.AddControllers();
builder.Services.AddConfigurations(builder.Configuration)
    .AddServices()
    .AddSwagger();

builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
