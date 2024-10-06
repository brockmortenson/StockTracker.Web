
namespace StockTracker.Web.Services
{
    using StockTracker.Web.Models;
    public interface IExternalApiService
    {
        Task<string> GetTicker(SearchRequest request);

        Task<string> GetTimeSeriesIntraday(SearchRequest request);
    }
}
