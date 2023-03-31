using BarberApp.Domain.Dto.Barber;
using BarberApp.Domain.Dto.Client;
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
        private readonly IClientService _clientService;
        private readonly IBarberService _barberService;
        public DashBoardController(ISchedulingService schedulingService, IClientService clientService, IBarberService barberService)
        {
            _clientService= clientService;
            _schedulingService = schedulingService;
            _barberService = barberService;

        }
        [HttpGet("GetHistoric")]
        [Authorize("Bearer")]
        public async Task<ActionResult<ResponseViewModel<ResponseHistoricSchedulingDto>>> GetHistoric([FromQuery] int start, [FromQuery] int count)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "", await _schedulingService.Historic(Id, start, count)));

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
                return Ok(new ResponseViewModel(true, "", await _schedulingService.GetManyByDate(Id, startDate, endDate)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }
        }

        [HttpGet("GetTop")]
        [Authorize("Bearer")]
        public async Task<ActionResult<ResponseViewModel<string>>> GetTop(int type, int top, DateTime first, DateTime last)
        {
            //0 = clientes
            //1 = funcionario
            try
            {
                if (type == 0)
                {
                    var result = await _clientService.GetTop(Id, top, first, last);
               
                   return Ok(new ResponseViewModel<List<ResponseClientDto>>(true, "", result));

                }
                else
                {
                    var result = await _barberService.GetTop(Id, top, first, last);

                    return Ok(new ResponseViewModel<List<string>>(true, "", result));
                }
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }
        }

    }
}
