using BarberApp.Domain.Dto.Scheduling;
using BarberApp.Domain.Dto.ServiceType;
using BarberApp.Domain.Interface.Services;
using BarberApp.Domain.Models;
using BarberApp.Domain.ViewModels;
using Microsoft.AspNetCore.Authorization;
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
        [Authorize("Bearer")]
        public async Task<ActionResult<ResponseViewModel<ResponseServiceTypeDto>>> Register([FromBody] RegisterServiceTypeDto serviceType)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "Sucesso", await _serviceServiceType.Register(serviceType, Id,serviceType.barberId)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }

        }
        [HttpGet("GetMany")]
        [Authorize("Bearer")]
        public async Task<ActionResult<ResponseViewModel<ResponseServiceTypeDto>>> GetMany([FromQuery] int start, [FromQuery] int count)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "Sucesso", await _serviceServiceType.GetMany(Id,start,count)));

            }
            catch (Exception e )
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));

            }
        }
        [HttpGet("GetById")]
        [Authorize("Bearer")]
        public async Task<ActionResult<ResponseViewModel<ResponseServiceTypeDto>>> GetById([FromQuery]string serviceTypeId)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "Sucesso", await _serviceServiceType.GetById(Id, serviceTypeId)));

            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));

            }
        }
        [HttpPut("Update")]
        [Authorize("Bearer")]
        public async Task<ActionResult<ResponseViewModel<ResponseServiceTypeDto>>> Update(UpdateServiceTypeDto serviceType)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "Sucesso", await _serviceServiceType.Update(serviceType, Id)));

            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));

            }
        }
    }
}
