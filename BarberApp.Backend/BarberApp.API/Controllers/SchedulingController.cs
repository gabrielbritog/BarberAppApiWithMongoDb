using BarberApp.Domain.Dto.Scheduling;
using BarberApp.Domain.Interface.Services;
using BarberApp.Domain.Models;
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
        private readonly IClientService _clientService;
        public SchedulingController(ISchedulingService schedulingService, IClientService clientService)
        {
            _schedulingService = schedulingService;
            _clientService = clientService;

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
        [HttpGet("GetMany")]
        [Authorize("Bearer")]
        public async Task<ActionResult<ResponseViewModel<ResponseSchedulingDto>>> GetMany([FromQuery]int start, [FromQuery] int count)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "Sucesso", await _schedulingService.GetMany(Id,start,count)));
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
        [HttpDelete("DeleteAll")]
        [Authorize("Bearer")]
        public async Task<ActionResult<ResponseViewModel<ResponseSchedulingDto>>> DeleteAll()
        {
            try
            {
                return Ok(new ResponseViewModel(true, "Sucesso", await _schedulingService.DeleteAll(Id)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }

        }
        [HttpDelete("DeleteById")]
        [Authorize("Bearer")]
        public async Task<ActionResult<ResponseViewModel<ResponseSchedulingDto>>> DeleteById([FromQuery] string schedulingId)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "Sucesso", await _schedulingService.DeleteById(Id, schedulingId)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }

        }
    }
}
