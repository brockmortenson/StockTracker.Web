namespace StockTracker.Web.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using StockTracker.Web.Services;
    using StockTracker.Web.Models;

    [ApiController]
    [Route("api/[controller]")]
    public class ExternalApiController : ControllerBase
    {
        public ExternalApiController(ExternalApiService externalApiService)
        {
            _externalApiService = externalApiService;
        }

        private readonly ExternalApiService _externalApiService;

        /// <summary>
        /// GetTicker endpoint.
        /// </summary>
        /// <param name="request">Search request</param>
        /// <returns></returns>
        [HttpPost("GetTicker")]
        public async Task<IActionResult> GetTicker([FromBody] SearchRequest request)
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

        /// <summary>
        /// GetTicker endpoint.
        /// </summary>
        /// <param name="request">Search request</param>
        /// <returns></returns>
        [HttpPost("GetTimeSeriesIntraday")]
        public async Task<IActionResult> GetTimeSeriesIntraday([FromBody] SearchRequest request)
        {
            if (request == null)
            {
                return BadRequest("Request object is null");
            }

            var response = await _externalApiService.GetTimeSeriesIntraday(request);
            if (response == null) {
                return StatusCode(500, "Failed to pull data for GetTicker");
            }

            return Ok(response);
        }
    }
}