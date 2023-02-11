using BarberApp.Api.Extensions;
var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddConfigurations(builder.Configuration)
    .AddServices()
    .AddSwagger()
    .AddMongo(builder.Configuration);

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
