using BarberApp.Domain.Models;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Domain.Dto.User
{
    public class ResponseUserDto
    {
        public string UserId { get; set; } = null;
        public string CompanyName { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Cep { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string UrlImagem { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public int UserLevel { get; set; }
        public List<WeekDays> WorkingDays { get; set; }
        public DateTime UserRegistration { get; set; }
        public bool Disabled { get; set; }
        public UserConfig UserConfig { get; set; }
    }
}
