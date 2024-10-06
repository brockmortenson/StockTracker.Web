namespace StockTracker.Web.Services
{
    using System.Net.Http;
    using System.Threading.Tasks;
    using StockTracker.Web.Models;
    using Newtonsoft.Json;

    public class ExternalApiService : IExternalApiService
    {
        /// <summary>
        /// The http client.
        /// </summary>
        private readonly HttpClient _httpClient;

        /// <summary>
        /// Configuration.
        /// </summary>
        private readonly IConfiguration _configuration;

        /// <summary>
        /// API Key.
        /// </summary>
        private readonly string ?_apiKey;

        /// <summary>
        /// ExternalApiService constructor.
        /// </summary>
        /// <param name="httpClient"></param>
        public ExternalApiService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _apiKey = _configuration["Api_Key"];
        }

        public async Task<string> GetTicker(SearchRequest request)
        {
            var requestUrl = $"https://www.alphavantage.co/query?function={request.Function}&keywords={request.Keywords}&apikey={_apiKey}";
            var response = await _httpClient.GetAsync(requestUrl);

            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                return responseContent;
            }

            return null;
        }

        public async Task<string> GetTimeSeriesIntraday(SearchRequest request)
        {
            var requestUrl = $"https://www.alphavantage.co/query?function={request.Function}&symbol={request.Symbol}&interval={request.Interval}&apikey={_apiKey}";
            var response = await _httpClient.GetAsync(requestUrl);

            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                return responseContent;
            }

            return null;
        }
    }
}