﻿using System.Security.Cryptography;
using System.Text;

namespace BarberApp.Service.Global
{
    public class Functions
    {
        public static string EncryptPassword(string password)
        {
            
            Byte[] inputBytes = Encoding.UTF8.GetBytes(password);
            Byte[] hashedBytes = SHA256.Create().ComputeHash(inputBytes);
            var sb = new StringBuilder();
            foreach (var caracter in hashedBytes)
            {
                sb.Append(caracter.ToString("X2"));
            }
            return sb.ToString();

        }
    }
}
