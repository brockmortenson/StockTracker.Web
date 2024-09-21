namespace StockTracker.Web.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using StockTracker.Web.Services;
    using StockTracker.Web.Models;
    using System.Net;

    [ApiController]
    [Route("api/[controller]")]
    public class ExternalApiController : ControllerBase
    {
        public ExternalApiController(ExternalApiService externalApiService)
        {
            _externalApiService = externalApiService;
        }

        private readonly ExternalApiService _externalApiService;
        [HttpPost("ticker")]
        public async Task<IActionResult> GetTicker([FromBody] TickerRequest request)
        {
            if (request == null)
            {
                return BadRequest("Request object is null");
            }

            var response = await _externalApiService.GetTicker(request);
            if (response == null) {
                return StatusCode(500, "Failed to pull data for GetTicker");
            }

            return Ok(response);
        }
    }
}