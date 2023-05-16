using BarberApp.Domain.Dto.Barber;
using BarberApp.Domain.Dto.Class;
using BarberApp.Domain.Dto.Scheduling;
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
    public class ClassController : BaseController
    {
        private readonly IClassService _classService;

        public ClassController(IClassService classService)
        {
            _classService = classService;
        }

        [HttpPost("Register")]
        [Authorize("Bearer")]
        public async Task<ActionResult<ResponseViewModel<ResponseClassDto>>> Register([FromBody] RegisterClassDto classItem)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "", await _classService.Register(classItem, Id)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }

        }
        [HttpPut("Update")]
        [Authorize("Bearer")]
        public async Task<ActionResult<ResponseViewModel<ResponseClassDto>>> Update([FromBody] UpdateClassDto classItem)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "", await _classService.Update(Id, classItem)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }
        }
        [Authorize("Bearer")]
        [HttpGet("GetAll")]       
        public async Task<ActionResult<ResponseViewModel<ResponseClassDto>>> GetAll()
        {
            try
            {
                return Ok(new ResponseViewModel(true, "", await _classService.GetAll(Id)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }
        }

        [Authorize("Bearer")]
        [HttpGet("GetMany")]
        public async Task<ActionResult<ResponseViewModel<ResponseClassDto>>> GetMany([FromQuery] int start, [FromQuery] int count)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "", await _classService.GetMany(Id, start, count)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }
        }
        [HttpGet("GetById")]
        [Authorize("Bearer")]
        public async Task<ActionResult<ResponseViewModel<ResponseClassDto>>> GetById(string classId)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "", await _classService.GetById(Id, classId)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }
        }


    }
}

