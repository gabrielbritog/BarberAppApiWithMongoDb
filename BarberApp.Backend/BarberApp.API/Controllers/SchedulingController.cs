using BarberApp.Domain.Dto.Scheduling;
using BarberApp.Domain.Interface.Services;
using BarberApp.Domain.ViewModels;
using Microsoft.AspNetCore.Authorization;
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
        [Authorize("Bearer")]
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
        [HttpGet("GetAll")]
        [Authorize("Bearer")]
        public async Task<ActionResult<ResponseViewModel<ResponseSchedulingDto>>> GetAll()
        {
            try
            {
                return Ok(new ResponseViewModel(true, "Sucesso", await _schedulingService.GetAll(Id)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }
        }
        [HttpGet("GetById")]
        [Authorize("Bearer")]
        public async Task<ActionResult<ResponseViewModel<ResponseSchedulingDto>>> GetById(string schedulingId)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "Sucesso", await _schedulingService.GetById(schedulingId, Id)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }
        }
        [HttpPut("Update")]
        [Authorize("Bearer")]
        public async Task<ActionResult<ResponseViewModel<ResponseSchedulingDto>>> Update([FromBody] UpdateSchedulingDto scheduling)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "Sucesso", await _schedulingService.Update(scheduling, Id)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }

        }
    }
}
