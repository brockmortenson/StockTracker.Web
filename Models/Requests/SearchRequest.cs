namespace StockTracker.Web.Models
{
    public class SearchRequest
    {
        /// <summary>
        /// Function
        /// </summary>
        public string Function { get; set; } = string.Empty;

        /// <summary>
        /// Keywords.
        /// </summary>
        public string Keywords { get; set; } = string.Empty;

        /// <summary>
        /// Symbol.
        /// </summary>
        public string Symbol { get; set; } = string.Empty;

        /// <summary>
        /// Interval.
        /// </summary>
        public string Interval { get; set; } = string.Empty;
    }
}