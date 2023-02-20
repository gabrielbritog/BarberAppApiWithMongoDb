using BarberApp.Domain.Dto.Barber;
using BarberApp.Domain.Dto.Scheduling;
using BarberApp.Domain.Dto.User;
using BarberApp.Domain.Interface.Services;
using BarberApp.Domain.ViewModels;
using BarberApp.Service.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BarberApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BarberController : BaseController
    {
        private readonly IBarberService _barberService;
        private readonly ISchedulingService _schedulingService;
        public BarberController(IBarberService barberService)
        {
            _barberService = barberService;

        }
        [HttpPost("Register")]
        [Authorize("Bearer")]
        public async Task<ActionResult<ResponseViewModel<ResponseBarberDto>>> Register([FromBody] RegisterBarberDto barber)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "Sucesso", await _barberService.Register(barber, Id)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }

        }

        [HttpPost("Login")]
        public async Task<ActionResult<ResponseViewModel<ResponseBarberDto>>> Login([FromBody] LoginBarberDto barber)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "Sucesso", await _barberService.Login(barber)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }

        }

        [HttpGet("GetMany")]
        public async Task<ActionResult<ResponseViewModel<ResponseBarberDto>>> GetMany([FromQuery] int start, [FromQuery] int count)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "Sucesso", await _barberService.GetMany(start, count)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }

        }

        [HttpPost("RegisterScheduling")]
        [Authorize("Bearer")]
        public async Task<ActionResult<ResponseViewModel<ResponseBarberDto>>> RegisterScheduling([FromBody] RegisterSchedulingDto scheduling)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "Sucesso", await _schedulingService.Register(scheduling,Id)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }

        }

    }
}
