namespace StockTracker.Web.Models
{
    public class TickerResponse
    {
        /// <summary>
        /// Symbol.
        /// </summary>
        public string Symbol { get; set; } = string.Empty;

        /// <summary>
        /// Name.
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Type.
        /// </summary>
        public string Type { get; set; } = string.Empty;

        /// <summary>
        /// Region.
        /// </summary>
        public string Region { get; set; } = string.Empty;

        /// <summary>
        /// MarketOpen.
        /// </summary>
        public string MarketOpen { get; set; } = string.Empty;

        /// <summary>
        /// MarketClose.
        /// </summary>
        public string MarketClose { get; set; } = string.Empty;

        /// <summary>
        /// Timezone.
        /// </summary>
        public string Timezone { get; set; } = string.Empty;

        /// <summary>
        /// Currency.
        /// </summary>
        public string Currency { get; set; } = string.Empty;

        /// <summary>
        /// MatchScore.
        /// </summary>
        public string MatchScore { get; set;} = string.Empty;
    }
}