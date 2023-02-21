﻿using BarberApp.Domain.Models;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace BarberApp.Domain.Dto.User
{
    public class UpdateUserDto
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;

        [EmailAddress(ErrorMessage = "Email inválido!")]
        public string Email { get; set; } = null!;
        public string UrlImage { get; set; } = null!;
        public string Cep { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        [StringLength(30, MinimumLength = 8, ErrorMessage = "Senha deve conter minimo de 8 caracteres")]
        public string Password { get; set; } = null!;
        [BsonElement("workingDays")]
        public List<WeekDays> WorkingDays { get; set; }
        public bool Disabled { get; set; }
    }
}
