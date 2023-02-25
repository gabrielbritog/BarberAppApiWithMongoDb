using BarberApp.Domain.Dto.Scheduling;
using BarberApp.Domain.Dto.ServiceType;
using BarberApp.Domain.Interface.Services;
using BarberApp.Domain.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BarberApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashBoardController : BaseController
    {
        private readonly ISchedulingService _schedulingService;
        public DashBoardController(ISchedulingService schedulingService)
        {
            _schedulingService = schedulingService;

        }
        [HttpGet("GetHistoric")]
        [Authorize("Bearer")]
        public async Task<ActionResult<ResponseViewModel<ResponseHistoricSchedulingDto>>> GetHistoric([FromQuery] int start, [FromQuery] int count)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "Sucesso", await _schedulingService.Historic(Id, start, count)));

            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));

            }
        }
        [HttpGet("GetManySchedulingByDate")]
        [Authorize("Bearer")]
        public async Task<ActionResult<ResponseViewModel<ResponseSchedulingDto>>> GetManySchedulingByDate([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "Sucesso", await _schedulingService.GetManyByDate(Id, startDate, endDate)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }
        }

    }
}
