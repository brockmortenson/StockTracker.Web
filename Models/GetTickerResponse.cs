namespace StockTracker.Web.Models
{
    public class GetTickerResponse
    {
        /// <summary>
        /// BestMatches.
        /// </summary>
        public List<dynamic> BestMatches { get; set; } = new List<dynamic>();
    }
}
