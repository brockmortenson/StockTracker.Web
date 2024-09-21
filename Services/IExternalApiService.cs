
namespace StockTracker.Web.Services
{
    using StockTracker.Web.Models;
    public interface IExternalApiService
    {
        Task<string> GetTicker(TickerRequest request);
    }
}
