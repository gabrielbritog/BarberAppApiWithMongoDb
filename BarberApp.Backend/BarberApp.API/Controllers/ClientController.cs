using BarberApp.Domain.Dto.Client;
using BarberApp.Domain.Dto.Scheduling;
using BarberApp.Domain.Dto.User;
using BarberApp.Domain.Interface.Services;
using BarberApp.Domain.Models;
using BarberApp.Domain.ViewModels;
using BarberApp.Service.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BarberApp.Api.Controllers
{
    [ApiController]

    public class ClientController : ControllerBase
    {
        private readonly IClientService _clientService;
        private readonly IUserService _userService;
        private readonly ISchedulingService _schedulingService;
        private readonly IServiceTypeService _serviceTypeService;
        public ClientController(IClientService clientService, ISchedulingService schedulingService, IServiceTypeService serviceTypeService, IUserService userService)
        {
            _clientService = clientService;
            _schedulingService = schedulingService;
            _serviceTypeService = serviceTypeService;
            _userService = userService;
        }     

        [HttpGet("{nameCompany}")]
        public async Task<ActionResult<ResponseViewModel<ResponseUserDto>>> GetCompany(string nameCompany)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "Sucesso", await _userService.GetByCompanyName(nameCompany)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }
        }
        [HttpPost("RegisterScheduling")]
        public async Task<ActionResult<ResponseViewModel<ResponseUserDto>>> RegisterScheduling([FromBody] RegisterSchedulingDto scheduling, string userId,string barberId)
        {
            try
            {
                await _clientService.Register(scheduling.Client, userId);
                return Ok(new ResponseViewModel(true, "Sucesso", await _schedulingService.Register(scheduling,userId,barberId)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }
        }
    }
}
