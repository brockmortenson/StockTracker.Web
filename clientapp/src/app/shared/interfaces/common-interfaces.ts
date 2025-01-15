import { ChartConfiguration } from "chart.js";

export interface IMatches {
    bestMatches: Array<ITicker>;
}

export interface ITicker {
    "1. symbol"?: string;
    "2. name"?: string;
    "3. type"?: string;
    "4. region"?: string;
    "5. marketOpen"?: string;
    "6. marketClose"?: string;
    "7. timezone"?: string;
    "8. currency"?: string;
    "9. matchScore"?: string;
}

export interface IIntradayResponse {
    "Meta Data": IMetadata;
    "Time Series (5min)": ITimeSeries;
}

export interface IMetadata {
    "1. Information"?: string;
    "2. Symbol"?: string;
    "3. Last Refreshed"?: string;
    "4. Interval"?: string;
    "5. Output Size"?: string;
    "6. Time Zone"?: string;
}

export interface ITimeSeries {
    [timestamp: string]: ITimeSeriesData;
}

export interface ITimeSeriesData {
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
    "5. volume": string;   
}

export interface IGlobalQuote {
    "Global Quote": IQuote;
}

export interface IQuote {
    "01. symbol": string;
    "02. open": string;
    "03. high": string;
    "04. low": string;
    "05. price": string;
    "06. volume": string;
    "07. latest trading day": string;
    "08. previous close": string;
    "09. change": string;
    "10. change percent": string;
}

export interface ITickerSummary {
    symbol: string;
    open: number;
    high: number;
    low: number;
    price: number;
    volume: number;
    latestTradingDay: string;
    previousClose: number;
    change: number;
    changePercent: string;
}

export const DefaultChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
        x: {
        ticks: {
            color: '#EAF6FF',
        },
        grid: {
            color: '',
        },
        border: {
            color: '#009FFD',
        },
        },
        y: {
        beginAtZero: false,
        ticks: {
            color: '#EAF6FF',
        },
        grid: {
            color: '',
        },
        border: {
            color: '#009FFD',
        },
        },
    },
};