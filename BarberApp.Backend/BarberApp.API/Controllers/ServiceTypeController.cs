using BarberApp.Domain.Dto.Scheduling;
using BarberApp.Domain.Dto.ServiceType;
using BarberApp.Domain.Interface.Services;
using BarberApp.Domain.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BarberApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceTypeController : BaseController
    {
        private readonly IServiceTypeService _serviceServiceType;
        public ServiceTypeController(IServiceTypeService serviceServiceType)
        {
            _serviceServiceType = serviceServiceType;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<ResponseViewModel<ResponseServiceTypeDto>>> Register([FromBody] RegisterServiceTypeDto serviceType)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "Sucesso", await _serviceServiceType.Register(serviceType, Id)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }

        }
    }
}
