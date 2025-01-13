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
        /// Base API url.
        /// </summary>
        private string baseUrl = "https://www.alphavantage.co/query?";

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
            var requestUrl = ConstructUrl(request);
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
            var requestUrl = ConstructUrl(request);
            var response = await _httpClient.GetAsync(requestUrl);

            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                return responseContent;
            }

            return null;
        }

        private string ConstructUrl(SearchRequest request)
        {
            string constructedUrl = string.Empty;
            constructedUrl += baseUrl;

            if (!string.IsNullOrEmpty(request.Function))
            {
                constructedUrl += $"function={Uri.EscapeDataString(request.Function)}";
            }

            if (!string.IsNullOrEmpty(request.Symbol))
            {
                constructedUrl += $"&symbol={Uri.EscapeDataString(request.Symbol)}";
            }

            if (!string.IsNullOrEmpty(request.Keywords))
            {
                constructedUrl += $"&keywords={Uri.EscapeDataString(request.Keywords)}";
            }

            if (!string.IsNullOrEmpty(request.Interval))
            {
                constructedUrl += $"&interval={Uri.EscapeDataString(request.Interval)}";
            }

            if (!string.IsNullOrEmpty(request.ExtendedHours))
            {
                constructedUrl += $"&extended_hours={Uri.EscapeDataString(request.ExtendedHours)}";
            }

            constructedUrl += $"&apikey={_apiKey}";

            return constructedUrl;
        }
    }
}