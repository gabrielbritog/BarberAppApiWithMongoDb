using BarberApp.Domain.Dto.Scheduling;
using BarberApp.Domain.Dto.User;
using BarberApp.Domain.Interface.Services;
using BarberApp.Domain.ViewModels;
using BarberApp.Service.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BarberApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchedulingController : BaseController
    {
        private readonly ISchedulingService  _schedulingService;
        public SchedulingController(ISchedulingService schedulingService)
        {
            _schedulingService = schedulingService;

        }
        [HttpPost("Register")]
        public async Task<ActionResult<ResponseViewModel<ResponseSchedulingDto>>> Register([FromBody] RegisterSchedulingDto scheduling)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "Sucesso", await _schedulingService.Register(scheduling, Id)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }

        }
    }
}
