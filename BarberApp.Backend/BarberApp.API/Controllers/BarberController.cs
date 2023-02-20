using BarberApp.Domain.Dto.Barber;
using BarberApp.Domain.Dto.Scheduling;
using BarberApp.Domain.Dto.ServiceType;
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
        private readonly IServiceTypeService _serviceTypeService;
        public BarberController(IBarberService barberService, ISchedulingService schedulingService, IServiceTypeService serviceTypeService)
        {
            _barberService = barberService;
            _schedulingService = schedulingService;
            _serviceTypeService= serviceTypeService;

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
                return Ok(new ResponseViewModel(true, "Sucesso", await _schedulingService.Register(scheduling,Id,BarberId)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }

        }
        [HttpPost("RegisterServiceType")]
        [Authorize("Bearer")]
        public async Task<ActionResult<ResponseViewModel<ResponseBarberDto>>> RegisterServiceType([FromBody] RegisterServiceTypeDto serviceType)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "Sucesso", await _serviceTypeService.Register(serviceType, Id, BarberId)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }

        }
        [HttpGet("GetManyScheduling")]
        public async Task<ActionResult<ResponseViewModel<ResponseBarberDto>>> GetManyScheduling([FromQuery] int start, [FromQuery] int count)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "Sucesso", await _schedulingService.GetMany(Id,BarberId,start, count)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }

        }
        [HttpGet("GetManyServiceType")]
        public async Task<ActionResult<ResponseViewModel<ResponseBarberDto>>> GetManyServiceType([FromQuery] int start, [FromQuery] int count)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "Sucesso", await _serviceTypeService.GetMany(Id,BarberId,start, count)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }

        }
        [HttpDelete("DeleteAllScheduling")]
        public async Task<ActionResult<ResponseViewModel<ResponseBarberDto>>> DeleteAllScheduling()
        {
            try
            {
                return Ok(new ResponseViewModel(true, "Sucesso", await _schedulingService.DeleteAll(Id, BarberId)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }

        }

    }
}
