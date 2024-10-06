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