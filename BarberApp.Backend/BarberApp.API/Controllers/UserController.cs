﻿using BarberApp.Domain.Dto.User;
using BarberApp.Domain.Interface.Services;
using BarberApp.Domain.Models;
using BarberApp.Domain.ViewModels;
using BarberApp.Service.Service;
using Microsoft.AspNetCore.Mvc;

namespace BarberApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userServices;
        public UserController(IUserService userServices)
        {
            _userServices = userServices;
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
    }
}
