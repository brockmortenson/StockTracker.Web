import { ISearchRequest } from '../shared/interfaces/search-request.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChartConfiguration } from 'chart.js';
import { IGlobalQuote, IIntradayResponse, IMatches } from '../shared/interfaces/common-interfaces';
import { DateTime } from 'luxon';

@Injectable({
    providedIn: 'root',
})
export class StockTrackerService {
    private urlPrefix = 'api/ExternalApi';

    constructor(private http: HttpClient) { }
    
    public getTicker(request: ISearchRequest): Observable<IMatches> {
        return this.http.post<IMatches>(`${this.urlPrefix}/GetTicker`, request);
    }

    public getTimeSeriesIntraday(request: ISearchRequest): Observable<IIntradayResponse> {
        return this.http.post<IIntradayResponse>(`${this.urlPrefix}/GetTimeSeriesIntraday`, request);
    }

    public getGlobalQuote(request: ISearchRequest): Observable<IGlobalQuote> {
        return this.http.post<IGlobalQuote>(`${this.urlPrefix}/GetGlobalQuotw`, request);
    }

    public configureChart(response: IIntradayResponse): ChartConfiguration['data'] {
        let keys: Array<string> = [];
        let label: string = '';
        const data: Array<number> = [];

        if (response) {
            keys = Object.keys(response['Time Series (5min)']);
            label = DateTime.fromFormat(keys[0], 'yyyy-MM-dd HH:mm:ss').toFormat('cccc, M/d/yyyy');
            keys.forEach((key) => {
                data.push(+response['Time Series (5min)'][key]['1. open']);
            });

            keys = this.formatDates(keys);
        }
        
        return {
            labels: [...keys],
            datasets: [
                {
                data: [...data],
                label: `${response['Meta Data']['2. Symbol']} as of ${label}`,
                borderColor: '#FFA400',
                fill: false,
                }
            ],
        };
    }

    private formatDates(dates: Array<string>): Array<string> {
        const sortedDates = dates.sort((a, b) => {
        const dateA = DateTime.fromFormat(a, 'yyyy-MM-dd HH:mm:ss');
        const dateB = DateTime.fromFormat(b, 'yyyy-MM-dd HH:mm:ss');
        return dateA.toMillis() - dateB.toMillis();
        });

        return sortedDates.map((date) => {
        const newDate = DateTime.fromFormat(date, 'yyyy-MM-dd HH:mm:ss', { zone: 'UTC' }).setZone('EST');
        return newDate.toFormat('h:mm a');
        })
    }
}