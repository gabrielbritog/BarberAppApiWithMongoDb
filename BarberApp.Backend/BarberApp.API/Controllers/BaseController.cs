using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BarberApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        public string Email
        {
            get
            {
                return this.User.Claims.FirstOrDefault(c => c.Type == "Email").Value;
            }
        }
        public string Id
        {
            get
            {
                return this.User.Claims.FirstOrDefault(c => c.Type == "UserId").Value;
            }
        }
        public string BarberId
        {
            get
            {
                return this.User.Claims.FirstOrDefault(c => c.Type == "UserId").Value;
            }
        }

    }
}
