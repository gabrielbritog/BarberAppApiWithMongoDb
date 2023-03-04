using BarberApp.Domain.Dto.Barber;
using BarberApp.Domain.Dto.User;
using BarberApp.Domain.Interface.Services;
using BarberApp.Domain.Models;
using BarberApp.Domain.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BarberApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseController
    {
        private readonly IUserService _userServices;
        private readonly IBarberService _barberService;
        public UserController(IUserService userServices, IBarberService barberService)
        {
            _userServices = userServices;
            _barberService = barberService;
        }
        [HttpPost("Register")]
        public async Task<ActionResult<ResponseViewModel<ResponseUserDto>>> Register([FromBody]RegisterUserDto user)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "Sucesso", await _userServices.Register(user)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }
            
        }
        [HttpPost("Login")]
        public async Task<ActionResult<ResponseViewModel<ResponseUserDto>>> Login([FromBody]LoginUserDto user)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "Sucesso", await _userServices.Login(user)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }

        }
        [HttpGet("GetByEmail")]
        public async Task<ActionResult<ResponseViewModel<ResponseUserDto>>> GetByEmail(string email)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "Sucesso", await _userServices.GetByEmail(email)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }

        }

        [HttpPut("Update")]
        [Authorize("Bearer")]
        public async Task<ActionResult<ResponseViewModel<ResponseUserDto>>> Update([FromBody]UpdateUserDto user)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "Sucesso", await _userServices.Update(user, Email)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }

        }
        [HttpPut("UpdateFunc")]
        [Authorize("Bearer")]
        public async Task<ActionResult<ResponseViewModel<ResponseBarberDto>>> Update([FromBody] UpdateBarberDto barber, string email,string barberId)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "Sucesso", await _barberService.Update(barber, email, barberId)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }

        }

        [HttpGet("GetMany")]
        public async Task<ActionResult<ResponseViewModel<ResponseUserDto>>> GetMany([FromQuery] int start, [FromQuery] int count)
        {
            try
            {
                return Ok(new ResponseViewModel(true, "Sucesso", await _userServices.GetMany(start,count)));
            }
            catch (Exception e)
            {

                return BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }

        }

        [HttpDelete("DropDataBase")]
        public async Task DropDatabase()
        {
            try
            {
                await _userServices.DropDataBase();
                 Ok("Base de dados deletada");
            }
            catch (Exception e)
            {

                 BadRequest(new ResponseViewModel(false, "Erro", e.Message));
            }

        }

    }
}
