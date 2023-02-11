using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberApp.Domain.ViewModels
{
    public class TokenViewModel
    {
        public bool Authenticated { get; set; }
        public string Created { get; set; }
        public string Expiration { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public virtual object Dados { get; set; }
        public TokenViewModel(
            bool Authenticated,
            string Created,
            string Expiration,
            string AccessToken,
            object Dados
            )
        {
            this.Authenticated = Authenticated;
            this.Created = Created;
            this.Expiration = Expiration;
            this.AccessToken = AccessToken;
            this.Dados = Dados;
        }
    }
}

