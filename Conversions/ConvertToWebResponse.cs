using StockTracker.Web.Models;

public static class ConvertToWebResponse
{
    public static GetTickerResponse ConvertToWeb(this GetTickerResponse response)
    {
        return new GetTickerResponse()
        {
            // BestMatches = response.bestMatches,
            // BestMatches = response.BestMatches.Select(x => x.ConvertToWeb()).ToList(),
        };
    }

    public static TickerResponse ConvertToWeb(this TickerResponse response)
    {
        return new TickerResponse()
        {
            Symbol = response.Symbol,
            Name = response.Name,
            Type = response.Type,
            Region = response.Region,
            MarketOpen = response.MarketOpen,
            MarketClose = response.MarketClose,
            Timezone = response.Timezone,
            Currency = response.Currency,
            MatchScore = response.MatchScore,
        };
    }
}